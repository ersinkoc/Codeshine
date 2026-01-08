/**
 * Sass (indented syntax) language definition
 */
import { defineLang } from '../define-lang.js';

export const sass = defineLang({
  name: 'sass',
  aliases: ['indented-sass'],
  extensions: ['.sass'],
  keywords: [
    '@use', '@forward', '@import', '@mixin', '@include', '@function', '@return',
    '@extend', '@at-root', '@error', '@warn', '@debug', '@if', '@else', '@each',
    '@for', '@while', '@media', '@supports', '@keyframes', '@font-face', '@charset',
    '@namespace', '@page', '@viewport', '@document',
    'and', 'or', 'not', 'in', 'from', 'through', 'to',
    'true', 'false', 'null',
  ],
  builtins: [
    // Color functions
    'rgb', 'rgba', 'hsl', 'hsla', 'hwb', 'red', 'green', 'blue', 'hue',
    'saturation', 'lightness', 'whiteness', 'blackness', 'alpha', 'opacity',
    'mix', 'adjust-hue', 'lighten', 'darken', 'saturate', 'desaturate',
    'grayscale', 'complement', 'invert', 'adjust-color', 'scale-color', 'change-color',
    'ie-hex-str',
    // String functions
    'unquote', 'quote', 'str-length', 'str-insert', 'str-index', 'str-slice',
    'to-upper-case', 'to-lower-case', 'unique-id',
    // Number functions
    'percentage', 'round', 'ceil', 'floor', 'abs', 'min', 'max', 'random',
    'unit', 'unitless', 'comparable',
    // List functions
    'length', 'nth', 'set-nth', 'join', 'append', 'zip', 'index', 'list-separator',
    'is-bracketed',
    // Map functions
    'map-get', 'map-merge', 'map-remove', 'map-keys', 'map-values', 'map-has-key',
    // Selector functions
    'selector-nest', 'selector-append', 'selector-extend', 'selector-replace',
    'selector-unify', 'is-superselector', 'simple-selectors', 'selector-parse',
    // Introspection functions
    'type-of', 'unit', 'unitless', 'comparable', 'variable-exists', 'global-variable-exists',
    'function-exists', 'mixin-exists', 'content-exists', 'inspect', 'get-function',
    'call', 'feature-exists',
    // Math
    'calc', 'clamp', 'min', 'max', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
    'atan2', 'sqrt', 'exp', 'log', 'pow', 'hypot', 'div', 'mod', 'rem',
  ],
  patterns: [
    // Variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'variable' },
    // Placeholder selectors
    { pattern: /%[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'type' },
    // Interpolation
    { pattern: /#\{[^}]+\}/g, type: 'interpolation' },
    // Class selectors
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'class' },
    // ID selectors
    { pattern: /#[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'attribute' },
    // Pseudo selectors
    { pattern: /:{1,2}[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'keyword' },
    // Parent selector
    { pattern: /&/g, type: 'keyword' },
    // Colors
    { pattern: /#[0-9a-fA-F]{3,8}\b/g, type: 'number' },
    // Numbers with units
    { pattern: /[+-]?\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|deg|rad|grad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!]+|and|or|not/g, type: 'operator' },
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
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default sass;
