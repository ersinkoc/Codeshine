/**
 * C++ language definition
 */

import { defineLang } from '../define-lang.js';

export const cpp = defineLang({
  name: 'cpp',
  aliases: ['c++', 'cxx', 'cc', 'hpp', 'hxx', 'h++'],
  extensions: ['.cpp', '.cxx', '.cc', '.c++', '.hpp', '.hxx', '.h++', '.hh'],
  mimeTypes: ['text/x-c++'],

  keywords: [
    'alignas',
    'alignof',
    'and',
    'and_eq',
    'asm',
    'auto',
    'bitand',
    'bitor',
    'break',
    'case',
    'catch',
    'class',
    'compl',
    'concept',
    'const',
    'consteval',
    'constexpr',
    'constinit',
    'const_cast',
    'continue',
    'co_await',
    'co_return',
    'co_yield',
    'decltype',
    'default',
    'delete',
    'do',
    'dynamic_cast',
    'else',
    'enum',
    'explicit',
    'export',
    'extern',
    'final',
    'for',
    'friend',
    'goto',
    'if',
    'inline',
    'mutable',
    'namespace',
    'new',
    'noexcept',
    'not',
    'not_eq',
    'operator',
    'or',
    'or_eq',
    'override',
    'private',
    'protected',
    'public',
    'register',
    'reinterpret_cast',
    'requires',
    'return',
    'sizeof',
    'static',
    'static_assert',
    'static_cast',
    'struct',
    'switch',
    'template',
    'this',
    'thread_local',
    'throw',
    'try',
    'typedef',
    'typeid',
    'typename',
    'union',
    'using',
    'virtual',
    'volatile',
    'while',
    'xor',
    'xor_eq',
  ],

  typeKeywords: [
    'void',
    'bool',
    'char',
    'char8_t',
    'char16_t',
    'char32_t',
    'wchar_t',
    'short',
    'int',
    'long',
    'float',
    'double',
    'signed',
    'unsigned',
    'size_t',
    'nullptr_t',
    'string',
    'vector',
    'map',
    'set',
    'list',
    'deque',
    'array',
    'pair',
    'tuple',
    'optional',
    'variant',
    'any',
    'function',
    'unique_ptr',
    'shared_ptr',
    'weak_ptr',
  ],

  constants: ['nullptr', 'true', 'false', 'NULL'],

  operators: /[+\-*/%&|^!<>=?:~]+|&&|\|\||\+\+|--|<<|>>|->|::|<=>|\.\*/,

  patterns: [
    // Preprocessor directives
    { pattern: /#\s*\w+/, type: 'meta' },

    // Include paths
    { pattern: /<[\w./]+>/, type: 'string' },

    // Template parameters
    { pattern: /<[\w<>, ]+>/, type: 'type' },

    // Namespace qualifier
    { pattern: /\w+(?=::)/, type: 'type' },

    // Class definitions
    { pattern: /(?<=class\s+)\w+/, type: 'class' },
    { pattern: /(?<=struct\s+)\w+/, type: 'class' },

    // Function definitions
    { pattern: /\b\w+(?=\s*\([^)]*\)\s*(?:const|override|final|noexcept|->|{))/, type: 'function' },

    // Constructor/Destructor
    { pattern: /~?\b[A-Z]\w*(?=\s*\()/, type: 'function' },

    // Function calls
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },

    // Lambda
    { pattern: /\[\s*[&=]?\s*\]/, type: 'operator' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F']+[uUlL]*\b/, type: 'number' },
    { pattern: /\b0[bB][01']+[uUlL]*\b/, type: 'number' },
    { pattern: /\b\d[\d']*(?:\.[\d']+)?(?:[eE][+-]?[\d']+)?[fFlL]?\b/, type: 'number' },

    // Scope resolution
    { pattern: /::/, type: 'operator' },

    // Member access
    { pattern: /(?<=\.)\w+/, type: 'property' },
    { pattern: /(?<=->)\w+/, type: 'property' },

    // Class names (PascalCase)
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: 'R"(', end: ')"', multiline: true }, // Raw string literals
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

export default cpp;
