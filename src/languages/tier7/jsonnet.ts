/**
 * Jsonnet configuration language definition
 */
import { defineLang } from '../define-lang.js';

export const jsonnet = defineLang({
  name: 'jsonnet',
  aliases: ['libsonnet'],
  extensions: ['.jsonnet', '.libsonnet'],
  keywords: [
    'assert', 'else', 'error', 'false', 'for', 'function', 'if', 'import',
    'importstr', 'importbin', 'in', 'local', 'null', 'tailstrict', 'then',
    'self', 'super', 'true',
  ],
  builtins: [
    // Standard library functions
    'std', 'extVar', 'type', 'length', 'get', 'objectHas', 'objectFields',
    'objectFieldsAll', 'objectFieldsEx', 'objectValues', 'objectValuesAll',
    'objectKeysValues', 'objectKeysValuesAll', 'prune', 'mapWithKey',
    'assertEqual', 'toString', 'codepoint', 'char', 'substr', 'findSubstr',
    'startsWith', 'endsWith', 'stripChars', 'lstripChars', 'rstripChars',
    'split', 'splitLimit', 'splitLimitR', 'strReplace', 'isEmpty', 'asciiUpper',
    'asciiLower', 'stringChars', 'format', 'escapeStringBash', 'escapeStringDollars',
    'escapeStringJson', 'escapeStringPython', 'escapeStringXml', 'parseInt',
    'parseOctal', 'parseHex', 'parseJson', 'parseYaml', 'encodeUTF8', 'decodeUTF8',
    'manifestIni', 'manifestPython', 'manifestPythonVars', 'manifestJsonEx',
    'manifestJsonMinified', 'manifestYamlDoc', 'manifestYamlStream', 'manifestXmlJsonml',
    'manifestTomlEx', 'makeArray', 'member', 'count', 'find', 'map', 'mapWithIndex',
    'flatMap', 'filter', 'foldl', 'foldr', 'range', 'repeat', 'slice', 'join',
    'lines', 'flattenArrays', 'reverse', 'sort', 'uniq', 'all', 'any',
    'set', 'setInter', 'setUnion', 'setDiff', 'setMember', 'base64', 'base64DecodeBytes',
    'base64Decode', 'md5', 'sha1', 'sha256', 'sha512', 'sha3',
    'mergePatch', 'trace', 'abs', 'sign', 'max', 'min', 'pow', 'exp', 'log',
    'exponent', 'mantissa', 'floor', 'ceil', 'sqrt', 'sin', 'cos', 'tan',
    'asin', 'acos', 'atan', 'round', 'isEven', 'isOdd', 'isInteger', 'isDecimal',
    'mod', 'clamp', 'equals', 'primitiveEquals', 'compare', 'objectHasAll',
    'objectHasEx', 'resolvePath', 'thisFile',
  ],
  patterns: [
    // Self and super
    { pattern: /\b(?:self|super)\b/g, type: 'keyword' },
    // Dollar reference
    { pattern: /\$/g, type: 'keyword' },
    // Field access
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'property' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|::|\+:/g, type: 'operator' },
  ],
  strings: [
    { start: '@"', end: '"', escape: '' },
    { start: "@'", end: "'", escape: '' },
    { start: '|||', end: '|||', escape: '' },
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

export default jsonnet;
