/**
 * Language definition types for Codeshine
 */

import type { TokenType } from '../core/types.js';

/**
 * Token pattern for matching syntax elements
 */
export interface TokenPattern {
  pattern: RegExp;
  type: TokenType;
  scopes?: string[];
  captures?: (TokenType | null)[];
}

/**
 * String definition for language strings
 */
export interface StringDefinition {
  start: string | RegExp;
  end: string | RegExp;
  escape?: string;
  multiline?: boolean;
  interpolation?: {
    start: string;
    end: string;
  };
}

/**
 * Comment definition for language comments
 */
export interface CommentDefinition {
  line?: string;
  block?: {
    start: string;
    end: string;
  };
}

/**
 * Bracket pair definition
 */
export interface BracketPair {
  open: string;
  close: string;
}

/**
 * Embedded language definition
 */
export interface EmbeddedLanguage {
  language: string;
  start: RegExp | string;
  end: RegExp | string;
}

/**
 * Complete language definition
 */
export interface LanguageDefinition {
  name: string;
  aliases?: string[];
  extensions?: string[];
  mimeTypes?: string[];

  // Token rules
  keywords?: string[];
  typeKeywords?: string[];
  constants?: string[];
  builtins?: string[];
  operators?: string[] | RegExp;

  // Patterns (order matters - first match wins)
  patterns: TokenPattern[];

  // Brackets for matching
  brackets?: BracketPair[];

  // String handling
  strings?: StringDefinition[];

  // Comment handling
  comments?: CommentDefinition;

  // Embedded languages
  embeddedLanguages?: EmbeddedLanguage[];
  embedded?: EmbeddedLanguage[];
}

/**
 * Language registry interface
 */
export interface LanguageRegistry {
  register(language: LanguageDefinition): void;
  get(name: string): LanguageDefinition | undefined;
  has(name: string): boolean;
  getAll(): LanguageDefinition[];
  getNames(): string[];
  resolve(nameOrAlias: string): LanguageDefinition | undefined;
}
