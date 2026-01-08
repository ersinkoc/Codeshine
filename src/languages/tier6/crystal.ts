/**
 * Crystal programming language definition
 */
import { defineLang } from '../define-lang.js';

export const crystal = defineLang({
  name: 'crystal',
  aliases: ['cr'],
  extensions: ['.cr'],
  keywords: [
    // Control flow
    'if', 'elsif', 'else', 'unless', 'case', 'when', 'select', 'while', 'until',
    'loop', 'for', 'in', 'do', 'begin', 'rescue', 'ensure', 'raise', 'return',
    'break', 'next', 'yield', 'with',
    // Declarations
    'class', 'struct', 'module', 'enum', 'lib', 'fun', 'type', 'alias', 'annotation',
    'def', 'macro', 'abstract', 'private', 'protected', 'getter', 'setter', 'property',
    // Modifiers
    'self', 'super', 'previous_def', 'forall', 'extend', 'include', 'require',
    'as', 'as?', 'is_a?', 'nil?', 'responds_to?', 'typeof', 'sizeof', 'instance_sizeof',
    'offsetof', 'pointerof', 'uninitialized', 'out', 'asm', 'verbatim',
    // Logic
    'and', 'or', 'not', 'end', 'true', 'false', 'nil',
  ],
  typeKeywords: [
    'Nil', 'Bool', 'Char', 'String', 'Symbol', 'Int8', 'Int16', 'Int32', 'Int64', 'Int128',
    'UInt8', 'UInt16', 'UInt32', 'UInt64', 'UInt128', 'Float32', 'Float64',
    'Array', 'Hash', 'Set', 'Range', 'Regex', 'Tuple', 'NamedTuple', 'Proc',
    'Pointer', 'Slice', 'StaticArray', 'Union', 'Void', 'NoReturn', 'Exception',
    'Object', 'Reference', 'Value', 'Struct', 'Enum', 'Class',
    'Iterator', 'Iterable', 'Indexable', 'Comparable', 'Enumerable',
    'IO', 'File', 'Dir', 'Path', 'Socket', 'TCPSocket', 'UDPSocket', 'HTTP',
    'JSON', 'YAML', 'XML', 'CSV', 'Time', 'Random', 'Regex', 'URI', 'UUID',
    'Channel', 'Fiber', 'Mutex', 'Atomic', 'WaitGroup',
  ],
  constants: [
    'true', 'false', 'nil', 'ARGV', 'PROGRAM_NAME', 'STDIN', 'STDOUT', 'STDERR',
    '__LINE__', '__FILE__', '__DIR__', '__END_LINE__',
  ],
  builtins: [
    // Kernel methods
    'puts', 'print', 'p', 'pp', 'gets', 'raise', 'exit', 'abort', 'sleep', 'spawn', 'system',
    'typeof', 'sizeof', 'instance_sizeof', 'offsetof', 'pointerof',
    // Object methods
    'class', 'clone', 'dup', 'hash', 'inspect', 'to_s', 'pretty_print', 'tap', 'try',
    'not_nil!', 'as', 'is_a?', 'nil?', 'responds_to?', 'itself',
    // Enumerable
    'each', 'map', 'select', 'reject', 'reduce', 'find', 'any?', 'all?', 'none?',
    'one?', 'count', 'sum', 'product', 'min', 'max', 'minmax', 'first', 'last',
    'take', 'skip', 'take_while', 'skip_while', 'group_by', 'partition', 'sort', 'sort_by',
    'reverse', 'compact', 'flatten', 'uniq', 'zip', 'to_a', 'to_h', 'to_set', 'join',
    // Array
    'push', 'pop', 'shift', 'unshift', 'insert', 'delete', 'delete_at', 'clear',
    'size', 'empty?', 'includes?', 'index', 'rindex', 'sample', 'shuffle', 'fill',
    // String
    'chomp', 'strip', 'lstrip', 'rstrip', 'upcase', 'downcase', 'capitalize',
    'gsub', 'sub', 'split', 'lines', 'chars', 'bytes', 'match', 'includes?',
    'starts_with?', 'ends_with?', 'blank?', 'presence', 'to_i', 'to_f',
    // Numeric
    'abs', 'ceil', 'floor', 'round', 'truncate', 'clamp', 'times', 'upto', 'downto',
    'gcd', 'lcm', 'divisible_by?', 'even?', 'odd?', 'positive?', 'negative?', 'zero?',
  ],
  patterns: [
    // Annotations
    { pattern: /@\[[^\]]+\]/g, type: 'decorator' },
    // Instance/class variables
    { pattern: /@@?[a-z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Symbols
    { pattern: /:[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'symbol' },
    // Regex
    { pattern: /\/(?:[^\/\\]|\\.)*\/[imx]*/g, type: 'regexp' },
    // Constants
    { pattern: /\b[A-Z][A-Z0-9_]*\b/g, type: 'constant' },
    // Types (PascalCase)
    { pattern: /\b[A-Z][a-zA-Z0-9_]*\b/g, type: 'type' },
    // Character literals
    { pattern: /'(?:[^'\\]|\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|u\{[0-9a-fA-F]+\}|.))'/g, type: 'string' },
    // Hexadecimal
    { pattern: /\b0x[0-9a-fA-F_]+(?:_[iu]\d+)?\b/g, type: 'number' },
    // Octal
    { pattern: /\b0o[0-7_]+(?:_[iu]\d+)?\b/g, type: 'number' },
    // Binary
    { pattern: /\b0b[01_]+(?:_[iu]\d+)?\b/g, type: 'number' },
    // Float
    { pattern: /\b\d[\d_]*\.[\d_]+(?:[eE][+-]?[\d_]+)?(?:_f32|_f64)?\b/g, type: 'number' },
    // Integer
    { pattern: /\b\d[\d_]*(?:_[iu]\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=~]+|\.\.|\.\.\.|\*\*|<=>|=~|!~|===|<</g, type: 'operator' },
  ],
  strings: [
    { start: '<<-', end: /\n\w+$/, escape: '\\' },
    { start: '%Q(', end: ')', escape: '\\' },
    { start: '%q(', end: ')', escape: '' },
    { start: '%(', end: ')', escape: '\\' },
    { start: '"', end: '"', escape: '\\', interpolation: { start: '#{', end: '}' } },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: 'do', close: 'end' },
  ],
});

export default crystal;
