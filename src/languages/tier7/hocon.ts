/**
 * HOCON (Human-Optimized Config Object Notation) definition
 */
import { defineLang } from '../define-lang.js';

export const hocon = defineLang({
  name: 'hocon',
  aliases: ['typesafe-config'],
  extensions: ['.conf', '.hocon'],
  keywords: [
    'include', 'url', 'file', 'classpath', 'required',
    'true', 'false', 'null', 'yes', 'no', 'on', 'off',
  ],
  patterns: [
    // Substitutions
    { pattern: /\$\{[?]?[^}]+\}/g, type: 'variable' },
    // Include statements
    { pattern: /include\s+(?:required\s*)?\([^)]+\)/g, type: 'keyword' },
    // Property keys
    { pattern: /[a-zA-Z_][a-zA-Z0-9_.-]*(?=\s*[=:{])/g, type: 'property' },
    // Duration units
    { pattern: /\b\d+\s*(?:ns|nano|nanos|nanosecond|nanoseconds|us|micro|micros|microsecond|microseconds|ms|milli|millis|millisecond|milliseconds|s|second|seconds|m|minute|minutes|h|hour|hours|d|day|days)\b/gi, type: 'number' },
    // Size units
    { pattern: /\b\d+\s*(?:b|byte|bytes|kb|kilobyte|kilobytes|mb|megabyte|megabytes|gb|gigabyte|gigabytes|tb|terabyte|terabytes|pb|petabyte|petabytes|eb|exabyte|exabytes|zb|zettabyte|zettabytes|yb|yottabyte|yottabytes|k|K|m|M|g|G|t|T|p|P|e|E|z|Z|y|Y)\b/g, type: 'number' },
    // Numbers
    { pattern: /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[=:+]/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '#',
    block: { start: '//', end: '\n' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default hocon;
