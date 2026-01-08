/**
 * D programming language definition
 */
import { defineLang } from '../define-lang.js';

export const d = defineLang({
  name: 'd',
  aliases: ['dlang'],
  extensions: ['.d', '.di'],
  keywords: [
    // Control flow
    'if', 'else', 'switch', 'case', 'default', 'while', 'do', 'for', 'foreach',
    'foreach_reverse', 'break', 'continue', 'return', 'goto', 'with', 'try',
    'catch', 'finally', 'throw', 'scope',
    // Declarations
    'alias', 'align', 'asm', 'auto', 'body', 'class', 'const', 'debug', 'delegate',
    'deprecated', 'enum', 'export', 'extern', 'final', 'function', 'immutable',
    'import', 'in', 'inout', 'interface', 'invariant', 'lazy', 'mixin', 'module',
    'new', 'nothrow', 'out', 'override', 'package', 'pragma', 'private', 'protected',
    'public', 'pure', 'ref', 'return', 'shared', 'static', 'struct', 'synchronized',
    'template', 'this', 'typeid', 'typeof', 'union', 'unittest', 'version', 'volatile',
    '__gshared', '__traits', '__vector', '__parameters',
    // Operators
    'is', 'cast', 'assert', 'delete',
    // Special tokens
    '__FILE__', '__LINE__', '__MODULE__', '__FUNCTION__', '__PRETTY_FUNCTION__',
    '__DATE__', '__TIME__', '__TIMESTAMP__', '__VENDOR__', '__VERSION__',
  ],
  typeKeywords: [
    'void', 'bool', 'byte', 'ubyte', 'short', 'ushort', 'int', 'uint', 'long', 'ulong',
    'cent', 'ucent', 'float', 'double', 'real', 'ifloat', 'idouble', 'ireal',
    'cfloat', 'cdouble', 'creal', 'char', 'wchar', 'dchar', 'string', 'wstring', 'dstring',
    'size_t', 'ptrdiff_t', 'hash_t', 'Object', 'Throwable', 'Exception', 'Error',
  ],
  constants: [
    'true', 'false', 'null', '__ctfe',
  ],
  builtins: [
    // Object methods
    'toString', 'toHash', 'opCmp', 'opEquals', 'factory', 'classinfo',
    // Array operations
    'length', 'ptr', 'dup', 'idup', 'reverse', 'sort', 'capacity', 'reserve',
    // Associative array
    'keys', 'values', 'rehash', 'get', 'update', 'require', 'byKey', 'byValue', 'byKeyValue',
    // Phobos
    'writeln', 'writefln', 'write', 'writef', 'readln', 'readf',
    'to', 'text', 'format', 'formattedWrite', 'formattedRead',
    'map', 'filter', 'reduce', 'fold', 'each', 'find', 'count', 'sum', 'product',
    'sort', 'uniq', 'group', 'chunkBy', 'permutations', 'cartesianProduct',
    'take', 'drop', 'takeWhile', 'dropWhile', 'until', 'retro', 'stride', 'chain',
    'array', 'assocArray', 'byLine', 'byChunk', 'splitter', 'joiner',
    'iota', 'repeat', 'sequence', 'recurrence', 'generate',
    'File', 'stdin', 'stdout', 'stderr',
    'abs', 'sgn', 'min', 'max', 'clamp', 'sqrt', 'cbrt', 'pow', 'exp', 'log',
    'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'atan2', 'sinh', 'cosh', 'tanh',
    'floor', 'ceil', 'round', 'trunc', 'fmod', 'modf', 'isNaN', 'isInfinity', 'isFinite',
    'enforce', 'assumeWontThrow', 'collectException', 'collectExceptionMsg',
    'Thread', 'Fiber', 'spawn', 'receive', 'receiveTimeout', 'send', 'thisTid', 'ownerTid',
  ],
  patterns: [
    // Attributes
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Special tokens
    { pattern: /\b__[A-Z_]+__\b/g, type: 'constant' },
    // Character literals
    { pattern: /'(?:[^'\\]|\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8}|[0-7]{1,3}|.))'/g, type: 'string' },
    // Hexadecimal
    { pattern: /\b0[xX][0-9a-fA-F_]+(?:\.[0-9a-fA-F_]+)?(?:[pP][+-]?[0-9_]+)?[fFL]?i?\b/g, type: 'number' },
    // Binary
    { pattern: /\b0[bB][01_]+[uUL]*\b/g, type: 'number' },
    // Decimal float
    { pattern: /\b\d[\d_]*\.[\d_]*(?:[eE][+-]?[\d_]+)?[fFL]?i?\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*[eE][+-]?[\d_]+[fFL]?i?\b/g, type: 'number' },
    // Decimal integer
    { pattern: /\b\d[\d_]*[uUL]*\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=~@$]+|\.\./g, type: 'operator' },
  ],
  strings: [
    { start: '`', end: '`', escape: '' },
    { start: 'r"', end: '"', escape: '' },
    { start: '"', end: '"', escape: '\\' },
    { start: 'q"', end: '"', escape: '' },
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

export default d;
