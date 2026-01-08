/**
 * OCaml language definition
 */
import { defineLang } from '../define-lang.js';

export const ocaml = defineLang({
  name: 'ocaml',
  aliases: ['ml'],
  extensions: ['.ml', '.mli', '.mll', '.mly'],
  keywords: [
    'and', 'as', 'assert', 'asr', 'begin', 'class', 'constraint', 'do', 'done',
    'downto', 'else', 'end', 'exception', 'external', 'for', 'fun', 'function',
    'functor', 'if', 'in', 'include', 'inherit', 'initializer', 'land', 'lazy',
    'let', 'lor', 'lsl', 'lsr', 'lxor', 'match', 'method', 'mod', 'module',
    'mutable', 'new', 'nonrec', 'object', 'of', 'open', 'or', 'private', 'rec',
    'sig', 'struct', 'then', 'to', 'try', 'type', 'val', 'virtual', 'when',
    'while', 'with',
  ],
  typeKeywords: [
    'int', 'float', 'bool', 'char', 'string', 'bytes', 'unit', 'exn', 'array',
    'list', 'option', 'ref', 'lazy_t', 'nativeint', 'int32', 'int64',
  ],
  constants: [
    'true', 'false', 'None', 'Some',
  ],
  builtins: [
    'print_string', 'print_endline', 'print_int', 'print_float', 'print_char', 'print_newline',
    'prerr_string', 'prerr_endline', 'prerr_int', 'prerr_float', 'prerr_char', 'prerr_newline',
    'read_line', 'read_int', 'read_float',
    'string_of_int', 'string_of_float', 'string_of_bool', 'int_of_string', 'float_of_string', 'bool_of_string',
    'int_of_char', 'char_of_int', 'int_of_float', 'float_of_int',
    'fst', 'snd', 'List', 'Array', 'String', 'Char', 'Bytes', 'Int32', 'Int64', 'Nativeint',
    'Hashtbl', 'Map', 'Set', 'Stack', 'Queue', 'Buffer', 'Printf', 'Scanf', 'Format',
    'Lazy', 'Stream', 'Gc', 'Weak', 'Obj', 'Marshal', 'Lexing', 'Parsing',
    'raise', 'failwith', 'invalid_arg', 'assert', 'ignore', 'not', 'succ', 'pred',
    'abs', 'max', 'min', 'compare', 'sqrt', 'exp', 'log', 'log10',
    'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2', 'sinh', 'cosh', 'tanh',
    'ceil', 'floor', 'truncate', 'mod_float', 'frexp', 'ldexp', 'modf',
    'infinity', 'neg_infinity', 'nan', 'max_float', 'min_float', 'epsilon_float',
    'ref', 'incr', 'decr',
  ],
  patterns: [
    // Attributes
    { pattern: /\[@[@]?[^\]]+\]/g, type: 'decorator' },
    // Module paths
    { pattern: /[A-Z][a-zA-Z0-9_]*(?:\.[A-Z][a-zA-Z0-9_]*)*/g, type: 'type' },
    // Type variables
    { pattern: /'[a-z_][a-zA-Z0-9_]*/g, type: 'type' },
    // Labels
    { pattern: /~[a-z_][a-zA-Z0-9_]*/g, type: 'variable' },
    { pattern: /\?[a-z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Polymorphic variants
    { pattern: /`[A-Za-z_][a-zA-Z0-9_]*/g, type: 'symbol' },
    // Characters
    { pattern: /'(?:[^'\\]|\\(?:x[0-9a-fA-F]{2}|[0-3]?[0-7]{1,2}|.))'/g, type: 'string' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+(?:\.[0-9a-fA-F_]+)?(?:[pP][+-]?[0-9]+)?\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /::|:=|->|<-|\|>|@@|@|;;|;;?|\.\.|[+\-*\/%&|^!<>=@~?]+/g, type: 'operator' },
  ],
  strings: [
    { start: '{|', end: '|}', escape: '' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    block: { start: '(*', end: '*)' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '[|', close: '|]' },
    { open: '{|', close: '|}' },
  ],
});

export default ocaml;
