/**
 * Verilog/SystemVerilog language definition
 */
import { defineLang } from '../define-lang.js';

export const verilog = defineLang({
  name: 'verilog',
  aliases: ['v', 'sv', 'systemverilog', 'vhdl'],
  extensions: ['.v', '.sv', '.svh', '.vh'],
  keywords: [
    // Verilog keywords
    'always', 'and', 'assign', 'automatic', 'begin', 'buf', 'bufif0', 'bufif1',
    'case', 'casex', 'casez', 'cell', 'cmos', 'config', 'deassign', 'default',
    'defparam', 'design', 'disable', 'edge', 'else', 'end', 'endcase', 'endconfig',
    'endfunction', 'endgenerate', 'endmodule', 'endprimitive', 'endspecify',
    'endtable', 'endtask', 'event', 'for', 'force', 'forever', 'fork', 'function',
    'generate', 'genvar', 'highz0', 'highz1', 'if', 'ifnone', 'incdir', 'include',
    'initial', 'inout', 'input', 'instance', 'integer', 'join', 'large',
    'liblist', 'library', 'localparam', 'macromodule', 'medium', 'module', 'nand',
    'negedge', 'nmos', 'nor', 'not', 'notif0', 'notif1', 'or', 'output',
    'parameter', 'pmos', 'posedge', 'primitive', 'pull0', 'pull1', 'pulldown',
    'pullup', 'rcmos', 'real', 'realtime', 'reg', 'release', 'repeat', 'rnmos',
    'rpmos', 'rtran', 'rtranif0', 'rtranif1', 'scalared', 'signed', 'small',
    'specify', 'specparam', 'strong0', 'strong1', 'supply0', 'supply1', 'table',
    'task', 'time', 'tran', 'tranif0', 'tranif1', 'tri', 'tri0', 'tri1', 'triand',
    'trior', 'trireg', 'unsigned', 'use', 'vectored', 'wait', 'wand', 'weak0',
    'weak1', 'while', 'wire', 'wor', 'xnor', 'xor',
    // SystemVerilog keywords
    'accept_on', 'alias', 'always_comb', 'always_ff', 'always_latch', 'assert',
    'assume', 'before', 'bind', 'bins', 'binsof', 'bit', 'break', 'byte',
    'chandle', 'checker', 'class', 'clocking', 'const', 'constraint', 'context',
    'continue', 'cover', 'covergroup', 'coverpoint', 'cross', 'dist', 'do',
    'endchecker', 'endclass', 'endclocking', 'endgroup', 'endinterface',
    'endpackage', 'endprogram', 'endproperty', 'endsequence', 'enum', 'eventually',
    'expect', 'export', 'extends', 'extern', 'final', 'first_match', 'foreach',
    'forkjoin', 'global', 'iff', 'ignore_bins', 'illegal_bins', 'implements',
    'implies', 'import', 'inside', 'int', 'interconnect', 'interface', 'intersect',
    'join_any', 'join_none', 'let', 'local', 'logic', 'longint', 'matches',
    'modport', 'nettype', 'new', 'nexttime', 'null', 'package', 'packed', 'priority',
    'program', 'property', 'protected', 'pure', 'rand', 'randc', 'randcase',
    'randsequence', 'ref', 'reject_on', 's_always', 's_eventually', 's_nexttime',
    's_until', 's_until_with', 'sequence', 'shortint', 'shortreal', 'soft', 'solve',
    'static', 'string', 'strong', 'struct', 'super', 'sync_accept_on',
    'sync_reject_on', 'tagged', 'this', 'throughout', 'timeprecision', 'timeunit',
    'type', 'typedef', 'union', 'unique', 'unique0', 'until', 'until_with',
    'untyped', 'var', 'virtual', 'void', 'wait_order', 'weak', 'wildcard', 'with',
    'within',
  ],
  typeKeywords: [
    'bit', 'byte', 'shortint', 'int', 'longint', 'integer', 'time', 'real', 'shortreal', 'realtime',
    'logic', 'reg', 'wire', 'tri', 'tri0', 'tri1', 'triand', 'trior', 'wand', 'wor',
    'supply0', 'supply1', 'string', 'chandle', 'event', 'void',
  ],
  builtins: [
    // System tasks/functions
    '$display', '$displayb', '$displayh', '$displayo', '$write', '$writeb', '$writeh', '$writeo',
    '$strobe', '$strobeb', '$strobeh', '$strobeo', '$monitor', '$monitorb', '$monitorh', '$monitoro',
    '$monitoroff', '$monitoron', '$fopen', '$fclose', '$fmonitor', '$fwrite', '$fdisplay', '$fstrobe',
    '$readmemb', '$readmemh', '$writememb', '$writememh', '$sscanf', '$fscanf', '$sformat', '$sformatf',
    '$fgets', '$fgetc', '$ungetc', '$fflush', '$feof', '$fseek', '$ftell', '$rewind', '$ferror',
    '$finish', '$stop', '$exit', '$fatal', '$error', '$warning', '$info',
    '$time', '$stime', '$realtime', '$random', '$urandom', '$urandom_range',
    '$clog2', '$ln', '$log10', '$exp', '$sqrt', '$pow', '$floor', '$ceil', '$sin', '$cos', '$tan',
    '$asin', '$acos', '$atan', '$atan2', '$hypot', '$sinh', '$cosh', '$tanh', '$asinh', '$acosh', '$atanh',
    '$countbits', '$countones', '$onehot', '$onehot0', '$isunknown', '$bits', '$typename',
    '$signed', '$unsigned', '$cast', '$size', '$dimensions', '$unpacked_dimensions',
    '$left', '$right', '$low', '$high', '$increment', '$length',
    '$past', '$rose', '$fell', '$stable', '$changed', '$sampled',
    '$root', '$unit', 'assert', 'assume', 'cover', 'expect',
  ],
  patterns: [
    // Compiler directives
    { pattern: /`[a-zA-Z_]\w*/g, type: 'macro' },
    // System tasks/functions
    { pattern: /\$[a-zA-Z_]\w*/g, type: 'function' },
    // Hierarchical references
    { pattern: /\b[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*/g, type: 'default' },
    // Numbers with radix
    { pattern: /\b\d*'[sS]?[bBoOdDhH][0-9a-fA-FxXzZ_?]+\b/g, type: 'number' },
    // Time literals
    { pattern: /\b\d+(?:\.\d+)?(?:s|ms|us|ns|ps|fs)\b/g, type: 'number' },
    // Regular numbers
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=]=?|&&|\|\||<<<?|>>>?|~[&|^]?|\^~|->|<->|##|@@|::|[?:]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: 'begin', close: 'end' },
  ],
});

export default verilog;
