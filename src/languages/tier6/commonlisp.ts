/**
 * Common Lisp programming language definition
 */
import { defineLang } from '../define-lang.js';

export const commonlisp = defineLang({
  name: 'commonlisp',
  aliases: ['lisp', 'cl', 'sbcl', 'clisp'],
  extensions: ['.lisp', '.lsp', '.cl', '.fasl', '.asd'],
  keywords: [
    // Special operators
    'block', 'catch', 'eval-when', 'flet', 'function', 'go', 'if', 'labels', 'let', 'let*',
    'load-time-value', 'locally', 'macrolet', 'multiple-value-call', 'multiple-value-prog1',
    'progn', 'progv', 'quote', 'return-from', 'setq', 'symbol-macrolet', 'tagbody',
    'the', 'throw', 'unwind-protect',
    // Definition forms
    'defun', 'defmacro', 'defgeneric', 'defmethod', 'defclass', 'defstruct', 'deftype',
    'defconstant', 'defparameter', 'defvar', 'defsetf', 'define-setf-expander',
    'define-compiler-macro', 'define-condition', 'define-method-combination',
    'define-modify-macro', 'define-symbol-macro',
    // Control flow
    'cond', 'when', 'unless', 'case', 'ecase', 'ccase', 'typecase', 'etypecase', 'ctypecase',
    'loop', 'do', 'do*', 'dotimes', 'dolist', 'return', 'prog', 'prog*', 'prog1', 'prog2',
    // Lambda list keywords
    '&optional', '&rest', '&key', '&allow-other-keys', '&aux', '&body', '&environment', '&whole',
    // Declaration
    'declare', 'declaim', 'proclaim', 'special', 'type', 'ftype', 'inline', 'notinline',
    'optimize', 'dynamic-extent', 'ignorable', 'ignore',
    // CLOS
    'make-instance', 'slot-value', 'slot-boundp', 'slot-makunbound', 'with-slots', 'with-accessors',
    'call-next-method', 'next-method-p', 'change-class', 'class-of', 'class-name',
    'initialize-instance', 'reinitialize-instance', 'shared-initialize', 'update-instance-for-different-class',
    // Conditions
    'handler-case', 'handler-bind', 'restart-case', 'restart-bind', 'with-simple-restart',
    'ignore-errors', 'signal', 'error', 'cerror', 'warn', 'invoke-restart', 'find-restart',
    'abort', 'continue', 'muffle-warning', 'store-value', 'use-value',
    // Format
    'format', 'with-output-to-string', 'with-input-from-string',
    // Package
    'in-package', 'use-package', 'export', 'import', 'shadow', 'shadowing-import',
    'make-package', 'find-package', 'intern', 'find-symbol',
  ],
  typeKeywords: [
    'nil', 't', 'null', 'atom', 'cons', 'list', 'symbol', 'keyword', 'package',
    'integer', 'fixnum', 'bignum', 'ratio', 'rational', 'float', 'short-float', 'single-float',
    'double-float', 'long-float', 'real', 'complex', 'number',
    'character', 'base-char', 'standard-char', 'extended-char',
    'string', 'simple-string', 'base-string', 'simple-base-string',
    'array', 'simple-array', 'vector', 'simple-vector', 'bit-vector', 'simple-bit-vector',
    'sequence', 'function', 'compiled-function', 'generic-function', 'standard-generic-function',
    'stream', 'file-stream', 'string-stream', 'synonym-stream', 'broadcast-stream',
    'concatenated-stream', 'two-way-stream', 'echo-stream',
    'hash-table', 'pathname', 'logical-pathname', 'readtable', 'random-state',
    'condition', 'serious-condition', 'simple-condition', 'warning', 'style-warning',
    'type-error', 'simple-type-error', 'error',
    'structure-object', 'standard-object', 'class', 'standard-class', 'built-in-class',
    'structure-class', 'method', 'standard-method',
  ],
  constants: [
    't', 'nil',
    'most-positive-fixnum', 'most-negative-fixnum',
    'most-positive-short-float', 'most-negative-short-float', 'least-positive-short-float', 'least-negative-short-float',
    'most-positive-single-float', 'most-negative-single-float', 'least-positive-single-float', 'least-negative-single-float',
    'most-positive-double-float', 'most-negative-double-float', 'least-positive-double-float', 'least-negative-double-float',
    'most-positive-long-float', 'most-negative-long-float', 'least-positive-long-float', 'least-negative-long-float',
    'short-float-epsilon', 'short-float-negative-epsilon',
    'single-float-epsilon', 'single-float-negative-epsilon',
    'double-float-epsilon', 'double-float-negative-epsilon',
    'long-float-epsilon', 'long-float-negative-epsilon',
    'pi', 'boole-1', 'boole-2', 'boole-and', 'boole-andc1', 'boole-andc2', 'boole-c1', 'boole-c2',
    'boole-clr', 'boole-eqv', 'boole-ior', 'boole-nand', 'boole-nor', 'boole-orc1', 'boole-orc2',
    'boole-set', 'boole-xor', 'call-arguments-limit', 'lambda-list-keywords', 'lambda-parameters-limit',
    'multiple-values-limit', 'array-dimension-limit', 'array-rank-limit', 'array-total-size-limit',
    'char-code-limit', 'internal-time-units-per-second',
    '*package*', '*print-array*', '*print-base*', '*print-case*', '*print-circle*', '*print-escape*',
    '*print-gensym*', '*print-length*', '*print-level*', '*print-lines*', '*print-miser-width*',
    '*print-pprint-dispatch*', '*print-pretty*', '*print-radix*', '*print-readably*', '*print-right-margin*',
    '*read-base*', '*read-default-float-format*', '*read-eval*', '*read-suppress*', '*readtable*',
    '*random-state*', '*error-output*', '*query-io*', '*debug-io*', '*terminal-io*', '*trace-output*',
    '*standard-input*', '*standard-output*', '*features*', '*modules*', '*compile-file-pathname*',
    '*compile-file-truename*', '*load-pathname*', '*load-truename*', '*compile-print*', '*compile-verbose*',
    '*load-print*', '*load-verbose*', '*macroexpand-hook*', '*default-pathname-defaults*',
    '*gensym-counter*', '*break-on-signals*', '*debugger-hook*',
  ],
  builtins: [
    // Core functions
    'apply', 'funcall', 'eval', 'compile', 'complement', 'constantly', 'identity', 'values', 'values-list',
    // List operations
    'cons', 'car', 'cdr', 'caar', 'cadr', 'cdar', 'cddr', 'first', 'second', 'third', 'fourth', 'fifth',
    'sixth', 'seventh', 'eighth', 'ninth', 'tenth', 'rest', 'last', 'nth', 'nthcdr', 'endp',
    'list', 'list*', 'make-list', 'copy-list', 'append', 'nconc', 'revappend', 'nreconc',
    'butlast', 'nbutlast', 'ldiff', 'tailp', 'list-length', 'member', 'member-if', 'member-if-not',
    'assoc', 'assoc-if', 'assoc-if-not', 'rassoc', 'rassoc-if', 'rassoc-if-not',
    'subst', 'subst-if', 'subst-if-not', 'nsubst', 'nsubst-if', 'nsubst-if-not',
    'push', 'pop', 'pushnew', 'adjoin', 'set-difference', 'nset-difference', 'set-exclusive-or',
    'nset-exclusive-or', 'union', 'nunion', 'intersection', 'nintersection', 'subsetp',
    // Sequence operations
    'length', 'elt', 'copy-seq', 'fill', 'subseq', 'map', 'map-into', 'reduce', 'count', 'count-if',
    'count-if-not', 'find', 'find-if', 'find-if-not', 'position', 'position-if', 'position-if-not',
    'search', 'mismatch', 'replace', 'substitute', 'substitute-if', 'substitute-if-not',
    'nsubstitute', 'nsubstitute-if', 'nsubstitute-if-not', 'concatenate', 'merge', 'remove',
    'remove-if', 'remove-if-not', 'delete', 'delete-if', 'delete-if-not', 'remove-duplicates',
    'delete-duplicates', 'reverse', 'nreverse', 'sort', 'stable-sort',
    // Arithmetic
    '+', '-', '*', '/', '1+', '1-', 'abs', 'signum', 'gcd', 'lcm', 'floor', 'ceiling', 'truncate',
    'round', 'ffloor', 'fceiling', 'ftruncate', 'fround', 'mod', 'rem', 'min', 'max',
    'exp', 'expt', 'log', 'sqrt', 'isqrt', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh',
    'asinh', 'acosh', 'atanh', 'cis', 'phase', 'realpart', 'imagpart', 'conjugate', 'complex', 'rational', 'rationalize',
    'numerator', 'denominator', 'float', 'float-radix', 'float-sign', 'float-digits', 'float-precision',
    'integer-decode-float', 'decode-float', 'scale-float',
    // Comparison
    '=', '/=', '<', '>', '<=', '>=', 'eq', 'eql', 'equal', 'equalp',
    // Type predicates
    'atom', 'consp', 'listp', 'null', 'symbolp', 'keywordp', 'numberp', 'integerp', 'rationalp',
    'floatp', 'realp', 'complexp', 'characterp', 'stringp', 'vectorp', 'arrayp', 'bit-vector-p',
    'functionp', 'compiled-function-p', 'packagep', 'hash-table-p', 'pathnamep', 'streamp',
    'typep', 'subtypep', 'coerce',
    // String operations
    'char', 'schar', 'string', 'string-upcase', 'string-downcase', 'string-capitalize',
    'nstring-upcase', 'nstring-downcase', 'nstring-capitalize', 'string-trim', 'string-left-trim',
    'string-right-trim', 'string=', 'string/=', 'string<', 'string>', 'string<=', 'string>=',
    'string-equal', 'string-not-equal', 'string-lessp', 'string-greaterp', 'string-not-greaterp', 'string-not-lessp',
    // I/O
    'read', 'read-preserving-whitespace', 'read-delimited-list', 'read-line', 'read-char',
    'read-char-no-hang', 'peek-char', 'unread-char', 'read-byte', 'read-sequence', 'parse-integer',
    'write', 'prin1', 'print', 'pprint', 'princ', 'write-char', 'write-string', 'write-line',
    'terpri', 'fresh-line', 'finish-output', 'force-output', 'clear-output', 'write-byte', 'write-sequence',
    'y-or-n-p', 'yes-or-no-p',
    // Symbol operations
    'symbol-name', 'symbol-package', 'symbol-value', 'symbol-function', 'symbol-plist',
    'boundp', 'fboundp', 'special-operator-p', 'macro-function', 'compiler-macro-function',
    'get', 'getf', 'remprop', 'remf', 'get-properties',
    'gensym', 'gentemp', 'make-symbol', 'copy-symbol',
  ],
  patterns: [
    // Symbols with package prefix
    { pattern: /[a-zA-Z][a-zA-Z0-9+\-*/<>=!?$%&_~^]*:[a-zA-Z0-9+\-*/<>=!?$%&_~^:]*/g, type: 'variable' },
    // Keywords
    { pattern: /:[a-zA-Z0-9+\-*/<>=!?$%&_~^]+/g, type: 'symbol' },
    // Lambda list keywords
    { pattern: /&[a-zA-Z][a-zA-Z0-9\-]*/g, type: 'keyword' },
    // Global/special variables
    { pattern: /\*[a-zA-Z0-9+\-*/<>=!?$%&_~^]+\*/g, type: 'variable' },
    // Constants
    { pattern: /\+[a-zA-Z0-9+\-*/<>=!?$%&_~^]+\+/g, type: 'constant' },
    // Character literals
    { pattern: /#\\(?:Newline|Space|Tab|Page|Rubout|Return|Linefeed|Backspace|[^\s])/gi, type: 'string' },
    // Numbers
    { pattern: /#[bodxr][\d+\-./]+/gi, type: 'number' },
    { pattern: /[+-]?\d+(?:\/\d+)?/g, type: 'number' },
    { pattern: /[+-]?\d*\.\d+(?:[defls][+-]?\d+)?/gi, type: 'number' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: ';',
    block: { start: '#|', end: '|#' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default commonlisp;
