/**
 * Twig template language definition
 */
import { defineLang } from '../define-lang.js';

export const twig = defineLang({
  name: 'twig',
  aliases: ['jinja', 'jinja2'],
  extensions: ['.twig', '.j2', '.jinja', '.jinja2'],
  keywords: [
    // Control structures
    'if', 'elseif', 'else', 'endif', 'for', 'endfor', 'in', 'loop',
    'block', 'endblock', 'extends', 'include', 'import', 'from', 'as',
    'macro', 'endmacro', 'set', 'endset', 'with', 'endwith',
    'autoescape', 'endautoescape', 'filter', 'endfilter', 'embed', 'endembed',
    'use', 'sandbox', 'endsandbox', 'verbatim', 'endverbatim', 'flush', 'do',
    'is', 'not', 'and', 'or', 'b-and', 'b-or', 'b-xor',
  ],
  constants: [
    'true', 'false', 'null', 'none', 'TRUE', 'FALSE', 'NULL', 'NONE',
  ],
  builtins: [
    // Filters
    'abs', 'batch', 'capitalize', 'column', 'convert_encoding', 'country_name',
    'currency_name', 'currency_symbol', 'data_uri', 'date', 'date_modify',
    'default', 'd', 'escape', 'e', 'filter', 'first', 'format', 'format_currency',
    'format_date', 'format_datetime', 'format_number', 'format_time', 'html_to_markdown',
    'inky_to_html', 'inline_css', 'join', 'json_encode', 'keys', 'language_name',
    'last', 'length', 'locale_name', 'lower', 'map', 'markdown_to_html', 'merge',
    'nl2br', 'number_format', 'raw', 'reduce', 'replace', 'reverse', 'round',
    'slice', 'slug', 'sort', 'spaceless', 'split', 'striptags', 'timezone_name',
    'title', 'trim', 'u', 'upper', 'url_encode',
    // Functions
    'attribute', 'block', 'constant', 'country_names', 'country_timezones', 'currency_names',
    'cycle', 'date', 'dump', 'html_classes', 'include', 'language_names', 'locale_names',
    'max', 'min', 'parent', 'random', 'range', 'script_names', 'source', 'template_from_string',
    'timezone_names',
    // Tests
    'constant', 'defined', 'divisible', 'divisibleby', 'empty', 'even', 'iterable',
    'null', 'odd', 'same', 'sameas',
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
    // Pipe (filter) operator
    { pattern: /\|/g, type: 'operator' },
    // Double dot range operator
    { pattern: /\.\./g, type: 'operator' },
    // Ternary operator
    { pattern: /\?:/g, type: 'operator' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%~<>=!]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\', interpolation: { start: '#{', end: '}' } },
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

export default twig;
