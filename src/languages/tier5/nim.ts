/**
 * Nim language definition
 */
import { defineLang } from '../define-lang.js';

export const nim = defineLang({
  name: 'nim',
  aliases: ['nimrod'],
  extensions: ['.nim', '.nims', '.nimble'],
  keywords: [
    'addr', 'and', 'as', 'asm', 'bind', 'block', 'break', 'case', 'cast',
    'concept', 'const', 'continue', 'converter', 'defer', 'discard', 'distinct',
    'div', 'do', 'elif', 'else', 'end', 'enum', 'except', 'export', 'finally',
    'for', 'from', 'func', 'if', 'import', 'in', 'include', 'interface',
    'is', 'isnot', 'iterator', 'let', 'macro', 'method', 'mixin', 'mod',
    'nil', 'not', 'notin', 'object', 'of', 'or', 'out', 'proc', 'ptr',
    'raise', 'ref', 'return', 'shl', 'shr', 'static', 'template', 'try',
    'tuple', 'type', 'using', 'var', 'when', 'while', 'xor', 'yield',
  ],
  typeKeywords: [
    // Primitive types
    'int', 'int8', 'int16', 'int32', 'int64',
    'uint', 'uint8', 'uint16', 'uint32', 'uint64',
    'float', 'float32', 'float64',
    'bool', 'char', 'string', 'cstring', 'pointer', 'typedesc', 'void',
    'auto', 'any', 'untyped', 'typed',
    // Collection types
    'seq', 'array', 'set', 'Table', 'HashSet', 'OrderedTable', 'CountTable',
    'Deque', 'DoublyLinkedList', 'SinglyLinkedList', 'HeapQueue',
    // Range types
    'range', 'Slice', 'HSlice', 'BackwardsIndex',
    // Other types
    'Natural', 'Positive', 'RootObj', 'RootRef', 'Ordinal', 'SomeInteger',
    'SomeFloat', 'SomeNumber', 'SomeOrdinal',
  ],
  constants: [
    'true', 'false', 'nil', 'on', 'off',
  ],
  builtins: [
    // Common procedures
    'echo', 'debugEcho', 'assert', 'doAssert', 'quit', 'sizeof', 'typeof',
    'defined', 'declared', 'compiles', 'astToStr', 'gorge', 'staticRead',
    'staticExec', 'slurp',
    // Conversion
    'ord', 'chr', 'low', 'high', 'len', 'pred', 'succ', 'inc', 'dec',
    // Math
    'abs', 'min', 'max', 'clamp', 'sgn',
    // Sequence/string operations
    'add', 'del', 'delete', 'insert', 'pop', 'contains', 'find', 'rfind',
    'count', 'setLen', 'newSeq', 'newString', 'newSeqOfCap',
    // Comparisons
    'cmp', 'system.cmp',
    // Memory
    'new', 'newRef', 'alloc', 'alloc0', 'realloc', 'dealloc', 'allocShared',
    'allocShared0', 'reallocShared', 'deallocShared',
    // Iterators
    'items', 'mitems', 'pairs', 'mpairs', 'fields', 'fieldPairs',
    'countdown', 'countup',
  ],
  patterns: [
    // Pragmas
    { pattern: /\{\.[\s\S]*?\.\}/g, type: 'decorator' },
    // Documentation comments
    { pattern: /##[^\n]*/g, type: 'comment' },
    // Raw strings
    { pattern: /r"[^"]*"/g, type: 'string' },
    { pattern: /"""[\s\S]*?"""/g, type: 'string' },
    // Character literals
    { pattern: /'(?:[^'\\]|\\[nrt\\'"0]|\\x[0-9a-fA-F]{2})'/g, type: 'string' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+(?:'?[iIuUfF](?:8|16|32|64))?\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+(?:'?[iIuUfF](?:8|16|32|64))?\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+(?:'?[iIuUfF](?:8|16|32|64))?\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?(?:'?[iIuUfFdD](?:8|16|32|64)?)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=@$~?:]+|\.\.<?/g, type: 'operator' },
    // Function calls
    { pattern: /[a-zA-Z_]\w*(?=\s*(?:\(|"))/g, type: 'function' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '#',
    block: { start: '#[', end: ']#' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default nim;
