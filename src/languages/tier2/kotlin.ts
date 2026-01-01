/**
 * Kotlin language definition
 */

import { defineLang } from '../define-lang.js';

export const kotlin = defineLang({
  name: 'kotlin',
  aliases: ['kt', 'kts'],
  extensions: ['.kt', '.kts'],
  mimeTypes: ['text/x-kotlin'],

  keywords: [
    'abstract',
    'actual',
    'annotation',
    'as',
    'break',
    'by',
    'catch',
    'class',
    'companion',
    'const',
    'constructor',
    'continue',
    'crossinline',
    'data',
    'delegate',
    'do',
    'dynamic',
    'else',
    'enum',
    'expect',
    'external',
    'field',
    'file',
    'final',
    'finally',
    'for',
    'fun',
    'get',
    'if',
    'import',
    'in',
    'infix',
    'init',
    'inline',
    'inner',
    'interface',
    'internal',
    'is',
    'lateinit',
    'noinline',
    'object',
    'open',
    'operator',
    'out',
    'override',
    'package',
    'param',
    'private',
    'property',
    'protected',
    'public',
    'receiver',
    'reified',
    'return',
    'sealed',
    'set',
    'setparam',
    'super',
    'suspend',
    'tailrec',
    'this',
    'throw',
    'try',
    'typealias',
    'typeof',
    'val',
    'value',
    'var',
    'vararg',
    'when',
    'where',
    'while',
  ],

  typeKeywords: [
    'Any',
    'Boolean',
    'Byte',
    'Char',
    'Double',
    'Float',
    'Int',
    'Long',
    'Nothing',
    'Short',
    'String',
    'Unit',
    'Array',
    'List',
    'Map',
    'Set',
  ],

  constants: ['true', 'false', 'null'],

  operators: /[+\-*/%&|^!<>=?:]+|&&|\|\||\?\.|!!|\?:/,

  patterns: [
    // Annotations
    { pattern: /@\w+/, type: 'meta' },

    // Generic types
    { pattern: /<[\w<>, *?]+>/, type: 'type' },

    // String templates
    { pattern: /\$\{[^}]+\}/, type: 'interpolation' },
    { pattern: /\$\w+/, type: 'interpolation' },

    // Function definitions
    { pattern: /(?<=fun\s+)\w+/, type: 'function' },

    // Class definitions
    { pattern: /(?<=(?:class|interface|object|enum)\s+)\w+/, type: 'class' },

    // Package/import
    { pattern: /(?<=(?:package|import)\s+)[\w.]+/, type: 'type' },

    // Function calls
    { pattern: /\b\w+(?=\s*[<(])/, type: 'function' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F_]+[uUlL]*\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+[uUlL]*\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?[fFlL]?\b/, type: 'number' },

    // Property access
    { pattern: /(?<=\.)\w+/, type: 'property' },

    // Type names (PascalCase)
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: '"""', end: '"""', multiline: true },
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

export default kotlin;
