/**
 * Core type definitions for Codeshine
 */

/**
 * Token types for syntax highlighting
 */
export type TokenType =
  | 'keyword'
  | 'string'
  | 'number'
  | 'comment'
  | 'operator'
  | 'punctuation'
  | 'function'
  | 'variable'
  | 'class'
  | 'type'
  | 'constant'
  | 'property'
  | 'attribute'
  | 'tag'
  | 'regexp'
  | 'escape'
  | 'interpolation'
  | 'meta'
  | 'invalid'
  | 'plain';

/**
 * A single token in the token stream
 */
export interface Token {
  type: TokenType;
  value: string;
  start: number;
  end: number;
  line: number;
  scopes?: string[];
}

/**
 * Line range specification
 * Can be a single line number, a range string, or a tuple
 */
export type LineRange = number | string | [number, number];

/**
 * Diff lines configuration
 */
export interface DiffLines {
  added?: LineRange[];
  removed?: LineRange[];
  modified?: LineRange[];
}

/**
 * Range highlight specification
 */
export interface HighlightRange {
  line: number;
  start: number;
  end: number;
  className?: string;
  style?: string;
}

/**
 * Main highlight options
 */
export interface HighlightOptions {
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

  // Advanced
  tabSize?: number;
  transformers?: Transformer[];
}

/**
 * Theme definition
 */
export interface Theme {
  name: string;
  type: 'light' | 'dark';

  colors: ThemeColors;
  fonts?: ThemeFonts;
  spacing?: ThemeSpacing;
  borders?: ThemeBorders;
}

/**
 * Theme color configuration
 */
export interface ThemeColors {
  // Editor
  background: string;
  foreground: string;
  lineNumber: string;
  lineNumberActive: string;
  lineHighlight: string;
  selection: string;
  cursor: string;

  // Gutter
  gutterBackground: string;
  gutterBorder: string;

  // Diff
  diffAddedBackground: string;
  diffAddedText: string;
  diffRemovedBackground: string;
  diffRemovedText: string;
  diffModifiedBackground: string;
  diffModifiedText: string;

  // Focus mode
  focusDimmed: string;

  // Word highlight
  wordHighlight: string;

  // UI elements
  border: string;
  badgeBackground: string;
  badgeText: string;
  buttonBackground: string;
  buttonText: string;
  buttonHover: string;
  scrollbar: string;
  scrollbarHover: string;

  // Token colors
  tokens: TokenColors;
}

/**
 * Token color configuration
 */
export interface TokenColors {
  keyword: string;
  string: string;
  number: string;
  comment: string;
  operator: string;
  punctuation: string;
  function: string;
  variable: string;
  class: string;
  type: string;
  constant: string;
  property: string;
  attribute: string;
  tag: string;
  regexp: string;
  escape: string;
  interpolation: string;
  meta: string;
  invalid: string;
}

/**
 * Theme font configuration
 */
export interface ThemeFonts {
  family?: string;
  size?: string;
  lineHeight?: string | number;
  weight?: string | number;
}

/**
 * Theme spacing configuration
 */
export interface ThemeSpacing {
  padding?: string;
  lineNumberWidth?: string;
  gutterPadding?: string;
}

/**
 * Theme border configuration
 */
export interface ThemeBorders {
  radius?: string;
  width?: string;
}

/**
 * Tokenizer state for multi-line tokens
 */
export interface TokenizerState {
  inString?: boolean;
  stringDelimiter?: string;
  inComment?: boolean;
  commentType?: 'line' | 'block';
  inTemplate?: boolean;
  templateDepth?: number;
  inRegex?: boolean;
  embeddedLanguage?: string;
  bracketStack?: string[];
}

/**
 * Result of tokenizing a single line
 */
export interface TokenizeResult {
  tokens: Token[];
  state: TokenizerState;
}

/**
 * Line data for transformers
 */
export interface LineData {
  number: number;
  content: string;
  tokens: Token[];
  attributes: Record<string, string | number | boolean>;
  classes: string[];
}

/**
 * Transformer interface for modifying the highlight pipeline
 */
export interface Transformer {
  name: string;
  pre?(code: string): string;
  token?(token: Token): Token | Token[] | null;
  line?(line: LineData): LineData;
  post?(html: string): string;
}

/**
 * Stream options for large files
 */
export interface StreamOptions extends HighlightOptions {
  chunkSize?: number;
  onChunk?: (html: string, progress: number) => void;
}

/**
 * Language detection result
 */
export interface DetectionResult {
  language: string;
  confidence: number;
}

/**
 * Codeshine instance options
 */
export interface CodeshineOptions {
  theme?: string | Theme;
  defaultLanguage?: string;
  lineNumbers?: boolean;
  plugins?: CodeshinePlugin[];
  languages?: LanguageDefinition[];
  themes?: Theme[];
}

/**
 * Plugin interface
 */
export interface CodeshinePlugin {
  name: string;
  version?: string;

  onInit?(codeshine: CodeshineInstance): void;
  onBeforeHighlight?(
    code: string,
    options: HighlightOptions
  ): { code: string; options: HighlightOptions };
  onAfterTokenize?(tokens: Token[]): Token[];
  onBeforeRender?(tokens: Token[], options: HighlightOptions): Token[];
  onAfterRender?(html: string): string;

  languages?: LanguageDefinition[];
  themes?: Theme[];
  transformers?: Transformer[];
}

/**
 * Codeshine instance interface (for plugin type)
 */
export interface CodeshineInstance {
  highlight(code: string, options?: HighlightOptions): string;
  highlightAsync(code: string, options?: HighlightOptions): Promise<string>;
  highlightStream(
    code: string,
    options?: StreamOptions
  ): AsyncGenerator<string, void, unknown>;
  setTheme(theme: string | Theme): CodeshineInstance;
  setLanguage(language: string): CodeshineInstance;
  registerLanguage(language: LanguageDefinition): CodeshineInstance;
  registerTheme(theme: Theme): CodeshineInstance;
  use(plugin: CodeshinePlugin): CodeshineInstance;
  getLanguages(): string[];
  getThemes(): string[];
  getTheme(): Theme;
}

// Forward declaration for language definition
import type { LanguageDefinition } from '../languages/types.js';
export type { LanguageDefinition };
