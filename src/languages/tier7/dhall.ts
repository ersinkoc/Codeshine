/**
 * Dhall configuration language definition
 */
import { defineLang } from '../define-lang.js';

export const dhall = defineLang({
  name: 'dhall',
  aliases: [],
  extensions: ['.dhall'],
  keywords: [
    'let', 'in', 'if', 'then', 'else', 'assert', 'as', 'using', 'merge', 'toMap',
    'showConstructor', 'with', 'forall', 'missing',
  ],
  typeKeywords: [
    'Bool', 'Natural', 'Integer', 'Double', 'Text', 'List', 'Optional', 'Type',
    'Kind', 'Sort', 'None', 'Some',
  ],
  constants: [
    'True', 'False', 'None', 'Some',
  ],
  builtins: [
    // Natural functions
    'Natural/build', 'Natural/fold', 'Natural/isZero', 'Natural/even', 'Natural/odd',
    'Natural/toInteger', 'Natural/show', 'Natural/subtract',
    // Integer functions
    'Integer/clamp', 'Integer/negate', 'Integer/toDouble', 'Integer/show',
    // Double functions
    'Double/show',
    // List functions
    'List/build', 'List/fold', 'List/length', 'List/head', 'List/last',
    'List/indexed', 'List/reverse',
    // Text functions
    'Text/show', 'Text/replace',
    // Date functions
    'Date/show',
    // Time functions
    'Time/show',
    // TimeZone functions
    'TimeZone/show',
  ],
  patterns: [
    // Type annotations
    { pattern: /:\s*[A-Z][a-zA-Z0-9_]*/g, type: 'type' },
    // Record field access
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'property' },
    // Lambda
    { pattern: /\\|λ|→|->|∀|forall/g, type: 'keyword' },
    // Numbers
    { pattern: /[+-]?\b\d+\.\d+(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    { pattern: /[+-]?\b\d+\b/g, type: 'number' },
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~#@]+|===?|\+\+|&&|\|\||\/\\/g, type: 'operator' },
  ],
  strings: [
    { start: "''", end: "''", escape: "''" },
    { start: '"', end: '"', escape: '\\', interpolation: { start: '${', end: '}' } },
  ],
  comments: {
    line: '--',
    block: { start: '{-', end: '-}' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
  ],
});

export default dhall;
