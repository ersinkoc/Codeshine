/**
 * SCSS language definition
 */
import { defineLang } from '../define-lang.js';

export const scss = defineLang({
  name: 'scss',
  aliases: ['sass'],
  extensions: ['.scss'],
  keywords: [
    '@import', '@use', '@forward', '@mixin', '@include', '@function', '@return',
    '@extend', '@at-root', '@error', '@warn', '@debug', '@if', '@else', '@each',
    '@for', '@while', '@media', '@supports', '@keyframes', '@font-face',
    '@namespace', '@page', '@charset', '@layer', '@container', '@scope',
    'from', 'through', 'to', 'in', 'and', 'or', 'not', 'only',
    '!default', '!global', '!optional',
  ],
  typeKeywords: [],
  builtins: [
    // Color functions
    'rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'lab', 'lch', 'oklch', 'oklab',
    'red', 'green', 'blue', 'hue', 'saturation', 'lightness', 'whiteness', 'blackness',
    'alpha', 'opacity', 'mix', 'adjust-hue', 'lighten', 'darken', 'saturate', 'desaturate',
    'grayscale', 'complement', 'invert', 'adjust-color', 'scale-color', 'change-color', 'ie-hex-str',
    // String functions
    'unquote', 'quote', 'str-length', 'str-insert', 'str-index', 'str-slice', 'to-upper-case', 'to-lower-case',
    'unique-id', 'string',
    // Number functions
    'percentage', 'round', 'ceil', 'floor', 'abs', 'min', 'max', 'random', 'unit', 'unitless', 'comparable',
    'clamp', 'hypot', 'log', 'pow', 'sqrt', 'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'atan2',
    // List functions
    'length', 'nth', 'set-nth', 'join', 'append', 'zip', 'index', 'list-separator', 'is-bracketed', 'slash',
    // Map functions
    'map-get', 'map-merge', 'map-remove', 'map-keys', 'map-values', 'map-has-key', 'map-set', 'map-deep-get', 'map-deep-merge',
    // Selector functions
    'selector-nest', 'selector-append', 'selector-extend', 'selector-replace', 'selector-unify',
    'is-superselector', 'simple-selectors', 'selector-parse',
    // Introspection functions
    'feature-exists', 'variable-exists', 'global-variable-exists', 'function-exists', 'mixin-exists',
    'content-exists', 'module-variables', 'module-functions', 'get-function', 'type-of',
    'inspect', 'keywords', 'call', 'meta.load-css',
    // Misc
    'if', 'calc', 'var', 'env', 'url',
  ],
  patterns: [
    // Variables
    { pattern: /\$[a-zA-Z_][\w-]*/g, type: 'variable' },
    // Interpolation
    { pattern: /#\{[^}]+\}/g, type: 'variable' },
    // Parent selector
    { pattern: /&/g, type: 'keyword' },
    // Placeholder selectors
    { pattern: /%[a-zA-Z_][\w-]*/g, type: 'class' },
    // Property names
    { pattern: /[a-zA-Z-]+(?=\s*:)/g, type: 'property' },
    // Important
    { pattern: /!important/g, type: 'keyword' },
    // Colors
    { pattern: /#[0-9a-fA-F]{3,8}\b/g, type: 'number' },
    // Numbers with units
    { pattern: /-?\d*\.?\d+(?:em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|%)?/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%]=?|==|!=|<=?|>=?|and|or|not/g, type: 'operator' },
  ],
  strings: [
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

export default scss;
