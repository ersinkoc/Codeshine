/**
 * TCSH (TENEX C Shell) language definition
 */
import { defineLang } from '../define-lang.js';

export const tcsh = defineLang({
  name: 'tcsh',
  aliases: ['csh'],
  extensions: ['.tcsh', '.csh'],
  keywords: [
    'if', 'then', 'else', 'endif', 'switch', 'case', 'breaksw', 'default', 'endsw',
    'while', 'end', 'foreach', 'break', 'continue', 'goto', 'repeat',
    'set', 'setenv', 'unset', 'unsetenv', 'alias', 'unalias',
    'source', 'exit', 'exec', 'eval', 'return',
  ],
  builtins: [
    'cd', 'pushd', 'popd', 'dirs', 'echo', 'glob', 'history', 'jobs', 'kill',
    'limit', 'login', 'logout', 'nice', 'nohup', 'notify', 'onintr', 'rehash',
    'sched', 'shift', 'stop', 'suspend', 'time', 'umask', 'unhash', 'wait',
    'where', 'which', 'bg', 'fg', 'bindkey', 'builtins', 'complete', 'filetest',
    'hashstat', 'hup', 'log', 'ls-F', 'newgrp', 'printenv', 'rootnode',
    'settc', 'setty', 'telltc', 'termname', 'uncomplete', 'ver', 'watchlog',
  ],
  patterns: [
    // Shebang
    { pattern: /^#!.*$/gm, type: 'comment' },
    // Variables
    { pattern: /\$[?#$!0-9]|\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    // History expansion
    { pattern: /![!#$*@0-9-]|!\?[^?]+\??|![a-zA-Z][a-zA-Z0-9]*/g, type: 'variable' },
    // Modifiers
    { pattern: /:[aeghqrstux&]/g, type: 'operator' },
    // Command substitution
    { pattern: /`[^`]*`/g, type: 'string' },
    // Numbers
    { pattern: /\b\d+\b/g, type: 'number' },
    // Operators
    { pattern: /[|&;<>(){}!=~]+|&&|\|\|/g, type: 'operator' },
    // Glob patterns
    { pattern: /[*?[\]]/g, type: 'operator' },
  ],
  strings: [
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
  ],
});

export default tcsh;
