/**
 * Scala language definition
 */
import { defineLang } from '../define-lang.js';

export const scala = defineLang({
  name: 'scala',
  aliases: ['sc'],
  extensions: ['.scala', '.sc', '.sbt'],
  keywords: [
    // Declarations
    'abstract', 'case', 'catch', 'class', 'def', 'do', 'else', 'enum',
    'export', 'extends', 'extension', 'final', 'finally', 'for', 'forSome',
    'given', 'if', 'implicit', 'import', 'infix', 'inline', 'lazy', 'macro',
    'match', 'new', 'object', 'opaque', 'open', 'override', 'package',
    'private', 'protected', 'return', 'sealed', 'super', 'then', 'this',
    'throw', 'trait', 'transparent', 'try', 'type', 'using', 'val', 'var',
    'while', 'with', 'yield',
    // Soft keywords
    'derives', 'end', 'erased', 'given', 'infix', 'inline', 'opaque', 'open',
    'transparent', 'using',
  ],
  typeKeywords: [
    'Boolean', 'Byte', 'Char', 'Double', 'Float', 'Int', 'Long', 'Short',
    'Unit', 'String', 'Any', 'AnyRef', 'AnyVal', 'Nothing', 'Null',
    'Array', 'List', 'Map', 'Set', 'Seq', 'Vector', 'Option', 'Some', 'None',
    'Either', 'Left', 'Right', 'Try', 'Success', 'Failure', 'Future',
    'Tuple1', 'Tuple2', 'Tuple3', 'Function0', 'Function1', 'Function2',
  ],
  constants: [
    'true', 'false', 'null', 'Nil',
  ],
  builtins: [
    'println', 'print', 'printf', 'readLine', 'readInt', 'readDouble',
    'require', 'assert', 'assume',
  ],
  patterns: [
    // Annotations
    { pattern: /@[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*/g, type: 'decorator' },
    // Type parameters
    { pattern: /\[[^\]]+\]/g, type: 'type' },
    // Interpolated strings
    { pattern: /[a-z]"(?:[^"\\]|\\.)*"/g, type: 'string' },
    { pattern: /[a-z]"""[\s\S]*?"""/g, type: 'string' },
    // Symbols
    { pattern: /'[a-zA-Z_]\w*/g, type: 'symbol' },
    // Backtick identifiers
    { pattern: /`[^`]+`/g, type: 'variable' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+[Ll]?\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+[Ll]?\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?[fFdDlL]?\b/g, type: 'number' },
    // Function definitions
    { pattern: /\bdef\s+([a-zA-Z_]\w*)/g, type: 'function', captures: [null, 'function'] },
    // Class/trait/object definitions
    { pattern: /\b(class|trait|object|enum)\s+([a-zA-Z_]\w*)/g, type: 'keyword', captures: [null, 'keyword', 'class'] },
    // Operators
    { pattern: /=>|<-|::|##|@@|\+\+|--|[+\-*\/%&|^!<>=:]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '' },
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
  ],
});

export default scala;
