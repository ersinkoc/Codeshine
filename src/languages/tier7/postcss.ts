/**
 * PostCSS language definition
 */
import { defineLang } from '../define-lang.js';

export const postcss = defineLang({
  name: 'postcss',
  aliases: ['pcss'],
  extensions: ['.pcss', '.postcss'],
  keywords: [
    '@import', '@media', '@font-face', '@keyframes', '@charset', '@namespace',
    '@supports', '@document', '@page', '@viewport', '@counter-style',
    '@font-feature-values', '@property', '@layer', '@container', '@scope',
    '@custom-media', '@custom-selector', '@apply', '@nest', '@define-mixin',
    '@mixin', '@include', '@each', '@for', '@if', '@else', '@while', '@extend',
    'from', 'to', 'through', 'in', 'and', 'or', 'not', 'only', 'screen', 'print',
    'all', '!important', '!default', '!global', '!optional',
  ],
  builtins: [
    // CSS functions
    'calc', 'var', 'env', 'min', 'max', 'clamp', 'rgb', 'rgba', 'hsl', 'hsla',
    'hwb', 'lab', 'lch', 'oklch', 'oklab', 'color', 'color-mix', 'color-contrast',
    'url', 'attr', 'counter', 'counters', 'linear-gradient', 'radial-gradient',
    'conic-gradient', 'repeating-linear-gradient', 'repeating-radial-gradient',
    'repeating-conic-gradient', 'image', 'image-set', 'cross-fade', 'element',
    'paint', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3d', 'scale',
    'scaleX', 'scaleY', 'scaleZ', 'scale3d', 'translate', 'translateX',
    'translateY', 'translateZ', 'translate3d', 'skew', 'skewX', 'skewY',
    'matrix', 'matrix3d', 'perspective', 'blur', 'brightness', 'contrast',
    'drop-shadow', 'grayscale', 'hue-rotate', 'invert', 'opacity', 'saturate',
    'sepia', 'cubic-bezier', 'steps', 'path', 'polygon', 'circle', 'ellipse',
    'inset', 'rect', 'minmax', 'repeat', 'fit-content', 'format', 'local',
    'symbols', 'stylistic', 'styleset', 'character-variant', 'swash', 'ornaments',
    'annotation', 'ray', 'sign', 'abs', 'round', 'mod', 'rem', 'sin', 'cos',
    'tan', 'asin', 'acos', 'atan', 'atan2', 'pow', 'sqrt', 'hypot', 'log', 'exp',
  ],
  patterns: [
    // Custom properties
    { pattern: /--[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'variable' },
    // PostCSS variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'variable' },
    // Property names
    { pattern: /[a-zA-Z_-][a-zA-Z0-9_-]*(?=\s*:)/g, type: 'property' },
    // Class selectors
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'keyword' },
    // ID selectors
    { pattern: /#[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'keyword' },
    // Pseudo-classes and pseudo-elements
    { pattern: /::?[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'builtin' },
    // Attribute selectors
    { pattern: /\[[^\]]+\]/g, type: 'string' },
    // Numbers with units
    { pattern: /[+-]?(?:\d+\.?\d*|\.\d+)(?:em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|px|pt|pc|%|deg|grad|rad|turn|s|ms|Hz|kHz|fr|dpi|dpcm|dppx)?/g, type: 'number' },
    // Hex colors
    { pattern: /#[0-9a-fA-F]{3,8}\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+/g, type: 'operator' },
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
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default postcss;
