/**
 * Bash/Shell language definition
 */

import { defineLang } from '../define-lang.js';

export const bash = defineLang({
  name: 'bash',
  aliases: ['sh', 'shell', 'zsh', 'ksh'],
  extensions: ['.sh', '.bash', '.zsh', '.ksh', '.bashrc', '.zshrc', '.profile'],
  mimeTypes: ['application/x-sh', 'text/x-shellscript'],

  keywords: [
    'if',
    'then',
    'else',
    'elif',
    'fi',
    'for',
    'in',
    'do',
    'done',
    'while',
    'until',
    'case',
    'esac',
    'function',
    'select',
    'time',
    'coproc',
    'break',
    'continue',
    'return',
    'exit',
    'export',
    'readonly',
    'declare',
    'typeset',
    'local',
    'unset',
    'shift',
    'source',
    'alias',
    'unalias',
    'set',
    'shopt',
    'trap',
    'eval',
    'exec',
  ],

  constants: ['true', 'false'],

  operators: /[+\-*/%=<>!&|^]+|&&|\|\||<<|>>|\|&/,

  patterns: [
    // Shebang
    { pattern: /^#!.*$/m, type: 'meta' },

    // Variables
    { pattern: /\$\{[^}]+\}/, type: 'variable' },
    { pattern: /\$[a-zA-Z_]\w*/, type: 'variable' },
    { pattern: /\$[0-9@#?$!*-]/, type: 'variable' },

    // Command substitution
    { pattern: /\$\([^)]+\)/, type: 'function' },

    // Arithmetic expansion
    { pattern: /\$\(\([^)]+\)\)/, type: 'number' },

    // Here documents
    { pattern: /<<[-']?\w+/, type: 'string' },

    // Options/flags
    { pattern: /\s--?[\w-]+/, type: 'attribute' },

    // Built-in commands
    { pattern: /\b(?:echo|printf|read|cd|pwd|pushd|popd|dirs|let|test|getopts|hash|type|bind|builtin|caller|command|compgen|complete|compopt|enable|help|history|jobs|kill|logout|mapfile|readarray|suspend|times|ulimit|umask|wait|bg|fg|disown)\b/, type: 'function' },

    // Common commands
    { pattern: /\b(?:ls|cat|grep|sed|awk|find|xargs|sort|uniq|wc|head|tail|cut|tr|mkdir|rmdir|rm|cp|mv|ln|chmod|chown|touch|date|curl|wget|tar|gzip|gunzip|zip|unzip|ssh|scp|rsync|git|docker|npm|node|python|pip|make|cmake|gcc|g\+\+)\b/, type: 'function' },

    // Numbers
    { pattern: /\b\d+\b/, type: 'number' },

    // File descriptors
    { pattern: /\b[0-9]?[<>]+/, type: 'operator' },
  ],

  strings: [
    { start: '"', end: '"', escape: '\\', interpolation: { start: '$', end: '' } },
    { start: "'", end: "'" },
    { start: "$'", end: "'", escape: '\\' },
  ],

  comments: {
    line: '#',
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '[[', close: ']]' },
    { open: '((', close: '))' },
  ],
});

export default bash;
