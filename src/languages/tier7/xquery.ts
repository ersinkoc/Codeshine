/**
 * XQuery language definition
 */
import { defineLang } from '../define-lang.js';

export const xquery = defineLang({
  name: 'xquery',
  aliases: ['xq', 'xql'],
  extensions: ['.xq', '.xquery', '.xql', '.xqm', '.xqy'],
  keywords: [
    'xquery', 'version', 'encoding', 'module', 'namespace', 'declare', 'default',
    'import', 'at', 'as', 'schema', 'element', 'function', 'variable', 'option',
    'for', 'let', 'where', 'order', 'by', 'ascending', 'descending', 'collation',
    'return', 'if', 'then', 'else', 'typeswitch', 'case', 'switch', 'try', 'catch',
    'some', 'every', 'in', 'satisfies', 'and', 'or', 'to', 'union', 'intersect',
    'except', 'instance', 'of', 'treat', 'cast', 'castable', 'div', 'idiv', 'mod',
    'eq', 'ne', 'lt', 'le', 'gt', 'ge', 'is', 'preceding', 'following',
    'empty', 'greatest', 'least', 'stable', 'group', 'allowing', 'tumbling',
    'sliding', 'window', 'start', 'when', 'end', 'only', 'count',
    'external', 'preserve', 'strip', 'boundary-space', 'construction',
    'ordering', 'ordered', 'unordered', 'copy-namespaces', 'no-preserve',
    'inherit', 'no-inherit', 'decimal-format', 'base-uri', 'context', 'item',
  ],
  typeKeywords: [
    'xs:string', 'xs:boolean', 'xs:decimal', 'xs:float', 'xs:double', 'xs:duration',
    'xs:dateTime', 'xs:time', 'xs:date', 'xs:gYearMonth', 'xs:gYear', 'xs:gMonthDay',
    'xs:gDay', 'xs:gMonth', 'xs:hexBinary', 'xs:base64Binary', 'xs:anyURI', 'xs:QName',
    'xs:NOTATION', 'xs:integer', 'xs:nonPositiveInteger', 'xs:negativeInteger',
    'xs:long', 'xs:int', 'xs:short', 'xs:byte', 'xs:nonNegativeInteger',
    'xs:unsignedLong', 'xs:unsignedInt', 'xs:unsignedShort', 'xs:unsignedByte',
    'xs:positiveInteger', 'xs:normalizedString', 'xs:token', 'xs:language',
    'xs:NMTOKEN', 'xs:Name', 'xs:NCName', 'xs:ID', 'xs:IDREF', 'xs:ENTITY',
    'xs:anyType', 'xs:anySimpleType', 'xs:anyAtomicType', 'xs:untyped',
    'xs:untypedAtomic', 'xs:dayTimeDuration', 'xs:yearMonthDuration',
    'node', 'document-node', 'element', 'attribute', 'schema-element',
    'schema-attribute', 'processing-instruction', 'comment', 'text',
    'namespace-node', 'empty-sequence', 'item',
  ],
  builtins: [
    // Numeric functions
    'abs', 'ceiling', 'floor', 'round', 'round-half-to-even', 'number',
    // String functions
    'codepoints-to-string', 'string-to-codepoints', 'compare', 'codepoint-equal',
    'concat', 'string-join', 'substring', 'string-length', 'normalize-space',
    'normalize-unicode', 'upper-case', 'lower-case', 'translate', 'encode-for-uri',
    'iri-to-uri', 'escape-html-uri', 'contains', 'starts-with', 'ends-with',
    'substring-before', 'substring-after', 'matches', 'replace', 'tokenize',
    'analyze-string', 'string',
    // Boolean functions
    'true', 'false', 'not', 'boolean',
    // Date/time functions
    'years-from-duration', 'months-from-duration', 'days-from-duration',
    'hours-from-duration', 'minutes-from-duration', 'seconds-from-duration',
    'year-from-dateTime', 'month-from-dateTime', 'day-from-dateTime',
    'hours-from-dateTime', 'minutes-from-dateTime', 'seconds-from-dateTime',
    'timezone-from-dateTime', 'year-from-date', 'month-from-date', 'day-from-date',
    'timezone-from-date', 'hours-from-time', 'minutes-from-time', 'seconds-from-time',
    'timezone-from-time', 'adjust-dateTime-to-timezone', 'adjust-date-to-timezone',
    'adjust-time-to-timezone', 'dateTime', 'current-dateTime', 'current-date',
    'current-time', 'implicit-timezone',
    // QName functions
    'resolve-QName', 'QName', 'prefix-from-QName', 'local-name-from-QName',
    'namespace-uri-from-QName', 'namespace-uri-for-prefix', 'in-scope-prefixes',
    // Node functions
    'name', 'local-name', 'namespace-uri', 'lang', 'root', 'path', 'has-children',
    'innermost', 'outermost',
    // Sequence functions
    'empty', 'exists', 'head', 'tail', 'insert-before', 'remove', 'reverse',
    'subsequence', 'unordered', 'zero-or-one', 'one-or-more', 'exactly-one',
    'deep-equal', 'count', 'avg', 'max', 'min', 'sum', 'distinct-values',
    'index-of', 'id', 'idref', 'doc', 'doc-available', 'collection',
    'uri-collection', 'unparsed-text', 'unparsed-text-available',
    'unparsed-text-lines', 'environment-variable', 'available-environment-variables',
    // Error/trace
    'error', 'trace', 'fn:error', 'fn:trace',
    // Map functions
    'map:merge', 'map:size', 'map:keys', 'map:contains', 'map:get', 'map:put',
    'map:entry', 'map:remove', 'map:for-each',
    // Array functions
    'array:size', 'array:get', 'array:put', 'array:append', 'array:subarray',
    'array:remove', 'array:insert-before', 'array:head', 'array:tail',
    'array:reverse', 'array:join', 'array:for-each', 'array:filter',
    'array:fold-left', 'array:fold-right', 'array:for-each-pair', 'array:sort',
    'array:flatten',
  ],
  patterns: [
    // XML namespace prefix
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_-]*:/g, type: 'property' },
    // Variable reference
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'variable' },
    // Function calls
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_-]*(?=\s*\()/g, type: 'function' },
    // Axis specifiers
    { pattern: /\b(?:ancestor|ancestor-or-self|attribute|child|descendant|descendant-or-self|following|following-sibling|namespace|parent|preceding|preceding-sibling|self)::/g, type: 'keyword' },
    // Numbers
    { pattern: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    { pattern: /\.\d+(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/|=<>!:,@]+|:=|\|\||\.\.?/g, type: 'operator' },
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
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default xquery;
