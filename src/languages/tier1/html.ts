/**
 * HTML language definition
 */

import { defineLang } from '../define-lang.js';

export const html = defineLang({
  name: 'html',
  aliases: ['htm', 'xhtml'],
  extensions: ['.html', '.htm', '.xhtml'],
  mimeTypes: ['text/html', 'application/xhtml+xml'],

  keywords: [],

  patterns: [
    // DOCTYPE
    { pattern: /<!DOCTYPE[^>]*>/i, type: 'meta' },

    // CDATA sections
    { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/, type: 'comment' },

    // Comments
    { pattern: /<!--[\s\S]*?-->/, type: 'comment' },

    // Closing tags
    { pattern: /<\/[\w-]+>/, type: 'tag' },

    // Self-closing tags
    { pattern: /<[\w-]+[^>]*\/>/, type: 'tag' },

    // Opening tags (start)
    { pattern: /<[\w-]+/, type: 'tag' },

    // Tag end
    { pattern: /\/?>/, type: 'tag' },

    // Attributes with values
    { pattern: /\b[\w-]+(?=\s*=)/, type: 'attribute' },

    // Attribute values
    { pattern: /=\s*"[^"]*"/, type: 'string' },
    { pattern: /=\s*'[^']*'/, type: 'string' },

    // Entity references
    { pattern: /&[\w#]+;/, type: 'constant' },
  ],

  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],

  comments: {
    block: { start: '<!--', end: '-->' },
  },

  brackets: [
    { open: '<', close: '>' },
  ],

  embeddedLanguages: [
    {
      language: 'javascript',
      start: /<script[^>]*>/i,
      end: /<\/script>/i,
    },
    {
      language: 'css',
      start: /<style[^>]*>/i,
      end: /<\/style>/i,
    },
  ],
});

export default html;
