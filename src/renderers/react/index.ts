/**
 * React renderer exports
 */

// Components
export { CodeBlock } from './CodeBlock.js';
export { ThemeProvider, ThemeContext } from './ThemeProvider.js';

// Hooks
export { useHighlight, useTheme, useCopy } from './hooks/index.js';

// Types
export type {
  CodeBlockProps,
  ThemeProviderProps,
  ThemeContextValue,
  UseHighlightOptions,
  UseHighlightResult,
  UseCopyResult,
} from './types.js';
