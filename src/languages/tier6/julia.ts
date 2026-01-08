/**
 * Julia language definition
 */
import { defineLang } from '../define-lang.js';

export const julia = defineLang({
  name: 'julia',
  aliases: ['jl'],
  extensions: ['.jl'],
  keywords: [
    'baremodule', 'begin', 'break', 'catch', 'const', 'continue', 'do', 'else',
    'elseif', 'end', 'export', 'finally', 'for', 'function', 'global', 'if',
    'import', 'let', 'local', 'macro', 'module', 'quote', 'return', 'struct',
    'try', 'using', 'while', 'abstract', 'type', 'primitive', 'mutable',
    'in', 'isa', 'where', 'outer',
  ],
  typeKeywords: [
    // Abstract types
    'Any', 'Number', 'Real', 'AbstractFloat', 'Integer', 'Signed', 'Unsigned',
    'AbstractArray', 'AbstractVector', 'AbstractMatrix', 'AbstractString',
    'AbstractChar', 'AbstractDict', 'AbstractSet', 'IO', 'Exception',
    // Concrete types
    'Int', 'Int8', 'Int16', 'Int32', 'Int64', 'Int128', 'BigInt',
    'UInt', 'UInt8', 'UInt16', 'UInt32', 'UInt64', 'UInt128',
    'Float16', 'Float32', 'Float64', 'BigFloat',
    'Bool', 'Char', 'String', 'Symbol', 'Expr', 'Nothing', 'Missing',
    'Complex', 'Rational',
    'Array', 'Vector', 'Matrix', 'Dict', 'Set', 'Tuple', 'NamedTuple',
    'Pair', 'Range', 'UnitRange', 'StepRange', 'LinRange',
    'Ref', 'Ptr', 'Function', 'Type', 'Union', 'UnionAll',
    'Task', 'Channel', 'Condition', 'ReentrantLock', 'SpinLock',
  ],
  constants: [
    'true', 'false', 'nothing', 'missing', 'undef', 'Inf', 'Inf16', 'Inf32', 'Inf64',
    'NaN', 'NaN16', 'NaN32', 'NaN64', 'pi', 'π', 'ℯ', 'im', 'ARGS', 'PROGRAM_FILE',
    'ENV', 'DEPOT_PATH', 'LOAD_PATH', 'VERSION', 'stdout', 'stderr', 'stdin',
  ],
  builtins: [
    // Core functions
    'print', 'println', 'printstyled', 'show', 'display', 'repr', 'string', 'sprint',
    'typeof', 'sizeof', 'isa', 'isbits', 'isimmutable', 'ismutable', 'isabstract',
    'isprimitivetype', 'isstructtype', 'isconcretetype',
    'convert', 'promote', 'oftype', 'widen',
    // Collections
    'length', 'size', 'ndims', 'axes', 'eachindex', 'keys', 'values', 'pairs',
    'first', 'last', 'firstindex', 'lastindex', 'getindex', 'setindex!',
    'push!', 'pop!', 'append!', 'prepend!', 'insert!', 'deleteat!', 'splice!',
    'empty!', 'resize!', 'copy', 'deepcopy',
    'map', 'map!', 'foreach', 'filter', 'filter!', 'reduce', 'foldl', 'foldr',
    'accumulate', 'accumulate!', 'zip', 'enumerate', 'collect',
    'sort', 'sort!', 'sortperm', 'sortperm!', 'issorted', 'reverse', 'reverse!',
    'unique', 'unique!', 'union', 'intersect', 'setdiff', 'symdiff',
    'in', 'findfirst', 'findlast', 'findnext', 'findprev', 'findall', 'findmax', 'findmin',
    'minimum', 'maximum', 'extrema', 'argmin', 'argmax', 'sum', 'prod', 'mean', 'std', 'var',
    // Math
    'abs', 'abs2', 'sign', 'signbit', 'copysign', 'flipsign',
    'sqrt', 'cbrt', 'hypot', 'exp', 'exp2', 'exp10', 'expm1',
    'log', 'log2', 'log10', 'log1p',
    'sin', 'cos', 'tan', 'cot', 'sec', 'csc',
    'asin', 'acos', 'atan', 'acot', 'asec', 'acsc',
    'sinh', 'cosh', 'tanh', 'coth', 'sech', 'csch',
    'asinh', 'acosh', 'atanh', 'acoth', 'asech', 'acsch',
    'sincos', 'sinpi', 'cospi', 'sincospi',
    'floor', 'ceil', 'round', 'trunc', 'clamp', 'mod', 'rem', 'mod1', 'mod2pi',
    'div', 'fld', 'cld', 'divrem', 'fldmod', 'gcd', 'lcm',
    'isnan', 'isinf', 'isfinite', 'iszero', 'isone', 'iseven', 'isodd',
    // Linear algebra
    'dot', 'cross', 'norm', 'normalize', 'transpose', 'adjoint', 'inv', 'det', 'tr',
    'eigen', 'eigvals', 'eigvecs', 'svd', 'qr', 'lu', 'cholesky',
    // I/O
    'open', 'close', 'read', 'readline', 'readlines', 'readchomp', 'write',
    'parse', 'tryparse', 'include', 'eval', 'invokelatest',
    // Error handling
    'error', 'throw', 'rethrow', '@assert', '@show', '@info', '@warn', '@error', '@debug',
  ],
  patterns: [
    // Macros
    { pattern: /@[a-zA-Z_]\w*/g, type: 'decorator' },
    // Symbols
    { pattern: /:[a-zA-Z_]\w*/g, type: 'symbol' },
    // String interpolation
    { pattern: /\$\([^)]+\)/g, type: 'variable' },
    { pattern: /\$[a-zA-Z_]\w*/g, type: 'variable' },
    // Type annotations
    { pattern: /::[A-Z][a-zA-Z0-9_]*/g, type: 'type' },
    // Parametric types
    { pattern: /[A-Z][a-zA-Z0-9_]*\{[^}]+\}/g, type: 'type' },
    // Ranges
    { pattern: /\b\d+:\d+(?::\d+)?\b/g, type: 'number' },
    // Complex/rational literals
    { pattern: /\b\d+(?:\.\d+)?(?:im|\/\/\d+)\b/g, type: 'number' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eEf][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /\.{2,3}|->|<:|>:|::|[+\-*\/%\\&|^!<>=]=?|÷|≠|≤|≥|∈|∉|⊆|⊇|⊂|⊃|∩|∪|√|∛|∑|∏|&&|\|\|/g, type: 'operator' },
    // Broadcasting dot
    { pattern: /\.[+\-*\/%^<>=]/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
  ],
  comments: {
    line: '#',
    block: { start: '#=', end: '=#' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default julia;
