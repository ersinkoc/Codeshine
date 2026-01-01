/**
 * Java language definition
 */

import { defineLang } from '../define-lang.js';

export const java = defineLang({
  name: 'java',
  aliases: [],
  extensions: ['.java'],
  mimeTypes: ['text/x-java'],

  keywords: [
    'abstract',
    'assert',
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'default',
    'do',
    'else',
    'enum',
    'extends',
    'final',
    'finally',
    'for',
    'goto',
    'if',
    'implements',
    'import',
    'instanceof',
    'interface',
    'native',
    'new',
    'package',
    'private',
    'protected',
    'public',
    'return',
    'static',
    'strictfp',
    'super',
    'switch',
    'synchronized',
    'this',
    'throw',
    'throws',
    'transient',
    'try',
    'volatile',
    'while',
    'record',
    'sealed',
    'permits',
    'non-sealed',
    'var',
    'yield',
  ],

  typeKeywords: [
    'boolean',
    'byte',
    'char',
    'double',
    'float',
    'int',
    'long',
    'short',
    'void',
  ],

  constants: ['true', 'false', 'null'],

  operators: /[+\-*/%&|^!<>=?:~]+|&&|\|\||\+\+|--/,

  patterns: [
    // Annotations
    { pattern: /@[\w.]+/, type: 'meta' },

    // Generic types
    { pattern: /<[\w<>, ]+>/, type: 'type' },

    // Class definitions
    { pattern: /(?<=class\s+)\w+/, type: 'class' },

    // Interface definitions
    { pattern: /(?<=interface\s+)\w+/, type: 'class' },

    // Enum definitions
    { pattern: /(?<=enum\s+)\w+/, type: 'class' },

    // Method definitions
    { pattern: /\b\w+(?=\s*\([^)]*\)\s*(?:throws|{))/, type: 'function' },

    // Package names
    { pattern: /(?<=package\s+)[\w.]+/, type: 'type' },

    // Import statements
    { pattern: /(?<=import\s+(?:static\s+)?)[\w.]+/, type: 'type' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F_]+[lL]?\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+[lL]?\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?[fFdDlL]?\b/, type: 'number' },

    // Property access
    { pattern: /(?<=\.)\w+(?!\s*\()/, type: 'property' },

    // Method call
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },

    // Class name (PascalCase)
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: '"""', end: '"""', multiline: true }, // Text blocks
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
    { open: '<', close: '>' },
  ],
});

export default java;
