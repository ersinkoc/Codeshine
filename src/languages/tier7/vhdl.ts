/**
 * VHDL hardware description language definition
 */
import { defineLang } from '../define-lang.js';

export const vhdl = defineLang({
  name: 'vhdl',
  aliases: ['vhd'],
  extensions: ['.vhd', '.vhdl'],
  keywords: [
    'abs', 'access', 'after', 'alias', 'all', 'and', 'architecture', 'array',
    'assert', 'assume', 'assume_guarantee', 'attribute', 'begin', 'block', 'body',
    'buffer', 'bus', 'case', 'component', 'configuration', 'constant', 'context',
    'cover', 'default', 'disconnect', 'downto', 'else', 'elsif', 'end', 'entity',
    'exit', 'fairness', 'file', 'for', 'force', 'function', 'generate', 'generic',
    'group', 'guarded', 'if', 'impure', 'in', 'inertial', 'inout', 'is', 'label',
    'library', 'linkage', 'literal', 'loop', 'map', 'mod', 'nand', 'new', 'next',
    'nor', 'not', 'null', 'of', 'on', 'open', 'or', 'others', 'out', 'package',
    'parameter', 'port', 'postponed', 'procedure', 'process', 'property', 'protected',
    'pure', 'range', 'record', 'register', 'reject', 'release', 'rem', 'report',
    'restrict', 'restrict_guarantee', 'return', 'rol', 'ror', 'select', 'sequence',
    'severity', 'shared', 'signal', 'sla', 'sll', 'sra', 'srl', 'strong', 'subtype',
    'then', 'to', 'transport', 'type', 'unaffected', 'units', 'until', 'use',
    'variable', 'vmode', 'vprop', 'vunit', 'wait', 'when', 'while', 'with', 'xnor', 'xor',
  ],
  typeKeywords: [
    'bit', 'bit_vector', 'boolean', 'character', 'integer', 'natural', 'positive',
    'real', 'string', 'time', 'std_logic', 'std_logic_vector', 'std_ulogic',
    'std_ulogic_vector', 'signed', 'unsigned', 'severity_level', 'file_open_kind',
    'file_open_status', 'line', 'text', 'side', 'width',
  ],
  constants: [
    'true', 'false', 'note', 'warning', 'error', 'failure',
    'read_mode', 'write_mode', 'append_mode',
    'open_ok', 'status_error', 'name_error', 'mode_error',
  ],
  builtins: [
    // Predefined attributes
    'base', 'left', 'right', 'high', 'low', 'pos', 'val', 'succ', 'pred', 'leftof',
    'rightof', 'range', 'reverse_range', 'length', 'ascending', 'image', 'value',
    'delayed', 'stable', 'quiet', 'transaction', 'event', 'active', 'last_event',
    'last_active', 'last_value', 'driving', 'driving_value', 'simple_name',
    'instance_name', 'path_name',
    // Standard functions
    'now', 'rising_edge', 'falling_edge', 'is_x', 'to_bit', 'to_bitvector',
    'to_stdulogic', 'to_stdlogicvector', 'to_stdulogicvector', 'to_x01', 'to_x01z',
    'to_ux01', 'to_01', 'to_integer', 'to_unsigned', 'to_signed', 'std_match',
    'shift_left', 'shift_right', 'rotate_left', 'rotate_right', 'resize',
    'read', 'readline', 'write', 'writeline', 'endfile',
  ],
  patterns: [
    // Attributes
    { pattern: /'[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'attribute' },
    // Based literals
    { pattern: /\b\d+#[0-9a-fA-F_]+(?:\.[0-9a-fA-F_]+)?#(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Bit string literals
    { pattern: /[xXoObBdD]"[0-9a-fA-F_]+"/g, type: 'number' },
    // Decimal literals
    { pattern: /\b\d[0-9_]*(?:\.\d[0-9_]*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Character literals
    { pattern: /'[^']'/g, type: 'string' },
    // Operators
    { pattern: /[+\-*\/<>=&|]+|:=|<=|=>/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '"' },
  ],
  comments: {
    line: '--',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default vhdl;
