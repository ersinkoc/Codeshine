/**
 * PureScript programming language definition
 */
import { defineLang } from '../define-lang.js';

export const purescript = defineLang({
  name: 'purescript',
  aliases: ['purs'],
  extensions: ['.purs'],
  keywords: [
    'module', 'where', 'import', 'as', 'hiding',
    'data', 'type', 'newtype', 'class', 'instance', 'derive', 'newtype',
    'foreign', 'forall', 'do', 'ado', 'let', 'in', 'case', 'of',
    'if', 'then', 'else', 'infix', 'infixl', 'infixr',
  ],
  typeKeywords: [
    'Boolean', 'Int', 'Number', 'String', 'Char', 'Unit', 'Void',
    'Array', 'Effect', 'Aff', 'Maybe', 'Either', 'Tuple', 'List',
    'Record', 'Function', 'Type', 'Row', 'Symbol',
  ],
  constants: [
    'true', 'false', 'unit', 'Nothing', 'Just', 'Left', 'Right',
  ],
  builtins: [
    // Prelude
    'identity', 'const', 'flip', 'apply', 'applyFlipped', 'append',
    'map', 'void', 'flap', 'pure', 'bind', 'discard', 'join',
    'liftA1', 'liftM1', 'ap', 'when', 'unless',
    'eq', 'notEq', 'compare', 'min', 'max', 'comparing',
    'add', 'mul', 'sub', 'div', 'mod', 'negate', 'abs', 'signum',
    'zero', 'one', 'top', 'bottom',
    'conj', 'disj', 'not',
    'show', 'mempty', 'guard',
    // Effect
    'log', 'logShow', 'error', 'warn', 'info', 'time', 'timeEnd',
    // Array
    'length', 'null', 'range', 'replicate', 'singleton', 'cons', 'snoc',
    'head', 'last', 'tail', 'init', 'uncons', 'unsnoc', 'index',
    'elemIndex', 'elemLastIndex', 'findIndex', 'findLastIndex',
    'insertAt', 'deleteAt', 'updateAt', 'modifyAt', 'alterAt',
    'reverse', 'concat', 'concatMap', 'filter', 'partition',
    'filterA', 'mapMaybe', 'catMaybes', 'mapWithIndex',
    'sort', 'sortBy', 'sortWith', 'slice', 'take', 'takeEnd', 'takeWhile',
    'drop', 'dropEnd', 'dropWhile', 'span', 'group', 'groupBy',
    'nub', 'nubBy', 'nubByEq', 'union', 'unionBy', 'delete', 'deleteBy',
    'difference', 'intersect', 'intersectBy',
    'zipWith', 'zipWithA', 'zip', 'unzip',
    'foldl', 'foldr', 'foldMap', 'fold', 'intercalate',
    'scanl', 'scanr', 'any', 'all', 'elem', 'notElem', 'find', 'findMap',
  ],
  patterns: [
    // Module names / Type constructors
    { pattern: /\b[A-Z][a-zA-Z0-9_']*(?:\.[A-Z][a-zA-Z0-9_']*)*/g, type: 'type' },
    // Type variables
    { pattern: /\b[a-z][a-zA-Z0-9_']*/g, type: 'variable' },
    // Qualified names
    { pattern: /\b[A-Z][a-zA-Z0-9_']*\.[a-z][a-zA-Z0-9_']*/g, type: 'function' },
    // Record labels
    { pattern: /\b[a-z][a-zA-Z0-9_']*(?=\s*:)/g, type: 'property' },
    // Character literals
    { pattern: /'(?:[^'\\]|\\(?:x[0-9a-fA-F]+|.))'/g, type: 'string' },
    // Hexadecimal
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~@#$?:]+|->|<-|\||\\/g, type: 'operator' },
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

export default purescript;
