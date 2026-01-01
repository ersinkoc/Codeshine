/**
 * All languages export
 */

// Types
export type { LanguageDefinition, TokenPattern, StringDefinition, CommentDefinition, BracketPair, EmbeddedLanguage, LanguageRegistry } from './types.js';

// Helpers
export { defineLang, extendLang } from './define-lang.js';

// Registry
export { createLanguageRegistry, globalLanguageRegistry, registerLanguage, getLanguage, hasLanguage, getLanguageNames } from './registry.js';

// Tier 1 - Core languages (bundled)
export { javascript, typescript, jsx, tsx, html, css, json, markdown, tier1Languages } from './tier1/index.js';

// Tier 2 - Popular languages
export { python, java, c, cpp, csharp, go, rust, ruby, php, swift, kotlin, tier2Languages } from './tier2/index.js';

// Tier 3 - Web/Config languages
export { yaml, toml, xml, graphql, sql, bash, powershell, tier3Languages } from './tier3/index.js';

// Tier 4 - Data/Query languages
export { json5, csv, regex, diff, tier4Languages } from './tier4/index.js';

// Tier 5 - Extended languages
export { lua, dockerfile, perl, r, scala, haskell, elixir, clojure, fsharp, dart, objectivec, assembly, wasm, nginx, apache, dotenv, ini, prisma, solidity, move, latex, glsl, hlsl, zig, nim, vlang, odin, tier5Languages } from './tier5/index.js';

// Combined exports
import { tier1Languages } from './tier1/index.js';
import { tier2Languages } from './tier2/index.js';
import { tier3Languages } from './tier3/index.js';
import { tier4Languages } from './tier4/index.js';
import { tier5Languages } from './tier5/index.js';

/**
 * All languages combined
 */
export const allLanguages = [
  ...tier1Languages,
  ...tier2Languages,
  ...tier3Languages,
  ...tier4Languages,
  ...tier5Languages,
];

export default allLanguages;
