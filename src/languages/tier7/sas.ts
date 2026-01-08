/**
 * SAS (Statistical Analysis System) language definition
 */
import { defineLang } from '../define-lang.js';

export const sas = defineLang({
  name: 'sas',
  aliases: [],
  extensions: ['.sas'],
  keywords: [
    // Data step keywords
    'data', 'set', 'merge', 'by', 'if', 'then', 'else', 'do', 'end', 'until', 'while',
    'output', 'drop', 'keep', 'rename', 'where', 'format', 'informat', 'label',
    'length', 'attrib', 'array', 'retain', 'input', 'put', 'file', 'infile',
    'cards', 'cards4', 'datalines', 'datalines4', 'run', 'quit', 'abort', 'stop',
    'delete', 'error', 'return', 'link', 'go', 'goto', 'leave', 'continue',
    'select', 'when', 'otherwise', 'end',
    // Proc keywords
    'proc', 'print', 'sort', 'means', 'freq', 'univariate', 'reg', 'glm',
    'logistic', 'mixed', 'sql', 'transpose', 'report', 'tabulate', 'sgplot',
    'sgpanel', 'gplot', 'gchart', 'format', 'catalog', 'datasets', 'contents',
    'compare', 'append', 'copy', 'import', 'export', 'corr', 'cluster', 'factor',
    'princomp', 'discrim', 'anova', 'ttest', 'npar1way', 'lifetest', 'phreg',
    'genmod', 'nlmixed', 'surveyselect', 'surveymeans', 'surveyfreq',
    // Macro keywords
    '%macro', '%mend', '%let', '%if', '%then', '%else', '%do', '%end', '%while',
    '%until', '%goto', '%global', '%local', '%put', '%include', '%sysfunc',
    '%str', '%nrstr', '%quote', '%nrquote', '%bquote', '%nrbquote', '%superq',
    '%eval', '%sysevalf', '%scan', '%substr', '%index', '%length', '%upcase',
    '%lowcase', '%verify', '%qscan', '%qsubstr', '%qupcase', '%qlowcase',
    // Options
    'options', 'title', 'title1', 'title2', 'title3', 'title4', 'footnote',
    'footnote1', 'footnote2', 'footnote3', 'footnote4', 'libname', 'filename',
  ],
  typeKeywords: [
    'char', 'num', '_character_', '_numeric_', '_all_', '_temporary_',
  ],
  constants: [
    '_n_', '_error_', '_null_', '_infile_', '_iorc_', '_cmd_', '_msg_',
  ],
  builtins: [
    // Numeric functions
    'abs', 'ceil', 'floor', 'int', 'max', 'min', 'mod', 'round', 'sign', 'sqrt',
    'exp', 'log', 'log2', 'log10', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan',
    'sinh', 'cosh', 'tanh', 'sum', 'mean', 'std', 'var', 'n', 'nmiss', 'range',
    'css', 'uss', 'cv', 'skewness', 'kurtosis', 'median', 'ordinal', 'pctl',
    // String functions
    'cat', 'cats', 'catt', 'catx', 'compress', 'index', 'indexc', 'indexw',
    'left', 'length', 'lowcase', 'propcase', 'quote', 'repeat', 'reverse',
    'right', 'scan', 'strip', 'substr', 'translate', 'tranwrd', 'trim',
    'upcase', 'verify', 'anyalnum', 'anyalpha', 'anydigit', 'anypunct', 'anyspace',
    'notalnum', 'notalpha', 'notdigit', 'notpunct', 'notspace', 'countc', 'countw',
    'find', 'findc', 'findw', 'prxmatch', 'prxchange', 'prxparse', 'prxposn',
    // Date/time functions
    'date', 'datetime', 'time', 'today', 'day', 'month', 'year', 'weekday',
    'week', 'qtr', 'hour', 'minute', 'second', 'mdy', 'yrdif', 'datdif', 'intck',
    'intnx', 'datepart', 'timepart', 'dhms', 'hms', 'put', 'input',
    // Probability functions
    'probnorm', 'probt', 'probchi', 'probf', 'probbeta', 'probgam', 'poisson',
    'rand', 'ranuni', 'rannor', 'ranbin', 'ranpoi', 'ranexp', 'rangam', 'rancau',
    // Logical functions
    'missing', 'cmiss', 'coalesce', 'coalescec', 'ifn', 'ifc', 'choose', 'choosec',
    'whichn', 'whichc', 'dim', 'hbound', 'lbound', 'symget', 'symexist', 'symglobl',
  ],
  patterns: [
    // Macro variables
    { pattern: /&[a-zA-Z_][a-zA-Z0-9_]*\.?/g, type: 'variable' },
    // Macro calls
    { pattern: /%[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'macro' },
    // Dataset references
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'property' },
    // Format specifications
    { pattern: /\b\$?[a-zA-Z_][a-zA-Z0-9_]*\d*\.\d*/g, type: 'type' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:E[+-]?\d+)?\b/gi, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|eq|ne|lt|le|gt|ge|in|not|and|or/gi, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '""' },
    { start: "'", end: "'", escape: "''" },
  ],
  comments: {
    line: '*',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default sas;
