/**
 * CSV language definition
 */

import { defineLang } from '../define-lang.js';

export const csv = defineLang({
  name: 'csv',
  aliases: ['tsv'],
  extensions: ['.csv', '.tsv'],
  mimeTypes: ['text/csv', 'text/tab-separated-values'],

  keywords: [],

  patterns: [
    // Numbers
    { pattern: /-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, type: 'number' },

    // Quoted fields
    { pattern: /"(?:[^"]|"")*"/, type: 'string' },

    // Field separators
    { pattern: /[,;\t|]/, type: 'punctuation' },
  ],

  strings: [
    { start: '"', end: '"', escape: '""' },
  ],

  comments: {},

  brackets: [],
});

export default csv;
