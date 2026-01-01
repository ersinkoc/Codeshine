/**
 * Codeshine - The ultimate syntax highlighter
 * Beautiful code, zero compromises
 *
 * @package @oxog/codeshine
 * @author Ersin Koc
 * @license MIT
 */

// Core types
export type {
  Token,
  TokenType,
  TokenizerState,
  TokenizeResult,
  LineData,
  Transformer,
  HighlightOptions,
  Theme,
  ThemeColors,
  TokenColors,
  ThemeFonts,
  ThemeSpacing,
  ThemeBorders,
  LineRange,
  DiffLines,
  HighlightRange,
  StreamOptions,
  DetectionResult,
  CodeshineOptions,
  CodeshinePlugin,
  CodeshineInstance,
} from './core/types.js';

// Language types
export type {
  LanguageDefinition,
  TokenPattern,
  StringDefinition,
  CommentDefinition,
  BracketPair,
  EmbeddedLanguage,
} from './languages/types.js';

// Main highlight function
export { highlight, highlightAsync } from './core/highlighter.js';

// Codeshine class
export { Codeshine } from './core/engine.js';

// Tokenizer
export { tokenize, tokenizeLine, getTokensByLine, createDefaultState } from './core/tokenizer.js';

// Parser
export {
  parseTokensToLines,
  getLineContent,
  getLineTokens,
  countLines,
  splitLines,
  mergeAdjacentTokens,
  filterTokensByType,
  findTokensByValue,
  getTokenAtPosition,
} from './core/parser.js';

// Renderer
export { render, renderLine, renderToken, renderTokens, getTokenClass } from './core/renderer.js';

// Detector
export { detectLanguage } from './core/detector.js';

// Streaming
export { highlightStream, highlightWithProgress, createStreamingHighlighter } from './core/streaming.js';

// Languages
export {
  defineLang,
  extendLang,
  registerLanguage,
  getLanguage,
  hasLanguage,
  getLanguageNames,
  allLanguages,
  tier1Languages,
  tier2Languages,
  tier3Languages,
  tier4Languages,
  tier5Languages,
} from './languages/index.js';

// Themes
export {
  defineTheme,
  extendTheme,
  registerTheme,
  getTheme,
  hasTheme,
  getThemeNames,
  generateCSSVars,
  generateCSSString,
  injectThemeStyles,
  removeThemeStyles,
  allThemes,
  darkThemes,
  lightThemes,
  specialThemes,
  themes,
  githubDark,
  githubLight,
  vscodeDark,
  vscodeLight,
  monokai,
  dracula,
  oneDark,
  oneLight,
  nord,
  tokyoNight,
  catppuccinMocha,
  catppuccinLatte,
  solarizedLight,
  highContrastDark,
  highContrastLight,
} from './themes/index.js';

// Plugins
export {
  createPluginRegistry,
  registerPlugin,
  getPlugin,
  hasPlugin,
  getPluginNames,
  createTransformerPipeline,
  lineLinksTransformer,
  removeCommentsTransformer,
  normalizeWhitespaceTransformer,
  trimTrailingWhitespaceTransformer,
} from './plugins/index.js';

// Utils
export {
  escapeHtml,
  unescapeHtml,
  escapeRegExp,
  deepMerge,
  mergeWithDefaults,
  hash,
  hashHex,
  contentId,
  parseRangeString,
  parseLineRange,
  parseLineRanges,
  isLineInRanges,
  toRangeString,
  classnames,
  bemClass,
} from './utils/index.js';

// Default export
export { Codeshine as default } from './core/engine.js';
