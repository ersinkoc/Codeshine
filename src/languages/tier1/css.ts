/**
 * CSS language definition
 */

import { defineLang } from '../define-lang.js';

export const css = defineLang({
  name: 'css',
  aliases: ['stylesheet'],
  extensions: ['.css'],
  mimeTypes: ['text/css'],

  keywords: [
    'important',
    'and',
    'or',
    'not',
    'only',
    'from',
    'to',
  ],

  patterns: [
    // At-rules
    { pattern: /@[\w-]+/, type: 'keyword' },

    // ID selectors
    { pattern: /#[\w-]+/, type: 'constant' },

    // Class selectors
    { pattern: /\.[\w-]+/, type: 'class' },

    // Pseudo-elements
    { pattern: /::[\w-]+/, type: 'meta' },

    // Pseudo-classes
    { pattern: /:[\w-]+(?:\([^)]*\))?/, type: 'meta' },

    // Attribute selectors
    { pattern: /\[[^\]]+\]/, type: 'attribute' },

    // Properties
    { pattern: /[\w-]+(?=\s*:)/, type: 'property' },

    // Values with units
    { pattern: /\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|deg|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)\b/, type: 'number' },

    // Hex colors
    { pattern: /#(?:[\da-fA-F]{3,4}|[\da-fA-F]{6}|[\da-fA-F]{8})\b/, type: 'constant' },

    // Functions
    { pattern: /\b[\w-]+(?=\()/, type: 'function' },

    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/, type: 'number' },

    // Vendor prefixes
    { pattern: /-(?:webkit|moz|ms|o)-[\w-]+/, type: 'property' },

    // CSS variables
    { pattern: /--[\w-]+/, type: 'variable' },

    // var() function
    { pattern: /\bvar\(--[\w-]+\)/, type: 'variable' },

    // Important flag
    { pattern: /!important\b/, type: 'keyword' },
  ],

  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],

  comments: {
    block: { start: '/*', end: '*/' },
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default css;
