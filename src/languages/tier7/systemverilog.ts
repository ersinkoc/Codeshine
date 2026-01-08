/**
 * SystemVerilog language definition
 */
import { defineLang } from '../define-lang.js';

export const systemverilog = defineLang({
  name: 'systemverilog',
  aliases: ['sv'],
  extensions: ['.sv', '.svh'],
  keywords: [
    // Module/interface keywords
    'module', 'endmodule', 'interface', 'endinterface', 'program', 'endprogram',
    'package', 'endpackage', 'class', 'endclass', 'function', 'endfunction',
    'task', 'endtask', 'primitive', 'endprimitive', 'checker', 'endchecker',
    'config', 'endconfig', 'generate', 'endgenerate', 'property', 'endproperty',
    'sequence', 'endsequence', 'clocking', 'endclocking', 'covergroup', 'endgroup',
    // Control flow
    'if', 'else', 'case', 'casex', 'casez', 'endcase', 'for', 'foreach', 'while',
    'do', 'repeat', 'forever', 'break', 'continue', 'return', 'disable', 'fork',
    'join', 'join_any', 'join_none', 'wait', 'wait_order',
    // Declaration
    'input', 'output', 'inout', 'ref', 'wire', 'reg', 'logic', 'bit', 'byte',
    'shortint', 'int', 'longint', 'integer', 'real', 'shortreal', 'realtime',
    'time', 'string', 'chandle', 'event', 'void', 'enum', 'struct', 'union',
    'typedef', 'packed', 'tagged', 'signed', 'unsigned', 'const', 'static',
    'automatic', 'local', 'protected', 'virtual', 'rand', 'randc', 'pure',
    'extern', 'context', 'import', 'export', 'forkjoin', 'modport', 'genvar',
    'parameter', 'localparam', 'specparam', 'defparam', 'assign', 'deassign',
    'force', 'release', 'alias', 'always', 'always_comb', 'always_ff',
    'always_latch', 'initial', 'final', 'specify', 'endspecify', 'table', 'endtable',
    // Class
    'extends', 'implements', 'new', 'super', 'this', 'null', 'constraint',
    'solve', 'before', 'soft', 'unique', 'priority', 'with', 'inside', 'dist',
    // Assertion
    'assert', 'assume', 'cover', 'expect', 'restrict', 'iff', 'implies',
    'throughout', 'within', 'intersect', 'first_match', 's_eventually',
    's_always', 's_until', 's_until_with', 's_nexttime', 'accept_on',
    'reject_on', 'sync_accept_on', 'sync_reject_on', 'nexttime', 'until',
    'until_with', 'eventually',
    // Misc
    'begin', 'end', 'supply0', 'supply1', 'tri', 'triand', 'trior', 'tri0',
    'tri1', 'trireg', 'uwire', 'wand', 'wor', 'scalared', 'vectored',
    'pulldown', 'pullup', 'cmos', 'rcmos', 'nmos', 'pmos', 'rnmos', 'rpmos',
    'and', 'nand', 'or', 'nor', 'xor', 'xnor', 'not', 'buf', 'bufif0', 'bufif1',
    'notif0', 'notif1', 'tranif0', 'tranif1', 'rtranif0', 'rtranif1', 'tran', 'rtran',
  ],
  typeKeywords: [
    'wire', 'reg', 'logic', 'bit', 'byte', 'shortint', 'int', 'longint',
    'integer', 'real', 'shortreal', 'realtime', 'time', 'string', 'chandle',
    'event', 'void', 'type',
  ],
  builtins: [
    // System tasks and functions
    '$display', '$displayb', '$displayh', '$displayo', '$strobe', '$strobeb',
    '$strobeh', '$strobeo', '$monitor', '$monitorb', '$monitorh', '$monitoro',
    '$monitoroff', '$monitoron', '$write', '$writeb', '$writeh', '$writeo',
    '$fopen', '$fclose', '$fgetc', '$fgets', '$fflush', '$feof', '$ferror',
    '$fdisplay', '$fwrite', '$fstrobe', '$fmonitor', '$fscanf', '$fread',
    '$fseek', '$ftell', '$rewind', '$sformat', '$sformatf', '$sscanf',
    '$readmemb', '$readmemh', '$writememb', '$writememh',
    '$finish', '$stop', '$exit', '$fatal', '$error', '$warning', '$info',
    '$time', '$stime', '$realtime', '$printtimescale', '$timeformat',
    '$random', '$urandom', '$urandom_range', '$dist_uniform', '$dist_normal',
    '$dist_exponential', '$dist_poisson', '$dist_chi_square', '$dist_t', '$dist_erlang',
    '$test$plusargs', '$value$plusargs', '$dumpfile', '$dumpvars', '$dumpon',
    '$dumpoff', '$dumpall', '$dumplimit', '$dumpflush', '$dumpports',
    '$dumpportsoff', '$dumpportson', '$dumpportsall', '$dumpportslimit',
    '$dumpportsflush', '$cast', '$bits', '$typename', '$isunbounded',
    '$itor', '$rtoi', '$signed', '$unsigned', '$bitstoreal', '$realtobits',
    '$bitstoshortreal', '$shortrealtobits', '$countones', '$onehot',
    '$onehot0', '$isunknown', '$clog2', '$ln', '$log10', '$exp', '$sqrt',
    '$pow', '$floor', '$ceil', '$sin', '$cos', '$tan', '$asin', '$acos',
    '$atan', '$atan2', '$hypot', '$sinh', '$cosh', '$tanh', '$asinh',
    '$acosh', '$atanh', '$left', '$right', '$low', '$high', '$increment',
    '$size', '$dimensions', '$unpacked_dimensions', '$changed', '$past',
    '$stable', '$rose', '$fell', '$sampled', '$coverage_control',
    '$coverage_get', '$coverage_get_max', '$coverage_merge', '$coverage_save',
    '$get_coverage', '$set_coverage_db_name', '$load_coverage_db',
  ],
  patterns: [
    // Compiler directives
    { pattern: /`[a-zA-Z_][a-zA-Z0-9_$]*/g, type: 'macro' },
    // System tasks/functions
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_$]*/g, type: 'builtin' },
    // Hierarchical names
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_$]*(?:\.[a-zA-Z_][a-zA-Z0-9_$]*)*/g, type: 'variable' },
    // Numbers with base
    { pattern: /\b\d*'[sS]?[bBoOdDhH][0-9a-fA-FxXzZ_?]+\b/g, type: 'number' },
    // Real numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Time literals
    { pattern: /\b\d+(?:\.\d+)?(?:s|ms|us|ns|ps|fs)\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|->|<->|=>|##|@@|\*>|&&&/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: 'begin', close: 'end' },
  ],
});

export default systemverilog;
