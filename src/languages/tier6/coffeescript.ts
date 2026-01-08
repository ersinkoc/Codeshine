/**
 * CoffeeScript language definition
 */
import { defineLang } from '../define-lang.js';

export const coffeescript = defineLang({
  name: 'coffeescript',
  aliases: ['coffee', 'cson', 'iced'],
  extensions: ['.coffee', '.cson', '.iced'],
  keywords: [
    'and', 'break', 'by', 'catch', 'class', 'continue', 'debugger', 'delete',
    'do', 'else', 'extends', 'finally', 'for', 'if', 'in', 'instanceof',
    'is', 'isnt', 'loop', 'new', 'not', 'of', 'or', 'return', 'super',
    'switch', 'then', 'this', 'throw', 'try', 'typeof', 'unless', 'until',
    'when', 'while', 'yield', 'await',
  ],
  constants: [
    'true', 'false', 'null', 'undefined', 'yes', 'no', 'on', 'off',
    'Infinity', 'NaN',
  ],
  builtins: [
    'console', 'window', 'document', 'navigator', 'process', 'require', 'module', 'exports',
    'global', '__dirname', '__filename', 'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
    'Array', 'Boolean', 'Date', 'Error', 'Function', 'JSON', 'Math', 'Number',
    'Object', 'RegExp', 'String', 'Promise', 'Map', 'Set', 'WeakMap', 'WeakSet',
    'Symbol', 'Proxy', 'Reflect', 'parseInt', 'parseFloat', 'isNaN', 'isFinite',
  ],
  patterns: [
    // This reference
    { pattern: /@[a-zA-Z_]\w*/g, type: 'variable' },
    // Splat operator
    { pattern: /\.\.\.|\.\./g, type: 'operator' },
    // Range
    { pattern: /\[[\w\s]+\.\.\.?[\w\s]+\]/g, type: 'operator' },
    // Interpolation
    { pattern: /#\{[^}]*\}/g, type: 'variable' },
    // Embedded JavaScript
    { pattern: /`[^`]*`/g, type: 'string' },
    // Regex
    { pattern: /\/\/\/[\s\S]*?\/\/\/[gimsuy]*/g, type: 'regexp' },
    { pattern: /\/(?:[^\/\\\n]|\\.)+\/[gimsuy]*/g, type: 'regexp' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01]+\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Fat arrow
    { pattern: /=>/g, type: 'operator' },
    // Thin arrow
    { pattern: /->/g, type: 'operator' },
    // Operators
    { pattern: /\?\.|[+\-*\/%&|^!<>=]=?|&&|\|\||<<|>>|~|\+\+|--|%%|::|[?:]/g, type: 'operator' },
    // Existential operator
    { pattern: /\?/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '\\' },
    { start: "'''", end: "'''", escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
    block: { start: '###', end: '###' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default coffeescript;
