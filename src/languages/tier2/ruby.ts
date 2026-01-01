/**
 * Ruby language definition
 */

import { defineLang } from '../define-lang.js';

export const ruby = defineLang({
  name: 'ruby',
  aliases: ['rb'],
  extensions: ['.rb', '.ruby', '.gemspec', '.rake'],
  mimeTypes: ['text/x-ruby'],

  keywords: [
    'alias',
    'and',
    'begin',
    'break',
    'case',
    'class',
    'def',
    'defined?',
    'do',
    'else',
    'elsif',
    'end',
    'ensure',
    'for',
    'if',
    'in',
    'module',
    'next',
    'not',
    'or',
    'redo',
    'rescue',
    'retry',
    'return',
    'self',
    'super',
    'then',
    'undef',
    'unless',
    'until',
    'when',
    'while',
    'yield',
    'raise',
    'require',
    'require_relative',
    'include',
    'extend',
    'prepend',
    'attr_reader',
    'attr_writer',
    'attr_accessor',
    'private',
    'protected',
    'public',
    'lambda',
    'proc',
  ],

  constants: ['true', 'false', 'nil', '__FILE__', '__LINE__', '__ENCODING__'],

  operators: /[+\-*/%&|^!<>=~]+|&&|\|\||\.\.\.?|<=>|===|=~|!~|<<|>>/,

  patterns: [
    // Symbols
    { pattern: /:[a-zA-Z_]\w*[?!]?/, type: 'constant' },

    // Instance variables
    { pattern: /@[a-zA-Z_]\w*/, type: 'variable' },

    // Class variables
    { pattern: /@@[a-zA-Z_]\w*/, type: 'variable' },

    // Global variables
    { pattern: /\$[a-zA-Z_]\w*|\$[!@&+`'=~\/\\,;.<>*$?:"]|\$-\w/, type: 'variable' },

    // Heredocs
    { pattern: /<<[-~]?['"]?\w+['"]?/, type: 'string' },

    // Percent strings
    { pattern: /%[qQwWiIxsr]?(?:\([^)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>|[^\w\s].*?(?=[^\w\s]))/, type: 'string' },

    // Regex
    { pattern: /\/(?:[^/\\]|\\.)*\/[imxouesn]*/, type: 'regexp' },

    // Method definitions
    { pattern: /(?<=def\s+)[\w.]+[?!=]?/, type: 'function' },

    // Class definitions
    { pattern: /(?<=class\s+)\w+/, type: 'class' },

    // Module definitions
    { pattern: /(?<=module\s+)\w+/, type: 'class' },

    // Method calls with blocks
    { pattern: /\b\w+[?!]?(?=\s*(?:\{|do\b))/, type: 'function' },

    // Method calls
    { pattern: /\b\w+[?!]?(?=\s*\()/, type: 'function' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F_]+\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?r?i?\b/, type: 'number' },

    // Constants (SCREAMING_CASE or PascalCase)
    { pattern: /\b[A-Z][A-Z0-9_]+\b/, type: 'constant' },
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: '"""', end: '"""', multiline: true },
    { start: "'''", end: "'''", multiline: true },
    { start: '"', end: '"', escape: '\\', interpolation: { start: '#{', end: '}' } },
    { start: "'", end: "'", escape: '\\' },
  ],

  comments: {
    line: '#',
    block: { start: '=begin', end: '=end' },
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default ruby;
