/**
 * AWK programming language definition
 */
import { defineLang } from '../define-lang.js';

export const awk = defineLang({
  name: 'awk',
  aliases: ['gawk', 'mawk', 'nawk'],
  extensions: ['.awk', '.gawk'],
  keywords: [
    // Control flow
    'if', 'else', 'while', 'do', 'for', 'in', 'break', 'continue',
    'return', 'exit', 'next', 'nextfile', 'delete', 'switch', 'case', 'default',
    // Special patterns
    'BEGIN', 'END', 'BEGINFILE', 'ENDFILE',
    // Declarations
    'function', 'func',
    // Operators
    'getline', 'print', 'printf', 'sprintf', 'close', 'fflush', 'system',
  ],
  constants: [
    'NR', 'NF', 'FS', 'RS', 'OFS', 'ORS', 'OFMT', 'CONVFMT',
    'FILENAME', 'FNR', 'ARGC', 'ARGV', 'ENVIRON', 'ERRNO',
    'RSTART', 'RLENGTH', 'SUBSEP', 'TEXTDOMAIN', 'BINMODE', 'LINT',
    'PREC', 'ROUNDMODE', 'FIELDWIDTHS', 'FPAT', 'IGNORECASE', 'PROCINFO', 'RT',
  ],
  builtins: [
    // String functions
    'length', 'substr', 'index', 'split', 'sub', 'gsub', 'match', 'sprintf',
    'tolower', 'toupper', 'asort', 'asorti', 'gensub', 'patsplit', 'strftime',
    // Math functions
    'sin', 'cos', 'atan2', 'exp', 'log', 'sqrt', 'int', 'rand', 'srand',
    // I/O functions
    'getline', 'close', 'fflush', 'system', 'print', 'printf',
    // Bit functions (gawk)
    'and', 'or', 'xor', 'compl', 'lshift', 'rshift',
    // Type functions (gawk)
    'isarray', 'typeof', 'bindtextdomain', 'dcgettext', 'dcngettext',
    // Time functions (gawk)
    'mktime', 'strftime', 'systime',
  ],
  patterns: [
    // Field references
    { pattern: /\$\d+/g, type: 'variable' },
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Regex
    { pattern: /\/(?:[^\/\\]|\\.)*\//g, type: 'regexp' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%^]=?|[<>=!]=?|&&|\|\||[~!?:]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
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

export default awk;
