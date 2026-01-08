/**
 * Fortran programming language definition
 */
import { defineLang } from '../define-lang.js';

export const fortran = defineLang({
  name: 'fortran',
  aliases: ['f90', 'f95', 'f03', 'f08', 'f77'],
  extensions: ['.f', '.for', '.f90', '.f95', '.f03', '.f08', '.f77', '.fpp'],
  keywords: [
    // Program structure
    'program', 'end', 'module', 'submodule', 'use', 'only', 'implicit', 'none',
    'contains', 'interface', 'abstract', 'procedure', 'block', 'associate',
    // Data declarations
    'integer', 'real', 'double', 'precision', 'complex', 'logical', 'character',
    'type', 'class', 'dimension', 'allocatable', 'pointer', 'target', 'intent',
    'parameter', 'save', 'common', 'equivalence', 'data', 'namelist', 'sequence',
    'private', 'public', 'protected', 'optional', 'value', 'bind', 'volatile',
    'asynchronous', 'contiguous', 'codimension',
    // Procedures
    'subroutine', 'function', 'recursive', 'pure', 'elemental', 'impure',
    'result', 'external', 'intrinsic', 'entry',
    // Control flow
    'if', 'then', 'else', 'elseif', 'endif', 'select', 'case', 'default', 'endselect',
    'do', 'while', 'enddo', 'cycle', 'exit', 'forall', 'endforall', 'where', 'endwhere',
    'goto', 'continue', 'stop', 'error', 'return', 'call',
    // I/O
    'open', 'close', 'read', 'write', 'print', 'format', 'rewind', 'backspace',
    'endfile', 'inquire', 'flush', 'wait',
    // Memory
    'allocate', 'deallocate', 'nullify',
    // OOP
    'extends', 'generic', 'final', 'deferred', 'non_overridable', 'pass', 'nopass',
    // Coarray
    'sync', 'all', 'images', 'lock', 'unlock', 'critical', 'endcritical',
    // Operators
    'not', 'and', 'or', 'eqv', 'neqv', 'eq', 'ne', 'lt', 'le', 'gt', 'ge',
    'in', 'out', 'inout',
  ],
  typeKeywords: [
    'integer', 'real', 'double', 'precision', 'complex', 'logical', 'character',
    'type', 'class', 'kind', 'len',
  ],
  constants: [
    '.true.', '.false.', '.TRUE.', '.FALSE.',
  ],
  builtins: [
    // Numeric
    'abs', 'aimag', 'aint', 'anint', 'ceiling', 'cmplx', 'conjg', 'dble', 'dim',
    'dprod', 'floor', 'int', 'max', 'min', 'mod', 'modulo', 'nint', 'real', 'sign',
    // Mathematical
    'acos', 'asin', 'atan', 'atan2', 'cos', 'cosh', 'exp', 'log', 'log10', 'sin',
    'sinh', 'sqrt', 'tan', 'tanh', 'acosd', 'asind', 'atand', 'atan2d', 'cosd',
    'sind', 'tand', 'acosh', 'asinh', 'atanh', 'bessel_j0', 'bessel_j1', 'bessel_jn',
    'bessel_y0', 'bessel_y1', 'bessel_yn', 'erf', 'erfc', 'erfc_scaled', 'gamma',
    'hypot', 'log_gamma', 'norm2',
    // Character
    'achar', 'adjustl', 'adjustr', 'char', 'iachar', 'ichar', 'index', 'len',
    'len_trim', 'lge', 'lgt', 'lle', 'llt', 'repeat', 'scan', 'trim', 'verify',
    // Array
    'all', 'any', 'count', 'cshift', 'dot_product', 'eoshift', 'findloc', 'lbound',
    'matmul', 'maxloc', 'maxval', 'merge', 'minloc', 'minval', 'pack', 'product',
    'reshape', 'shape', 'size', 'spread', 'sum', 'transpose', 'ubound', 'unpack',
    // Inquiry
    'allocated', 'associated', 'bit_size', 'digits', 'epsilon', 'exponent', 'fraction',
    'huge', 'kind', 'lbound', 'len', 'maxexponent', 'minexponent', 'nearest', 'new_line',
    'null', 'precision', 'present', 'radix', 'range', 'rrspacing', 'scale',
    'selected_char_kind', 'selected_int_kind', 'selected_real_kind', 'set_exponent',
    'spacing', 'tiny', 'ubound',
    // Bit manipulation
    'bge', 'bgt', 'ble', 'blt', 'dshiftl', 'dshiftr', 'iall', 'iand', 'iany',
    'ibclr', 'ibits', 'ibset', 'ieor', 'ior', 'iparity', 'ishft', 'ishftc',
    'leadz', 'maskl', 'maskr', 'merge_bits', 'mvbits', 'not', 'popcnt', 'poppar',
    'shifta', 'shiftl', 'shiftr', 'trailz',
    // System
    'command_argument_count', 'cpu_time', 'date_and_time', 'execute_command_line',
    'get_command', 'get_command_argument', 'get_environment_variable', 'is_iostat_end',
    'is_iostat_eor', 'move_alloc', 'random_number', 'random_seed', 'system_clock',
  ],
  patterns: [
    // Logical operators
    { pattern: /\.\b(?:true|false|and|or|not|eqv|neqv|eq|ne|lt|le|gt|ge)\b\./gi, type: 'operator' },
    // Label references
    { pattern: /^\s*\d+/gm, type: 'label' },
    // Format specifiers
    { pattern: /\b\d*[adefgilxz]\d*(?:\.\d+)?/gi, type: 'meta' },
    // Kind parameters
    { pattern: /_\w+/g, type: 'type' },
    // Numbers
    { pattern: /\b\d+(?:\.\d*)?(?:[deDE][+-]?\d+)?(?:_\w+)?\b/g, type: 'number' },
    { pattern: /\b0[bB][01]+\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7]+\b/g, type: 'number' },
    { pattern: /\b0[zZ][0-9a-fA-F]+\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=:]+|\/\/|\*\*/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '"' },
    { start: "'", end: "'", escape: "'" },
  ],
  comments: {
    line: '!',
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
    { open: '(/', close: '/)' },
  ],
});

export default fortran;
