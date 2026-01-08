/**
 * Stylus CSS preprocessor language definition
 */
import { defineLang } from '../define-lang.js';

export const stylus = defineLang({
  name: 'stylus',
  aliases: ['styl'],
  extensions: ['.styl', '.stylus'],
  keywords: [
    'if', 'else', 'unless', 'for', 'in', 'return', 'true', 'false', 'null',
    'and', 'or', 'not', 'is', 'isnt', 'defined', 'arguments', 'block',
    '@import', '@require', '@extend', '@extends', '@media', '@keyframes',
    '@font-face', '@supports', '@charset', '@namespace', '@page', '@viewport',
    '@document', '@css', '@block', '@mixin', '@function',
  ],
  builtins: [
    // Built-in functions
    'red', 'green', 'blue', 'alpha', 'dark', 'light', 'hue', 'saturation',
    'lightness', 'push', 'unshift', 'keys', 'values', 'typeof', 'unit', 'match',
    'abs', 'ceil', 'floor', 'round', 'sin', 'cos', 'tan', 'min', 'max', 'even',
    'odd', 'sum', 'avg', 'join', 'length', 'index', 'last', 'rgba', 'rgb', 'hsla',
    'hsl', 'hsva', 'hsv', 'lighten', 'darken', 'saturate', 'desaturate', 'invert',
    'complement', 'spin', 'mix', 'grayscale', 'tint', 'shade', 'luminosity',
    'contrast', 'transparentify', 'fade-in', 'fade-out', 'adjust-hue', 'adjust',
    'change', 'blend', 'multiply', 'screen', 'overlay', 'softlight', 'hardlight',
    'colordodge', 'colorburn', 'difference', 'exclusion', 'average', 'negation',
    'selector', 's', 'image-size', 'image-width', 'image-height', 'add-property',
    'embedurl', 'lookup', 'define', 'operate', 'p', 'error', 'warn', 'opposite-position',
    'selector-exists', 'current-media', 'list-separator', 'cache', 'prefix-classes',
    'use', 'trace', 'pathjoin', 'basename', 'dirname', 'extname',
    // Pseudo elements and classes
    'before', 'after', 'hover', 'active', 'focus', 'visited', 'first-child',
    'last-child', 'nth-child', 'first-of-type', 'last-of-type', 'only-child',
    'only-of-type', 'empty', 'not', 'checked', 'disabled', 'enabled', 'target',
    'root', 'first-line', 'first-letter', 'selection', 'placeholder',
  ],
  patterns: [
    // Variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'variable' },
    // Interpolation
    { pattern: /\{[^}]+\}/g, type: 'interpolation' },
    // Hash references
    { pattern: /#[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'attribute' },
    // Class selectors
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'class' },
    // Pseudo classes/elements
    { pattern: /:[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'keyword' },
    { pattern: /::[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'keyword' },
    // Colors
    { pattern: /#[0-9a-fA-F]{3,8}\b/g, type: 'number' },
    // Numbers with units
    { pattern: /\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|deg|rad|grad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|\.\.\.|\?\?/g, type: 'operator' },
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

export default stylus;
