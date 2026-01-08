/**
 * Perl language definition
 */
import { defineLang } from '../define-lang.js';

export const perl = defineLang({
  name: 'perl',
  aliases: ['pl', 'pm'],
  extensions: ['.pl', '.pm', '.t', '.pod'],
  keywords: [
    // Control flow
    'if', 'elsif', 'else', 'unless', 'while', 'until', 'for', 'foreach',
    'do', 'last', 'next', 'redo', 'goto', 'return',
    // Declaration
    'my', 'our', 'local', 'state', 'sub', 'package', 'use', 'require',
    'no', 'BEGIN', 'END', 'CHECK', 'INIT', 'UNITCHECK',
    // Operators
    'and', 'or', 'not', 'xor', 'eq', 'ne', 'lt', 'gt', 'le', 'ge', 'cmp',
    // Special
    'given', 'when', 'default', 'break', 'continue',
    '__FILE__', '__LINE__', '__PACKAGE__', '__SUB__', '__DATA__', '__END__',
  ],
  typeKeywords: [
    'SCALAR', 'ARRAY', 'HASH', 'CODE', 'REF', 'GLOB', 'LVALUE', 'FORMAT', 'IO', 'VSTRING', 'Regexp',
  ],
  builtins: [
    // Functions
    'abs', 'accept', 'alarm', 'atan2', 'bind', 'binmode', 'bless', 'caller',
    'chdir', 'chmod', 'chomp', 'chop', 'chown', 'chr', 'chroot', 'close',
    'closedir', 'connect', 'cos', 'crypt', 'dbmclose', 'dbmopen', 'defined',
    'delete', 'die', 'dump', 'each', 'endgrent', 'endhostent', 'endnetent',
    'endprotoent', 'endpwent', 'endservent', 'eof', 'eval', 'exec', 'exists',
    'exit', 'exp', 'fcntl', 'fileno', 'flock', 'fork', 'format', 'formline',
    'getc', 'getgrent', 'getgrgid', 'getgrnam', 'gethostbyaddr', 'gethostbyname',
    'gethostent', 'getlogin', 'getnetbyaddr', 'getnetbyname', 'getnetent',
    'getpeername', 'getpgrp', 'getppid', 'getpriority', 'getprotobyname',
    'getprotobynumber', 'getprotoent', 'getpwent', 'getpwnam', 'getpwuid',
    'getservbyname', 'getservbyport', 'getservent', 'getsockname', 'getsockopt',
    'glob', 'gmtime', 'grep', 'hex', 'import', 'index', 'int', 'ioctl', 'join',
    'keys', 'kill', 'lc', 'lcfirst', 'length', 'link', 'listen', 'localtime',
    'log', 'lstat', 'map', 'mkdir', 'msgctl', 'msgget', 'msgrcv', 'msgsnd',
    'oct', 'open', 'opendir', 'ord', 'pack', 'pipe', 'pop', 'pos', 'print',
    'printf', 'prototype', 'push', 'quotemeta', 'rand', 'read', 'readdir',
    'readline', 'readlink', 'readpipe', 'recv', 'ref', 'rename', 'reset',
    'reverse', 'rewinddir', 'rindex', 'rmdir', 'say', 'scalar', 'seek',
    'seekdir', 'select', 'semctl', 'semget', 'semop', 'send', 'setgrent',
    'sethostent', 'setnetent', 'setpgrp', 'setpriority', 'setprotoent',
    'setpwent', 'setservent', 'setsockopt', 'shift', 'shmctl', 'shmget',
    'shmread', 'shmwrite', 'shutdown', 'sin', 'sleep', 'socket', 'socketpair',
    'sort', 'splice', 'split', 'sprintf', 'sqrt', 'srand', 'stat', 'study',
    'substr', 'symlink', 'syscall', 'sysopen', 'sysread', 'sysseek', 'system',
    'syswrite', 'tell', 'telldir', 'tie', 'tied', 'time', 'times', 'truncate',
    'uc', 'ucfirst', 'umask', 'undef', 'unlink', 'unpack', 'unshift', 'untie',
    'utime', 'values', 'vec', 'wait', 'waitpid', 'wantarray', 'warn', 'write',
  ],
  patterns: [
    // Pod documentation
    { pattern: /^=\w+[\s\S]*?^=cut\s*$/gm, type: 'comment' },
    // Heredoc
    { pattern: /<<['"]?(\w+)['"]?[\s\S]*?^\1$/gm, type: 'string' },
    // Regex
    { pattern: /\b(?:m|qr)\s*([\/!#|{(\[])(?:[^\\]|\\.)*?\1[msixpodualngc]*/g, type: 'regexp' },
    { pattern: /\bs\s*([\/!#|{(\[])(?:[^\\]|\\.)*?\1(?:[^\\]|\\.)*?\1[msixpodualngcer]*/g, type: 'regexp' },
    { pattern: /\/(?:[^\/\\]|\\.)+\/[msixpodualngc]*/g, type: 'regexp' },
    // Variables
    { pattern: /\$[a-zA-Z_]\w*/g, type: 'variable' },
    { pattern: /\$\d+/g, type: 'variable' },
    { pattern: /\$[{]?\w+[}]?/g, type: 'variable' },
    { pattern: /@[a-zA-Z_]\w*/g, type: 'variable' },
    { pattern: /%[a-zA-Z_]\w*/g, type: 'variable' },
    { pattern: /\$[!@#$%^&*()_|~=`{}\[\]:";'<>?,.\/-]/g, type: 'variable' },
    // Subroutine calls
    { pattern: /&[a-zA-Z_]\w*/g, type: 'function' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b0[oO]?[0-7_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /->|=>|~~|\/\/|\.\.\.?|\*\*|[+\-*\/%&|^!<>=]=?|<=>|[?:]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
    { start: 'q(', end: ')', escape: '\\' },
    { start: 'qq(', end: ')', escape: '\\' },
    { start: 'qw(', end: ')', escape: '\\' },
    { start: 'qx(', end: ')', escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default perl;
