/**
 * Maxima computer algebra system language definition
 */
import { defineLang } from '../define-lang.js';

export const maxima = defineLang({
  name: 'maxima',
  aliases: ['macsyma'],
  extensions: ['.mac', '.max', '.maxima'],
  keywords: [
    'if', 'then', 'else', 'elseif', 'unless', 'and', 'or', 'not',
    'do', 'for', 'from', 'to', 'step', 'thru', 'while', 'unless', 'next',
    'in', 'unless', 'return', 'go', 'throw', 'catch', 'block', 'lambda',
    'local', 'define', 'function', 'macro', 'buildq', 'splice',
    'true', 'false', 'all', 'inf', 'minf', 'und', 'ind', 'zeroa', 'zerob',
  ],
  builtins: [
    // Basic algebra
    'expand', 'factor', 'ratsimp', 'radcan', 'trigsimp', 'trigexpand',
    'trigreduce', 'exponentialize', 'demoivre', 'rectform', 'polarform',
    'realpart', 'imagpart', 'cabs', 'carg', 'conjugate', 'residue',
    // Calculus
    'diff', 'integrate', 'limit', 'sum', 'product', 'taylor', 'powerseries',
    'laplace', 'ilt', 'fourier', 'fouriercos', 'fouriersin',
    'desolve', 'ode2', 'ic1', 'ic2', 'bc2',
    // Linear algebra
    'matrix', 'determinant', 'transpose', 'invert', 'eigenvalues', 'eigenvectors',
    'charpoly', 'adjoint', 'rank', 'triangularize', 'echelon', 'rowswap',
    'rowop', 'columnswap', 'columnop', 'mattrace', 'matrixp', 'zeromatrix',
    'ident', 'diagmatrix', 'genmatrix', 'copymatrix', 'submatrix', 'addrow',
    'addcol', 'args', 'apply', 'map', 'maplist', 'fullmap', 'fullmapl',
    // Equations
    'solve', 'linsolve', 'algsys', 'realroots', 'allroots', 'find_root',
    'newton', 'eliminate', 'resultant', 'grobner_basis',
    // Simplification
    'simplify', 'fullratsimp', 'ratexpand', 'partfrac', 'logcontract',
    'logexpand', 'rootscontract', 'combine', 'multthru',
    // Trigonometry
    'sin', 'cos', 'tan', 'cot', 'sec', 'csc', 'asin', 'acos', 'atan', 'acot',
    'asec', 'acsc', 'sinh', 'cosh', 'tanh', 'coth', 'sech', 'csch', 'asinh',
    'acosh', 'atanh', 'acoth', 'asech', 'acsch', 'atan2',
    // Exponential/Logarithmic
    'exp', 'log', 'log10', 'log2', 'sqrt', 'isqrt', 'abs', 'signum',
    // Number theory
    'gcd', 'lcm', 'mod', 'quotient', 'remainder', 'ceiling', 'floor', 'round',
    'truncate', 'primep', 'next_prime', 'prev_prime', 'factor', 'divisors',
    'totient', 'jacobi', 'kronecker', 'power_mod', 'mod_inverse',
    // Lists and sets
    'first', 'last', 'rest', 'reverse', 'length', 'append', 'cons', 'endcons',
    'flatten', 'sort', 'unique', 'member', 'delete', 'sublist', 'makelist',
    'create_list', 'setify', 'listify', 'union', 'intersection', 'setdifference',
    'subsetp', 'elementp', 'cardinality', 'powerset', 'permutations', 'subset',
    // Plotting
    'plot2d', 'plot3d', 'contour_plot', 'implicit_plot', 'parametric_plot',
    'polar_plot', 'draw', 'draw2d', 'draw3d', 'wxplot2d', 'wxplot3d',
    // I/O
    'print', 'display', 'grind', 'string', 'concat', 'sconcat', 'printf',
    'load', 'batch', 'save', 'writefile', 'closefile', 'read', 'readonly',
    // Types
    'atom', 'listp', 'numberp', 'integerp', 'floatnump', 'bfloatp', 'ratnump',
    'constantp', 'symbolp', 'stringp', 'matrixp', 'subvarp', 'setp', 'orderlessp',
  ],
  constants: [
    '%e', '%pi', '%i', '%phi', '%gamma', 'inf', 'minf', 'und', 'true', 'false',
  ],
  patterns: [
    // Labels
    { pattern: /\([A-Z]\d+\)/g, type: 'label' },
    // Function definitions
    { pattern: /[a-zA-Z_][a-zA-Z0-9_]*(?=\s*\()/g, type: 'function' },
    // Variables
    { pattern: /%[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(?:b\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%^:=<>!&|~@#]+|:=|::=|->|<=|>=|==|\\#/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default maxima;
