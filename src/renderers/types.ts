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
  lineNumbers?: boolean | undefined;
  startLine?: number | undefined;
  highlightLines?: number[];
  focusLines?: number[];
  diffLines?: {
    added: number[];
    removed: number[];
    modified: number[];
  };
  highlightWords?: string[] | undefined;
  highlightRanges?: import('../core/types.js').HighlightRange[] | undefined;
  showLanguageBadge?: boolean | undefined;
  language?: string | undefined;
  copyButton?: boolean | undefined;
  filename?: string | undefined;
  wrapLines?: boolean | undefined;
  maxHeight?: string | undefined;
  collapsible?: boolean | undefined;
  defaultCollapsed?: boolean | undefined;
  tabSize?: number | undefined;
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
