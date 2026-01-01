/**
 * Main highlight function for Codeshine
 */

import type { HighlightOptions, Theme, DiffLines } from './types.js';
import { tokenize } from './tokenizer.js';
import { parseTokensToLines } from './parser.js';
import { render } from './renderer.js';
import { toRenderOptions } from '../renderers/types.js';
import { parseLineRanges } from '../utils/range-parser.js';
import { getLanguage, registerLanguage as regLang, tier1Languages } from '../languages/index.js';
import { getTheme, registerTheme as regTheme, githubDark, allThemes } from '../themes/index.js';
import type { LanguageDefinition } from '../languages/types.js';

// Register tier1 languages by default
let initialized = false;

function ensureInitialized(): void {
  if (initialized) return;
  initialized = true;

  // Register tier 1 languages
  for (const lang of tier1Languages) {
    regLang(lang);
  }

  // Register all themes
  for (const theme of allThemes) {
    regTheme(theme);
  }
}

/**
 * Resolve theme from string or Theme object
 */
function resolveTheme(theme: string | Theme | undefined): Theme {
  if (!theme) {
    return githubDark;
  }

  if (typeof theme === 'string') {
    const resolved = getTheme(theme);
    if (resolved) {
      return resolved;
    }
    return githubDark;
  }

  return theme;
}

/**
 * Resolve language from string
 */
function resolveLanguage(language: string | undefined): LanguageDefinition | undefined {
  if (!language) {
    return undefined;
  }
  return getLanguage(language);
}

/**
 * Parse diff lines configuration
 */
function parseDiffLines(diff: DiffLines | undefined): {
  added: number[];
  removed: number[];
  modified: number[];
} {
  return {
    added: parseLineRanges(diff?.added),
    removed: parseLineRanges(diff?.removed),
    modified: parseLineRanges(diff?.modified),
  };
}

/**
 * Main highlight function
 */
export function highlight(code: string, options: HighlightOptions = {}): string {
  ensureInitialized();

  // Resolve theme
  const theme = resolveTheme(options.theme);

  // Resolve language
  const language = resolveLanguage(options.language);
  if (!language) {
    // Return plain text with basic formatting
    return renderPlainText(code, theme, options);
  }

  // Tokenize
  const tokens = tokenize(code, language);

  // Parse to lines
  const lines = parseTokensToLines(tokens);

  // Parse line ranges
  const parsedLines = {
    highlight: parseLineRanges(options.highlightLines),
    focus: parseLineRanges(options.focusLines),
    diff: parseDiffLines(options.diffLines),
  };

  // Convert to render options
  const renderOptions = toRenderOptions(options, theme, parsedLines);

  // Render
  return render(lines, renderOptions);
}

/**
 * Render plain text when no language is specified
 */
function renderPlainText(code: string, theme: Theme, options: HighlightOptions): string {
  const lines = code.split('\n').map((content, index) => ({
    number: index + 1,
    content,
    tokens: [
      {
        type: 'plain' as const,
        value: content,
        start: 0,
        end: content.length,
        line: index + 1,
      },
    ],
    attributes: {},
    classes: ['cs-line'],
  }));

  const parsedLines = {
    highlight: parseLineRanges(options.highlightLines),
    focus: parseLineRanges(options.focusLines),
    diff: parseDiffLines(options.diffLines),
  };

  const renderOptions = toRenderOptions(options, theme, parsedLines);

  return render(lines, renderOptions);
}

/**
 * Highlight with async support (for Web Workers)
 */
export async function highlightAsync(
  code: string,
  options: HighlightOptions = {}
): Promise<string> {
  return new Promise((resolve) => {
    // In a real implementation, this could use a Web Worker
    resolve(highlight(code, options));
  });
}

export { resolveTheme, resolveLanguage };
