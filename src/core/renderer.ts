/**
 * Token to HTML renderer for Codeshine
 */

import type { Token, Theme, LineData, HighlightRange } from './types.js';
import type { RenderOptions } from '../renderers/types.js';
import { escapeHtml } from '../utils/escape.js';
import { classnames } from '../utils/classnames.js';

/**
 * CSS class prefix
 */
const PREFIX = 'cs';

/**
 * Extended token for internal use
 */
interface RenderableToken extends Token {
  rangeHighlight?: HighlightRange;
}

/**
 * Get CSS class for token type
 */
export function getTokenClass(type: string): string {
  return `${PREFIX}-${type}`;
}

/**
 * Render a single token to HTML
 */
export function renderToken(token: Token, theme: Theme): string {
  const className = getTokenClass(token.type);
  const color = theme.colors.tokens[token.type as keyof typeof theme.colors.tokens];
  const escapedValue = escapeHtml(token.value);
  
  let html = '';
  if (color) {
    html = `<span class="${className}" style="color:${color}">${escapedValue}</span>`;
  } else {
    html = `<span class="${className}">${escapedValue}</span>`;
  }

  // Handle range highlighting wrapper if present (internal feature)
  const rangeToken = token as RenderableToken;
  if (rangeToken.rangeHighlight) {
    const { className: highlightClass, style: highlightStyle } = rangeToken.rangeHighlight;
    const classes = highlightClass ?? `${PREFIX}-range-highlighted`;
    const styleAttr = highlightStyle ? ` style="${highlightStyle}"` : '';
    return `<span class="${classes}"${styleAttr}>${html}</span>`;
  }

  return html;
}

/**
 * Render tokens to HTML string
 */
export function renderTokens(tokens: Token[], theme: Theme): string {
  return tokens.map((token) => renderToken(token, theme)).join('');
}

/**
 * Apply word highlighting to rendered HTML
 * Uses a manual parser to safely identify text nodes and replace words
 */
function applyWordHighlighting(html: string, words: string[]): string {
  if (words.length === 0) return html;
  
  // Create a set for O(1) lookup if words are simple, but we need partial matches?
  // Usually word highlighting is for exact matches of the search term.
  // The original implementation used regex with escaping, so it supported exact string match.
  
  let result = '';
  let i = 0;
  let inTag = false;
  
  while (i < html.length) {
    const char = html[i];
    
    if (char === '<') {
      inTag = true;
      result += char;
      i++;
      continue;
    }
    
    if (char === '>') {
      inTag = false;
      result += char;
      i++;
      continue;
    }
    
    if (inTag) {
      result += char;
      i++;
      continue;
    }
    
    // We are in text content. Check for matches.
    let matched = false;
    for (const word of words) {
      // Check if word matches at this position
      // Note: html is already escaped. So "word" needs to be escaped to match?
      // Yes, the input 'words' are plain text. The HTML has '&lt;'.
      // If we search for '<', we should search for '&lt;'.
      // But typically highlightWords are user identifiers.
      // Let's assume we match against the *raw* value?
      // No, we are modifying HTML. We must match against escaped value.
      const escapedWord = escapeHtml(word);
      
      if (html.startsWith(escapedWord, i)) {
        result += `<span class="${PREFIX}-word-highlighted">${escapedWord}</span>`;
        i += escapedWord.length;
        matched = true;
        break;
      }
    }
    
    if (!matched) {
      result += char;
      i++;
    }
  }
  
  return result;
}

/**
 * Render line number
 */
function renderLineNumber(number: number, isActive: boolean): string {
  const classes = classnames(
    `${PREFIX}-line-number`,
    isActive && `${PREFIX}-line-number--active`
  );
  return `<span class="${classes}">${number}</span>`;
}

/**
 * Render diff marker
 */
