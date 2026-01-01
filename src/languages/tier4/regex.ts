/**
 * Regular Expression language definition
 */

import { defineLang } from '../define-lang.js';

export const regex = defineLang({
  name: 'regex',
  aliases: ['regexp', 're'],
  extensions: [],
  mimeTypes: [],

  keywords: [],

  patterns: [
    // Character classes
    { pattern: /\[(?:\^)?(?:[^\]\\]|\\.)*\]/, type: 'class' },

    // Escape sequences
    { pattern: /\\[dDwWsS]/, type: 'type' },
    { pattern: /\\[bB]/, type: 'keyword' },
    { pattern: /\\[nrtfv0]/, type: 'escape' },
    { pattern: /\\x[\da-fA-F]{2}/, type: 'escape' },
    { pattern: /\\u[\da-fA-F]{4}/, type: 'escape' },
    { pattern: /\\u\{[\da-fA-F]+\}/, type: 'escape' },
    { pattern: /\\./, type: 'escape' },

    // Anchors
    { pattern: /\^|\$/, type: 'keyword' },

    // Groups
    { pattern: /\(\?(?::|=|!|<=|<!|<\w+>)/, type: 'meta' },
    { pattern: /\(|\)/, type: 'punctuation' },

    // Quantifiers
    { pattern: /[*+?]|\{\d+(?:,\d*)?\}/, type: 'operator' },

    // Alternation
    { pattern: /\|/, type: 'operator' },

    // Backreferences
    { pattern: /\\[1-9]\d*/, type: 'variable' },
    { pattern: /\\k<\w+>/, type: 'variable' },

    // Flags
    { pattern: /(?<=\/)[gimsuy]+$/, type: 'meta' },
  ],

  strings: [],

  comments: {},

  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
    { open: '{', close: '}' },
  ],
});

export default regex;
