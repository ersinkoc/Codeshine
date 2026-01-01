/**
 * Lua language definition
 */

import { defineLang } from '../define-lang.js';

export const lua = defineLang({
  name: 'lua',
  aliases: [],
  extensions: ['.lua'],
  mimeTypes: ['text/x-lua'],

  keywords: [
    'and', 'break', 'do', 'else', 'elseif', 'end', 'for', 'function',
    'goto', 'if', 'in', 'local', 'not', 'or', 'repeat', 'return',
    'then', 'until', 'while',
  ],

  constants: ['true', 'false', 'nil'],

  operators: /[+\-*/%^#=<>~]+|\.\.\.?/,

  patterns: [
    { pattern: /\b(?:print|type|tonumber|tostring|pairs|ipairs|next|select|unpack|pcall|xpcall|error|assert|collectgarbage|dofile|getfenv|getmetatable|load|loadfile|loadstring|rawequal|rawget|rawset|require|setfenv|setmetatable)\b/, type: 'function' },
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },
    { pattern: /\b0[xX][\da-fA-F]+\b/, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, type: 'number' },
    { pattern: /(?<=\.)\w+/, type: 'property' },
  ],

  strings: [
    { start: '[[', end: ']]', multiline: true },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],

  comments: {
    line: '--',
    block: { start: '--[[', end: ']]' },
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default lua;
