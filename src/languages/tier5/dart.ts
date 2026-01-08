/**
 * Dart language definition
 */
import { defineLang } from '../define-lang.js';

export const dart = defineLang({
  name: 'dart',
  aliases: [],
  extensions: ['.dart'],
  keywords: [
    'abstract', 'as', 'assert', 'async', 'await', 'base', 'break', 'case',
    'catch', 'class', 'const', 'continue', 'covariant', 'default', 'deferred',
    'do', 'dynamic', 'else', 'enum', 'export', 'extends', 'extension',
    'external', 'factory', 'final', 'finally', 'for', 'Function', 'get',
    'hide', 'if', 'implements', 'import', 'in', 'interface', 'is', 'late',
    'library', 'mixin', 'new', 'of', 'on', 'operator', 'part', 'required',
    'rethrow', 'return', 'sealed', 'set', 'show', 'static', 'super', 'switch',
    'sync', 'this', 'throw', 'try', 'typedef', 'var', 'void', 'when', 'while',
    'with', 'yield',
  ],
  typeKeywords: [
    'int', 'double', 'num', 'bool', 'String', 'dynamic', 'void', 'Object',
    'Null', 'Never', 'Function', 'Type', 'Symbol', 'Runes',
    'List', 'Set', 'Map', 'Iterable', 'Iterator', 'Stream', 'Future',
    'FutureOr', 'Duration', 'DateTime', 'Uri', 'BigInt', 'Pattern', 'Match',
    'RegExp', 'Error', 'Exception', 'StackTrace', 'Enum', 'Record',
  ],
  constants: [
    'true', 'false', 'null',
  ],
  builtins: [
    'print', 'identical', 'identityHashCode',
  ],
  patterns: [
    // Annotations
    { pattern: /@[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*/g, type: 'decorator' },
    // String interpolation
    { pattern: /\$\{[^}]*\}/g, type: 'variable' },
    { pattern: /\$[a-zA-Z_]\w*/g, type: 'variable' },
    // Raw strings
    { pattern: /r'[^']*'/g, type: 'string' },
    { pattern: /r"[^"]*"/g, type: 'string' },
    { pattern: /r'''[\s\S]*?'''/g, type: 'string' },
    { pattern: /r"""[\s\S]*?"""/g, type: 'string' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Symbols
    { pattern: /#[a-zA-Z_]\w*/g, type: 'symbol' },
    // Cascade operator
    { pattern: /\.\./g, type: 'operator' },
    // Null-aware operators
    { pattern: /\?\?=?|\?\.|\?!\./g, type: 'operator' },
    // Spread operator
    { pattern: /\.\.\.(?:\?)?/g, type: 'operator' },
    // Other operators
    { pattern: /[+\-*\/%&|^!<>=~]+|=>/g, type: 'operator' },
    // Type casts
    { pattern: /\bas\b/g, type: 'keyword' },
    { pattern: /\bis\s*!/g, type: 'keyword' },
  ],
  strings: [
    { start: "'''", end: "'''", escape: '\\' },
    { start: '"""', end: '"""', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
  ],
});

export default dart;
