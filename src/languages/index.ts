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

// Tier 6 - Additional languages
export { scss, less, vue, svelte, handlebars, ejs, pug, twig, liquid, nunjucks, makefile, terraform, cmake, gradle, ansible, docker, batch, groovy, ocaml, erlang, elm, purescript, reasonml, rescript, julia, matlab, fortran, cobol, ada, pascal, d, crystal, verilog, scheme, commonlisp, emacs, plsql, tsql, rst, asciidoc, textile, org, editorconfig, gitignore, hosts, ssh, protobuf, thrift, avro, coffeescript, tier6Languages } from './tier6/index.js';

// Tier 7 - Specialized/Niche languages
export { fish, zsh, tcsh, ksh, tcl, awk, sed, mongodb, redis, cassandra, sparql, hiveql, xpath, xquery, jq, vhdl, systemverilog, arm, mips, nasm, gdscript, unrealscript, angelscript, stylus, sass, postcss, jsonnet, hcl, cue, dhall, hocon, sas, stata, maxima, basic, foxpro, clipper, brainfuck, befunge, whitespace, applescript, autohotkey, autoit, tier7Languages } from './tier7/index.js';

// Combined exports
import { tier1Languages } from './tier1/index.js';
import { tier2Languages } from './tier2/index.js';
import { tier3Languages } from './tier3/index.js';
import { tier4Languages } from './tier4/index.js';
import { tier5Languages } from './tier5/index.js';
import { tier6Languages } from './tier6/index.js';
import { tier7Languages } from './tier7/index.js';

/**
 * All languages combined
 */
export const allLanguages = [
  ...tier1Languages,
  ...tier2Languages,
  ...tier3Languages,
  ...tier4Languages,
  ...tier5Languages,
  ...tier6Languages,
  ...tier7Languages,
];

export default allLanguages;
