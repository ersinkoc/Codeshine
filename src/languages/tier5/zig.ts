/**
 * Zig language definition
 */
import { defineLang } from '../define-lang.js';

export const zig = defineLang({
  name: 'zig',
  aliases: [],
  extensions: ['.zig'],
  keywords: [
    'align', 'allowzero', 'and', 'anyframe', 'anytype', 'asm', 'async',
    'await', 'break', 'catch', 'comptime', 'const', 'continue', 'defer',
    'else', 'enum', 'errdefer', 'error', 'export', 'extern', 'fn', 'for',
    'if', 'inline', 'linksection', 'noalias', 'nosuspend', 'opaque', 'or',
    'orelse', 'packed', 'pub', 'resume', 'return', 'struct', 'suspend',
    'switch', 'test', 'threadlocal', 'try', 'union', 'unreachable',
    'usingnamespace', 'var', 'volatile', 'while',
  ],
  typeKeywords: [
    // Integer types
    'i8', 'i16', 'i32', 'i64', 'i128', 'isize',
    'u8', 'u16', 'u32', 'u64', 'u128', 'usize',
    // Float types
    'f16', 'f32', 'f64', 'f80', 'f128',
    // Comptime types
    'comptime_int', 'comptime_float',
    // Other types
    'bool', 'void', 'noreturn', 'type', 'anyerror', 'anyopaque',
    'c_char', 'c_short', 'c_ushort', 'c_int', 'c_uint', 'c_long', 'c_ulong',
    'c_longlong', 'c_ulonglong', 'c_longdouble',
  ],
  constants: [
    'true', 'false', 'null', 'undefined',
  ],
  builtins: [
    // Builtin functions (partial list)
    '@addWithOverflow', '@alignCast', '@alignOf', '@as', '@asyncCall',
    '@atomicLoad', '@atomicRmw', '@atomicStore', '@bitCast', '@bitOffsetOf',
    '@bitReverse', '@bitSizeOf', '@boolToInt', '@breakpoint', '@byteSwap',
    '@call', '@cDefine', '@ceil', '@cImport', '@cInclude', '@clz',
    '@cmpxchgStrong', '@cmpxchgWeak', '@compileError', '@compileLog',
    '@cos', '@ctz', '@cUndef', '@divExact', '@divFloor', '@divTrunc',
    '@embedFile', '@enumToInt', '@errSetCast', '@errorName', '@errorReturnTrace',
    '@errorToInt', '@exp', '@exp2', '@export', '@fabs', '@fence', '@field',
    '@fieldParentPtr', '@floatCast', '@floatToInt', '@floor', '@frame',
    '@frameAddress', '@frameSize', '@hasDecl', '@hasField', '@import',
    '@intCast', '@intToEnum', '@intToError', '@intToFloat', '@intToPtr',
    '@log', '@log10', '@log2', '@max', '@memcpy', '@memset', '@min', '@mod',
    '@mulAdd', '@mulWithOverflow', '@negation', '@offsetOf', '@panic',
    '@popCount', '@prefetch', '@ptrCast', '@ptrToInt', '@reduce', '@rem',
    '@returnAddress', '@round', '@select', '@setAlignStack', '@setCold',
    '@setEvalBranchQuota', '@setFloatMode', '@setRuntimeSafety', '@shlExact',
    '@shlWithOverflow', '@shrExact', '@shuffle', '@sin', '@sizeOf', '@splat',
    '@sqrt', '@src', '@subWithOverflow', '@tagName', '@tan', '@This',
    '@truncate', '@trunc', '@Type', '@typeInfo', '@typeName', '@unionInit',
    '@Vector', '@wasmMemoryGrow', '@wasmMemorySize',
  ],
  patterns: [
    // Character literals
    { pattern: /'(?:[^'\\]|\\[nrt\\'"0]|\\x[0-9a-fA-F]{2}|\\u\{[0-9a-fA-F]+\})'/g, type: 'string' },
    // Multiline strings
    { pattern: /\\\\[^\n]*/g, type: 'string' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+(?:\.[0-9a-fA-F_]+)?(?:[pP][+-]?[0-9]+)?\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Labels
    { pattern: /:[a-zA-Z_]\w*/g, type: 'label' },
    // Operators
    { pattern: /\.\.\.|\.\.|\.\*|[+\-*/%&|^!<>=]=?|<<|>>|and|or|orelse|catch|=>|\+\+|--/g, type: 'operator' },
    // Builtin functions
    { pattern: /@[a-zA-Z_]\w*/g, type: 'function' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default zig;
