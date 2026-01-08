/**
 * Befunge esoteric language definition
 */
import { defineLang } from '../define-lang.js';

export const befunge = defineLang({
  name: 'befunge',
  aliases: ['befunge-93', 'befunge-98'],
  extensions: ['.bf', '.befunge'],
  keywords: [],
  patterns: [
    // Direction arrows
    { pattern: /[<>^v]/g, type: 'keyword' },
    // Random direction
    { pattern: /\?/g, type: 'keyword' },
    // Digits
    { pattern: /[0-9]/g, type: 'number' },
    // Hex digits (Befunge-98)
    { pattern: /[a-f]/g, type: 'number' },
    // Arithmetic operators
    { pattern: /[+\-*\/%]/g, type: 'operator' },
    // Logical operators
    { pattern: /[!`]/g, type: 'operator' },
    // Stack operations
    { pattern: /[:\\$]/g, type: 'builtin' },
    // Control flow
    { pattern: /[_|#@]/g, type: 'keyword' },
    // I/O
    { pattern: /[,.&~]/g, type: 'builtin' },
    // Memory access
    { pattern: /[pg]/g, type: 'variable' },
    // String mode
    { pattern: /"[^"]*"/g, type: 'string' },
    // Space (no-op)
    { pattern: / /g, type: 'default' },
  ],
  strings: [
    { start: '"', end: '"', escape: '' },
  ],
  comments: {},
  brackets: [],
});

export default befunge;
