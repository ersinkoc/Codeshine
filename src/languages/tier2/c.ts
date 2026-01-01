/**
 * C language definition
 */

import { defineLang } from '../define-lang.js';

export const c = defineLang({
  name: 'c',
  aliases: ['h'],
  extensions: ['.c', '.h'],
  mimeTypes: ['text/x-c'],

  keywords: [
    'auto',
    'break',
    'case',
    'const',
    'continue',
    'default',
    'do',
    'else',
    'enum',
    'extern',
    'for',
    'goto',
    'if',
    'inline',
    'register',
    'restrict',
    'return',
    'sizeof',
    'static',
    'struct',
    'switch',
    'typedef',
    'union',
    'volatile',
    'while',
    '_Alignas',
    '_Alignof',
    '_Atomic',
    '_Bool',
    '_Complex',
    '_Generic',
    '_Imaginary',
    '_Noreturn',
    '_Static_assert',
    '_Thread_local',
  ],

  typeKeywords: [
    'void',
    'char',
    'short',
    'int',
    'long',
    'float',
    'double',
    'signed',
    'unsigned',
    'bool',
    'size_t',
    'ssize_t',
    'ptrdiff_t',
    'intptr_t',
    'uintptr_t',
    'int8_t',
    'int16_t',
    'int32_t',
    'int64_t',
    'uint8_t',
    'uint16_t',
    'uint32_t',
    'uint64_t',
  ],

  constants: ['NULL', 'true', 'false', 'EOF', 'stdin', 'stdout', 'stderr'],

  operators: /[+\-*/%&|^!<>=?:~]+|&&|\|\||\+\+|--|<<|>>|->/,

  patterns: [
    // Preprocessor directives
    { pattern: /#\s*\w+/, type: 'meta' },

    // Include paths
    { pattern: /<[\w./]+>/, type: 'string' },

    // Function definitions
    { pattern: /\b\w+(?=\s*\([^)]*\)\s*{)/, type: 'function' },

    // Function calls
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },

    // Struct/enum/union names
    { pattern: /(?<=struct\s+)\w+/, type: 'class' },
    { pattern: /(?<=enum\s+)\w+/, type: 'class' },
    { pattern: /(?<=union\s+)\w+/, type: 'class' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F]+[uUlL]*\b/, type: 'number' },
    { pattern: /\b0[bB][01]+[uUlL]*\b/, type: 'number' },
    { pattern: /\b0[0-7]+[uUlL]*\b/, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlL]?\b/, type: 'number' },

    // Pointer operator
    { pattern: /->/, type: 'operator' },

    // Member access
    { pattern: /(?<=\.)\w+/, type: 'property' },
  ],

  strings: [
    { start: '"', end: '"', escape: '\\' },
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
  ],
});

export default c;
