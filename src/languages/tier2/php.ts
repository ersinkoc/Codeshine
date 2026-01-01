/**
 * PHP language definition
 */

import { defineLang } from '../define-lang.js';

export const php = defineLang({
  name: 'php',
  aliases: ['php5', 'php7', 'php8'],
  extensions: ['.php', '.php5', '.php7', '.php8', '.phtml'],
  mimeTypes: ['application/x-httpd-php', 'text/x-php'],

  keywords: [
    'abstract',
    'and',
    'array',
    'as',
    'break',
    'callable',
    'case',
    'catch',
    'class',
    'clone',
    'const',
    'continue',
    'declare',
    'default',
    'die',
    'do',
    'echo',
    'else',
    'elseif',
    'empty',
    'enddeclare',
    'endfor',
    'endforeach',
    'endif',
    'endswitch',
    'endwhile',
    'eval',
    'exit',
    'extends',
    'final',
    'finally',
    'fn',
    'for',
    'foreach',
    'function',
    'global',
    'goto',
    'if',
    'implements',
    'include',
    'include_once',
    'instanceof',
    'insteadof',
    'interface',
    'isset',
    'list',
    'match',
    'namespace',
    'new',
    'or',
    'print',
    'private',
    'protected',
    'public',
    'readonly',
    'require',
    'require_once',
    'return',
    'static',
    'switch',
    'throw',
    'trait',
    'try',
    'unset',
    'use',
    'var',
    'while',
    'xor',
    'yield',
    'yield from',
    'enum',
  ],

  typeKeywords: [
    'int',
    'float',
    'bool',
    'string',
    'array',
    'object',
    'callable',
    'iterable',
    'void',
    'null',
    'mixed',
    'never',
    'false',
    'true',
  ],

  constants: ['true', 'false', 'null', 'TRUE', 'FALSE', 'NULL', '__CLASS__', '__DIR__', '__FILE__', '__FUNCTION__', '__LINE__', '__METHOD__', '__NAMESPACE__', '__TRAIT__'],

  operators: /[+\-*/%&|^!<>=.]+|&&|\|\||\?\?|<=>|\.\.\.|\?\->/,

  patterns: [
    // PHP tags
    { pattern: /<\?php|\?>|<\?=/, type: 'meta' },

    // Variables
    { pattern: /\$[a-zA-Z_]\w*/, type: 'variable' },

    // Attributes
    { pattern: /#\[[^\]]+\]/, type: 'meta' },

    // Class definitions
    { pattern: /(?<=class\s+)\w+/, type: 'class' },
    { pattern: /(?<=interface\s+)\w+/, type: 'class' },
    { pattern: /(?<=trait\s+)\w+/, type: 'class' },
    { pattern: /(?<=enum\s+)\w+/, type: 'class' },

    // Namespace
    { pattern: /(?<=namespace\s+)[\w\\]+/, type: 'type' },

    // Use statements
    { pattern: /(?<=use\s+)[\w\\]+/, type: 'type' },

    // Function definitions
    { pattern: /(?<=function\s+)\w+/, type: 'function' },

    // Static method calls
    { pattern: /(?<=::)\w+(?=\s*\()/, type: 'function' },

    // Method calls
    { pattern: /(?<=->)\w+(?=\s*\()/, type: 'function' },

    // Property access
    { pattern: /(?<=->)\w+/, type: 'property' },

    // Function calls
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F_]+\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?\b/, type: 'number' },

    // Class names
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: '<<<\'', end: "'", multiline: true }, // Nowdoc
    { start: '<<<', end: '', multiline: true }, // Heredoc
    { start: '"', end: '"', escape: '\\', interpolation: { start: '{$', end: '}' } },
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

export default php;
