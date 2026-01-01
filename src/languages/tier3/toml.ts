/**
 * TOML language definition
 */

import { defineLang } from '../define-lang.js';

export const toml = defineLang({
  name: 'toml',
  aliases: [],
  extensions: ['.toml'],
  mimeTypes: ['application/toml'],

  keywords: [],

  constants: ['true', 'false'],

  patterns: [
    // Table headers
    { pattern: /^\s*\[[^\]]+\]/m, type: 'keyword' },

    // Array of tables
    { pattern: /^\s*\[\[[^\]]+\]\]/m, type: 'keyword' },

    // Keys (bare and dotted)
    { pattern: /^[\w.-]+(?=\s*=)/m, type: 'property' },

    // Numbers
    { pattern: /[+-]?\b0[xX][\da-fA-F_]+\b/, type: 'number' },
    { pattern: /[+-]?\b0[oO][0-7_]+\b/, type: 'number' },
    { pattern: /[+-]?\b0[bB][01_]+\b/, type: 'number' },
    { pattern: /[+-]?\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?\b/, type: 'number' },
    { pattern: /[+-]?(?:inf|nan)\b/, type: 'number' },

    // Dates and times
    { pattern: /\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?/, type: 'number' },
    { pattern: /\d{2}:\d{2}:\d{2}(?:\.\d+)?/, type: 'number' },
  ],

  strings: [
    { start: '"""', end: '"""', multiline: true },
    { start: "'''", end: "'''", multiline: true },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'" },
  ],

  comments: {
    line: '#',
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default toml;
