/**
 * Go language definition
 */

import { defineLang } from '../define-lang.js';

export const go = defineLang({
  name: 'go',
  aliases: ['golang'],
  extensions: ['.go'],
  mimeTypes: ['text/x-go'],

  keywords: [
    'break',
    'case',
    'chan',
    'const',
    'continue',
    'default',
    'defer',
    'else',
    'fallthrough',
    'for',
    'func',
    'go',
    'goto',
    'if',
    'import',
    'interface',
    'map',
    'package',
    'range',
    'return',
    'select',
    'struct',
    'switch',
    'type',
    'var',
  ],

  typeKeywords: [
    'bool',
    'byte',
    'complex64',
    'complex128',
    'error',
    'float32',
    'float64',
    'int',
    'int8',
    'int16',
    'int32',
    'int64',
    'rune',
    'string',
    'uint',
    'uint8',
    'uint16',
    'uint32',
    'uint64',
    'uintptr',
    'any',
    'comparable',
  ],

  constants: ['true', 'false', 'nil', 'iota'],

  operators: /[+\-*/%&|^!<>=:]+|&&|\|\||<-|:=|\+\+|--/,

  patterns: [
    // Package declaration
    { pattern: /(?<=package\s+)\w+/, type: 'type' },

    // Import paths
    { pattern: /"[\w./\-]+"/, type: 'string' },

    // Function definitions
    { pattern: /(?<=func\s+)\w+/, type: 'function' },

    // Method definitions
    { pattern: /(?<=func\s+\([^)]+\)\s*)\w+/, type: 'function' },

    // Type definitions
    { pattern: /(?<=type\s+)\w+/, type: 'class' },

    // Interface/struct fields
    { pattern: /^\s*\w+(?=\s+\w)/, type: 'property' },

    // Built-in functions
    { pattern: /\b(?:append|cap|close|complex|copy|delete|imag|len|make|new|panic|print|println|real|recover)\b(?=\s*\()/, type: 'function' },

    // Function calls
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F_]+\b/, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?i?\b/, type: 'number' },

    // Property access
    { pattern: /(?<=\.)\w+/, type: 'property' },

    // Type names (PascalCase)
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: '`', end: '`', multiline: true }, // Raw strings
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

export default go;
