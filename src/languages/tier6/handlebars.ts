/**
 * Handlebars template language definition
 */
import { defineLang } from '../define-lang.js';

export const handlebars = defineLang({
  name: 'handlebars',
  aliases: ['hbs', 'mustache'],
  extensions: ['.hbs', '.handlebars', '.mustache'],
  keywords: [
    'if', 'else', 'unless', 'each', 'with', 'lookup', 'log', 'blockHelperMissing',
    'helperMissing', 'as', 'this',
  ],
  builtins: [
    // Built-in helpers
    'if', 'unless', 'each', 'with', 'lookup', 'log',
    // Subexpressions
    '@index', '@key', '@first', '@last', '@root', '@level',
  ],
  patterns: [
    // Comments
    { pattern: /\{\{!--[\s\S]*?--\}\}/g, type: 'comment' },
    { pattern: /\{\{![^}]*\}\}/g, type: 'comment' },
    // Raw blocks
    { pattern: /\{\{\{\{[\s\S]*?\}\}\}\}/g, type: 'string' },
    // Block helpers (opening)
    { pattern: /\{\{#[a-zA-Z_][\w]*[^}]*\}\}/g, type: 'keyword' },
    // Block helpers (closing)
    { pattern: /\{\{\/[a-zA-Z_][\w]*\}\}/g, type: 'keyword' },
    // Else blocks
    { pattern: /\{\{\^[^}]*\}\}/g, type: 'keyword' },
    { pattern: /\{\{else\}\}/g, type: 'keyword' },
    // Partials
    { pattern: /\{\{>[^}]*\}\}/g, type: 'function' },
    // Unescaped
    { pattern: /\{\{\{[^}]*\}\}\}/g, type: 'variable' },
    // Regular expressions
    { pattern: /\{\{[^}]*\}\}/g, type: 'variable' },
    // Path segments
    { pattern: /\.\.?\/|this\./g, type: 'keyword' },
    // Data variables
    { pattern: /@[a-zA-Z_][\w]*/g, type: 'variable' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    block: { start: '{{!--', end: '--}}' },
  },
  brackets: [
    { open: '{{', close: '}}' },
    { open: '{{{', close: '}}}' },
    { open: '{{#', close: '}}' },
    { open: '{{/', close: '}}' },
  ],
  embedded: [
    { language: 'html', start: '', end: '' },
  ],
});

export default handlebars;
