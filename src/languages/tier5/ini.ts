/**
 * INI configuration file language definition
 */
import { defineLang } from '../define-lang.js';

export const ini = defineLang({
  name: 'ini',
  aliases: ['cfg', 'conf', 'properties', 'desktop'],
  extensions: ['.ini', '.cfg', '.conf', '.properties', '.desktop', '.gitconfig', '.editorconfig'],
  keywords: [],
  constants: [
    'true', 'false', 'yes', 'no', 'on', 'off', 'none', 'null',
    'True', 'False', 'Yes', 'No', 'On', 'Off', 'None', 'Null',
    'TRUE', 'FALSE', 'YES', 'NO', 'ON', 'OFF', 'NONE', 'NULL',
  ],
  patterns: [
    // Section headers
    { pattern: /^\s*\[[^\]]+\]/gm, type: 'tag' },
    // Keys (before = or :)
    { pattern: /^[^=:\[\]#;]+(?=[=:])/gm, type: 'property' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[=:]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: ';',
  },
  brackets: [
    { open: '[', close: ']' },
    { open: '{', close: '}' },
    { open: '(', close: ')' },
  ],
});

export default ini;
