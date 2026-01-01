/**
 * Theme registry for Codeshine
 */

import type { Theme } from './types.js';
import type { ThemeRegistry } from './types.js';

/**
 * Create a new theme registry
 */
export function createThemeRegistry(): ThemeRegistry {
  const themes = new Map<string, Theme>();

  return {
    register(theme: Theme): void {
      themes.set(theme.name, theme);
    },

    get(name: string): Theme | undefined {
      return themes.get(name);
    },

    has(name: string): boolean {
      return themes.has(name);
    },

    getAll(): Theme[] {
      return [...themes.values()];
    },

    getNames(): string[] {
      return [...themes.keys()];
    },
  };
}

/**
 * Global theme registry instance
 */
export const globalThemeRegistry = createThemeRegistry();

/**
 * Register a theme in the global registry
 */
export function registerTheme(theme: Theme): void {
  globalThemeRegistry.register(theme);
}

/**
 * Get a theme from the global registry
 */
export function getTheme(name: string): Theme | undefined {
  return globalThemeRegistry.get(name);
}

/**
 * Check if a theme exists in the global registry
 */
export function hasTheme(name: string): boolean {
  return globalThemeRegistry.has(name);
}

/**
 * Get all registered theme names
 */
export function getThemeNames(): string[] {
  return globalThemeRegistry.getNames();
}
