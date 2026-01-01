/**
 * Language registry for Codeshine
 */

import type { LanguageDefinition, LanguageRegistry } from './types.js';

/**
 * Create a new language registry
 */
export function createLanguageRegistry(): LanguageRegistry {
  const languages = new Map<string, LanguageDefinition>();
  const aliasMap = new Map<string, string>();

  return {
    register(language: LanguageDefinition): void {
      languages.set(language.name, language);

      // Register aliases
      if (language.aliases) {
        for (const alias of language.aliases) {
          aliasMap.set(alias, language.name);
        }
      }
    },

    get(name: string): LanguageDefinition | undefined {
      return languages.get(name);
    },

    has(name: string): boolean {
      return languages.has(name) || aliasMap.has(name);
    },

    getAll(): LanguageDefinition[] {
      return [...languages.values()];
    },

    getNames(): string[] {
      return [...languages.keys()];
    },

    resolve(nameOrAlias: string): LanguageDefinition | undefined {
      const directMatch = languages.get(nameOrAlias);
      if (directMatch) {
        return directMatch;
      }

      const resolvedName = aliasMap.get(nameOrAlias);
      if (resolvedName) {
        return languages.get(resolvedName);
      }

      // Try case-insensitive match
      const lowerName = nameOrAlias.toLowerCase();
      for (const [name, lang] of languages) {
        if (name.toLowerCase() === lowerName) {
          return lang;
        }
      }

      for (const [alias, name] of aliasMap) {
        if (alias.toLowerCase() === lowerName) {
          return languages.get(name);
        }
      }

      return undefined;
    },
  };
}

/**
 * Global language registry instance
 */
export const globalLanguageRegistry = createLanguageRegistry();

/**
 * Register a language in the global registry
 */
export function registerLanguage(language: LanguageDefinition): void {
  globalLanguageRegistry.register(language);
}

/**
 * Get a language from the global registry
 */
export function getLanguage(name: string): LanguageDefinition | undefined {
  return globalLanguageRegistry.resolve(name);
}

/**
 * Check if a language exists in the global registry
 */
export function hasLanguage(name: string): boolean {
  return globalLanguageRegistry.has(name);
}

/**
 * Get all registered language names
 */
export function getLanguageNames(): string[] {
  return globalLanguageRegistry.getNames();
}
