/**
 * Language definition helper
 */

import type { LanguageDefinition } from './types.js';

/**
 * Define a language with validation
 */
export function defineLang(definition: LanguageDefinition): LanguageDefinition {
  // Validate required fields
  if (!definition.name) {
    throw new Error('Language definition must have a name');
  }

  if (!definition.patterns || !Array.isArray(definition.patterns)) {
    throw new Error('Language definition must have patterns array');
  }

  // Validate patterns have required fields
  for (const pattern of definition.patterns) {
    if (!pattern.pattern || !(pattern.pattern instanceof RegExp)) {
      throw new Error('Each pattern must have a RegExp pattern');
    }
    if (!pattern.type) {
      throw new Error('Each pattern must have a type');
    }
  }

  // Return frozen definition to prevent mutations
  return Object.freeze({
    ...definition,
    patterns: Object.freeze(definition.patterns.map((p) => Object.freeze(p))),
    keywords: definition.keywords ? Object.freeze([...definition.keywords]) : undefined,
    typeKeywords: definition.typeKeywords
      ? Object.freeze([...definition.typeKeywords])
      : undefined,
    constants: definition.constants ? Object.freeze([...definition.constants]) : undefined,
    aliases: definition.aliases ? Object.freeze([...definition.aliases]) : undefined,
    extensions: definition.extensions ? Object.freeze([...definition.extensions]) : undefined,
    mimeTypes: definition.mimeTypes ? Object.freeze([...definition.mimeTypes]) : undefined,
  }) as LanguageDefinition;
}

/**
 * Extend an existing language definition
 */
export function extendLang(
  base: LanguageDefinition,
  overrides: Partial<LanguageDefinition> & { name: string }
): LanguageDefinition {
  const extended: LanguageDefinition = {
    ...base,
    ...overrides,
    patterns: [...(base.patterns ?? []), ...(overrides.patterns ?? [])],
    keywords: [...(base.keywords ?? []), ...(overrides.keywords ?? [])],
    typeKeywords: [...(base.typeKeywords ?? []), ...(overrides.typeKeywords ?? [])],
    constants: [...(base.constants ?? []), ...(overrides.constants ?? [])],
  };

  return defineLang(extended);
}
