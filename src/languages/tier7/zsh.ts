/**
 * Zsh shell language definition
 */
import { defineLang } from '../define-lang.js';

export const zsh = defineLang({
  name: 'zsh',
  aliases: ['zshell'],
  extensions: ['.zsh', '.zshrc', '.zshenv', '.zprofile', '.zlogin', '.zlogout'],
  keywords: [
    // Control flow
    'if', 'then', 'else', 'elif', 'fi', 'case', 'esac', 'for', 'select',
    'while', 'until', 'do', 'done', 'in', 'function', 'time', 'coproc',
    // Builtins
    'alias', 'autoload', 'bg', 'bindkey', 'break', 'builtin', 'bye', 'cap',
    'cd', 'chdir', 'clone', 'command', 'comparguments', 'compcall', 'compctl',
    'compdescribe', 'compfiles', 'compgroups', 'compquote', 'comptags',
    'comptry', 'compvalues', 'continue', 'declare', 'dirs', 'disable',
    'disown', 'echo', 'echotc', 'echoti', 'emulate', 'enable', 'eval',
    'exec', 'exit', 'export', 'false', 'fc', 'fg', 'float', 'functions',
    'getcap', 'getln', 'getopts', 'hash', 'history', 'integer', 'jobs',
    'kill', 'let', 'limit', 'local', 'log', 'logout', 'noglob', 'popd',
    'print', 'printf', 'pushd', 'pushln', 'pwd', 'r', 'read', 'readonly',
    'rehash', 'return', 'sched', 'set', 'setcap', 'setopt', 'shift',
    'source', 'stat', 'suspend', 'test', 'times', 'trap', 'true', 'ttyctl',
    'type', 'typeset', 'ulimit', 'umask', 'unalias', 'unfunction', 'unhash',
    'unlimit', 'unset', 'unsetopt', 'vared', 'wait', 'whence', 'where',
    'which', 'zcompile', 'zformat', 'zftp', 'zle', 'zmodload', 'zparseopts',
    'zprof', 'zpty', 'zregexparse', 'zsocket', 'zstyle', 'ztcp',
  ],
  constants: [
    'true', 'false', 'null',
    'HOME', 'PATH', 'PWD', 'OLDPWD', 'USER', 'SHELL', 'TERM', 'EDITOR',
    'VISUAL', 'PAGER', 'LANG', 'LC_ALL', 'ZDOTDIR', 'HISTFILE', 'HISTSIZE',
    'SAVEHIST', 'ZSH_VERSION', 'RANDOM', 'SECONDS', 'LINENO', 'PPID', 'UID', 'EUID', 'GID', 'EGID',
  ],
  patterns: [
    // Variables
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    { pattern: /\$\([^)]+\)/g, type: 'interpolation' },
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    { pattern: /\$[0-9@#?$!*-]/g, type: 'variable' },
    // Glob patterns
    { pattern: /\*\*?|\?|\[[\^!]?[^\]]+\]/g, type: 'regexp' },
    // Options
    { pattern: /\s--?[a-zA-Z][a-zA-Z0-9-]*/g, type: 'attribute' },
    // Redirections
    { pattern: /[0-9]*[<>]{1,2}[&]?[0-9]*/g, type: 'operator' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[|&;<>!]+|\|\||&&|\[\[|\]\]/g, type: 'operator' },
  ],
  strings: [
    { start: '$"', end: '"', escape: '\\', interpolation: { start: '$', end: '' } },
    { start: "$'", end: "'", escape: '\\' },
    { start: '"', end: '"', escape: '\\', interpolation: { start: '$', end: '' } },
    { start: "'", end: "'", escape: '' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '[[', close: ']]' },
  ],
});

export default zsh;
