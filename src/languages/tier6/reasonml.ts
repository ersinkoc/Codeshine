/**
 * ReasonML programming language definition
 */
import { defineLang } from '../define-lang.js';

export const reasonml = defineLang({
  name: 'reasonml',
  aliases: ['reason', 're'],
  extensions: ['.re', '.rei'],
  keywords: [
    'and', 'as', 'assert', 'begin', 'class', 'constraint', 'do', 'done',
    'downto', 'else', 'end', 'exception', 'external', 'for', 'fun', 'function',
    'functor', 'if', 'in', 'include', 'inherit', 'initializer', 'lazy',
    'let', 'module', 'mutable', 'new', 'nonrec', 'object', 'of', 'open',
    'or', 'private', 'pub', 'rec', 'sig', 'struct', 'switch', 'then', 'to',
    'try', 'type', 'val', 'virtual', 'when', 'while', 'with',
  ],
  typeKeywords: [
    'int', 'float', 'bool', 'char', 'string', 'bytes', 'unit', 'exn', 'array',
    'list', 'option', 'ref', 'result',
  ],
  constants: [
    'true', 'false', 'None', 'Some', 'Ok', 'Error',
  ],
  builtins: [
    // Pervasives
    'print_string', 'print_endline', 'print_int', 'print_float', 'print_char', 'print_newline',
    'prerr_string', 'prerr_endline', 'prerr_int', 'prerr_float', 'prerr_char', 'prerr_newline',
    'read_line', 'read_int', 'read_float',
    'string_of_int', 'string_of_float', 'string_of_bool',
    'int_of_string', 'float_of_string', 'bool_of_string',
    'int_of_char', 'char_of_int', 'int_of_float', 'float_of_int',
    'fst', 'snd', 'List', 'Array', 'String', 'Char', 'Bytes',
    'raise', 'failwith', 'invalid_arg', 'assert', 'ignore', 'not',
    'succ', 'pred', 'abs', 'max', 'min', 'compare',
    'sqrt', 'exp', 'log', 'log10', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
    'ref', 'incr', 'decr',
    // Belt (ReasonML standard library)
    'Belt', 'Map', 'Set', 'MutableMap', 'MutableSet', 'HashMap', 'HashSet',
    'Option', 'Result', 'Int', 'Float', 'Array', 'List', 'SortArray',
    'MutableQueue', 'MutableStack', 'Range', 'Id',
    // Js module
    'Js', 'log', 'log2', 'log3', 'log4', 'logMany',
    'Promise', 'Dict', 'Json', 'Null', 'Nullable', 'Undefined',
    'Exn', 'Array2', 'String2', 'Re', 'Date', 'Math', 'Obj', 'Typed_array',
  ],
  patterns: [
    // Decorators/Attributes
    { pattern: /\[@[^\]]+\]/g, type: 'decorator' },
    { pattern: /%[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Module paths
    { pattern: /\b[A-Z][a-zA-Z0-9_]*(?:\.[A-Z][a-zA-Z0-9_]*)*/g, type: 'type' },
    // Type variables
    { pattern: /'[a-z_][a-zA-Z0-9_]*/g, type: 'type' },
    // Polymorphic variants
    { pattern: /`[A-Za-z_][a-zA-Z0-9_]*/g, type: 'symbol' },
    // JSX tags
    { pattern: /<\/?[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)*/g, type: 'tag' },
    // Character literals
    { pattern: /'(?:[^'\\]|\\(?:x[0-9a-fA-F]{2}|[0-3]?[0-7]{1,2}|.))'/g, type: 'string' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=@~?]+|=>|->|\|>|@@|##|\.\.\./g, type: 'operator' },
  ],
  strings: [
    { start: '{|', end: '|}', escape: '' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default reasonml;
