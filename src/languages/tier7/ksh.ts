/**
 * KornShell (ksh) language definition
 */
import { defineLang } from '../define-lang.js';

export const ksh = defineLang({
  name: 'ksh',
  aliases: ['kornshell', 'ksh93', 'ksh88'],
  extensions: ['.ksh'],
  keywords: [
    'if', 'then', 'else', 'elif', 'fi', 'case', 'esac', 'for', 'select', 'while',
    'until', 'do', 'done', 'in', 'function', 'time', 'coproc',
    'break', 'continue', 'return', 'exit',
  ],
  builtins: [
    'alias', 'bg', 'cd', 'command', 'echo', 'eval', 'exec', 'export', 'fc', 'fg',
    'getopts', 'hash', 'jobs', 'kill', 'let', 'print', 'printf', 'pwd', 'read',
    'readonly', 'set', 'shift', 'test', 'times', 'trap', 'type', 'typeset',
    'ulimit', 'umask', 'unalias', 'unset', 'wait', 'whence',
    // ksh93 additions
    'builtin', 'disown', 'enum', 'hist', 'nameref', 'namespace', 'redirect',
    'sleep', 'source',
  ],
  patterns: [
    // Shebang
    { pattern: /^#!.*$/gm, type: 'comment' },
    // Special variables
    { pattern: /\$[?#$!@*0-9-]/g, type: 'variable' },
    // Variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Variable expansion
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    // Command substitution
    { pattern: /\$\([^)]*\)/g, type: 'variable' },
    // Arithmetic expansion
    { pattern: /\$\(\([^)]*\)\)/g, type: 'variable' },
    { pattern: /\(\([^)]*\)\)/g, type: 'variable' },
    // Array access
    { pattern: /\[[^\]]+\]/g, type: 'operator' },
    // Here-string
    { pattern: /<<<.*/g, type: 'string' },
    // Numbers
    { pattern: /\b\d+#[0-9a-zA-Z]+\b/g, type: 'number' },
    { pattern: /\b(?:0x[0-9a-fA-F]+|0[0-7]*|\d+)\b/g, type: 'number' },
    // Operators
    { pattern: /[|&;<>(){}!=]+|&&|\|\||;;|;&/g, type: 'operator' },
    // Test operators
    { pattern: /-(?:eq|ne|lt|le|gt|ge|ef|nt|ot|[a-zA-Z])\b/g, type: 'operator' },
  ],
  strings: [
    { start: '$"', end: '"', escape: '\\' },
    { start: "$'", end: "'", escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '[[', close: ']]' },
  ],
});

export default ksh;
