/**
 * JSX language definition
 */

import { extendLang } from '../define-lang.js';
import { javascript } from './javascript.js';

export const jsx = extendLang(javascript, {
  name: 'jsx',
  aliases: ['react-jsx'],
  extensions: ['.jsx'],
  mimeTypes: ['text/jsx'],

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
  ],

  // JSX expressions (`{…}`) are already tokenized with the JavaScript base
  // language this definition extends, so no embedded region is needed.
});

export default jsx;
