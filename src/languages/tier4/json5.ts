/**
 * JSON5 language definition
 */

import { defineLang } from '../define-lang.js';

export const json5 = defineLang({
  name: 'json5',
  aliases: [],
  extensions: ['.json5'],
  mimeTypes: ['application/json5'],

  keywords: [],

  constants: ['true', 'false', 'null', 'Infinity', 'NaN', 'undefined'],

  patterns: [
    // Unquoted property keys
    { pattern: /[a-zA-Z_$][\w$]*(?=\s*:)/, type: 'property' },

    // Quoted property keys
    { pattern: /"(?:[^"\\]|\\.)*"(?=\s*:)/, type: 'property' },
    { pattern: /'(?:[^'\\]|\\.)*'(?=\s*:)/, type: 'property' },

    // Hex numbers
    { pattern: /[+-]?0[xX][\da-fA-F]+/, type: 'number' },

    // Numbers with leading/trailing decimal
    { pattern: /[+-]?(?:\.\d+|\d+\.?\d*)(?:[eE][+-]?\d+)?/, type: 'number' },

    // Infinity/NaN
    { pattern: /[+-]?Infinity\b/, type: 'number' },
    { pattern: /NaN\b/, type: 'number' },
  ],

  strings: [
    { start: '"', end: '"', escape: '\\', multiline: true },
    { start: "'", end: "'", escape: '\\', multiline: true },
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

export default json5;
