/**
 * EJS (Embedded JavaScript) template language definition
 */
import { defineLang } from '../define-lang.js';

export const ejs = defineLang({
  name: 'ejs',
  aliases: ['eta', 'embedded-js'],
  extensions: ['.ejs', '.eta'],
  keywords: [
    // JavaScript keywords (for embedded code)
    'break', 'case', 'catch', 'continue', 'debugger', 'default', 'delete', 'do',
    'else', 'finally', 'for', 'function', 'if', 'in', 'instanceof', 'new',
    'return', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with',
    'class', 'const', 'enum', 'export', 'extends', 'import', 'super',
    'implements', 'interface', 'let', 'package', 'private', 'protected', 'public',
    'static', 'yield', 'await', 'async', 'of',
  ],
  constants: [
    'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
  ],
  patterns: [
    // EJS output tags
    { pattern: /<%=[\s\S]*?%>/g, type: 'interpolation' },
    // EJS unescaped output tags
    { pattern: /<%-[\s\S]*?%>/g, type: 'interpolation' },
    // EJS comment tags
    { pattern: /<%#[\s\S]*?%>/g, type: 'comment' },
    // EJS scriptlet tags
    { pattern: /<%[\s\S]*?%>/g, type: 'meta' },
    // EJS include
    { pattern: /<%[-=]?\s*include\s*\([^)]+\)\s*[-]?%>/g, type: 'function' },
    // HTML tags
    { pattern: /<\/?[a-zA-Z][a-zA-Z0-9]*(?:\s[^>]*)?\/?>/g, type: 'tag' },
    // HTML attributes
    { pattern: /\s[a-zA-Z][a-zA-Z0-9-]*(?==)/g, type: 'attribute' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=?:]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
  ],
  comments: {
    block: { start: '<%#', end: '%>' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<%', close: '%>' },
  ],
});

export default ejs;
