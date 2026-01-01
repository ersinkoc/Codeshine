/**
 * Tier 5 languages - Extended languages
 */

export { lua } from './lua.js';
export { dockerfile } from './dockerfile.js';

import { lua } from './lua.js';
import { dockerfile } from './dockerfile.js';
import { defineLang } from '../define-lang.js';

// Create minimal definitions for remaining languages
const createMinimalLang = (name: string, aliases: string[] = [], extensions: string[] = []) =>
  defineLang({
    name,
    aliases,
    extensions,
    keywords: [],
    patterns: [],
    strings: [
      { start: '"', end: '"', escape: '\\' },
      { start: "'", end: "'", escape: '\\' },
    ],
    comments: { line: '//' },
    brackets: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
    ],
  });

export const perl = createMinimalLang('perl', ['pl'], ['.pl', '.pm']);
export const r = createMinimalLang('r', ['R'], ['.r', '.R']);
export const scala = createMinimalLang('scala', [], ['.scala', '.sc']);
export const haskell = createMinimalLang('haskell', ['hs'], ['.hs', '.lhs']);
export const elixir = createMinimalLang('elixir', ['ex'], ['.ex', '.exs']);
export const clojure = createMinimalLang('clojure', ['clj'], ['.clj', '.cljs', '.cljc']);
export const fsharp = createMinimalLang('fsharp', ['fs'], ['.fs', '.fsi', '.fsx']);
export const dart = createMinimalLang('dart', [], ['.dart']);
export const objectivec = createMinimalLang('objectivec', ['objc', 'obj-c'], ['.m', '.mm']);
export const assembly = createMinimalLang('assembly', ['asm', 'nasm'], ['.asm', '.s']);
export const wasm = createMinimalLang('wasm', ['wat'], ['.wat', '.wasm']);
export const nginx = createMinimalLang('nginx', [], ['.conf']);
export const apache = createMinimalLang('apache', [], ['.htaccess']);
export const dotenv = createMinimalLang('dotenv', ['env'], ['.env']);
export const ini = createMinimalLang('ini', ['cfg', 'conf'], ['.ini', '.cfg']);
export const prisma = createMinimalLang('prisma', [], ['.prisma']);
export const solidity = createMinimalLang('solidity', ['sol'], ['.sol']);
export const move = createMinimalLang('move', [], ['.move']);
export const latex = createMinimalLang('latex', ['tex'], ['.tex', '.latex']);
export const glsl = createMinimalLang('glsl', [], ['.glsl', '.vert', '.frag']);
export const hlsl = createMinimalLang('hlsl', [], ['.hlsl', '.fx']);
export const zig = createMinimalLang('zig', [], ['.zig']);
export const nim = createMinimalLang('nim', [], ['.nim', '.nims']);
export const vlang = createMinimalLang('vlang', ['v'], ['.v']);
export const odin = createMinimalLang('odin', [], ['.odin']);

/**
 * All Tier 5 languages
 */
export const tier5Languages = [
  lua,
  dockerfile,
  perl,
  r,
  scala,
  haskell,
  elixir,
  clojure,
  fsharp,
  dart,
  objectivec,
  assembly,
  wasm,
  nginx,
  apache,
  dotenv,
  ini,
  prisma,
  solidity,
  move,
  latex,
  glsl,
  hlsl,
  zig,
  nim,
  vlang,
  odin,
];

export default tier5Languages;
