/**
 * Markdown language definition
 */

import { defineLang } from '../define-lang.js';

export const markdown = defineLang({
  name: 'markdown',
  aliases: ['md', 'mkd', 'mkdown'],
  extensions: ['.md', '.markdown', '.mkd', '.mkdown'],
  mimeTypes: ['text/markdown', 'text/x-markdown'],

  keywords: [],

  patterns: [
    // Headers
    { pattern: /^#{1,6}\s+.+$/m, type: 'keyword' },

    // Fenced code blocks (with language)
    { pattern: /```[\w]*[\s\S]*?```/, type: 'string' },

    // Inline code
    { pattern: /`[^`\n]+`/, type: 'string' },

    // Bold
    { pattern: /\*\*[^*\n]+\*\*/, type: 'keyword' },
    { pattern: /__[^_\n]+__/, type: 'keyword' },

    // Italic
    { pattern: /\*[^*\n]+\*/, type: 'meta' },
    { pattern: /_[^_\n]+_/, type: 'meta' },

    // Strikethrough
    { pattern: /~~[^~\n]+~~/, type: 'comment' },

    // Links
    { pattern: /\[[^\]]+\]\([^)]+\)/, type: 'function' },

    // Images
    { pattern: /!\[[^\]]*\]\([^)]+\)/, type: 'function' },

    // Reference links
    { pattern: /\[[^\]]+\]\[[^\]]*\]/, type: 'function' },

    // Reference definitions
    { pattern: /^\[[^\]]+\]:\s+.+$/m, type: 'property' },

    // Blockquotes
    { pattern: /^>\s+.+$/m, type: 'comment' },

    // Unordered lists
    { pattern: /^[\s]*[-*+]\s+/m, type: 'operator' },

    // Ordered lists
    { pattern: /^[\s]*\d+\.\s+/m, type: 'operator' },

    // Horizontal rules
    { pattern: /^(?:[-*_]\s*){3,}$/m, type: 'comment' },

    // Task lists
    { pattern: /\[[ xX]\]/, type: 'constant' },

    // HTML tags
    { pattern: /<\/?[\w-]+[^>]*>/, type: 'tag' },

    // Autolinks
    { pattern: /<https?:\/\/[^>]+>/, type: 'function' },

    // Email autolinks
    { pattern: /<[^@\s]+@[^>\s]+>/, type: 'function' },

    // Footnotes
    { pattern: /\[\^[^\]]+\]/, type: 'meta' },

    // Math blocks (for extended markdown)
    { pattern: /\$\$[\s\S]*?\$\$/, type: 'string' },

    // Inline math
    { pattern: /\$[^$\n]+\$/, type: 'string' },
  ],

  strings: [],

  comments: {},

  brackets: [
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default markdown;
