/**
 * Dotenv (.env) configuration language definition
 */
import { defineLang } from '../define-lang.js';

export const dotenv = defineLang({
  name: 'dotenv',
  aliases: ['env', 'environment'],
  extensions: ['.env', '.env.local', '.env.development', '.env.production', '.env.test', '.env.staging', '.env.example'],
  keywords: [],
  patterns: [
    // Variable names (keys)
    { pattern: /^[A-Z_][A-Z0-9_]*(?==)/gm, type: 'variable' },
    // Export keyword
    { pattern: /^export\s+/gm, type: 'keyword' },
    // Variable interpolation
    { pattern: /\$\{[A-Z_][A-Z0-9_]*\}/g, type: 'variable' },
    { pattern: /\$[A-Z_][A-Z0-9_]*/g, type: 'variable' },
    // Boolean values
    { pattern: /\b(?:true|false|yes|no|on|off)\b/gi, type: 'constant' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /=/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '(', close: ')' },
  ],
});

export default dotenv;
