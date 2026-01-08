/**
 * AppleScript language definition
 */
import { defineLang } from '../define-lang.js';

export const applescript = defineLang({
  name: 'applescript',
  aliases: ['osascript', 'scpt'],
  extensions: ['.applescript', '.scpt', '.scptd'],
  keywords: [
    // Control flow
    'if', 'then', 'else', 'end', 'repeat', 'while', 'until', 'from', 'to', 'by',
    'with', 'times', 'exit', 'try', 'on', 'error', 'considering', 'ignoring',
    // Handlers
    'on', 'to', 'of', 'in', 'given', 'return', 'continue', 'tell', 'end',
    'using', 'terms', 'from', 'global', 'local', 'my', 'its', 'me',
    'property', 'prop', 'set', 'copy', 'get', 'put', 'into', 'after', 'before',
    'beginning', 'front', 'back', 'some', 'every', 'whose', 'where', 'that',
    'ref', 'reference', 'script', 'run', 'quit', 'launch', 'activate', 'open',
    'close', 'save', 'delete', 'duplicate', 'make', 'new', 'move', 'count',
    // Logic
    'and', 'or', 'not', 'as', 'div', 'mod', 'is', 'equal', 'equals', 'isnt',
    'contains', 'does', 'come', 'comes', 'comes', 'before', 'after', 'begins',
    'ends', 'starts', 'a', 'an', 'the', 'true', 'false', 'yes', 'no',
    // Types
    'integer', 'real', 'number', 'text', 'string', 'boolean', 'date', 'list',
    'record', 'alias', 'file', 'POSIX', 'class', 'constant', 'reference',
    'anything', 'missing', 'value',
    // Considering/ignoring
    'case', 'diacriticals', 'hyphens', 'punctuation', 'white', 'space',
    'numeric', 'strings', 'expansion', 'application', 'responses',
  ],
  builtins: [
    // Text commands
    'ASCII', 'character', 'characters', 'count', 'id', 'length', 'number',
    'offset', 'paragraph', 'paragraphs', 'text', 'word', 'words',
    // Math
    'random', 'round', 'rounding',
    // Dates
    'current', 'date', 'time', 'day', 'weekday', 'month', 'year', 'hours',
    'minutes', 'seconds', 'date string', 'time string',
    // Files
    'path', 'folder', 'disk', 'info', 'for', 'name', 'extension', 'displayed',
    'kind', 'creation', 'modification', 'size', 'type', 'creator', 'locked',
    'busy', 'status', 'alias', 'exists',
    // Lists
    'item', 'items', 'first', 'second', 'third', 'fourth', 'fifth', 'sixth',
    'seventh', 'eighth', 'ninth', 'tenth', 'last', 'middle', 'rest', 'reverse',
    'beginning', 'end', 'some', 'every', 'index',
    // User interaction
    'display', 'dialog', 'alert', 'notification', 'choose', 'file', 'folder',
    'from', 'list', 'color', 'beep', 'delay', 'say', 'do', 'shell', 'script',
    // Clipboard
    'clipboard', 'info', 'set', 'the', 'to',
    // System
    'system', 'attribute', 'info', 'version', 'AppleScript', 'Finder',
    // Standard additions
    'load', 'store', 'run', 'call', 'method', 'read', 'write', 'open', 'close',
    'ASCII number', 'ASCII character', 'summarize',
  ],
  patterns: [
    // Handler parameters
    { pattern: /\b(?:given|with|without)\s+[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Variables
    { pattern: /\b(?:set|copy)\s+[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Application names
    { pattern: /\bapplication\s+"[^"]+"/g, type: 'string' },
    // Numbers
    { pattern: /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/÷^&<>=≤≥≠]+|<=|>=|≠|≤|≥|¬|div|mod/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: '«', end: '»', escape: '' },
  ],
  comments: {
    line: '--',
    block: { start: '(*', end: '*)' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default applescript;
