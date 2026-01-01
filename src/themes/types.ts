/**
 * Theme types for Codeshine
 */

export type {
  Theme,
  ThemeColors,
  TokenColors,
  ThemeFonts,
  ThemeSpacing,
  ThemeBorders,
} from '../core/types.js';

/**
 * Theme registry interface
 */
export interface ThemeRegistry {
  register(theme: import('../core/types.js').Theme): void;
  get(name: string): import('../core/types.js').Theme | undefined;
  has(name: string): boolean;
  getAll(): import('../core/types.js').Theme[];
  getNames(): string[];
}

/**
 * CSS variables map
 */
export type CSSVariables = Record<string, string>;

/**
 * Theme injection options
 */
export interface ThemeInjectionOptions {
  scope?: string;
  id?: string;
}
