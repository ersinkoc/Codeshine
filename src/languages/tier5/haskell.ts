/**
 * Haskell language definition
 */
import { defineLang } from '../define-lang.js';

export const haskell = defineLang({
  name: 'haskell',
  aliases: ['hs'],
  extensions: ['.hs', '.lhs', '.hsc'],
  keywords: [
    'case', 'class', 'data', 'default', 'deriving', 'do', 'else', 'family',
    'forall', 'foreign', 'hiding', 'if', 'import', 'in', 'infix', 'infixl',
    'infixr', 'instance', 'let', 'mdo', 'module', 'newtype', 'of', 'proc',
    'qualified', 'rec', 'then', 'type', 'where',
    // GHC extensions
    'pattern', 'role', 'signature', 'stock', 'anyclass', 'via',
  ],
  typeKeywords: [
    // Basic types
    'Bool', 'Char', 'Double', 'Float', 'Int', 'Integer', 'String', 'Word',
    // Common types
    'Maybe', 'Just', 'Nothing', 'Either', 'Left', 'Right',
    'IO', 'Monad', 'Functor', 'Applicative', 'Foldable', 'Traversable',
    'Eq', 'Ord', 'Show', 'Read', 'Enum', 'Bounded', 'Num', 'Real', 'Integral',
    'Fractional', 'Floating', 'RealFrac', 'RealFloat',
    'Semigroup', 'Monoid', 'Alternative',
  ],
  constants: [
    'True', 'False', 'Nothing', 'Just', 'Left', 'Right', 'LT', 'EQ', 'GT',
  ],
  builtins: [
    // Prelude functions
    'abs', 'acos', 'acosh', 'all', 'and', 'any', 'appendFile', 'asin', 'asinh',
    'atan', 'atan2', 'atanh', 'break', 'ceiling', 'compare', 'concat', 'concatMap',
    'const', 'cos', 'cosh', 'curry', 'cycle', 'decodeFloat', 'div', 'divMod',
    'drop', 'dropWhile', 'either', 'elem', 'encodeFloat', 'enumFrom', 'enumFromThen',
    'enumFromThenTo', 'enumFromTo', 'error', 'even', 'exp', 'exponent', 'fail',
    'filter', 'flip', 'floatDigits', 'floatRadix', 'floatRange', 'floor', 'fmap',
    'foldl', 'foldl1', 'foldr', 'foldr1', 'fromEnum', 'fromInteger', 'fromIntegral',
    'fromRational', 'fst', 'gcd', 'getChar', 'getContents', 'getLine', 'head', 'id',
    'init', 'interact', 'isDenormalized', 'isIEEE', 'isInfinite', 'isNaN',
    'isNegativeZero', 'iterate', 'last', 'lcm', 'length', 'lex', 'lines', 'log',
    'lookup', 'map', 'mapM', 'mapM_', 'max', 'maxBound', 'maximum', 'maybe', 'min',
    'minBound', 'minimum', 'mod', 'negate', 'not', 'notElem', 'null', 'odd', 'or',
    'otherwise', 'pi', 'pred', 'print', 'product', 'properFraction', 'pure',
    'putChar', 'putStr', 'putStrLn', 'quot', 'quotRem', 'read', 'readFile',
    'readIO', 'readList', 'readLn', 'readParen', 'reads', 'readsPrec', 'realToFrac',
    'recip', 'rem', 'repeat', 'replicate', 'return', 'reverse', 'round', 'scaleFloat',
    'scanl', 'scanl1', 'scanr', 'scanr1', 'seq', 'sequence', 'sequence_', 'show',
    'showChar', 'showList', 'showParen', 'showString', 'shows', 'showsPrec',
    'significand', 'signum', 'sin', 'sinh', 'snd', 'span', 'splitAt', 'sqrt',
    'subtract', 'succ', 'sum', 'tail', 'take', 'takeWhile', 'tan', 'tanh', 'toEnum',
    'toInteger', 'toRational', 'truncate', 'uncurry', 'undefined', 'unlines',
    'until', 'unwords', 'unzip', 'unzip3', 'userError', 'words', 'writeFile', 'zip',
    'zip3', 'zipWith', 'zipWith3',
  ],
  operators: /[!#$%&*+./<=>?@\\^|\-~:]+|->|<-|=>|::|\.\.|\|/,
  patterns: [
    // Pragma
    { pattern: /\{-#[\s\S]*?#-\}/, type: 'comment' },
    // Character literal
    { pattern: /'(?:[^'\\]|\\(?:x[0-9a-fA-F]+|o[0-7]+|[0-9]+|.))'/, type: 'string' },
    { pattern: /'\\&'/, type: 'string' },
    // Constructor/Type (capitalized identifiers)
    { pattern: /\b[A-Z][a-zA-Z0-9_']*\b/, type: 'type' },
    // Type signature
    { pattern: /::/, type: 'operator' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?\b/, type: 'number' },
    // Lambda backslash
    { pattern: /\\/, type: 'keyword' },
  ],
  strings: [
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

export default haskell;
