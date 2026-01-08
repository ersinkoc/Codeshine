/**
 * Makefile language definition
 */
import { defineLang } from '../define-lang.js';

export const makefile = defineLang({
  name: 'makefile',
  aliases: ['make', 'mk', 'bsdmake'],
  extensions: ['Makefile', 'makefile', 'GNUmakefile', '.mk', '.mak', '.make'],
  keywords: [
    'define', 'endef', 'undefine', 'ifdef', 'ifndef', 'ifeq', 'ifneq', 'else', 'endif',
    'include', '-include', 'sinclude', 'override', 'export', 'unexport', 'private',
    'vpath', 'VPATH',
  ],
  builtins: [
    // Functions
    'subst', 'patsubst', 'strip', 'findstring', 'filter', 'filter-out', 'sort',
    'word', 'wordlist', 'words', 'firstword', 'lastword',
    'dir', 'notdir', 'suffix', 'basename', 'addsuffix', 'addprefix', 'join', 'wildcard',
    'realpath', 'abspath', 'error', 'warning', 'info', 'shell',
    'origin', 'flavor', 'foreach', 'if', 'or', 'and', 'call', 'eval', 'file', 'value',
    'guile',
    // Automatic variables
    '@', '%', '<', '?', '^', '+', '|', '*',
    '@D', '@F', '*D', '*F', '%D', '%F', '<D', '<F', '^D', '^F', '+D', '+F', '?D', '?F',
    // Special targets
    '.PHONY', '.SUFFIXES', '.DEFAULT', '.PRECIOUS', '.INTERMEDIATE', '.SECONDARY',
    '.SECONDEXPANSION', '.DELETE_ON_ERROR', '.IGNORE', '.LOW_RESOLUTION_TIME',
    '.SILENT', '.EXPORT_ALL_VARIABLES', '.NOTPARALLEL', '.ONESHELL', '.POSIX',
    '.MAKE', '.SUFFIXES',
  ],
  patterns: [
    // Targets
    { pattern: /^[a-zA-Z_][\w.-]*(?=\s*:)/gm, type: 'function' },
    // Pattern rules
    { pattern: /%/g, type: 'operator' },
    // Variables
    { pattern: /\$\([^)]+\)/g, type: 'variable' },
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    { pattern: /\$[@%<?^+|*]/g, type: 'variable' },
    { pattern: /\$\([@%<?^+|*][DF]\)/g, type: 'variable' },
    // Variable assignments
    { pattern: /[a-zA-Z_][\w]*\s*[:?+]?=/g, type: 'variable' },
    // Recipe prefix
    { pattern: /^\t/gm, type: 'default' },
    // Functions
    { pattern: /\$\((?:subst|patsubst|strip|findstring|filter|filter-out|sort|word|wordlist|words|firstword|lastword|dir|notdir|suffix|basename|addsuffix|addprefix|join|wildcard|realpath|abspath|error|warning|info|shell|origin|flavor|foreach|if|or|and|call|eval|file|value)\b/g, type: 'function' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
  ],
});

export default makefile;
