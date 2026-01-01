/**
 * JSON language definition
 */

import { defineLang } from '../define-lang.js';

export const json = defineLang({
  name: 'json',
  aliases: ['jsonc'],
  extensions: ['.json', '.jsonc', '.json5'],
  mimeTypes: ['application/json'],

  keywords: [],

  constants: ['true', 'false', 'null'],

  patterns: [
    // Property keys
    { pattern: /"(?:[^"\\]|\\.)*"(?=\s*:)/, type: 'property' },

    // String values
    { pattern: /"(?:[^"\\]|\\.)*"/, type: 'string' },

    // Numbers
    { pattern: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, type: 'number' },
  ],

  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],

  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default json;
