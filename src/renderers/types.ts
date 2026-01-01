/**
 * Renderer types for Codeshine
 */

import type { Token, Theme, HighlightOptions, LineData } from '../core/types.js';

/**
 * Renderer interface
 */
export interface Renderer {
  render(tokens: Token[], options: RenderOptions): string;
  renderLine(line: LineData, options: RenderOptions): string;
  renderToken(token: Token, theme: Theme): string;
}

/**
 * Render options
 */
export interface RenderOptions {
  theme: Theme;
  lineNumbers?: boolean;
  startLine?: number;
  highlightLines?: number[];
  focusLines?: number[];
  diffLines?: {
    added: number[];
    removed: number[];
    modified: number[];
  };
  highlightWords?: string[];
  highlightRanges?: import('../core/types.js').HighlightRange[];
  showLanguageBadge?: boolean;
  language?: string;
  copyButton?: boolean;
  filename?: string;
  wrapLines?: boolean;
  maxHeight?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  tabSize?: number;
}

/**
 * HTML builder options
 */
export interface HTMLBuilderOptions {
  indent?: number;
  minify?: boolean;
}

/**
 * Convert highlight options to render options
 */
export function toRenderOptions(
  options: HighlightOptions,
  theme: Theme,
  parsedLines: {
    highlight: number[];
    focus: number[];
    diff: { added: number[]; removed: number[]; modified: number[] };
  }
): RenderOptions {
  return {
    theme,
    lineNumbers: options.lineNumbers,
    startLine: options.startLine,
    highlightLines: parsedLines.highlight,
    focusLines: parsedLines.focus,
    diffLines: parsedLines.diff,
    highlightWords: options.highlightWords,
    highlightRanges: options.highlightRanges,
    showLanguageBadge: options.showLanguageBadge,
    language: options.language,
    copyButton: options.copyButton,
    filename: options.filename,
    wrapLines: options.wrapLines,
    maxHeight: options.maxHeight,
    collapsible: options.collapsible,
    defaultCollapsed: options.defaultCollapsed,
    tabSize: options.tabSize,
  };
}
