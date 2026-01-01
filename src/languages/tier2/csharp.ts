/**
 * C# language definition
 */

import { defineLang } from '../define-lang.js';

export const csharp = defineLang({
  name: 'csharp',
  aliases: ['cs', 'c#', 'dotnet'],
  extensions: ['.cs'],
  mimeTypes: ['text/x-csharp'],

  keywords: [
    'abstract',
    'as',
    'base',
    'break',
    'case',
    'catch',
    'checked',
    'class',
    'const',
    'continue',
    'default',
    'delegate',
    'do',
    'else',
    'enum',
    'event',
    'explicit',
    'extern',
    'finally',
    'fixed',
    'for',
    'foreach',
    'goto',
    'if',
    'implicit',
    'in',
    'interface',
    'internal',
    'is',
    'lock',
    'namespace',
    'new',
    'operator',
    'out',
    'override',
    'params',
    'private',
    'protected',
    'public',
    'readonly',
    'ref',
    'return',
    'sealed',
    'sizeof',
    'stackalloc',
    'static',
    'struct',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'unchecked',
    'unsafe',
    'using',
    'virtual',
    'volatile',
    'while',
    'async',
    'await',
    'dynamic',
    'get',
    'set',
    'add',
    'remove',
    'value',
    'var',
    'yield',
    'partial',
    'global',
    'where',
    'init',
    'record',
    'with',
    'required',
  ],

  typeKeywords: [
    'bool',
    'byte',
    'char',
    'decimal',
    'double',
    'float',
    'int',
    'long',
    'object',
    'sbyte',
    'short',
    'string',
    'uint',
    'ulong',
    'ushort',
    'void',
    'nint',
    'nuint',
  ],

  constants: ['true', 'false', 'null'],

  operators: /[+\-*/%&|^!<>=?:~]+|&&|\|\||\+\+|--|<<|>>|\?\?|\?\.|\.\./,

  patterns: [
    // Attributes
    { pattern: /\[[\w(),. ]+\]/, type: 'meta' },

    // Generic types
    { pattern: /<[\w<>,? ]+>/, type: 'type' },

    // String interpolation
    { pattern: /\$"(?:[^"\\]|\\.|\{[^}]*\})*"/, type: 'string' },

    // Verbatim strings
    { pattern: /@"(?:[^"]|"")*"/, type: 'string' },

    // Raw string literals
    { pattern: /"""[\s\S]*?"""/, type: 'string' },

    // Namespace declarations
    { pattern: /(?<=namespace\s+)[\w.]+/, type: 'type' },

    // Class definitions
    { pattern: /(?<=class\s+)\w+/, type: 'class' },
    { pattern: /(?<=interface\s+)\w+/, type: 'class' },
    { pattern: /(?<=struct\s+)\w+/, type: 'class' },
    { pattern: /(?<=record\s+)\w+/, type: 'class' },

    // Method definitions
    { pattern: /\b\w+(?=\s*\([^)]*\)\s*(?:where|{|=>))/, type: 'function' },

    // Method calls
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F_]+[uUlL]*\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+[uUlL]*\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?[fFdDmM]?\b/, type: 'number' },

    // Property access
    { pattern: /(?<=\.)\w+(?!\s*\()/, type: 'property' },

    // LINQ keywords
    { pattern: /\b(?:from|select|where|orderby|descending|ascending|join|on|equals|into|group|by|let)\b/, type: 'keyword' },

    // Class names (PascalCase)
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: '@"', end: '"', multiline: true },
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

export default csharp;
