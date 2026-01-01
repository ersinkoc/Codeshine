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
  language?: string;
  autoDetect?: boolean;

  // Theme
  theme?: string | Theme;

  // Line features
  lineNumbers?: boolean;
  startLine?: number;
  highlightLines?: LineRange[] | string;
  focusLines?: LineRange[] | string;
  diffLines?: DiffLines;

  // Word features
  highlightWords?: string[];
  highlightRanges?: HighlightRange[];

  // UI features
  showLanguageBadge?: boolean;
  copyButton?: boolean;
  filename?: string;
  wrapLines?: boolean;
  maxHeight?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;

  // Events
  onCopy?: (code: string) => void;
  onLineClick?: (line: number) => void;

  // Styling
  className?: string;
  style?: CSSProperties;

  // Advanced
  tabSize?: number;
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
  theme?: string | Theme;
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
