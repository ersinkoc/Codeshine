/**
 * Less language definition
 */
import { defineLang } from '../define-lang.js';

export const less = defineLang({
  name: 'less',
  aliases: [],
  extensions: ['.less'],
  keywords: [
    '@import', '@plugin', '@media', '@supports', '@keyframes', '@font-face',
    '@namespace', '@page', '@charset', '@layer', '@container', '@scope',
    'when', 'and', 'or', 'not', 'only',
  ],
  typeKeywords: [],
  builtins: [
    // Misc functions
    'color', 'image-size', 'image-width', 'image-height', 'convert', 'data-uri',
    'default', 'unit', 'get-unit', 'svg-gradient',
    // String functions
    'escape', 'e', 'replace', 'length', 'extract', 'range',
    // List functions
    'each',
    // Math functions
    'ceil', 'floor', 'percentage', 'round', 'sqrt', 'abs', 'sin', 'asin', 'cos', 'acos', 'tan', 'atan',
    'pi', 'pow', 'mod', 'min', 'max',
    // Type functions
    'isnumber', 'isstring', 'iscolor', 'iskeyword', 'isurl', 'ispixel', 'isem', 'ispercentage', 'isunit', 'isruleset', 'isdefined',
    // Color definition
    'rgb', 'rgba', 'argb', 'hsl', 'hsla', 'hsv', 'hsva',
    // Color channel
    'hue', 'saturation', 'lightness', 'hsvhue', 'hsvsaturation', 'hsvvalue',
    'red', 'green', 'blue', 'alpha', 'luma', 'luminance',
    // Color operations
    'saturate', 'desaturate', 'lighten', 'darken', 'fadein', 'fadeout', 'fade', 'spin',
    'mix', 'greyscale', 'contrast', 'multiply', 'screen', 'overlay', 'softlight',
    'hardlight', 'difference', 'exclusion', 'average', 'negation', 'tint', 'shade',
    // Color blending
    'if', 'boolean',
  ],
  patterns: [
    // Variables
    { pattern: /@[a-zA-Z_][\w-]*/g, type: 'variable' },
    // Interpolation
    { pattern: /@\{[^}]+\}/g, type: 'variable' },
    // Parent selector
    { pattern: /&/g, type: 'keyword' },
    // Mixins (with optional namespace)
    { pattern: /\.[a-zA-Z_][\w-]*(?=\s*[({;])/g, type: 'function' },
    { pattern: /#[a-zA-Z_][\w-]*(?=\s*[>.])/g, type: 'function' },
    // Property names
    { pattern: /[a-zA-Z-]+(?=\s*:)/g, type: 'property' },
    // Important
    { pattern: /!important/g, type: 'keyword' },
    // Colors
    { pattern: /#[0-9a-fA-F]{3,8}\b/g, type: 'number' },
    // Numbers with units
    { pattern: /-?\d*\.?\d+(?:em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|%)?/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%]=?|~|=|<=?|>=?|when|and|or|not/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
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

export default less;
