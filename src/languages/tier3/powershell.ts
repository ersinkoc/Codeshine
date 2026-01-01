/**
 * PowerShell language definition
 */

import { defineLang } from '../define-lang.js';

export const powershell = defineLang({
  name: 'powershell',
  aliases: ['ps', 'ps1', 'pwsh'],
  extensions: ['.ps1', '.psm1', '.psd1', '.ps1xml'],
  mimeTypes: ['application/x-powershell'],

  keywords: [
    'begin',
    'break',
    'catch',
    'class',
    'continue',
    'data',
    'define',
    'do',
    'dynamicparam',
    'else',
    'elseif',
    'end',
    'enum',
    'exit',
    'filter',
    'finally',
    'for',
    'foreach',
    'from',
    'function',
    'hidden',
    'if',
    'in',
    'param',
    'process',
    'return',
    'static',
    'switch',
    'throw',
    'trap',
    'try',
    'until',
    'using',
    'var',
    'while',
    'workflow',
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
    'array',
    'hashtable',
  ],

  constants: ['$true', '$false', '$null'],

  operators: /[+\-*/%=<>!&|^]+|-(?:eq|ne|gt|ge|lt|le|like|notlike|match|notmatch|contains|notcontains|in|notin|replace|split|join|and|or|xor|not|band|bor|bxor|bnot|shl|shr)\b/i,

  patterns: [
    // Variables
    { pattern: /\$(?:[\w:]+|\{[^}]+\})/, type: 'variable' },

    // Splatting
    { pattern: /@[\w]+/, type: 'variable' },

    // Cmdlets
    { pattern: /\b[A-Z][a-z]+-[A-Z][a-zA-Z]+\b/, type: 'function' },

    // Type literals
    { pattern: /\[[\w.]+(?:\[\])?\]/, type: 'type' },

    // Attributes
    { pattern: /\[[A-Z]\w*\([^\)]*\)\]/, type: 'meta' },

    // Parameters
    { pattern: /-[\w]+/, type: 'attribute' },

    // Here strings
    { pattern: /@"[\s\S]*?"@/, type: 'string' },
    { pattern: /@'[\s\S]*?'@/, type: 'string' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F]+(?:l|L)?\b/, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?:d|D|l|L)?\b/, type: 'number' },

    // Common aliases
    { pattern: /\b(?:ls|dir|cd|pwd|cat|echo|rm|del|cp|copy|mv|move|mkdir|md|rmdir|rd|cls|clear|man|help|write|read|set|get)\b/i, type: 'function' },
  ],

  strings: [
    { start: '"', end: '"', escape: '`', interpolation: { start: '$', end: '' } },
    { start: "'", end: "'" },
  ],

  comments: {
    line: '#',
    block: { start: '<#', end: '#>' },
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default powershell;
