/**
 * React component types for Codeshine
 */

import type { ReactNode, CSSProperties } from 'react';
import type { HighlightOptions, Theme, LineRange, DiffLines, HighlightRange } from '../../core/types.js';

/**
 * CodeBlock component props
 */
export interface CodeBlockProps {
  // Required
  code: string;

  // Language
  language?: string | undefined;
  autoDetect?: boolean | undefined;

  // Theme
  theme?: string | Theme | undefined;

  // Line features
  lineNumbers?: boolean | undefined;
  startLine?: number | undefined;
  highlightLines?: LineRange[] | string | undefined;
  focusLines?: LineRange[] | string | undefined;
  diffLines?: DiffLines | undefined;

  // Word features
  highlightWords?: string[] | undefined;
  highlightRanges?: HighlightRange[] | undefined;

  // UI features
  showLanguageBadge?: boolean | undefined;
  copyButton?: boolean | undefined;
  filename?: string | undefined;
  wrapLines?: boolean | undefined;
  maxHeight?: string | undefined;
  collapsible?: boolean | undefined;
  defaultCollapsed?: boolean | undefined;

  // Events
  onCopy?: ((code: string) => void) | undefined;
  onLineClick?: ((line: number) => void) | undefined;

  // Styling
  className?: string | undefined;
  style?: CSSProperties | undefined;

  // Advanced
  tabSize?: number | undefined;
}

/**
 * ThemeProvider props
 */
export interface ThemeProviderProps {
  theme: string | Theme;
  children: ReactNode;
}

/**
 * Theme context value
 */
export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: string | Theme) => void;
  themes: string[];
  cssVars: Record<string, string>;
}

/**
 * useHighlight hook options
 */
export interface UseHighlightOptions extends Omit<HighlightOptions, 'theme'> {
  theme?: string | Theme | undefined;
}

/**
 * useHighlight hook result
 */
export interface UseHighlightResult {
  html: string;
  tokens: import('../../core/types.js').Token[];
  loading: boolean;
}

/**
 * useCopy hook result
 */
export interface UseCopyResult {
  copy: (text: string) => Promise<void>;
  copied: boolean;
  error: Error | null;
}