function renderDiffMarker(type: 'added' | 'removed' | 'modified'): string {
  const markers = { added: '+', removed: '-', modified: '~' };
  return `<span class="${PREFIX}-diff-marker">${markers[type]}</span>`;
}

/**
 * Split tokens based on ranges
 */
function applyRangeHighlightsToTokens(tokens: Token[], ranges: HighlightRange[]): Token[] {
  if (!ranges || ranges.length === 0) return tokens;
  
  let result: Token[] = [...tokens];
  
  for (const range of ranges) {
    const newResult: Token[] = [];
    
    for (const token of result) {
      // Intersection check
      const tokenStart = token.start;
      const tokenEnd = token.end;
      const rangeStart = range.start;
      const rangeEnd = range.end;
      
      // If no overlap
      if (tokenEnd <= rangeStart || tokenStart >= rangeEnd) {
        newResult.push(token);
        continue;
      }
      
      // Calculate overlap
      const overlapStart = Math.max(tokenStart, rangeStart);
      const overlapEnd = Math.min(tokenEnd, rangeEnd);
      
      // Split
      // Part before
      if (overlapStart > tokenStart) {
        newResult.push({
          ...token,
          end: overlapStart,
          value: token.value.slice(0, overlapStart - tokenStart)
        });
      }
      
      // Overlap part
      const overlappingToken: RenderableToken = {
        ...token,
        start: overlapStart,
        end: overlapEnd,
        value: token.value.slice(overlapStart - tokenStart, overlapEnd - tokenStart),
        rangeHighlight: range
      };
      newResult.push(overlappingToken);
      
      // Part after
      if (overlapEnd < tokenEnd) {
        newResult.push({
          ...token,
          start: overlapEnd,
          value: token.value.slice(overlapEnd - tokenStart)
        });
      }
    }
    result = newResult;
  }
  
  return result;
}

/**
 * Render a single line
 */
export function renderLine(line: LineData, options: RenderOptions): string {
  const classes: string[] = [...line.classes];
  let diffMarker = '';

  // Check diff status
  if (options.diffLines) {
    if (options.diffLines.added.includes(line.number)) {
      classes.push(`${PREFIX}-line-diff-added`);
      diffMarker = renderDiffMarker('added');
    } else if (options.diffLines.removed.includes(line.number)) {
      classes.push(`${PREFIX}-line-diff-removed`);
      diffMarker = renderDiffMarker('removed');
    } else if (options.diffLines.modified.includes(line.number)) {
      classes.push(`${PREFIX}-line-diff-modified`);
      diffMarker = renderDiffMarker('modified');
    }
  }

  // Check highlight status
  if (options.highlightLines?.includes(line.number)) {
    classes.push(`${PREFIX}-line-highlighted`);
  }

  // Check focus status
  if (options.focusLines && options.focusLines.length > 0) {
    if (options.focusLines.includes(line.number)) {
      classes.push(`${PREFIX}-line-focused`);
    } else {
      classes.push(`${PREFIX}-line-dimmed`);
    }
  }

  // Apply range highlighting logic to tokens
  let tokensToRender = line.tokens;
  if (options.highlightRanges) {
    const lineRanges = options.highlightRanges.filter((r) => r.line === line.number);
    if (lineRanges.length > 0) {
      tokensToRender = applyRangeHighlightsToTokens(line.tokens, lineRanges);
    }
  }

  // Build line content
  let content = renderTokens(tokensToRender, options.theme);

  // Apply word highlighting
  if (options.highlightWords && options.highlightWords.length > 0) {
    content = applyWordHighlighting(content, options.highlightWords);
  }

  // Build line number if needed
  const lineNumberStart = options.startLine ?? 1;
  const displayNumber = line.number - 1 + lineNumberStart;
  const lineNumber = options.lineNumbers
    ? renderLineNumber(displayNumber, options.focusLines?.includes(line.number) ?? false)
    : '';

  // Build attributes string
  const attrs = Object.entries(line.attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const attrString = attrs ? ` ${attrs}` : '';

  return `<span class="${classes.join(' ')}"${attrString}>${diffMarker}${lineNumber}<span class="${PREFIX}-line-content">${content || ' '}</span></span>`;
}

/**
 * Render header with filename and/or copy button
 */
function renderHeader(options: RenderOptions): string {
  const parts: string[] = [];

  if (options.filename) {
    parts.push(`<span class="${PREFIX}-filename">${escapeHtml(options.filename)}</span>`);
  }

  if (options.showLanguageBadge && options.language) {
    const displayName = getLanguageDisplayName(options.language);
    parts.push(`<span class="${PREFIX}-language-badge">${displayName}</span>`);
  }

  if (options.copyButton) {
    parts.push(
      `<button class="${PREFIX}-copy-button" type="button">` +
      `<span class="${PREFIX}-copy-icon">` +
      `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">` +
      `<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>` +
      `<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>` +
      `</svg>` +
      `</span>` +
      `<span class="${PREFIX}-copy-text">Copy</span>` +
      `</button>`
    );
  }

  if (parts.length === 0) {
    return '';
  }

  return `<div class="${PREFIX}-header">${parts.join('')}</div>`;
}

/**
 * Get display name for a language
 */
function getLanguageDisplayName(language: string): string {
  const displayNames: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    jsx: 'JSX',
    tsx: 'TSX',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    markdown: 'Markdown',
    python: 'Python',
    java: 'Java',
    c: 'C',
    cpp: 'C++',
    csharp: 'C#',
    go: 'Go',
    rust: 'Rust',
    ruby: 'Ruby',
    php: 'PHP',
    swift: 'Swift',
    kotlin: 'Kotlin',
    yaml: 'YAML',
    toml: 'TOML',
    xml: 'XML',
    graphql: 'GraphQL',
    sql: 'SQL',
    bash: 'Bash',
    powershell: 'PowerShell',
    dockerfile: 'Dockerfile',
  };

  return displayNames[language] ?? language.charAt(0).toUpperCase() + language.slice(1);
}

