/**
 * Stata statistical language definition
 */
import { defineLang } from '../define-lang.js';

export const stata = defineLang({
  name: 'stata',
  aliases: ['ado'],
  extensions: ['.do', '.ado', '.dta'],
  keywords: [
    // Program control
    'program', 'end', 'version', 'set', 'clear', 'all', 'mata', 'exit', 'error',
    'capture', 'noisily', 'quietly', 'return', 'ereturn', 'sreturn', 'local',
    'global', 'scalar', 'matrix', 'tempvar', 'tempname', 'tempfile',
    // Flow control
    'if', 'else', 'while', 'forvalues', 'foreach', 'in', 'of', 'continue', 'break',
    // Data management
    'use', 'save', 'import', 'export', 'merge', 'append', 'keep', 'drop', 'rename',
    'order', 'sort', 'gsort', 'by', 'bysort', 'egen', 'generate', 'replace',
    'recode', 'encode', 'decode', 'destring', 'tostring', 'label', 'variable',
    'define', 'values', 'notes', 'compress', 'describe', 'codebook', 'inspect',
    'list', 'browse', 'edit', 'input', 'infile', 'infix', 'outfile', 'outsheet',
    'insheet', 'xmluse', 'xmlsave', 'odbc', 'load', 'query',
    // Statistics
    'summarize', 'tabulate', 'table', 'correlate', 'pwcorr', 'regress', 'logit',
    'probit', 'ologit', 'oprobit', 'mlogit', 'poisson', 'nbreg', 'tobit',
    'anova', 'ttest', 'ranksum', 'signrank', 'kwallis', 'prtest', 'sdtest',
    'factor', 'pca', 'cluster', 'xtset', 'xtreg', 'xtlogit', 'xtpoisson',
    'stset', 'stcox', 'streg', 'sts', 'ivregress', 'ivreg2', 'gmm', 'margins',
    'marginsplot', 'predict', 'estimates', 'test', 'lincom', 'nlcom', 'contrast',
    // Graphics
    'graph', 'twoway', 'scatter', 'line', 'connected', 'bar', 'hbar', 'dot',
    'box', 'pie', 'area', 'histogram', 'kdensity', 'qnorm', 'pnorm',
  ],
  builtins: [
    // Math functions
    'abs', 'ceil', 'floor', 'int', 'round', 'trunc', 'max', 'min', 'mod', 'sign',
    'sqrt', 'exp', 'ln', 'log', 'log10', 'sin', 'cos', 'tan', 'asin', 'acos',
    'atan', 'atan2', 'sinh', 'cosh', 'tanh', 'asinh', 'acosh', 'atanh',
    'sum', 'mean', 'sd', 'variance', 'cov', 'corr', 'total', 'count', 'percent',
    // String functions
    'abbrev', 'char', 'indexnot', 'itrim', 'length', 'lower', 'ltrim', 'plural',
    'proper', 'real', 'regexm', 'regexr', 'regexs', 'reverse', 'rtrim', 'soundex',
    'soundex_nara', 'strcat', 'strdup', 'string', 'strlen', 'strlower', 'strltrim',
    'strmatch', 'strpos', 'strproper', 'strreverse', 'strrtrim', 'strtoname',
    'strtrim', 'strupper', 'subinstr', 'subinword', 'substr', 'trim', 'upper',
    'ustrlen', 'usubstr', 'ustrlower', 'ustrupper', 'word', 'wordcount',
    // Date functions
    'date', 'day', 'dow', 'doy', 'halfyear', 'month', 'quarter', 'week', 'year',
    'daily', 'weekly', 'monthly', 'quarterly', 'halfyearly', 'yearly', 'clock',
    'Cmdyhms', 'Cofd', 'Cofc', 'dhms', 'dofC', 'dofm', 'dofq', 'dofw', 'dofy',
    'hms', 'hours', 'minutes', 'seconds', 'mdy', 'mdyhms', 'mofd', 'qofd',
    'wofd', 'yofd', 'ym', 'yq', 'yw', 'yh',
    // Statistical functions
    'normal', 'normalden', 'invnormal', 'ttail', 'invttail', 'chi2', 'invchi2',
    'Ftail', 'invFtail', 'binomial', 'binomialp', 'invbinomial', 'gammaden',
    'gammap', 'invgammap', 'betaden', 'ibeta', 'invibeta', 'nbinomial',
    'poisson', 'poissonp', 'runiform', 'rnormal', 'rbinomial', 'rpoisson',
    'rgamma', 'rbeta', 'rchi2', 'rt', 'rF',
    // Matrix functions
    'rowsof', 'colsof', 'trace', 'det', 'diag', 'vec', 'vecdiag', 'inv', 'invsym',
    'cholesky', 'hadamard', 'matuniform', 'nullmat', 'J', 'I', 'e',
    // Other
    'autocode', 'cond', 'group', 'inlist', 'inrange', 'irecode', 'missing',
    '_n', '_N', '_pi', '_rc',
  ],
  patterns: [
    // Macro expansion
    { pattern: /`[a-zA-Z_][a-zA-Z0-9_]*'/g, type: 'variable' },
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Return values
    { pattern: /\b(?:r|e|s)\([a-zA-Z_][a-zA-Z0-9_]*\)/g, type: 'variable' },
    // Variable lists
    { pattern: /\b_all\b|\b_n\b|\b_N\b/g, type: 'constant' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|==|!=|<=|>=|->|\.\.|::/g, type: 'operator' },
  ],
  strings: [
    { start: '`"', end: '"\x27', escape: '' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default stata;
