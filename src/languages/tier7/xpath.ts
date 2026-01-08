/**
 * XPath query language definition
 */
import { defineLang } from '../define-lang.js';

export const xpath = defineLang({
  name: 'xpath',
  aliases: ['xpathexpression'],
  extensions: ['.xpath'],
  keywords: [
    // Axes
    'ancestor', 'ancestor-or-self', 'attribute', 'child', 'descendant',
    'descendant-or-self', 'following', 'following-sibling', 'namespace',
    'parent', 'preceding', 'preceding-sibling', 'self',
    // Operators
    'and', 'or', 'div', 'mod', 'not',
    // XPath 2.0+ keywords
    'if', 'then', 'else', 'for', 'in', 'return', 'some', 'every', 'satisfies',
    'to', 'except', 'intersect', 'union', 'instance', 'of', 'treat', 'as',
    'castable', 'cast', 'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'is',
  ],
  constants: [
    'true', 'false',
  ],
  builtins: [
    // Node functions
    'node', 'text', 'comment', 'processing-instruction',
    // String functions
    'string', 'concat', 'starts-with', 'contains', 'substring-before',
    'substring-after', 'substring', 'string-length', 'normalize-space',
    'translate', 'upper-case', 'lower-case', 'encode-for-uri', 'iri-to-uri',
    'escape-html-uri', 'matches', 'replace', 'tokenize', 'compare', 'codepoint-equal',
    'string-join', 'normalize-unicode', 'codepoints-to-string', 'string-to-codepoints',
    // Boolean functions
    'boolean', 'not', 'true', 'false', 'lang',
    // Number functions
    'number', 'sum', 'floor', 'ceiling', 'round', 'abs', 'round-half-to-even',
    // Aggregate functions
    'count', 'avg', 'max', 'min',
    // Node set functions
    'position', 'last', 'id', 'local-name', 'namespace-uri', 'name', 'root',
    // Sequence functions
    'empty', 'exists', 'head', 'tail', 'insert-before', 'remove', 'reverse',
    'subsequence', 'unordered', 'distinct-values', 'index-of', 'deep-equal',
    // Date/time functions
    'current-dateTime', 'current-date', 'current-time', 'implicit-timezone',
    'years-from-duration', 'months-from-duration', 'days-from-duration',
    'hours-from-duration', 'minutes-from-duration', 'seconds-from-duration',
    'year-from-dateTime', 'month-from-dateTime', 'day-from-dateTime',
    'hours-from-dateTime', 'minutes-from-dateTime', 'seconds-from-dateTime',
    'timezone-from-dateTime', 'year-from-date', 'month-from-date', 'day-from-date',
    'timezone-from-date', 'hours-from-time', 'minutes-from-time', 'seconds-from-time',
    'timezone-from-time', 'adjust-dateTime-to-timezone', 'adjust-date-to-timezone',
    'adjust-time-to-timezone',
    // Context functions
    'static-base-uri', 'default-collation', 'resolve-uri', 'doc', 'doc-available',
    'collection', 'element-with-id', 'id', 'idref', 'generate-id', 'document-uri',
    // Type functions
    'data', 'base-uri', 'document-uri', 'error', 'trace', 'dateTime',
    // QName functions
    'resolve-QName', 'QName', 'prefix-from-QName', 'local-name-from-QName',
    'namespace-uri-from-QName', 'namespace-uri-for-prefix', 'in-scope-prefixes',
  ],
  patterns: [
    // Variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'variable' },
    // Abbreviated axes
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'attribute' },
    // Node tests
    { pattern: /\*|\.\.|\.|\//g, type: 'operator' },
    // Numbers
    { pattern: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*<>=!|]+|::/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '""' },
    { start: "'", end: "'", escape: "''" },
  ],
  comments: {
    block: { start: '(:', end: ':)' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default xpath;
