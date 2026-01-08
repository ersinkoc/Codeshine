/**
 * Nunjucks template language definition (Mozilla)
 */
import { defineLang } from '../define-lang.js';

export const nunjucks = defineLang({
  name: 'nunjucks',
  aliases: ['njk', 'mozilla-nunjucks'],
  extensions: ['.njk', '.nunjucks', '.nj'],
  keywords: [
    // Control structures
    'if', 'elif', 'else', 'endif', 'for', 'endfor', 'in',
    'asyncEach', 'endeach', 'asyncAll', 'endall',
    'block', 'endblock', 'extends', 'include', 'import', 'from', 'as',
    'macro', 'endmacro', 'call', 'endcall', 'caller',
    'set', 'endset', 'filter', 'endfilter', 'raw', 'endraw', 'verbatim', 'endverbatim',
    'is', 'not', 'and', 'or',
  ],
  constants: [
    'true', 'false', 'null', 'none', 'loop',
  ],
  builtins: [
    // Built-in filters
    'abs', 'batch', 'capitalize', 'center', 'default', 'd', 'dictsort',
    'dump', 'escape', 'e', 'first', 'float', 'forceescape', 'groupby',
    'indent', 'int', 'join', 'last', 'length', 'list', 'lower', 'nl2br',
    'random', 'reject', 'rejectattr', 'replace', 'reverse', 'round', 'safe',
    'select', 'selectattr', 'slice', 'sort', 'string', 'striptags', 'sum',
    'title', 'trim', 'truncate', 'upper', 'urlencode', 'urlize', 'wordcount',
    // Built-in tests
    'callable', 'defined', 'divisibleby', 'equalto', 'eq', 'sameas',
    'even', 'falsy', 'ge', 'greaterthan', 'gt', 'iterable', 'le', 'lessthan',
    'lt', 'mapping', 'ne', 'none', 'number', 'odd', 'sequence', 'string',
    'truthy', 'undefined',
    // Loop special variables
    'index', 'index0', 'revindex', 'revindex0', 'first', 'last', 'length', 'cycle',
  ],
  patterns: [
    // Comments
    { pattern: /\{#[\s\S]*?#\}/g, type: 'comment' },
    // Output tags
    { pattern: /\{\{[\s\S]*?\}\}/g, type: 'interpolation' },
    // Control tags
    { pattern: /\{%[\s\S]*?%\}/g, type: 'meta' },
    // HTML tags
    { pattern: /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?\/?>/g, type: 'tag' },
    // Filter operator
    { pattern: /\|/g, type: 'operator' },
    // Range operator
    { pattern: /\.\./g, type: 'operator' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%~<>=!]+|\*\*/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    block: { start: '{#', end: '#}' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '{{', close: '}}' },
    { open: '{%', close: '%}' },
  ],
});

export default nunjucks;
