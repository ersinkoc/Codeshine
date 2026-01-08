/**
 * Clojure language definition
 */
import { defineLang } from '../define-lang.js';

export const clojure = defineLang({
  name: 'clojure',
  aliases: ['clj', 'cljs', 'cljc', 'edn'],
  extensions: ['.clj', '.cljs', '.cljc', '.edn'],
  keywords: [
    // Special forms
    'def', 'if', 'do', 'let', 'quote', 'var', 'fn', 'loop', 'recur', 'throw',
    'try', 'catch', 'finally', 'monitor-enter', 'monitor-exit', 'new', 'set!',
    // Macros
    'defn', 'defn-', 'defmacro', 'defmethod', 'defmulti', 'defonce', 'defprotocol',
    'defrecord', 'defstruct', 'deftype', 'definterface', 'extend', 'extend-protocol',
    'extend-type', 'reify', 'proxy',
    'ns', 'in-ns', 'import', 'use', 'require', 'refer', 'refer-clojure',
    'cond', 'condp', 'case', 'when', 'when-not', 'when-let', 'when-first',
    'when-some', 'if-let', 'if-not', 'if-some',
    'for', 'doseq', 'dotimes', 'while',
    'binding', 'with-open', 'with-local-vars', 'with-bindings', 'with-redefs',
    'letfn', 'lazy-seq', 'lazy-cat',
    'and', 'or', 'not',
    'assert', 'comment', 'declare', 'doc', 'gen-class', 'gen-interface',
  ],
  constants: [
    'nil', 'true', 'false',
  ],
  builtins: [
    // Core functions
    'str', 'pr', 'prn', 'print', 'println', 'pr-str', 'prn-str', 'print-str',
    'read', 'read-string', 'slurp', 'spit',
    // Collections
    'list', 'vector', 'hash-map', 'hash-set', 'sorted-map', 'sorted-set',
    'seq', 'sequence', 'cons', 'conj', 'into', 'concat', 'flatten',
    'first', 'second', 'last', 'rest', 'next', 'fnext', 'nnext', 'ffirst',
    'nth', 'get', 'get-in', 'assoc', 'assoc-in', 'dissoc', 'update', 'update-in',
    'count', 'empty', 'empty?', 'not-empty', 'contains?',
    'keys', 'vals', 'find', 'select-keys', 'merge', 'merge-with',
    'map', 'mapv', 'filter', 'filterv', 'remove', 'reduce', 'reduce-kv',
    'take', 'take-while', 'take-nth', 'take-last',
    'drop', 'drop-while', 'drop-last',
    'partition', 'partition-by', 'partition-all', 'group-by',
    'sort', 'sort-by', 'reverse', 'shuffle', 'rand-nth',
    'distinct', 'dedupe', 'frequencies',
    'some', 'every?', 'not-every?', 'not-any?', 'keep', 'keep-indexed',
    'range', 'repeat', 'repeatedly', 'iterate', 'cycle',
    'interleave', 'interpose', 'zipmap',
    // Type predicates
    'nil?', 'true?', 'false?', 'boolean?', 'some?',
    'number?', 'integer?', 'float?', 'ratio?', 'rational?', 'decimal?',
    'string?', 'char?', 'keyword?', 'symbol?',
    'list?', 'vector?', 'map?', 'set?', 'seq?', 'sequential?', 'coll?',
    'fn?', 'ifn?', 'instance?', 'class?',
    // Math
    'inc', 'dec', 'pos?', 'neg?', 'zero?', 'even?', 'odd?',
    'min', 'max', 'abs', 'mod', 'rem', 'quot',
    'bit-and', 'bit-or', 'bit-xor', 'bit-not', 'bit-shift-left', 'bit-shift-right',
    // Functions
    'apply', 'partial', 'comp', 'complement', 'constantly', 'identity', 'juxt', 'memoize',
    // Atoms & refs
    'atom', 'deref', 'reset!', 'swap!', 'compare-and-set!',
    'ref', 'dosync', 'alter', 'commute', 'ref-set',
    'agent', 'send', 'send-off', 'await', 'await-for',
    // Misc
    'name', 'namespace', 'keyword', 'symbol', 'gensym',
    'type', 'class', 'meta', 'with-meta', 'vary-meta',
  ],
  patterns: [
    // Metadata
    { pattern: /\^[a-zA-Z_][\w\-?!*+<>=]*/g, type: 'decorator' },
    { pattern: /\^:\S+/g, type: 'decorator' },
    { pattern: /\^\{[^}]*\}/g, type: 'decorator' },
    // Keywords
    { pattern: /::?[a-zA-Z_][\w\-?!*+<>=\/]*/g, type: 'symbol' },
    // Symbols with namespace
    { pattern: /[a-zA-Z_][\w\-?!*+<>=]*\/[a-zA-Z_][\w\-?!*+<>=]*/g, type: 'variable' },
    // Reader macros
    { pattern: /#'[a-zA-Z_][\w\-?!*+<>=\/]*/g, type: 'function' },
    { pattern: /#_/g, type: 'comment' },
    { pattern: /#\([^)]*\)/g, type: 'function' },
    { pattern: /#\{[^}]*\}/g, type: 'type' },
    { pattern: /@[a-zA-Z_][\w\-?!*+<>=]*/g, type: 'variable' },
    // Numbers
    { pattern: /\b-?0[xX][0-9a-fA-F]+N?\b/g, type: 'number' },
    { pattern: /\b-?0[0-7]+N?\b/g, type: 'number' },
    { pattern: /\b-?\d+(?:\/\d+)?\b/g, type: 'number' },
    { pattern: /\b-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?M?\b/g, type: 'number' },
    // Regex
    { pattern: /#"(?:[^"\\]|\\.)*"/g, type: 'regexp' },
    // Characters
    { pattern: /\\(?:newline|space|tab|formfeed|backspace|return|u[0-9a-fA-F]{4}|o[0-7]{1,3}|.)/g, type: 'string' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: ';',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '#{', close: '}' },
  ],
});

export default clojure;
