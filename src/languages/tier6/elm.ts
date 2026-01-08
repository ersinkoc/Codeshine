/**
 * Elm programming language definition
 */
import { defineLang } from '../define-lang.js';

export const elm = defineLang({
  name: 'elm',
  aliases: [],
  extensions: ['.elm'],
  keywords: [
    'module', 'exposing', 'import', 'as', 'port',
    'type', 'alias', 'case', 'of', 'if', 'then', 'else', 'let', 'in',
    'where', 'infix', 'infixl', 'infixr',
  ],
  typeKeywords: [
    'Bool', 'Int', 'Float', 'Char', 'String', 'List', 'Array', 'Dict', 'Set',
    'Maybe', 'Result', 'Cmd', 'Sub', 'Program', 'Task', 'Html', 'Attribute',
    'Never', 'Order', 'Decoder', 'Encoder', 'Value',
  ],
  constants: [
    'True', 'False', 'Nothing', 'Just', 'Ok', 'Err', 'LT', 'EQ', 'GT',
  ],
  builtins: [
    // Basics
    'identity', 'always', 'not', 'negate', 'abs', 'sqrt', 'clamp', 'compare',
    'xor', 'modBy', 'remainderBy', 'min', 'max', 'isNaN', 'isInfinite',
    'round', 'floor', 'ceiling', 'truncate', 'toFloat',
    'degrees', 'radians', 'turns', 'pi', 'cos', 'sin', 'tan', 'acos', 'asin', 'atan', 'atan2',
    'e', 'logBase',
    // List
    'map', 'indexedMap', 'foldl', 'foldr', 'filter', 'filterMap',
    'length', 'reverse', 'member', 'all', 'any', 'maximum', 'minimum',
    'sum', 'product', 'append', 'concat', 'concatMap', 'intersperse',
    'map2', 'map3', 'map4', 'map5',
    'sort', 'sortBy', 'sortWith', 'isEmpty', 'head', 'tail', 'take', 'drop',
    'partition', 'unzip', 'singleton', 'range', 'repeat',
    // String
    'isEmpty', 'length', 'reverse', 'repeat', 'replace', 'append', 'concat',
    'split', 'join', 'words', 'lines', 'slice', 'left', 'right', 'dropLeft', 'dropRight',
    'contains', 'startsWith', 'endsWith', 'indexes', 'indices',
    'toInt', 'fromInt', 'toFloat', 'fromFloat', 'toList', 'fromList',
    'toUpper', 'toLower', 'pad', 'padLeft', 'padRight', 'trim', 'trimLeft', 'trimRight',
    'map', 'filter', 'foldl', 'foldr', 'any', 'all',
    // Maybe
    'withDefault', 'map', 'map2', 'map3', 'map4', 'map5', 'andThen',
    // Result
    'withDefault', 'map', 'map2', 'map3', 'map4', 'map5', 'andThen',
    'toMaybe', 'fromMaybe', 'mapError',
    // Debug
    'toString', 'log', 'todo',
  ],
  patterns: [
    // Module names / Type constructors
    { pattern: /\b[A-Z][a-zA-Z0-9_]*(?:\.[A-Z][a-zA-Z0-9_]*)*/g, type: 'type' },
    // Type variables
    { pattern: /\b[a-z][a-zA-Z0-9_]*(?=\s*:)/g, type: 'variable' },
    // Record field access
    { pattern: /\.[a-z][a-zA-Z0-9_]*/g, type: 'property' },
    // Character literals
    { pattern: /'(?:[^'\\]|\\(?:x[0-9a-fA-F]{2}|u\{[0-9a-fA-F]+\}|.))'/g, type: 'string' },
    // Hexadecimal
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    // Float numbers
    { pattern: /\b\d+\.\d+(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Integer numbers
    { pattern: /\b\d+\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|->|<-|\|>|<\||>>|<<|::|\.\.|\+\+/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '--',
    block: { start: '{-', end: '-}' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default elm;
