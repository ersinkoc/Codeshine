/**
 * ReScript programming language definition
 */
import { defineLang } from '../define-lang.js';

export const rescript = defineLang({
  name: 'rescript',
  aliases: ['res'],
  extensions: ['.res', '.resi'],
  keywords: [
    'and', 'as', 'assert', 'async', 'await', 'catch', 'constraint', 'else',
    'exception', 'external', 'for', 'if', 'in', 'include', 'lazy', 'let',
    'module', 'mutable', 'of', 'open', 'private', 'rec', 'switch', 'to',
    'try', 'type', 'when', 'while', 'with',
  ],
  typeKeywords: [
    'int', 'float', 'bool', 'char', 'string', 'unit', 'array', 'list',
    'option', 'result', 'promise', 'ref',
  ],
  constants: [
    'true', 'false', 'None', 'Some', 'Ok', 'Error',
  ],
  builtins: [
    // Core
    'Js', 'Belt', 'Array', 'List', 'String', 'Int', 'Float', 'Option', 'Result',
    'Promise', 'Console', 'Math', 'Date', 'Json', 'Dict', 'Map', 'Set',
    // Js module
    'log', 'log2', 'log3', 'log4', 'logMany', 'error', 'warn', 'info',
    // Array
    'length', 'get', 'set', 'make', 'makeBy', 'makeByU', 'makeByAndShuffle',
    'shuffle', 'shuffleInPlace', 'reverse', 'reverseInPlace', 'map', 'mapU',
    'mapWithIndex', 'mapWithIndexU', 'forEach', 'forEachU', 'forEachWithIndex',
    'reduce', 'reduceU', 'reduceReverse', 'reduceReverseU', 'reduceWithIndex',
    'some', 'someU', 'every', 'everyU', 'filter', 'filterU', 'filterWithIndex',
    'partition', 'partitionU', 'concat', 'concatMany', 'slice', 'sliceToEnd',
    'fill', 'blit', 'blitUnsafe', 'zip', 'zipBy', 'zipByU', 'unzip',
    'keep', 'keepU', 'keepWithIndex', 'keepMap', 'keepMapU', 'flatMap', 'flatMapU',
    // String
    'charAt', 'charCodeAt', 'codePointAt', 'concat', 'concatMany', 'endsWith',
    'includes', 'indexOf', 'indexOfFrom', 'lastIndexOf', 'lastIndexOfFrom',
    'localeCompare', 'match', 'normalize', 'padEnd', 'padStart', 'repeat',
    'replace', 'replaceByRe', 'search', 'slice', 'sliceToEnd', 'split',
    'splitAtMost', 'splitByRe', 'splitByReAtMost', 'startsWith', 'substr',
    'substrAtMost', 'substring', 'substringToEnd', 'toLowerCase', 'toUpperCase',
    'trim', 'trimEnd', 'trimStart',
    // Console
    'assert_', 'clear', 'count', 'countReset', 'debug', 'dir', 'dirxml',
    'group', 'groupCollapsed', 'groupEnd', 'table', 'time', 'timeEnd', 'timeLog', 'trace',
  ],
  patterns: [
    // Decorators
    { pattern: /@@?[a-zA-Z_][a-zA-Z0-9_.]*/g, type: 'decorator' },
    { pattern: /%[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Module paths
    { pattern: /\b[A-Z][a-zA-Z0-9_]*(?:\.[A-Z][a-zA-Z0-9_]*)*/g, type: 'type' },
    // Type variables
    { pattern: /'[a-z_][a-zA-Z0-9_]*/g, type: 'type' },
    // Polymorphic variants
    { pattern: /#[A-Za-z_][a-zA-Z0-9_]*/g, type: 'symbol' },
    // JSX tags
    { pattern: /<\/?[A-Za-z][A-Za-z0-9_]*(?:\.[A-Za-z][A-Za-z0-9_]*)*/g, type: 'tag' },
    // Template string interpolation
    { pattern: /\$\{[^}]+\}/g, type: 'interpolation' },
    // Labeled arguments
    { pattern: /~[a-z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=@~?]+|=>|->|\|>|:>|\.\.\./g, type: 'operator' },
  ],
  strings: [
    { start: '`', end: '`', escape: '\\', interpolation: { start: '${', end: '}' } },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
  ],
});

export default rescript;
