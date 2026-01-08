/**
 * jq (JSON query language) definition
 */
import { defineLang } from '../define-lang.js';

export const jq = defineLang({
  name: 'jq',
  aliases: ['jqfilter'],
  extensions: ['.jq'],
  keywords: [
    'if', 'then', 'elif', 'else', 'end', 'as', 'def', 'reduce', 'foreach',
    'try', 'catch', 'and', 'or', 'not', 'import', 'include', 'module',
    'label', 'break', 'true', 'false', 'null',
  ],
  builtins: [
    // Type functions
    'type', 'infinite', 'nan', 'isinfinite', 'isnan', 'isnormal', 'isfinite',
    'sort', 'sort_by', 'group_by', 'unique', 'unique_by', 'max', 'min',
    'max_by', 'min_by', 'add', 'any', 'all', 'flatten', 'range', 'floor',
    'sqrt', 'tonumber', 'tostring', 'keys', 'keys_unsorted', 'values',
    'has', 'in', 'map', 'map_values', 'select', 'empty', 'error', 'debug',
    'length', 'utf8bytelength', 'reverse', 'contains', 'inside', 'startswith',
    'endswith', 'indices', 'index', 'rindex', 'test', 'match', 'capture',
    'splits', 'split', 'join', 'ascii_downcase', 'ascii_upcase', 'ltrimstr',
    'rtrimstr', 'explode', 'implode', 'tojson', 'fromjson', 'recurse',
    'recurse_down', 'walk', 'env', 'transpose', 'bsearch', 'first', 'last',
    'nth', 'limit', 'until', 'while', 'repeat', 'inputs', 'input',
    'getpath', 'setpath', 'delpaths', 'leaf_paths', 'path', 'paths',
    'to_entries', 'from_entries', 'with_entries', 'ascii', 'now',
    'strftime', 'strptime', 'gmtime', 'mktime', 'localtime', 'dateadd',
    'datesub', 'builtins', 'modulemeta', 'input_line_number', 'debug_output_options',
    'input_filename', 'format', 'env', 'halt', 'halt_error',
    // Math
    'fabs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt',
    'ceil', 'cos', 'cosh', 'erf', 'erfc', 'exp', 'exp10', 'exp2', 'expm1',
    'floor', 'gamma', 'j0', 'j1', 'lgamma', 'log', 'log10', 'log1p', 'log2',
    'nearbyint', 'pow10', 'rint', 'round', 'significand', 'sin', 'sinh',
    'sqrt', 'tan', 'tanh', 'tgamma', 'trunc', 'y0', 'y1', 'atan2', 'copysign',
    'drem', 'fdim', 'fmax', 'fmin', 'fmod', 'frexp', 'hypot', 'jn', 'ldexp',
    'modf', 'nextafter', 'nexttoward', 'pow', 'remainder', 'scalb',
    'scalbln', 'yn', 'fma', 'nan', 'infinite', 'isnan', 'isinfinite',
    'isfinite', 'isnormal',
    // SQL-like
    'INDEX', 'IN', 'GROUP_BY',
  ],
  patterns: [
    // Variable binding
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Special variables
    { pattern: /\$__loc__|\$ENV/g, type: 'variable' },
    // Format strings
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Field access
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'property' },
    // Optional access
    { pattern: /\.\[[^\]]*\]\??/g, type: 'property' },
    // Recursive descent
    { pattern: /\.\./g, type: 'operator' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!|&]+|\?\/\/|\/\/=?|\|=?/g, type: 'operator' },
    // Pipe
    { pattern: /\|/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\', interpolation: { start: '\\(', end: ')' } },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default jq;
