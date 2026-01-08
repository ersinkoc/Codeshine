/**
 * Batch/CMD language definition
 */
import { defineLang } from '../define-lang.js';

export const batch = defineLang({
  name: 'batch',
  aliases: ['bat', 'cmd', 'dosbatch'],
  extensions: ['.bat', '.cmd'],
  keywords: [
    'if', 'else', 'for', 'in', 'do', 'call', 'goto', 'exit', 'setlocal', 'endlocal',
    'set', 'echo', 'pause', 'rem', 'cls', 'title', 'color', 'prompt', 'path',
    'pushd', 'popd', 'cd', 'chdir', 'md', 'mkdir', 'rd', 'rmdir', 'del', 'erase',
    'copy', 'xcopy', 'move', 'ren', 'rename', 'type', 'find', 'findstr', 'sort',
    'more', 'tree', 'attrib', 'start', 'assoc', 'ftype', 'shift', 'ver', 'vol',
    'not', 'exist', 'defined', 'errorlevel', 'cmdextversion', 'equ', 'neq', 'lss',
    'leq', 'gtr', 'geq', 'nul', 'con', 'prn', 'aux', 'com1', 'com2', 'com3', 'com4',
    'lpt1', 'lpt2', 'lpt3', 'lpt4', 'on', 'off',
  ],
  patterns: [
    // Labels
    { pattern: /^:[a-zA-Z_]\w*/gm, type: 'label' },
    // Variables
    { pattern: /%[a-zA-Z_]\w*%/g, type: 'variable' },
    { pattern: /%%[a-zA-Z]/g, type: 'variable' },
    { pattern: /%[~dpnxfsatz]*\d/g, type: 'variable' },
    { pattern: /%\d/g, type: 'variable' },
    { pattern: /![a-zA-Z_]\w*!/g, type: 'variable' },
    // Environment variables
    { pattern: /%(?:cd|date|time|random|errorlevel|cmdextversion|cmdcmdline|highestnumanodenumber)%/gi, type: 'variable' },
    // Echo directive
    { pattern: /^@/gm, type: 'keyword' },
    // Redirection
    { pattern: />>?|<|&>|2>&1|\|/g, type: 'operator' },
    // Comparison operators (case insensitive)
    { pattern: /\b(?:equ|neq|lss|leq|gtr|geq)\b/gi, type: 'operator' },
    // Numbers
    { pattern: /\b\d+\b/g, type: 'number' },
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
  ],
  strings: [
    { start: '"', end: '"', escape: '^' },
  ],
  comments: {
    line: 'rem',
  },
  brackets: [
    { open: '(', close: ')' },
  ],
});

export default batch;
