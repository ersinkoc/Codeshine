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

  if (color) {
    return `<span class="${className}" style="color:${color}">${escapedValue}</span>`;
  }

  return `<span class="${className}">${escapedValue}</span>`;
}

/**
 * Render tokens to HTML string
 */
export function renderTokens(tokens: Token[], theme: Theme): string {
  return tokens.map((token) => renderToken(token, theme)).join('');
}

/**
 * Apply word highlighting to rendered HTML
 */
function applyWordHighlighting(html: string, words: string[]): string {
  if (words.length === 0) return html;

  let result = html;
  for (const word of words) {
    const escapedWord = escapeHtml(word);
    const regex = new RegExp(`(?<=>)([^<]*)(${escapedWord})([^<]*)(?=<)`, 'g');
    result = result.replace(regex, (_, before, match, after) => {
      return `>${before}<span class="${PREFIX}-word-highlighted">${match}</span>${after}<`;
    });
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

  // Build line content
  let content = renderTokens(line.tokens, options.theme);

  // Apply word highlighting
  if (options.highlightWords && options.highlightWords.length > 0) {
    content = applyWordHighlighting(content, options.highlightWords);
  }

  // Apply range highlighting
  if (options.highlightRanges) {
    const lineRanges = options.highlightRanges.filter((r) => r.line === line.number);
    for (const range of lineRanges) {
      content = applyRangeHighlight(content, line.content, range);
    }
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
 * Apply range highlighting to content
 */
function applyRangeHighlight(
  html: string,
  plainContent: string,
  range: HighlightRange
): string {
  // This is a simplified implementation
  // A full implementation would need to track positions through HTML
  const _rangeClass = range.className ?? `${PREFIX}-range-highlighted`;
  const _rangeStyle = range.style ? ` style="${range.style}"` : '';

  // For now, return as-is if range is out of bounds
  if (range.start < 0 || range.end > plainContent.length) {
    return html;
  }

  // TODO: Implement proper range highlighting through HTML
  void _rangeClass;
  void _rangeStyle;

  return html;
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
  const codeLines = lines.map((line) => renderLine(line, options)).join('\n');

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
