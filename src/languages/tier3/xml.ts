/**
 * XML language definition
 */

import { defineLang } from '../define-lang.js';

export const xml = defineLang({
  name: 'xml',
  aliases: ['xsl', 'xslt', 'svg', 'rss', 'atom'],
  extensions: ['.xml', '.xsl', '.xslt', '.svg', '.rss', '.atom', '.xsd', '.wsdl'],
  mimeTypes: ['application/xml', 'text/xml', 'application/xsl+xml'],

  keywords: [],

  patterns: [
    // XML declaration
    { pattern: /<\?xml[^?]*\?>/, type: 'meta' },

    // Processing instructions
    { pattern: /<\?[\w-]+[^?]*\?>/, type: 'meta' },

    // DOCTYPE
    { pattern: /<!DOCTYPE[^>]*>/, type: 'meta' },

    // CDATA sections
    { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/, type: 'string' },

    // Comments
    { pattern: /<!--[\s\S]*?-->/, type: 'comment' },

    // Closing tags
    { pattern: /<\/[\w:-]+>/, type: 'tag' },

    // Self-closing tags
    { pattern: /<[\w:-]+[^>]*\/>/, type: 'tag' },

    // Opening tag start
    { pattern: /<[\w:-]+/, type: 'tag' },

    // Tag end
    { pattern: /\/?>/, type: 'tag' },

    // Namespace prefix
    { pattern: /\b[\w-]+(?=:)/, type: 'type' },

    // Attributes
    { pattern: /\b[\w:-]+(?=\s*=)/, type: 'attribute' },

    // Entity references
    { pattern: /&[\w#]+;/, type: 'constant' },
  ],

  strings: [
    { start: '"', end: '"' },
    { start: "'", end: "'" },
  ],

  comments: {
    block: { start: '<!--', end: '-->' },
  },

  brackets: [
    { open: '<', close: '>' },
  ],
});

export default xml;
