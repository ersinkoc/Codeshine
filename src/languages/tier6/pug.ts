/**
 * Pug (formerly Jade) template language definition
 */
import { defineLang } from '../define-lang.js';

export const pug = defineLang({
  name: 'pug',
  aliases: ['jade'],
  extensions: ['.pug', '.jade'],
  keywords: [
    // Pug keywords
    'doctype', 'html', 'xml', 'transitional', 'strict', 'frameset', '5', '1.1', 'basic', 'mobile',
    'block', 'extends', 'include', 'append', 'prepend', 'mixin', 'case', 'when', 'default',
    'if', 'else', 'unless', 'each', 'for', 'in', 'of', 'while',
    // JavaScript keywords (for inline code)
    'var', 'let', 'const', 'function', 'return', 'true', 'false', 'null', 'undefined',
  ],
  constants: [
    'true', 'false', 'null', 'undefined',
  ],
  patterns: [
    // Doctype
    { pattern: /^doctype\s+.*/gm, type: 'meta' },
    // Tags
    { pattern: /^\s*[a-zA-Z][a-zA-Z0-9-]*/gm, type: 'tag' },
    // Classes
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'class' },
    // IDs
    { pattern: /#[a-zA-Z_][a-zA-Z0-9_-]*/g, type: 'attribute' },
    // Attributes
    { pattern: /\([^)]*\)/g, type: 'attribute' },
    // Interpolation
    { pattern: /#\{[^}]+\}/g, type: 'interpolation' },
    { pattern: /!\{[^}]+\}/g, type: 'interpolation' },
    // Unbuffered code
    { pattern: /^-\s.*/gm, type: 'meta' },
    // Buffered code
    { pattern: /^=\s.*/gm, type: 'interpolation' },
    // Unescaped buffered code
    { pattern: /^!=\s.*/gm, type: 'interpolation' },
    // Mixin definitions
    { pattern: /^mixin\s+[a-zA-Z_][a-zA-Z0-9_]*/gm, type: 'function' },
    // Mixin calls
    { pattern: /^\+[a-zA-Z_][a-zA-Z0-9_]*/gm, type: 'function' },
    // Block definitions
    { pattern: /^block\s+[a-zA-Z_][a-zA-Z0-9_]*/gm, type: 'keyword' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[=!<>]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '//',
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
    { open: '{', close: '}' },
  ],
});

export default pug;
