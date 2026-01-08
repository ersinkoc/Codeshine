/**
 * Odin programming language definition
 */
import { defineLang } from '../define-lang.js';

export const odin = defineLang({
  name: 'odin',
  aliases: [],
  extensions: ['.odin'],
  keywords: [
    // Declarations
    'package', 'import', 'foreign', 'using',
    // Control flow
    'if', 'else', 'when', 'for', 'switch', 'case', 'break', 'continue', 'fallthrough',
    'do', 'return', 'defer', 'or_else', 'or_return', 'or_break', 'or_continue',
    // Other
    'struct', 'union', 'enum', 'bit_set', 'bit_field', 'map', 'proc', 'distinct',
    'dynamic', 'where', 'context', 'not_in', 'in', 'notin', 'auto_cast', 'cast', 'transmute',
    'inline', 'no_inline',
  ],
  typeKeywords: [
    // Basic types
    'bool', 'b8', 'b16', 'b32', 'b64',
    'int', 'i8', 'i16', 'i32', 'i64', 'i128', 'i16le', 'i32le', 'i64le', 'i128le', 'i16be', 'i32be', 'i64be', 'i128be',
    'uint', 'u8', 'u16', 'u32', 'u64', 'u128', 'u16le', 'u32le', 'u64le', 'u128le', 'u16be', 'u32be', 'u64be', 'u128be',
    'uintptr', 'intptr',
    'f16', 'f32', 'f64', 'f16le', 'f32le', 'f64le', 'f16be', 'f32be', 'f64be',
    'complex32', 'complex64', 'complex128', 'quaternion64', 'quaternion128', 'quaternion256',
    'rune', 'string', 'cstring', 'rawptr', 'typeid', 'any',
    'byte',
  ],
  constants: [
    'true', 'false', 'nil', 'size_of', 'align_of', 'offset_of', 'type_of', 'type_info_of',
  ],
  builtins: [
    // Built-in procedures
    'len', 'cap', 'size_of', 'align_of', 'offset_of', 'type_of', 'type_info_of', 'typeid_of',
    'swizzle', 'complex', 'quaternion', 'real', 'imag', 'jmag', 'kmag', 'conj', 'expand_values',
    'min', 'max', 'abs', 'clamp', 'assert', 'panic', 'unimplemented',
    'make', 'new', 'free', 'delete', 'append', 'pop', 'resize', 'reserve', 'clear',
    'copy', 'slice', 'raw_data', 'soa_zip', 'soa_unzip',
    'print', 'println', 'eprint', 'eprintln', 'printf', 'eprintf',
  ],
  patterns: [
    // Attributes/directives
    { pattern: /@\([^)]+\)/g, type: 'decorator' },
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Labels
    { pattern: /[a-zA-Z_][a-zA-Z0-9_]*:/g, type: 'label' },
    // Compiler built-ins
    { pattern: /#[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'macro' },
    // Character literals
    { pattern: /'(?:[^'\\]|\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8}|.))'/g, type: 'string' },
    // Hexadecimal
    { pattern: /\b0[xXhH][0-9a-fA-F_]+\b/g, type: 'number' },
    // Binary
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    // Octal
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    // Float numbers
    { pattern: /\b\d[\d_]*\.[\d_]*(?:[eE][+-]?[\d_]+)?(?:i\d+)?\b/g, type: 'number' },
    // Integer numbers
    { pattern: /\b\d[\d_]*(?:i\d+|u\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=~?:]+|\.\.|\.\.<?|->|<-/g, type: 'operator' },
  ],
  strings: [
    { start: '`', end: '`', escape: '' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default odin;
