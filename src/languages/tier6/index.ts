/**
 * Tier 6 languages - Additional languages
 */

// CSS Preprocessors
export { scss } from './scss.js';
export { less } from './less.js';

// Template languages
export { vue } from './vue.js';
export { svelte } from './svelte.js';
export { handlebars } from './handlebars.js';
export { ejs } from './ejs.js';
export { pug } from './pug.js';
export { twig } from './twig.js';
export { liquid } from './liquid.js';
export { nunjucks } from './nunjucks.js';

// Build/Config languages
export { makefile } from './makefile.js';
export { terraform } from './terraform.js';
export { cmake } from './cmake.js';
export { gradle } from './gradle.js';
export { ansible } from './ansible.js';
export { docker } from './docker.js';

// Shell languages
export { batch } from './batch.js';

// JVM languages
export { groovy } from './groovy.js';

// Functional languages
export { ocaml } from './ocaml.js';
export { erlang } from './erlang.js';
export { elm } from './elm.js';
export { purescript } from './purescript.js';
export { reasonml } from './reasonml.js';
export { rescript } from './rescript.js';

// Scientific languages
export { julia } from './julia.js';
export { matlab } from './matlab.js';
export { fortran } from './fortran.js';
export { cobol } from './cobol.js';

// Systems languages
export { ada } from './ada.js';
export { pascal } from './pascal.js';
export { d } from './d.js';
export { crystal } from './crystal.js';

// Hardware languages
export { verilog } from './verilog.js';

// Lisp family
export { scheme } from './scheme.js';
export { commonlisp } from './commonlisp.js';

// Data formats
export { protobuf } from './protobuf.js';

// Misc languages
export { coffeescript } from './coffeescript.js';

import { scss } from './scss.js';
import { less } from './less.js';
import { vue } from './vue.js';
import { svelte } from './svelte.js';
import { handlebars } from './handlebars.js';
import { ejs } from './ejs.js';
import { pug } from './pug.js';
import { twig } from './twig.js';
import { liquid } from './liquid.js';
import { nunjucks } from './nunjucks.js';
import { makefile } from './makefile.js';
import { terraform } from './terraform.js';
import { cmake } from './cmake.js';
import { gradle } from './gradle.js';
import { ansible } from './ansible.js';
import { docker } from './docker.js';
import { batch } from './batch.js';
import { groovy } from './groovy.js';
import { ocaml } from './ocaml.js';
import { erlang } from './erlang.js';
import { elm } from './elm.js';
import { purescript } from './purescript.js';
import { reasonml } from './reasonml.js';
import { rescript } from './rescript.js';
import { julia } from './julia.js';
import { matlab } from './matlab.js';
import { fortran } from './fortran.js';
import { cobol } from './cobol.js';
import { ada } from './ada.js';
import { pascal } from './pascal.js';
import { d } from './d.js';
import { crystal } from './crystal.js';
import { verilog } from './verilog.js';
import { scheme } from './scheme.js';
import { commonlisp } from './commonlisp.js';
import { protobuf } from './protobuf.js';
import { coffeescript } from './coffeescript.js';
import { defineLang } from '../define-lang.js';

// Create minimal definitions for additional languages
const createMinimalLang = (name: string, aliases: string[] = [], extensions: string[] = [], comment = '//') =>
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
    comments: { line: comment },
    brackets: [
      { open: '{', close: '}' },
      { open: '[', close: ']' },
      { open: '(', close: ')' },
    ],
  });

// Emacs Lisp
export const emacs = createMinimalLang('emacs', ['elisp', 'emacs-lisp'], ['.el', '.elc'], ';');

// Database languages
export const plsql = createMinimalLang('plsql', ['oracle'], ['.pls', '.pck', '.pkb', '.pks'], '--');
export const tsql = createMinimalLang('tsql', ['mssql', 'sqlserver'], ['.sql'], '--');

// Markup languages
export const rst = createMinimalLang('rst', ['restructuredtext'], ['.rst', '.rest']);
export const asciidoc = createMinimalLang('asciidoc', ['adoc'], ['.adoc', '.asciidoc', '.asc']);
export const textile = createMinimalLang('textile', [], ['.textile']);
export const org = createMinimalLang('org', ['org-mode'], ['.org'], '#');

// Config files
export const editorconfig = createMinimalLang('editorconfig', [], ['.editorconfig'], '#');
export const gitignore = createMinimalLang('gitignore', ['gitattributes'], ['.gitignore', '.gitattributes'], '#');
export const hosts = createMinimalLang('hosts', [], ['hosts'], '#');
export const ssh = createMinimalLang('ssh', ['sshconfig'], ['ssh_config', 'sshd_config', 'config'], '#');

// Data formats
export const thrift = createMinimalLang('thrift', [], ['.thrift']);
export const avro = createMinimalLang('avro', ['avsc'], ['.avsc']);

/**
 * All Tier 6 languages
 */
export const tier6Languages = [
  // CSS Preprocessors
  scss,
  less,
  // Template languages
  vue,
  svelte,
  handlebars,
  ejs,
  pug,
  twig,
  liquid,
  nunjucks,
  // Build/Config
  makefile,
  terraform,
  cmake,
  gradle,
  ansible,
  docker,
  // Shell
  batch,
  // JVM
  groovy,
  // Functional
  ocaml,
  erlang,
  elm,
  purescript,
  reasonml,
  rescript,
  // Scientific
  julia,
  matlab,
  fortran,
  cobol,
  // Systems
  ada,
  pascal,
  d,
  crystal,
  // Hardware
  verilog,
  // Lisp family
  scheme,
  commonlisp,
  emacs,
  // Database
  plsql,
  tsql,
  // Markup
  rst,
  asciidoc,
  textile,
  org,
  // Config
  editorconfig,
  gitignore,
  hosts,
  ssh,
  // Data formats
  protobuf,
  thrift,
  avro,
  // Misc
  coffeescript,
];

export default tier6Languages;
