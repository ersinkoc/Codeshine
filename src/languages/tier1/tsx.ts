/**
 * TSX language definition
 */

import { extendLang } from '../define-lang.js';
import { typescript } from './typescript.js';

export const tsx = extendLang(typescript, {
  name: 'tsx',
  aliases: ['react-tsx'],
  extensions: ['.tsx'],
  mimeTypes: ['text/tsx'],

  patterns: [
    // JSX self-closing tags
    { pattern: /<[A-Z][\w.]*\s*[^>]*\/>/, type: 'tag' },

    // JSX opening tags
    { pattern: /<[A-Z][\w.]*/, type: 'tag' },

    // JSX closing tags
    { pattern: /<\/[A-Z][\w.]*>/, type: 'tag' },

    // JSX lowercase tags (HTML elements)
    { pattern: /<\/?[a-z][\w-]*/, type: 'tag' },

    // JSX attributes
    { pattern: /\b[a-z][\w-]*(?=\s*=)/, type: 'attribute' },

    // JSX spread attributes
    { pattern: /\{\.\.\.[\w.]+\}/, type: 'operator' },

    // Generic type in JSX context
    { pattern: /<[A-Z][\w]*>(?=\()/, type: 'type' },
  ],

  // TSX expressions (`{…}`) are already tokenized with the TypeScript base
  // language this definition extends, so no embedded region is needed.
});

export default tsx;
