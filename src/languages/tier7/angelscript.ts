/**
 * AngelScript language definition
 */
import { defineLang } from '../define-lang.js';

export const angelscript = defineLang({
  name: 'angelscript',
  aliases: ['as', 'angel'],
  extensions: ['.as', '.angelscript'],
  keywords: [
    'and', 'abstract', 'auto', 'bool', 'break', 'case', 'cast', 'catch', 'class',
    'const', 'continue', 'default', 'do', 'double', 'else', 'enum', 'explicit',
    'external', 'false', 'final', 'float', 'for', 'from', 'funcdef', 'function',
    'get', 'if', 'import', 'in', 'inout', 'int', 'int8', 'int16', 'int32', 'int64',
    'interface', 'is', 'mixin', 'namespace', 'not', 'null', 'or', 'out', 'override',
    'private', 'property', 'protected', 'return', 'set', 'shared', 'super', 'switch',
    'this', 'true', 'try', 'typedef', 'uint', 'uint8', 'uint16', 'uint32', 'uint64',
    'void', 'while', 'xor',
  ],
  typeKeywords: [
    'bool', 'int', 'int8', 'int16', 'int32', 'int64', 'uint', 'uint8', 'uint16',
    'uint32', 'uint64', 'float', 'double', 'string', 'void', 'auto', 'array',
    'dictionary', 'ref', 'any', 'weakref', 'const_weakref',
  ],
  constants: [
    'true', 'false', 'null',
  ],
  builtins: [
    // String methods
    'length', 'resize', 'isEmpty', 'substr', 'findFirst', 'findFirstOf',
    'findFirstNotOf', 'findLast', 'findLastOf', 'findLastNotOf', 'insert',
    'erase', 'replace', 'split', 'join',
    // Array methods
    'length', 'resize', 'reverse', 'insertAt', 'insertLast', 'removeAt',
    'removeLast', 'removeRange', 'sortAsc', 'sortDesc', 'find', 'findByRef',
    // Math
    'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'atan2', 'cosh', 'sinh', 'tanh',
    'log', 'log10', 'pow', 'sqrt', 'ceil', 'abs', 'floor', 'fraction', 'fpFromIEEE',
    'fpToIEEE', 'closeTo', 'min', 'max',
    // System
    'print', 'println', 'formatInt', 'formatUInt', 'formatFloat', 'parseInt',
    'parseUInt', 'parseFloat', 'getExceptionInfo', 'setExceptionCallback',
  ],
  patterns: [
    // Metadata/Attributes
    { pattern: /\[[\w\s,=:"']+\]/g, type: 'decorator' },
    // Generic types
    { pattern: /<\s*[a-zA-Z_][a-zA-Z0-9_]*(?:\s*,\s*[a-zA-Z_][a-zA-Z0-9_]*)*\s*>/g, type: 'type' },
    // Handle types
    { pattern: /[a-zA-Z_][a-zA-Z0-9_]*@/g, type: 'type' },
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'type' },
    // Hex numbers
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    // Binary numbers
    { pattern: /\b0b[01]+\b/g, type: 'number' },
    // Octal numbers
    { pattern: /\b0o[0-7]+\b/g, type: 'number' },
    // Decimal numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fd]?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~?:]+|&&|\|\||<<|>>|>>>|\^\^|\+\+|--/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '' },
    { start: "'''", end: "'''", escape: '' },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '<', close: '>' },
  ],
});

export default angelscript;
