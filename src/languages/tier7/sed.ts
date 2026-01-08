/**
 * Sed stream editor language definition
 */
import { defineLang } from '../define-lang.js';

export const sed = defineLang({
  name: 'sed',
  aliases: ['gsed'],
  extensions: ['.sed'],
  keywords: [
    // Commands
    'a', 'b', 'c', 'd', 'D', 'e', 'F', 'g', 'G', 'h', 'H', 'i', 'l', 'n', 'N',
    'p', 'P', 'q', 'Q', 'r', 'R', 's', 't', 'T', 'v', 'w', 'W', 'x', 'y', 'z',
  ],
  patterns: [
    // Address ranges
    { pattern: /^\s*\d+/gm, type: 'number' },
    { pattern: /^\s*\$\s*/gm, type: 'constant' },
    // Regex addresses
    { pattern: /\/(?:[^\/\\]|\\.)*\//g, type: 'regexp' },
    // Substitution command
    { pattern: /s[^a-zA-Z0-9]/g, type: 'keyword' },
    // Flags
    { pattern: /[gip0-9]+$/gm, type: 'attribute' },
    // Labels
    { pattern: /:[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'label' },
    // Branch to label
    { pattern: /b[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'function' },
    { pattern: /t[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'function' },
  ],
  strings: [
    { start: "'", end: "'", escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default sed;
