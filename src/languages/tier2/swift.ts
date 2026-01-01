/**
 * Swift language definition
 */

import { defineLang } from '../define-lang.js';

export const swift = defineLang({
  name: 'swift',
  aliases: [],
  extensions: ['.swift'],
  mimeTypes: ['text/x-swift'],

  keywords: [
    'actor',
    'any',
    'as',
    'associatedtype',
    'async',
    'await',
    'break',
    'case',
    'catch',
    'class',
    'continue',
    'convenience',
    'default',
    'defer',
    'deinit',
    'do',
    'dynamic',
    'else',
    'enum',
    'extension',
    'fallthrough',
    'fileprivate',
    'final',
    'for',
    'func',
    'get',
    'guard',
    'if',
    'import',
    'in',
    'indirect',
    'infix',
    'init',
    'inout',
    'internal',
    'is',
    'isolated',
    'lazy',
    'let',
    'mutating',
    'nonisolated',
    'nonmutating',
    'open',
    'operator',
    'optional',
    'override',
    'postfix',
    'precedencegroup',
    'prefix',
    'private',
    'protocol',
    'public',
    'repeat',
    'required',
    'rethrows',
    'return',
    'self',
    'Self',
    'set',
    'some',
    'static',
    'struct',
    'subscript',
    'super',
    'switch',
    'throw',
    'throws',
    'try',
    'typealias',
    'unowned',
    'var',
    'weak',
    'where',
    'while',
    'willSet',
    'didSet',
  ],

  typeKeywords: [
    'Any',
    'AnyObject',
    'Bool',
    'Character',
    'Double',
    'Float',
    'Int',
    'Int8',
    'Int16',
    'Int32',
    'Int64',
    'Never',
    'Optional',
    'String',
    'UInt',
    'UInt8',
    'UInt16',
    'UInt32',
    'UInt64',
    'Void',
    'Array',
    'Dictionary',
    'Set',
  ],

  constants: ['true', 'false', 'nil'],

  operators: /[+\-*/%&|^!<>=?:~]+|&&|\|\||\?\?|\.\.\.</,

  patterns: [
    // Attributes
    { pattern: /@\w+/, type: 'meta' },

    // Generic types
    { pattern: /<[\w<>, ]+>/, type: 'type' },

    // String interpolation
    { pattern: /\\\([^)]+\)/, type: 'interpolation' },

    // Function definitions
    { pattern: /(?<=func\s+)\w+/, type: 'function' },

    // Type definitions
    { pattern: /(?<=(?:class|struct|enum|protocol|actor)\s+)\w+/, type: 'class' },

    // Property wrappers
    { pattern: /@\w+/, type: 'meta' },

    // Function calls
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F_]+(?:\.[\da-fA-F_]+)?(?:[pP][+-]?[\d_]+)?\b/, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?\b/, type: 'number' },

    // Property access
    { pattern: /(?<=\.)\w+/, type: 'property' },

    // Type names (PascalCase)
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: '"""', end: '"""', multiline: true },
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
    { open: '<', close: '>' },
  ],
});

export default swift;
