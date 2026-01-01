/**
 * Diff/Patch language definition
 */

import { defineLang } from '../define-lang.js';

export const diff = defineLang({
  name: 'diff',
  aliases: ['patch', 'udiff'],
  extensions: ['.diff', '.patch'],
  mimeTypes: ['text/x-diff'],

  keywords: [],

  patterns: [
    // File headers (old file)
    { pattern: /^---\s+.+$/m, type: 'meta' },

    // File headers (new file)
    { pattern: /^\+\+\+\s+.+$/m, type: 'meta' },

    // Diff header (unified)
    { pattern: /^diff\s+.+$/m, type: 'meta' },

    // Index line
    { pattern: /^index\s+[\da-f]+\.\.[\da-f]+.*/m, type: 'meta' },

    // Hunk header
    { pattern: /^@@\s+-\d+(?:,\d+)?\s+\+\d+(?:,\d+)?\s+@@.*$/m, type: 'keyword' },

    // Added lines
    { pattern: /^\+.*/m, type: 'constant' },

    // Removed lines
    { pattern: /^-.*/m, type: 'invalid' },

    // Context indicator
    { pattern: /^\\ No newline.*/m, type: 'comment' },

    // Binary files
    { pattern: /^Binary files.*/m, type: 'meta' },

    // Git specific
    { pattern: /^new file mode.*/m, type: 'meta' },
    { pattern: /^deleted file mode.*/m, type: 'meta' },
    { pattern: /^similarity index.*/m, type: 'meta' },
    { pattern: /^rename from.*/m, type: 'meta' },
    { pattern: /^rename to.*/m, type: 'meta' },
  ],

  strings: [],

  comments: {},

  brackets: [],
});

export default diff;
