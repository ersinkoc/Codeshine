/**
 * MATLAB programming language definition
 */
import { defineLang } from '../define-lang.js';

export const matlab = defineLang({
  name: 'matlab',
  aliases: ['octave', 'm'],
  extensions: ['.m', '.mat'],
  keywords: [
    // Control flow
    'if', 'elseif', 'else', 'end', 'for', 'while', 'do', 'switch', 'case', 'otherwise',
    'try', 'catch', 'break', 'continue', 'return', 'parfor', 'spmd',
    // Functions
    'function', 'classdef', 'properties', 'methods', 'events', 'enumeration',
    'persistent', 'global',
    // Other
    'import', 'arguments',
  ],
  typeKeywords: [
    // Data types
    'double', 'single', 'int8', 'int16', 'int32', 'int64', 'uint8', 'uint16', 'uint32', 'uint64',
    'logical', 'char', 'string', 'cell', 'struct', 'table', 'timetable', 'categorical',
    'datetime', 'duration', 'calendarDuration', 'function_handle',
    // Class modifiers
    'Abstract', 'Access', 'Constant', 'Dependent', 'GetAccess', 'GetObservable',
    'Hidden', 'NonCopyable', 'SetAccess', 'SetObservable', 'Static', 'Transient',
  ],
  constants: [
    'true', 'false', 'inf', 'Inf', 'nan', 'NaN', 'pi', 'eps', 'realmax', 'realmin',
    'intmax', 'intmin', 'namelengthmax', 'flintmax',
  ],
  builtins: [
    // Common functions
    'abs', 'acos', 'acosd', 'acosh', 'acot', 'acotd', 'acoth', 'acsc', 'acscd', 'acsch',
    'angle', 'ans', 'asec', 'asecd', 'asech', 'asin', 'asind', 'asinh', 'atan', 'atan2',
    'atand', 'atanh', 'ceil', 'complex', 'conj', 'cos', 'cosd', 'cosh', 'cot', 'cotd',
    'coth', 'csc', 'cscd', 'csch', 'cummax', 'cummin', 'cumprod', 'cumsum', 'deal',
    'disp', 'display', 'eps', 'error', 'exp', 'expm1', 'eye', 'factor', 'factorial',
    'false', 'fclose', 'feval', 'fft', 'fft2', 'fftn', 'fftshift', 'fgetl', 'fgets',
    'figure', 'find', 'fix', 'floor', 'fopen', 'format', 'fprintf', 'fscanf',
    'full', 'gamma', 'gcd', 'hist', 'hold', 'ifft', 'ifft2', 'ifftn', 'imag',
    'input', 'int2str', 'interp1', 'interp2', 'interpn', 'inv', 'ischar', 'isempty',
    'isequal', 'isfinite', 'isfloat', 'isinf', 'isinteger', 'islogical', 'isnan',
    'isnumeric', 'isreal', 'isscalar', 'isstr', 'isstruct', 'isvector',
    'length', 'linspace', 'log', 'log10', 'log2', 'logspace', 'max', 'mean', 'median',
    'meshgrid', 'min', 'mod', 'ndims', 'norm', 'num2str', 'numel', 'ones', 'pause',
    'plot', 'polar', 'poly', 'polyfit', 'polyval', 'pow2', 'primes', 'prod', 'rand',
    'randn', 'real', 'rem', 'repmat', 'reshape', 'round', 'sec', 'secd', 'sech',
    'sign', 'sin', 'sind', 'sinh', 'size', 'sort', 'sparse', 'sprintf', 'sqrt',
    'squeeze', 'sscanf', 'std', 'str2double', 'str2num', 'strcat', 'strcmp', 'strcmpi',
    'strfind', 'strrep', 'subplot', 'sum', 'surf', 'tan', 'tand', 'tanh', 'title',
    'transpose', 'trapz', 'true', 'unique', 'var', 'xlabel', 'ylabel', 'zeros', 'zlabel',
    // I/O
    'load', 'save', 'dlmread', 'dlmwrite', 'csvread', 'csvwrite', 'xlsread', 'xlswrite',
    'textscan', 'readtable', 'writetable', 'readmatrix', 'writematrix',
    // Matrix operations
    'det', 'eig', 'svd', 'lu', 'qr', 'chol', 'rank', 'trace', 'diag', 'tril', 'triu',
    'kron', 'cross', 'dot', 'null', 'orth', 'pinv', 'expm', 'logm', 'sqrtm',
  ],
  patterns: [
    // Matrix indexing
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*\s*(?=\()/g, type: 'function' },
    // Matrix transpose
    { pattern: /'/g, type: 'operator' },
    // Numbers with imaginary unit
    { pattern: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?[ij]\b/g, type: 'number' },
    // Numbers
    { pattern: /\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /\.?[+\-*\/%^\\<>=~&|]+|&&|\|\||~=/g, type: 'operator' },
    // Ellipsis (line continuation)
    { pattern: /\.\.\./g, type: 'punctuation' },
  ],
  strings: [
    { start: '"', end: '"', escape: '"' },
    { start: "'", end: "'", escape: "'" },
  ],
  comments: {
    line: '%',
    block: { start: '%{', end: '%}' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default matlab;
