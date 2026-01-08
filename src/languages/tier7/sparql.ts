/**
 * SPARQL query language definition
 */
import { defineLang } from '../define-lang.js';

export const sparql = defineLang({
  name: 'sparql',
  aliases: ['rdf-query'],
  extensions: ['.sparql', '.rq'],
  keywords: [
    // Query forms
    'SELECT', 'CONSTRUCT', 'DESCRIBE', 'ASK',
    // Dataset clauses
    'FROM', 'NAMED', 'WHERE',
    // Solution modifiers
    'ORDER', 'BY', 'ASC', 'DESC', 'LIMIT', 'OFFSET', 'DISTINCT', 'REDUCED',
    'GROUP', 'HAVING',
    // Graph patterns
    'GRAPH', 'OPTIONAL', 'UNION', 'FILTER', 'NOT', 'EXISTS', 'MINUS', 'SERVICE',
    'SILENT', 'BIND', 'AS', 'VALUES', 'UNDEF',
    // Update operations
    'INSERT', 'DELETE', 'DATA', 'LOAD', 'CLEAR', 'CREATE', 'DROP', 'COPY',
    'MOVE', 'ADD', 'WITH', 'INTO', 'USING', 'DEFAULT', 'ALL', 'TO',
    // Prefixes
    'PREFIX', 'BASE',
    // Property paths
    'a',
  ],
  constants: [
    'true', 'false',
  ],
  builtins: [
    // Aggregates
    'COUNT', 'SUM', 'MIN', 'MAX', 'AVG', 'GROUP_CONCAT', 'SAMPLE',
    // String functions
    'STR', 'LANG', 'LANGMATCHES', 'DATATYPE', 'BOUND', 'IRI', 'URI', 'BNODE',
    'RAND', 'ABS', 'CEIL', 'FLOOR', 'ROUND', 'CONCAT', 'STRLEN', 'UCASE', 'LCASE',
    'ENCODE_FOR_URI', 'CONTAINS', 'STRSTARTS', 'STRENDS', 'STRBEFORE', 'STRAFTER',
    'YEAR', 'MONTH', 'DAY', 'HOURS', 'MINUTES', 'SECONDS', 'TIMEZONE', 'TZ',
    'NOW', 'UUID', 'STRUUID', 'MD5', 'SHA1', 'SHA256', 'SHA384', 'SHA512',
    'COALESCE', 'IF', 'STRLANG', 'STRDT', 'sameTerm', 'isIRI', 'isURI', 'isBLANK',
    'isLITERAL', 'isNUMERIC', 'REGEX', 'SUBSTR', 'REPLACE', 'EXISTS', 'NOT',
    'IN', 'SEPARATOR',
  ],
  patterns: [
    // Variables
    { pattern: /\?[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Prefixed names
    { pattern: /[a-zA-Z_][a-zA-Z0-9_-]*:[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'type' },
    { pattern: /:[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'type' },
    // IRIs
    { pattern: /<[^>]+>/g, type: 'string' },
    // Blank nodes
    { pattern: /_:[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Numbers
    { pattern: /[+-]?\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^]+|\|\|/g, type: 'operator' },
    // Property path operators
    { pattern: /[\^\/|?*+]/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '\\' },
    { start: "'''", end: "'''", escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default sparql;
