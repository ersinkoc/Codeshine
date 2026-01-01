/**
 * JavaScript language definition
 */

import { defineLang } from '../define-lang.js';

export const javascript = defineLang({
  name: 'javascript',
  aliases: ['js', 'mjs', 'cjs'],
  extensions: ['.js', '.mjs', '.cjs'],
  mimeTypes: ['application/javascript', 'text/javascript'],

  keywords: [
    'break',
    'case',
    'catch',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'finally',
    'for',
    'function',
    'if',
    'in',
    'instanceof',
    'new',
    'return',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'class',
    'const',
    'enum',
    'export',
    'extends',
    'import',
    'super',
    'implements',
    'interface',
    'let',
    'package',
    'private',
    'protected',
    'public',
    'static',
    'yield',
    'async',
    'await',
    'of',
    'from',
    'get',
    'set',
  ],

  constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],

  operators: /[+\-*/%&|^!<>=?:~]+|&&|\|\||\?\?|\.\.\./,

  patterns: [
    // Template literal
    { pattern: /`(?:[^`\\]|\\.)*`/, type: 'string' },

    // Regular expression
    { pattern: /\/(?![/*])(?:\\.|[^/\\\n])+\/[gimsuy]*/, type: 'regexp' },

    // Arrow function
    { pattern: /=>/, type: 'operator' },

    // Spread operator
    { pattern: /\.\.\./, type: 'operator' },

    // Property access (after dot)
    { pattern: /(?<=\.)[a-zA-Z_$][\w$]*/, type: 'property' },

    // Function call
    { pattern: /\b[a-zA-Z_$][\w$]*(?=\s*\()/, type: 'function' },

    // Class name (PascalCase)
    { pattern: /\b[A-Z][\w$]*\b/, type: 'class' },

    // Numbers
    { pattern: /\b0x[\da-fA-F]+\b/, type: 'number' },
    { pattern: /\b0b[01]+\b/, type: 'number' },
    { pattern: /\b0o[0-7]+\b/, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, type: 'number' },
    { pattern: /\b\d+n\b/, type: 'number' }, // BigInt
  ],

  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    {
      start: '`',
      end: '`',
      escape: '\\',
      multiline: true,
      interpolation: { start: '${', end: '}' },
    },
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

export default javascript;
