/**
 * Brainfuck esoteric language definition
 */
import { defineLang } from '../define-lang.js';

export const brainfuck = defineLang({
  name: 'brainfuck',
  aliases: ['bf'],
  extensions: ['.bf', '.b'],
  keywords: [],
  patterns: [
    // Pointer operations
    { pattern: />/g, type: 'operator' },
    { pattern: /</g, type: 'operator' },
    // Cell operations
    { pattern: /\+/g, type: 'keyword' },
    { pattern: /-/g, type: 'keyword' },
    // I/O operations
    { pattern: /\./g, type: 'builtin' },
    { pattern: /,/g, type: 'builtin' },
    // Loop brackets
    { pattern: /\[/g, type: 'punctuation' },
    { pattern: /\]/g, type: 'punctuation' },
    // Everything else is a comment
    { pattern: /[^><+\-.,[\]]+/g, type: 'comment' },
  ],
  strings: [],
  comments: {},
  brackets: [
    { open: '[', close: ']' },
  ],
});

export default brainfuck;
