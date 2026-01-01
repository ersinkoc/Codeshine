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
import { darkThemes, githubDark, vscodeDark, monokai, dracula, oneDark, nord, tokyoNight, catppuccinMocha } from './dark/index.js';
import { lightThemes, githubLight, vscodeLight, oneLight, catppuccinLatte, solarizedLight } from './light/index.js';
import { specialThemes, highContrastDark, highContrastLight } from './special/index.js';

/**
 * All themes combined
 */
export const allThemes = [
  ...darkThemes,
  ...lightThemes,
  ...specialThemes,
];

/**
 * Themes object for easy access
 */
export const themes = {
  // Dark
  vsDark: vscodeDark,
  vsLight: vscodeLight,
  github: githubDark,
  githubDark,
  githubLight,
  dracula,
  oneDark,
  oneLight,
  nord,
  tokyoNight,
  nightOwl: tokyoNight, // alias
  synthwave: dracula, // alias for now
  monokai,
  catppuccinMocha,
  catppuccinLatte,
  solarizedLight,
  highContrastDark,
  highContrastLight,
} as const;

export default allThemes;
