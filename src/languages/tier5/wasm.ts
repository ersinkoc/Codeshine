/**
 * WebAssembly Text Format (WAT) language definition
 */
import { defineLang } from '../define-lang.js';

export const wasm = defineLang({
  name: 'wasm',
  aliases: ['wat', 'wast', 'webassembly'],
  extensions: ['.wat', '.wast'],
  keywords: [
    // Module structure
    'module', 'import', 'export', 'memory', 'data', 'table', 'elem', 'global',
    'local', 'type', 'func', 'param', 'result', 'start',
    // Control flow
    'block', 'loop', 'if', 'then', 'else', 'end', 'br', 'br_if', 'br_table',
    'return', 'call', 'call_indirect',
    // Variables
    'local.get', 'local.set', 'local.tee', 'global.get', 'global.set',
    'get_local', 'set_local', 'tee_local', 'get_global', 'set_global',
    // Memory
    'memory.size', 'memory.grow', 'memory.init', 'memory.copy', 'memory.fill',
    'data.drop', 'current_memory', 'grow_memory',
    // Table
    'table.get', 'table.set', 'table.size', 'table.grow', 'table.init',
    'table.copy', 'table.fill', 'elem.drop',
    // Reference types
    'ref.null', 'ref.is_null', 'ref.func', 'ref.extern',
    // Misc
    'unreachable', 'nop', 'drop', 'select',
  ],
  typeKeywords: [
    'i32', 'i64', 'f32', 'f64', 'v128',
    'funcref', 'externref', 'anyfunc',
    'mut',
  ],
  builtins: [
    // i32 operations
    'i32.load', 'i32.load8_s', 'i32.load8_u', 'i32.load16_s', 'i32.load16_u',
    'i32.store', 'i32.store8', 'i32.store16',
    'i32.const', 'i32.clz', 'i32.ctz', 'i32.popcnt',
    'i32.add', 'i32.sub', 'i32.mul', 'i32.div_s', 'i32.div_u',
    'i32.rem_s', 'i32.rem_u', 'i32.and', 'i32.or', 'i32.xor',
    'i32.shl', 'i32.shr_s', 'i32.shr_u', 'i32.rotl', 'i32.rotr',
    'i32.eqz', 'i32.eq', 'i32.ne', 'i32.lt_s', 'i32.lt_u',
    'i32.gt_s', 'i32.gt_u', 'i32.le_s', 'i32.le_u', 'i32.ge_s', 'i32.ge_u',
    'i32.wrap_i64', 'i32.trunc_f32_s', 'i32.trunc_f32_u',
    'i32.trunc_f64_s', 'i32.trunc_f64_u', 'i32.reinterpret_f32',
    'i32.extend8_s', 'i32.extend16_s',
    // i64 operations
    'i64.load', 'i64.load8_s', 'i64.load8_u', 'i64.load16_s', 'i64.load16_u',
    'i64.load32_s', 'i64.load32_u', 'i64.store', 'i64.store8', 'i64.store16', 'i64.store32',
    'i64.const', 'i64.clz', 'i64.ctz', 'i64.popcnt',
    'i64.add', 'i64.sub', 'i64.mul', 'i64.div_s', 'i64.div_u',
    'i64.rem_s', 'i64.rem_u', 'i64.and', 'i64.or', 'i64.xor',
    'i64.shl', 'i64.shr_s', 'i64.shr_u', 'i64.rotl', 'i64.rotr',
    'i64.eqz', 'i64.eq', 'i64.ne', 'i64.lt_s', 'i64.lt_u',
    'i64.gt_s', 'i64.gt_u', 'i64.le_s', 'i64.le_u', 'i64.ge_s', 'i64.ge_u',
    'i64.extend_i32_s', 'i64.extend_i32_u', 'i64.trunc_f32_s', 'i64.trunc_f32_u',
    'i64.trunc_f64_s', 'i64.trunc_f64_u', 'i64.reinterpret_f64',
    'i64.extend8_s', 'i64.extend16_s', 'i64.extend32_s',
    // f32 operations
    'f32.load', 'f32.store', 'f32.const',
    'f32.abs', 'f32.neg', 'f32.ceil', 'f32.floor', 'f32.trunc', 'f32.nearest', 'f32.sqrt',
    'f32.add', 'f32.sub', 'f32.mul', 'f32.div', 'f32.min', 'f32.max', 'f32.copysign',
    'f32.eq', 'f32.ne', 'f32.lt', 'f32.gt', 'f32.le', 'f32.ge',
    'f32.convert_i32_s', 'f32.convert_i32_u', 'f32.convert_i64_s', 'f32.convert_i64_u',
    'f32.demote_f64', 'f32.reinterpret_i32',
    // f64 operations
    'f64.load', 'f64.store', 'f64.const',
    'f64.abs', 'f64.neg', 'f64.ceil', 'f64.floor', 'f64.trunc', 'f64.nearest', 'f64.sqrt',
    'f64.add', 'f64.sub', 'f64.mul', 'f64.div', 'f64.min', 'f64.max', 'f64.copysign',
    'f64.eq', 'f64.ne', 'f64.lt', 'f64.gt', 'f64.le', 'f64.ge',
    'f64.convert_i32_s', 'f64.convert_i32_u', 'f64.convert_i64_s', 'f64.convert_i64_u',
    'f64.promote_f32', 'f64.reinterpret_i64',
  ],
  patterns: [
    // Labels
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Hexadecimal numbers
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    // Float numbers with optional hex
    { pattern: /[+-]?(?:0x[0-9a-fA-F]+(?:\.[0-9a-fA-F]*)?(?:[pP][+-]?[0-9]+)?|(?:inf|nan(?::0x[0-9a-fA-F]+)?))/g, type: 'number' },
    // Decimal numbers
    { pattern: /[+-]?\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[=]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: ';;',
    block: { start: '(;', end: ';)' },
  },
  brackets: [
    { open: '(', close: ')' },
  ],
});

export default wasm;
