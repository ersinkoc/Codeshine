/**
 * F# language definition
 */
import { defineLang } from '../define-lang.js';

export const fsharp = defineLang({
  name: 'fsharp',
  aliases: ['fs', 'fsi', 'fsx'],
  extensions: ['.fs', '.fsi', '.fsx', '.fsscript'],
  keywords: [
    'abstract', 'and', 'as', 'assert', 'base', 'begin', 'class', 'default',
    'delegate', 'do', 'done', 'downcast', 'downto', 'elif', 'else', 'end',
    'exception', 'extern', 'false', 'finally', 'fixed', 'for', 'fun', 'function',
    'global', 'if', 'in', 'inherit', 'inline', 'interface', 'internal', 'lazy',
    'let', 'let!', 'match', 'match!', 'member', 'module', 'mutable', 'namespace',
    'new', 'not', 'null', 'of', 'open', 'or', 'override', 'private', 'public',
    'rec', 'return', 'return!', 'select', 'static', 'struct', 'then', 'to',
    'true', 'try', 'type', 'upcast', 'use', 'use!', 'val', 'void', 'when',
    'while', 'with', 'yield', 'yield!',
    // Computation expressions
    'async', 'task', 'seq',
  ],
  typeKeywords: [
    'bool', 'byte', 'sbyte', 'int16', 'uint16', 'int', 'int32', 'uint32',
    'int64', 'uint64', 'nativeint', 'unativeint', 'float', 'float32', 'double',
    'decimal', 'char', 'string', 'unit', 'obj', 'exn',
    'array', 'list', 'seq', 'option', 'voption', 'Result', 'Map', 'Set',
    'Async', 'Task', 'Lazy', 'ref',
  ],
  constants: [
    'true', 'false', 'null', 'None', 'Some',
  ],
  builtins: [
    // Core functions
    'id', 'ignore', 'fst', 'snd', 'not', 'defaultArg', 'invalidArg', 'invalidOp',
    'nullArg', 'failwith', 'raise', 'reraise', 'exit',
    // Numeric
    'abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos', 'cosh', 'exp',
    'floor', 'log', 'log10', 'pown', 'round', 'sign', 'sin', 'sinh', 'sqrt',
    'tan', 'tanh', 'truncate', 'infinity', 'nan',
    // Comparison
    'compare', 'hash', 'min', 'max',
    // Conversion
    'box', 'unbox', 'string', 'int', 'int64', 'float', 'float32', 'decimal',
    'byte', 'sbyte', 'char', 'enum',
    // Collections
    'Array', 'List', 'Seq', 'Map', 'Set', 'Option', 'Result',
    // I/O
    'printfn', 'printf', 'eprintfn', 'eprintf', 'sprintf', 'failwithf',
    'stdin', 'stdout', 'stderr',
  ],
  patterns: [
    // Attributes
    { pattern: /\[<[^\]]+>\]/g, type: 'decorator' },
    // Type annotations
    { pattern: /:\s*[A-Z][a-zA-Z0-9_'<>., ]*/g, type: 'type' },
    // Active patterns
    { pattern: /\(\|[\w|]+\|\)/g, type: 'function' },
    // Quoted identifiers
    { pattern: /``[^`]+``/g, type: 'variable' },
    // Unit
    { pattern: /\(\)/g, type: 'type' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+(?:u?[yslLn]|UL)?\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+(?:u?[yslLn]|UL)?\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+(?:u?[yslLn]|UL)?\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?[fFmM]?\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:u?[yslLn]|UL)?\b/g, type: 'number' },
    // Operators
    { pattern: /\|>|<\||>>|<<|:>|:\?>|<-|->|::|\.\.|<=|>=|<>|&&|\|\||[+\-*\/%&|^!<>=@~?:]+/g, type: 'operator' },
    // String interpolation
    { pattern: /\$"(?:[^"\\{]|\\.|{[^}]*})*"/g, type: 'string' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '' },
    { start: '@"', end: '"', escape: '""' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '(*', end: '*)' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '[|', close: '|]' },
    { open: '[<', close: '>]' },
  ],
});

export default fsharp;
