/**
 * Erlang language definition
 */
import { defineLang } from '../define-lang.js';

export const erlang = defineLang({
  name: 'erlang',
  aliases: ['erl'],
  extensions: ['.erl', '.hrl', '.app', '.app.src', '.escript'],
  keywords: [
    'after', 'and', 'andalso', 'band', 'begin', 'bnot', 'bor', 'bsl', 'bsr',
    'bxor', 'case', 'catch', 'cond', 'div', 'end', 'fun', 'if', 'let', 'not',
    'of', 'or', 'orelse', 'receive', 'rem', 'try', 'when', 'xor',
    // Preprocessor
    'define', 'else', 'endif', 'export', 'export_type', 'ifdef', 'ifndef',
    'import', 'include', 'include_lib', 'module', 'record', 'spec', 'type',
    'opaque', 'callback', 'behaviour', 'behavior', 'on_load', 'optional_callbacks',
  ],
  typeKeywords: [
    // Types
    'any', 'atom', 'binary', 'bitstring', 'boolean', 'byte', 'char', 'float',
    'fun', 'function', 'integer', 'iodata', 'iolist', 'list', 'map', 'maybe_improper_list',
    'mfa', 'module', 'neg_integer', 'nil', 'no_return', 'node', 'non_neg_integer',
    'none', 'nonempty_improper_list', 'nonempty_list', 'nonempty_string', 'number',
    'pid', 'port', 'pos_integer', 'reference', 'string', 'term', 'timeout', 'tuple',
  ],
  constants: [
    'true', 'false', 'undefined', 'ok', 'error', 'infinity',
  ],
  builtins: [
    // Common BIFs
    'abs', 'apply', 'atom_to_binary', 'atom_to_list', 'binary_part', 'binary_to_atom',
    'binary_to_existing_atom', 'binary_to_float', 'binary_to_integer', 'binary_to_list',
    'binary_to_term', 'bit_size', 'bitstring_to_list', 'byte_size', 'ceil',
    'check_old_code', 'check_process_code', 'date', 'delete_module', 'demonitor',
    'disconnect_node', 'element', 'erase', 'error', 'exit', 'float', 'float_to_binary',
    'float_to_list', 'floor', 'garbage_collect', 'get', 'get_keys', 'group_leader',
    'halt', 'hd', 'integer_to_binary', 'integer_to_list', 'iolist_size', 'iolist_to_binary',
    'is_alive', 'is_atom', 'is_binary', 'is_bitstring', 'is_boolean', 'is_float',
    'is_function', 'is_integer', 'is_list', 'is_map', 'is_map_key', 'is_number',
    'is_pid', 'is_port', 'is_process_alive', 'is_record', 'is_reference', 'is_tuple',
    'length', 'link', 'list_to_atom', 'list_to_binary', 'list_to_bitstring',
    'list_to_existing_atom', 'list_to_float', 'list_to_integer', 'list_to_pid',
    'list_to_port', 'list_to_ref', 'list_to_tuple', 'load_module', 'make_ref',
    'map_get', 'map_size', 'max', 'min', 'module_loaded', 'monitor', 'monitor_node',
    'node', 'nodes', 'now', 'open_port', 'pid_to_list', 'port_close', 'port_command',
    'port_connect', 'port_control', 'port_to_list', 'pre_loaded', 'process_flag',
    'process_info', 'processes', 'purge_module', 'put', 'ref_to_list', 'register',
    'registered', 'round', 'self', 'setelement', 'size', 'spawn', 'spawn_link',
    'spawn_monitor', 'spawn_opt', 'split_binary', 'statistics', 'term_to_binary',
    'throw', 'time', 'tl', 'trunc', 'tuple_size', 'tuple_to_list', 'unlink',
    'unregister', 'whereis',
    // Module functions
    'io', 'file', 'gen_server', 'gen_statem', 'gen_event', 'supervisor', 'application',
    'lists', 'maps', 'sets', 'ordsets', 'dict', 'orddict', 'proplists', 'queue',
    'array', 'gb_trees', 'gb_sets', 'ets', 'dets', 'mnesia',
    'string', 're', 'binary', 'unicode', 'base64', 'crypto',
    'timer', 'calendar', 'random', 'rand',
    'erlang', 'error_logger', 'logger',
  ],
  patterns: [
    // Preprocessor
    { pattern: /-(?:module|export|export_type|import|include|include_lib|define|ifdef|ifndef|else|endif|undef|record|type|opaque|spec|callback|behaviour|behavior|on_load|optional_callbacks)\b/g, type: 'macro' },
    // Atoms
    { pattern: /\b[a-z][a-zA-Z0-9_@]*/g, type: 'symbol' },
    { pattern: /'(?:[^'\\]|\\.)*'/g, type: 'symbol' },
    // Variables
    { pattern: /\b[A-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Records
    { pattern: /#[a-z][a-zA-Z0-9_]*/g, type: 'type' },
    // Macros
    { pattern: /\?[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'macro' },
    // Character literals
    { pattern: /\$(?:[^\\]|\\(?:[0-7]{1,3}|x[0-9a-fA-F]{1,2}|x\{[0-9a-fA-F]+\}|.))/g, type: 'string' },
    // Binary syntax
    { pattern: /<<(?:[^>]|>[^>])*>>/g, type: 'string' },
    // Numbers
    { pattern: /\b\d+#[0-9a-zA-Z]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /->|<-|=>|:=|\|\||\/=|=:=|==|=\/=|=<|>=|<<|>>|\+\+|--|!|[+\-*\/%<>=|]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '%',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<<', close: '>>' },
  ],
});

export default erlang;
