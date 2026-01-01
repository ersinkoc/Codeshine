/**
 * GraphQL language definition
 */

import { defineLang } from '../define-lang.js';

export const graphql = defineLang({
  name: 'graphql',
  aliases: ['gql'],
  extensions: ['.graphql', '.gql'],
  mimeTypes: ['application/graphql'],

  keywords: [
    'query',
    'mutation',
    'subscription',
    'fragment',
    'on',
    'type',
    'interface',
    'union',
    'enum',
    'scalar',
    'input',
    'extend',
    'schema',
    'directive',
    'implements',
    'repeatable',
  ],

  constants: ['true', 'false', 'null'],

  patterns: [
    // Directives
    { pattern: /@\w+/, type: 'meta' },

    // Variables
    { pattern: /\$\w+/, type: 'variable' },

    // Fragment spread
    { pattern: /\.\.\./, type: 'operator' },

    // Type names
    { pattern: /(?<=:\s*)\[?\w+!?\]?!?/, type: 'type' },

    // Field names in definitions
    { pattern: /\b\w+(?=\s*[:(])/, type: 'property' },

    // Type definitions
    { pattern: /(?<=(?:type|interface|union|enum|scalar|input)\s+)\w+/, type: 'class' },

    // Numbers
    { pattern: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, type: 'number' },

    // Built-in types
    { pattern: /\b(?:Int|Float|String|Boolean|ID)\b/, type: 'type' },
  ],

  strings: [
    { start: '"""', end: '"""', multiline: true },
    { start: '"', end: '"', escape: '\\' },
  ],

  comments: {
    line: '#',
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default graphql;
