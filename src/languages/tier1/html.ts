/**
 * HTML language definition
 */

import { defineLang } from '../define-lang.js';
import { registerLanguage } from '../registry.js';
import { javascript } from './javascript.js';
import { css } from './css.js';

// The embedded regions below name their language by string, so the tokenizer
// resolves them through the registry. Registering them here keeps
// `tokenize(code, html)` working without the highlighter's tier-1 registration.
registerLanguage(javascript);
registerLanguage(css);

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
      start: /<script\b[^>]*>/i,
      end: /<\/script\s*>/i,
    },
    {
      language: 'css',
      start: /<style\b[^>]*>/i,
      end: /<\/style\s*>/i,
    },
  ],
});

export default html;
