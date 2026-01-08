/**
 * Liquid template language definition (Shopify/Jekyll)
 */
import { defineLang } from '../define-lang.js';

export const liquid = defineLang({
  name: 'liquid',
  aliases: ['shopify', 'jekyll-liquid'],
  extensions: ['.liquid'],
  keywords: [
    // Control flow
    'if', 'elsif', 'else', 'endif', 'unless', 'endunless',
    'case', 'when', 'endcase',
    // Iteration
    'for', 'endfor', 'tablerow', 'endtablerow', 'break', 'continue',
    'in', 'limit', 'offset', 'reversed',
    // Variables
    'assign', 'capture', 'endcapture', 'increment', 'decrement',
    // Theme/Layout
    'render', 'include', 'layout', 'section', 'block', 'endblock',
    'comment', 'endcomment', 'raw', 'endraw', 'echo',
    'liquid', 'endliquid',
    // Comparison
    'and', 'or', 'contains',
  ],
  constants: [
    'true', 'false', 'nil', 'blank', 'empty',
  ],
  builtins: [
    // Filters
    'abs', 'append', 'at_least', 'at_most', 'capitalize', 'ceil', 'compact',
    'concat', 'date', 'default', 'divided_by', 'downcase', 'escape', 'escape_once',
    'first', 'floor', 'join', 'json', 'last', 'lstrip', 'map', 'minus', 'modulo',
    'newline_to_br', 'plus', 'prepend', 'remove', 'remove_first', 'replace',
    'replace_first', 'reverse', 'round', 'rstrip', 'size', 'slice', 'sort',
    'sort_natural', 'split', 'strip', 'strip_html', 'strip_newlines', 'times',
    'truncate', 'truncatewords', 'uniq', 'upcase', 'url_decode', 'url_encode',
    'where',
    // Shopify specific filters
    'asset_url', 'asset_img_url', 'img_url', 'img_tag', 'link_to', 'money',
    'money_with_currency', 'money_without_currency', 'money_without_trailing_zeros',
    'payment_type_img_url', 'payment_type_svg_tag', 'script_tag', 'stylesheet_tag',
    'customer_login_link', 'global_asset_url', 'shopify_asset_url', 'file_url',
    'file_img_url', 'font_face', 'font_modify', 'font_url', 'google_font_url',
    't', 'translate', 'time_tag', 'weight', 'weight_with_unit', 'within',
    // Color filters
    'brightness_difference', 'color_brightness', 'color_contrast',
    'color_darken', 'color_desaturate', 'color_difference', 'color_extract',
    'color_lighten', 'color_mix', 'color_modify', 'color_saturate', 'color_to_hex',
    'color_to_hsl', 'color_to_rgb', 'hex_to_rgba',
    // Jekyll specific filters
    'markdownify', 'smartify', 'slugify', 'relative_url', 'absolute_url',
    'xml_escape', 'cgi_escape', 'uri_escape', 'number_of_words', 'array_to_sentence_string',
    'group_by', 'group_by_exp', 'sample', 'to_integer', 'push', 'pop', 'shift', 'unshift',
    'inspect', 'jsonify', 'normalize_whitespace', 'find', 'find_exp',
  ],
  patterns: [
    // Comments
    { pattern: /\{%\s*comment\s*%\}[\s\S]*?\{%\s*endcomment\s*%\}/g, type: 'comment' },
    // Output tags
    { pattern: /\{\{[\s\S]*?\}\}/g, type: 'interpolation' },
    // Logic tags
    { pattern: /\{%[\s\S]*?%\}/g, type: 'meta' },
    // Forloop object properties
    { pattern: /\bforloop\.(?:index|index0|rindex|rindex0|first|last|length|parentloop)\b/g, type: 'property' },
    // Tablerow object properties
    { pattern: /\btablerowloop\.(?:index|index0|col|col0|col_first|col_last|first|last|length)\b/g, type: 'property' },
    // HTML tags
    { pattern: /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?\/?>/g, type: 'tag' },
    // Filter pipe
    { pattern: /\|/g, type: 'operator' },
    // Range operator
    { pattern: /\.\./g, type: 'operator' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[=!<>]+|(?:==|!=|<>|<=|>=|<|>)/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    block: { start: '{% comment %}', end: '{% endcomment %}' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '{{', close: '}}' },
    { open: '{%', close: '%}' },
  ],
});

export default liquid;
