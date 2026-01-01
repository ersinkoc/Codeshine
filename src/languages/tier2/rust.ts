/**
 * Rust language definition
 */

import { defineLang } from '../define-lang.js';

export const rust = defineLang({
  name: 'rust',
  aliases: ['rs'],
  extensions: ['.rs'],
  mimeTypes: ['text/x-rust'],

  keywords: [
    'as',
    'async',
    'await',
    'break',
    'const',
    'continue',
    'crate',
    'dyn',
    'else',
    'enum',
    'extern',
    'fn',
    'for',
    'if',
    'impl',
    'in',
    'let',
    'loop',
    'match',
    'mod',
    'move',
    'mut',
    'pub',
    'ref',
    'return',
    'self',
    'Self',
    'static',
    'struct',
    'super',
    'trait',
    'type',
    'union',
    'unsafe',
    'use',
    'where',
    'while',
  ],

  typeKeywords: [
    'bool',
    'char',
    'str',
    'u8',
    'u16',
    'u32',
    'u64',
    'u128',
    'usize',
    'i8',
    'i16',
    'i32',
    'i64',
    'i128',
    'isize',
    'f32',
    'f64',
    'String',
    'Vec',
    'Option',
    'Result',
    'Box',
    'Rc',
    'Arc',
    'Cell',
    'RefCell',
    'HashMap',
    'HashSet',
  ],

  constants: ['true', 'false', 'None', 'Some', 'Ok', 'Err'],

  operators: /[+\-*/%&|^!<>=?:]+|&&|\|\||\.\.=?|=>|<-/,

  patterns: [
    // Attributes
    { pattern: /#!?\[[^\]]+\]/, type: 'meta' },

    // Lifetimes
    { pattern: /'[a-z_]\w*/, type: 'type' },

    // Macros
    { pattern: /\b\w+!/, type: 'meta' },

    // Generic types
    { pattern: /<[\w<>, '&]+>/, type: 'type' },

    // Function definitions
    { pattern: /(?<=fn\s+)\w+/, type: 'function' },

    // Type definitions
    { pattern: /(?<=(?:struct|enum|trait|type|impl)\s+)\w+/, type: 'class' },

    // Module paths
    { pattern: /\w+(?=::)/, type: 'type' },

    // Function calls
    { pattern: /\b\w+(?=\s*[!(<])/, type: 'function' },

    // Numbers
    { pattern: /\b0x[\da-fA-F_]+(?:u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|i128|isize)?\b/, type: 'number' },
    { pattern: /\b0o[0-7_]+(?:u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|i128|isize)?\b/, type: 'number' },
    { pattern: /\b0b[01_]+(?:u8|u16|u32|u64|u128|usize|i8|i16|i32|i64|i128|isize)?\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?(?:f32|f64)?\b/, type: 'number' },

    // Field access
    { pattern: /(?<=\.)\w+/, type: 'property' },

    // Type names (PascalCase)
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: 'r#"', end: '"#', multiline: true }, // Raw strings
    { start: 'r"', end: '"', multiline: true },
    { start: '"', end: '"', escape: '\\' },
    { start: "b'", end: "'", escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],

  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
  ],
});

export default rust;
