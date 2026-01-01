/**
 * YAML language definition
 */

import { defineLang } from '../define-lang.js';

export const yaml = defineLang({
  name: 'yaml',
  aliases: ['yml'],
  extensions: ['.yaml', '.yml'],
  mimeTypes: ['text/yaml', 'application/x-yaml'],

  keywords: [],

  constants: ['true', 'false', 'null', 'yes', 'no', 'on', 'off', '~'],

  patterns: [
    // Document markers
    { pattern: /^---$|^\.\.\.$/m, type: 'meta' },

    // Anchors and aliases
    { pattern: /&\w+/, type: 'variable' },
    { pattern: /\*\w+/, type: 'variable' },

    // Tags
    { pattern: /![\w!]+/, type: 'meta' },

    // Keys
    { pattern: /^[\w.-]+(?=\s*:)/m, type: 'property' },
    { pattern: /[\w.-]+(?=\s*:)/, type: 'property' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F]+\b/, type: 'number' },
    { pattern: /\b0[oO][0-7]+\b/, type: 'number' },
    { pattern: /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, type: 'number' },
    { pattern: /[+-]?\.(?:inf|Inf|INF)\b/, type: 'number' },
    { pattern: /\.(?:nan|NaN|NAN)\b/, type: 'number' },

    // Timestamps
    { pattern: /\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?/, type: 'number' },
  ],

  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: "''" },
  ],

  comments: {
    line: '#',
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default yaml;
