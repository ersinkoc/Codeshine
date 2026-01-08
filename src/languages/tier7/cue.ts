/**
 * CUE configuration language definition
 */
import { defineLang } from '../define-lang.js';

export const cue = defineLang({
  name: 'cue',
  aliases: ['cuelang'],
  extensions: ['.cue'],
  keywords: [
    'package', 'import', 'let', 'if', 'for', 'in', 'true', 'false', 'null',
    'and', 'or', 'not', 'div', 'mod', 'quo', 'rem',
  ],
  typeKeywords: [
    'bool', 'string', 'bytes', 'number', 'int', 'float', 'uint', 'int8', 'int16',
    'int32', 'int64', 'int128', 'uint8', 'uint16', 'uint32', 'uint64', 'uint128',
    'float32', 'float64', 'rune',
  ],
  constants: [
    'true', 'false', 'null', '_', '_|_', 'top', 'bottom',
  ],
  builtins: [
    // Standard library
    'len', 'close', 'and', 'or', 'div', 'mod', 'quo', 'rem',
    // encoding/json
    'json', 'Marshal', 'MarshalStream', 'Unmarshal', 'UnmarshalStream',
    'Validate', 'Indent', 'HTMLEscape', 'Compact',
    // encoding/yaml
    'yaml', 'MarshalStream', 'UnmarshalStream',
    // encoding/csv
    'csv', 'Decode', 'Encode',
    // encoding/base64
    'base64', 'Decode', 'Encode',
    // encoding/hex
    'hex', 'Decode', 'Encode', 'Dump', 'EncodedLen', 'DecodedLen',
    // list
    'list', 'Avg', 'Contains', 'Drop', 'FlattenN', 'IsSorted', 'IsSortedStrings',
    'Max', 'MaxItems', 'Min', 'MinItems', 'Mul', 'Product', 'Range', 'Repeat',
    'Slice', 'Sort', 'SortStable', 'SortStrings', 'Sum', 'Take', 'UniqueItems',
    // math
    'math', 'Abs', 'Acos', 'Acosh', 'Asin', 'Asinh', 'Atan', 'Atan2', 'Atanh',
    'Cbrt', 'Ceil', 'Copysign', 'Cos', 'Cosh', 'Dim', 'Erf', 'Erfc', 'Erfcinv',
    'Erfinv', 'Exp', 'Exp2', 'Expm1', 'Floor', 'Gamma', 'Hypot', 'Ilogb', 'J0',
    'J1', 'Jn', 'Ldexp', 'Lgamma', 'Log', 'Log10', 'Log1p', 'Log2', 'Logb',
    'Max', 'Min', 'Mod', 'Modf', 'MultipleOf', 'NaN', 'Nextafter', 'Pow',
    'Pow10', 'Remainder', 'Round', 'RoundToEven', 'Signbit', 'Sin', 'Sincos',
    'Sinh', 'Sqrt', 'Tan', 'Tanh', 'Trunc', 'Y0', 'Y1', 'Yn',
    // net
    'net', 'FQDN', 'IPv4', 'IPv6', 'IP', 'LoopbackIP', 'MulticastIP', 'UnicastIP',
    'GlobalUnicastIP', 'InterfaceLocalMulticastIP', 'LinkLocalMulticastIP',
    'LinkLocalUnicastIP', 'SplitHostPort', 'JoinHostPort',
    // path
    'path', 'Base', 'Clean', 'Dir', 'Ext', 'IsAbs', 'Join', 'Match', 'Resolve',
    'Split', 'SplitList',
    // regexp
    'regexp', 'Find', 'FindAll', 'FindAllNamedSubmatch', 'FindAllSubmatch',
    'FindNamedSubmatch', 'FindSubmatch', 'Match', 'QuoteMeta', 'ReplaceAll',
    'ReplaceAllLiteral', 'Split', 'Valid',
    // strings
    'strings', 'ByteAt', 'ByteSlice', 'Compare', 'Contains', 'ContainsAny',
    'Count', 'Fields', 'HasPrefix', 'HasSuffix', 'Index', 'IndexAny',
    'Join', 'LastIndex', 'LastIndexAny', 'MinRunes', 'MaxRunes', 'Repeat',
    'Replace', 'Runes', 'SliceRunes', 'Split', 'SplitAfter', 'SplitAfterN',
    'SplitN', 'Title', 'ToLower', 'ToTitle', 'ToUpper', 'ToValidUTF8', 'Trim',
    'TrimLeft', 'TrimPrefix', 'TrimRight', 'TrimSpace', 'TrimSuffix',
    // struct
    'struct', 'MaxFields', 'MinFields',
    // text/tabwriter
    'text', 'tabwriter', 'Write',
    // text/template
    'template', 'Execute', 'HTMLEscape', 'JSEscape',
    // time
    'time', 'Duration', 'Format', 'Parse', 'ParseDuration', 'Time', 'Unix',
    // tool
    'tool', 'cli', 'exec', 'file', 'http', 'os',
  ],
  patterns: [
    // Field references
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'property' },
    // Attribute
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Definitions
    { pattern: /#[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'type' },
    // Numbers
    { pattern: /\b0[xXoObB][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?[KMGTP]?i?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|\?|:/g, type: 'operator' },
  ],
  strings: [
    { start: '#"""', end: '"""#', escape: '' },
    { start: "#'''", end: "'''#", escape: '' },
    { start: '"""', end: '"""', escape: '\\' },
    { start: "'''", end: "'''", escape: '\\' },
    { start: '#"', end: '"#', escape: '' },
    { start: "#'", end: "'#", escape: '' },
    { start: '"', end: '"', escape: '\\', interpolation: { start: '\\(', end: ')' } },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '//',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default cue;
