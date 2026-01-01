/**
 * All themes export
 */

// Types
export type {
  Theme,
  ThemeColors,
  TokenColors,
  ThemeFonts,
  ThemeSpacing,
  ThemeBorders,
  ThemeRegistry,
  CSSVariables,
  ThemeInjectionOptions,
} from './types.js';

// Helpers
export { defineTheme, extendTheme } from './define-theme.js';

// CSS Variables
export {
  generateCSSVars,
  generateCSSString,
  injectThemeStyles,
  removeThemeStyles,
} from './css-vars.js';

// Registry
export {
  createThemeRegistry,
  globalThemeRegistry,
  registerTheme,
  getTheme,
  hasTheme,
  getThemeNames,
} from './registry.js';

// Dark themes
export {
  githubDark,
  vscodeDark,
  monokai,
  dracula,
  oneDark,
  nord,
  tokyoNight,
  catppuccinMocha,
  darkThemes,
} from './dark/index.js';

// Light themes
export {
  githubLight,
  vscodeLight,
  oneLight,
  catppuccinLatte,
  solarizedLight,
  lightThemes,
} from './light/index.js';

// Special themes
export {
  highContrastDark,
  highContrastLight,
  specialThemes,
} from './special/index.js';

// Combined exports
import { darkThemes } from './dark/index.js';
import { lightThemes } from './light/index.js';
import { specialThemes } from './special/index.js';

/**
 * All themes combined
 */
export const allThemes = [
  ...darkThemes,
  ...lightThemes,
  ...specialThemes,
];

export default allThemes;
