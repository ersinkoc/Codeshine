/**
 * Whitespace esoteric language definition
 */
import { defineLang } from '../define-lang.js';

export const whitespace = defineLang({
  name: 'whitespace',
  aliases: ['ws'],
  extensions: ['.ws'],
  keywords: [],
  patterns: [
    // Spaces - Stack manipulation, Arithmetic, Heap Access (highlighted)
    { pattern: / /g, type: 'keyword' },
    // Tabs - Flow Control, I/O (highlighted differently)
    { pattern: /\t/g, type: 'operator' },
    // Newlines - Command terminators
    { pattern: /\n/g, type: 'builtin' },
    // Everything else is ignored (comment)
    { pattern: /[^ \t\n]+/g, type: 'comment' },
  ],
  strings: [],
  comments: {},
  brackets: [],
});

export default whitespace;
