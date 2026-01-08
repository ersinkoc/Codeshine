/**
 * V language definition
 */
import { defineLang } from '../define-lang.js';

export const vlang = defineLang({
  name: 'vlang',
  aliases: ['v'],
  extensions: ['.v', '.vv', '.vsh'],
  keywords: [
    'as', 'asm', 'assert', 'atomic', 'break', 'const', 'continue', 'defer',
    'else', 'enum', 'false', 'fn', 'for', 'go', 'goto', 'if', 'import', 'in',
    'interface', 'is', 'isreftype', 'lock', 'match', 'module', 'mut', 'none',
    'or', 'pub', 'return', 'rlock', 'select', 'shared', 'sizeof', 'spawn',
    'static', 'struct', 'true', 'type', 'typeof', 'union', 'unsafe', 'volatile',
    '__offsetof', '__global',
  ],
  typeKeywords: [
    // Primitive types
    'bool', 'string', 'rune', 'char',
    'i8', 'i16', 'int', 'i64', 'i128', 'isize',
    'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
    'f32', 'f64',
    'byte', 'byteptr', 'voidptr', 'charptr',
    // Array/map types
    'array', 'map', 'chan', 'thread',
    // Special types
    'any', 'none',
  ],
  constants: [
    'true', 'false', 'none',
  ],
  builtins: [
    // Built-in functions
    'print', 'println', 'eprint', 'eprintln', 'panic', 'exit',
    'error', 'dump', 'typeof', 'sizeof', 'isreftype',
  ],
  patterns: [
    // Attributes
    { pattern: /\[[\w\s;:='"]+\]/g, type: 'decorator' },
    // String interpolation
    { pattern: /\$\{[^}]*\}/g, type: 'variable' },
    { pattern: /\$[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*/g, type: 'variable' },
    // Raw strings
    { pattern: /r'[^']*'/g, type: 'string' },
    { pattern: /r"[^"]*"/g, type: 'string' },
    // C string literals
    { pattern: /c'[^']*'/g, type: 'string' },
    { pattern: /c"[^"]*"/g, type: 'string' },
    // Character literals
    { pattern: /`(?:[^`\\]|\\[nrt\\`'"0]|\\x[0-9a-fA-F]{2}|\\u[0-9a-fA-F]{4})`/g, type: 'string' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Range operator
    { pattern: /\.\./g, type: 'operator' },
    // Arrow
    { pattern: /=>/g, type: 'operator' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=]=?|&&|\|\||<<|>>|\?\?/g, type: 'operator' },
  ],
  strings: [
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
  ],
});

export default vlang;
