/**
 * Scheme/Racket programming language definition
 */
import { defineLang } from '../define-lang.js';

export const scheme = defineLang({
  name: 'scheme',
  aliases: ['scm', 'racket', 'rkt', 'guile', 'chicken'],
  extensions: ['.scm', '.ss', '.rkt', '.sld', '.sls', '.sps'],
  keywords: [
    // Core forms
    'define', 'define-syntax', 'define-macro', 'define-values', 'define-record-type',
    'lambda', 'λ', 'let', 'let*', 'letrec', 'letrec*', 'let-values', 'let*-values',
    'let-syntax', 'letrec-syntax',
    'if', 'cond', 'else', 'case', 'when', 'unless', 'and', 'or', 'not',
    'begin', 'do', 'delay', 'force', 'promise?',
    'set!', 'set-car!', 'set-cdr!',
    'quote', 'quasiquote', 'unquote', 'unquote-splicing',
    'syntax', 'syntax-rules', 'syntax-case', 'datum->syntax', 'syntax->datum',
    // Modules
    'library', 'import', 'export', 'require', 'provide', 'module', 'include',
    // Racket specific
    'struct', 'class', 'interface', 'mixin', 'unit', 'match', 'match-let', 'match-lambda',
    'for', 'for/list', 'for/fold', 'for/hash', 'for/and', 'for/or', 'for*',
    'contract', 'define/contract', 'provide/contract',
  ],
  constants: [
    '#t', '#f', '#true', '#false', "'()", 'null', 'nil',
  ],
  builtins: [
    // Predicates
    'null?', 'pair?', 'list?', 'boolean?', 'symbol?', 'number?', 'string?', 'char?',
    'vector?', 'procedure?', 'port?', 'input-port?', 'output-port?', 'eof-object?',
    'eq?', 'eqv?', 'equal?', 'zero?', 'positive?', 'negative?', 'odd?', 'even?',
    'integer?', 'real?', 'rational?', 'complex?', 'exact?', 'inexact?',
    // Lists
    'cons', 'car', 'cdr', 'caar', 'cadr', 'cdar', 'cddr', 'caaar', 'caadr', 'cadar',
    'caddr', 'cdaar', 'cdadr', 'cddar', 'cdddr', 'list', 'length', 'append', 'reverse',
    'list-ref', 'list-tail', 'member', 'memq', 'memv', 'assoc', 'assq', 'assv',
    'map', 'for-each', 'filter', 'fold', 'foldl', 'foldr', 'reduce', 'flatten',
    'first', 'second', 'third', 'fourth', 'fifth', 'rest', 'last', 'take', 'drop',
    // Arithmetic
    '+', '-', '*', '/', 'quotient', 'remainder', 'modulo', 'abs', 'max', 'min',
    'gcd', 'lcm', 'floor', 'ceiling', 'truncate', 'round', 'numerator', 'denominator',
    'exp', 'log', 'sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sqrt', 'expt',
    'make-rectangular', 'make-polar', 'real-part', 'imag-part', 'magnitude', 'angle',
    '=', '<', '>', '<=', '>=',
    // Strings
    'make-string', 'string', 'string-length', 'string-ref', 'string-set!',
    'string=?', 'string<?', 'string>?', 'string<=?', 'string>=?',
    'string-ci=?', 'string-ci<?', 'string-ci>?', 'string-ci<=?', 'string-ci>=?',
    'substring', 'string-append', 'string-copy', 'string->list', 'list->string',
    'string->symbol', 'symbol->string', 'string->number', 'number->string',
    'string-upcase', 'string-downcase', 'string-contains?', 'string-split', 'string-join',
    // Characters
    'char=?', 'char<?', 'char>?', 'char<=?', 'char>=?',
    'char-ci=?', 'char-ci<?', 'char-ci>?', 'char-ci<=?', 'char-ci>=?',
    'char-alphabetic?', 'char-numeric?', 'char-whitespace?', 'char-upper-case?', 'char-lower-case?',
    'char->integer', 'integer->char', 'char-upcase', 'char-downcase',
    // Vectors
    'make-vector', 'vector', 'vector-length', 'vector-ref', 'vector-set!',
    'vector->list', 'list->vector', 'vector-fill!', 'vector-copy', 'vector-append',
    // I/O
    'read', 'write', 'display', 'newline', 'read-char', 'write-char', 'peek-char',
    'open-input-file', 'open-output-file', 'close-input-port', 'close-output-port',
    'call-with-input-file', 'call-with-output-file', 'with-input-from-file', 'with-output-to-file',
    'current-input-port', 'current-output-port', 'eof-object', 'read-line', 'print', 'printf', 'fprintf',
    // Control
    'apply', 'call/cc', 'call-with-current-continuation', 'call-with-values', 'values',
    'dynamic-wind', 'eval', 'error', 'raise', 'with-handlers',
    // Hash tables
    'make-hash', 'hash', 'hash-ref', 'hash-set!', 'hash-remove!', 'hash-keys', 'hash-values',
    'hash-has-key?', 'hash-count', 'hash-map', 'hash-for-each',
  ],
  patterns: [
    // Shebang
    { pattern: /^#![^\n]*/gm, type: 'comment' },
    // Characters
    { pattern: /#\\(?:space|newline|tab|return|backspace|page|nul|alarm|vtab|escape|delete|[^\s])/g, type: 'string' },
    // Booleans
    { pattern: /#[tf](?:rue|alse)?/gi, type: 'constant' },
    // Numbers
    { pattern: /#[bodxei][\d+\-./]+/gi, type: 'number' },
    { pattern: /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?:[+-]\d+(?:\.\d+)?[ij])?/g, type: 'number' },
    { pattern: /[+-]?\d+\/\d+/g, type: 'number' },
    // Keywords (in function position)
    { pattern: /(?<=\()[a-zA-Z!$%&*+\-./:<=>?@^_~][a-zA-Z0-9!$%&*+\-./:<=>?@^_~]*/g, type: 'function' },
    // Symbols
    { pattern: /'[a-zA-Z!$%&*+\-./:<=>?@^_~][a-zA-Z0-9!$%&*+\-./:<=>?@^_~]*/g, type: 'symbol' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: '#<<', end: /\n[^\n]*$/, escape: '' },
  ],
  comments: {
    line: ';',
    block: { start: '#|', end: '|#' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
    { open: '{', close: '}' },
  ],
});

export default scheme;
