/**
 * TypeScript language definition
 */

import { defineLang } from '../define-lang.js';

export const typescript = defineLang({
  name: 'typescript',
  aliases: ['ts', 'mts', 'cts'],
  extensions: ['.ts', '.mts', '.cts'],
  mimeTypes: ['application/typescript', 'text/typescript'],

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
    'as',
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
    'type',
    'declare',
    'namespace',
    'module',
    'abstract',
    'readonly',
    'keyof',
    'infer',
    'satisfies',
    'is',
    'asserts',
    'override',
    'get',
    'set',
  ],

  typeKeywords: [
    'any',
    'boolean',
    'number',
    'string',
    'symbol',
    'bigint',
    'object',
    'void',
    'null',
    'undefined',
    'never',
    'unknown',
  ],

  constants: ['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'],

  operators: /[+\-*/%&|^!<>=?:~]+|&&|\|\||\?\?|\.\.\./,

  patterns: [
    // Decorators
    { pattern: /@[\w]+/, type: 'meta' },

    // Generic type parameters
    { pattern: /<[^<>]+>/, type: 'type' },

    // Type assertion with 'as'
    { pattern: /\bas\s+\w+/, type: 'type' },

    // Template literal
    { pattern: /`(?:[^`\\]|\\.)*`/, type: 'string' },

    // Regular expression
    { pattern: /\/(?![/*])(?:\\.|[^/\\\n])+\/[gimsuy]*/, type: 'regexp' },

    // Arrow function
    { pattern: /=>/, type: 'operator' },

    // Spread operator
    { pattern: /\.\.\./, type: 'operator' },

    // Optional chaining and nullish coalescing
    { pattern: /\?\.|::|!\./, type: 'operator' },

    // Property access (after dot)
    { pattern: /(?<=\.)[a-zA-Z_$][\w$]*/, type: 'property' },

    // Function call
    { pattern: /\b[a-zA-Z_$][\w$]*(?=\s*[<(])/, type: 'function' },

    // Class/Type name (PascalCase)
    { pattern: /\b[A-Z][\w$]*\b/, type: 'class' },

    // Numbers
    { pattern: /\b0x[\da-fA-F]+\b/, type: 'number' },
    { pattern: /\b0b[01]+\b/, type: 'number' },
    { pattern: /\b0o[0-7]+\b/, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, type: 'number' },
    { pattern: /\b\d+n\b/, type: 'number' },
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
    { open: '<', close: '>' },
  ],
});

export default typescript;