/**
 * Render complete code block
 */
export function render(lines: LineData[], options: RenderOptions): string {
  const header = renderHeader(options);
  const codeLines = lines.map((line) => renderLine(line, options)).join('');

  const wrapperClasses = classnames(
    `${PREFIX}-codeblock`,
    options.wrapLines && `${PREFIX}-wrap`,
    options.collapsible && `${PREFIX}-collapsible`,
    options.defaultCollapsed && `${PREFIX}-collapsed`
  );

  let style = '';
  const styles: string[] = [];

  styles.push(`background:${options.theme.colors.background}`);
  styles.push(`color:${options.theme.colors.foreground}`);

  if (options.maxHeight) {
    styles.push(`max-height:${options.maxHeight}`);
    styles.push('overflow-y:auto');
  }

  if (options.theme.fonts?.family) {
    styles.push(`font-family:${options.theme.fonts.family}`);
  }

  if (options.theme.fonts?.size) {
    styles.push(`font-size:${options.theme.fonts.size}`);
  }

  if (options.theme.fonts?.lineHeight) {
    styles.push(`line-height:${options.theme.fonts.lineHeight}`);
  }

  if (options.theme.spacing?.padding) {
    styles.push(`padding:${options.theme.spacing.padding}`);
  }

  if (options.theme.borders?.radius) {
    styles.push(`border-radius:${options.theme.borders.radius}`);
  }

  style = styles.join(';');

  let collapseButton = '';
  if (options.collapsible) {
    collapseButton = `<button class="${PREFIX}-collapse-toggle" type="button">${options.defaultCollapsed ? '▶' : '▼'}</button>`;
  }

  return (
    `<pre class="${wrapperClasses}" style="${style}">` +
    header +
    collapseButton +
    `<code class="${PREFIX}-code">${codeLines}</code>` +
    `</pre>`
  );
}