/**
 * R language definition
 */
import { defineLang } from '../define-lang.js';

export const r = defineLang({
  name: 'r',
  aliases: ['R', 'rlang'],
  extensions: ['.r', '.R', '.Rmd', '.Rnw'],
  keywords: [
    'if', 'else', 'repeat', 'while', 'for', 'in', 'next', 'break',
    'function', 'return', 'switch',
    'TRUE', 'FALSE', 'NULL', 'NA', 'NA_integer_', 'NA_real_', 'NA_complex_', 'NA_character_',
    'Inf', 'NaN',
    'library', 'require', 'attach', 'detach', 'source',
  ],
  typeKeywords: [
    'numeric', 'integer', 'double', 'complex', 'character', 'logical', 'raw',
    'list', 'vector', 'matrix', 'array', 'data.frame', 'factor', 'environment',
  ],
  builtins: [
    // Math
    'abs', 'sqrt', 'ceiling', 'floor', 'trunc', 'round', 'signif',
    'exp', 'log', 'log10', 'log2', 'log1p', 'expm1',
    'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'atan2',
    'cosh', 'sinh', 'tanh', 'acosh', 'asinh', 'atanh',
    // Statistics
    'sum', 'prod', 'mean', 'median', 'var', 'sd', 'range', 'min', 'max',
    'quantile', 'summary', 'cor', 'cov', 'scale',
    // Data manipulation
    'c', 'rep', 'seq', 'seq_len', 'seq_along', 'length', 'nrow', 'ncol', 'dim',
    'head', 'tail', 'rev', 'sort', 'order', 'rank', 'unique', 'duplicated',
    'which', 'which.min', 'which.max', 'match', 'merge', 'split',
    'rbind', 'cbind', 'append', 'subset', 'transform',
    // String
    'paste', 'paste0', 'sprintf', 'format', 'cat', 'print',
    'nchar', 'substr', 'substring', 'strsplit', 'grep', 'grepl', 'sub', 'gsub',
    'toupper', 'tolower', 'chartr', 'trimws',
    // Type checking/conversion
    'is.null', 'is.na', 'is.nan', 'is.finite', 'is.infinite',
    'is.numeric', 'is.integer', 'is.double', 'is.complex', 'is.character', 'is.logical',
    'is.list', 'is.vector', 'is.matrix', 'is.array', 'is.data.frame', 'is.factor',
    'as.numeric', 'as.integer', 'as.double', 'as.complex', 'as.character', 'as.logical',
    'as.list', 'as.vector', 'as.matrix', 'as.array', 'as.data.frame', 'as.factor',
    // Apply family
    'apply', 'lapply', 'sapply', 'vapply', 'mapply', 'tapply', 'by', 'aggregate',
    // I/O
    'read.csv', 'read.table', 'read.delim', 'readLines', 'scan',
    'write.csv', 'write.table', 'writeLines', 'save', 'load',
    // Misc
    'class', 'typeof', 'mode', 'names', 'attributes', 'attr',
    'get', 'assign', 'exists', 'rm', 'ls', 'str', 'setwd', 'getwd',
  ],
  patterns: [
    // Special assignment
    { pattern: /<<?-|->>?/g, type: 'operator' },
    // Pipe operator
    { pattern: /\|>|%>%|%<>%|%T>%|%\$%/g, type: 'operator' },
    // Formula operator
    { pattern: /~/g, type: 'operator' },
    // Namespace operator
    { pattern: /:::|::/g, type: 'operator' },
    // Range operator
    { pattern: /:/g, type: 'operator' },
    // Variables starting with .
    { pattern: /\.[a-zA-Z][\w.]*/g, type: 'variable' },
    // Function calls
    { pattern: /[a-zA-Z][\w.]*(?=\s*\()/g, type: 'function' },
    // Numbers
    { pattern: /\b\d+[Ll]?\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?[i]?\b/g, type: 'number' },
    { pattern: /\b\.\d+(?:[eE][+-]?\d+)?[i]?\b/g, type: 'number' },
    { pattern: /\b0[xX][0-9a-fA-F]+[Ll]?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/^]=?|[<>=!]=?|&&?|\|\|?|%%?|%\*%|%\/%|%in%|%o%|%x%/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '[[', close: ']]' },
  ],
});

export default r;
