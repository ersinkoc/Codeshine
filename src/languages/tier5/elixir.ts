/**
 * Elixir language definition
 */
import { defineLang } from '../define-lang.js';

export const elixir = defineLang({
  name: 'elixir',
  aliases: ['ex', 'exs'],
  extensions: ['.ex', '.exs', '.eex', '.leex', '.heex'],
  keywords: [
    'after', 'alias', 'and', 'case', 'catch', 'cond', 'def', 'defcallback',
    'defdelegate', 'defexception', 'defguard', 'defguardp', 'defimpl',
    'defmacro', 'defmacrop', 'defmodule', 'defoverridable', 'defp',
    'defprotocol', 'defstruct', 'do', 'else', 'end', 'fn', 'for', 'if',
    'import', 'in', 'not', 'or', 'quote', 'raise', 'receive', 'require',
    'rescue', 'reraise', 'super', 'throw', 'try', 'unless', 'unquote',
    'unquote_splicing', 'use', 'when', 'with',
  ],
  typeKeywords: [
    'nil', 'true', 'false',
  ],
  constants: [
    '__MODULE__', '__DIR__', '__ENV__', '__CALLER__', '__STACKTRACE__',
  ],
  builtins: [
    // Kernel functions
    'abs', 'apply', 'binary_part', 'bit_size', 'byte_size', 'ceil', 'div',
    'elem', 'exit', 'floor', 'function_exported?', 'get_and_update_in',
    'get_in', 'hd', 'inspect', 'is_atom', 'is_binary', 'is_bitstring',
    'is_boolean', 'is_exception', 'is_float', 'is_function', 'is_integer',
    'is_list', 'is_map', 'is_map_key', 'is_nil', 'is_number', 'is_pid',
    'is_port', 'is_reference', 'is_struct', 'is_tuple', 'length', 'macro_exported?',
    'make_ref', 'map_size', 'max', 'min', 'node', 'pop_in', 'put_elem',
    'put_in', 'rem', 'round', 'self', 'send', 'spawn', 'spawn_link',
    'spawn_monitor', 'struct', 'struct!', 'throw', 'tl', 'to_charlist',
    'to_string', 'trunc', 'tuple_size', 'update_in',
    // Enum
    'Enum', 'Stream', 'List', 'Map', 'Keyword', 'String', 'Integer', 'Float',
    'Tuple', 'File', 'IO', 'Path', 'Agent', 'Task', 'GenServer', 'Supervisor',
  ],
  patterns: [
    // Module attributes
    { pattern: /@[a-zA-Z_]\w*/g, type: 'decorator' },
    // Atoms
    { pattern: /:[a-zA-Z_]\w*[?!]?/g, type: 'symbol' },
    { pattern: /:"(?:[^"\\]|\\.)*"/g, type: 'symbol' },
    // Sigils
    { pattern: /~[a-zA-Z][^\s\w]*(?:[^\\]|\\.)*?[^\s\w]/g, type: 'string' },
    // Capture operator
    { pattern: /&\d+/g, type: 'variable' },
    { pattern: /&[a-zA-Z_]\w*\/\d+/g, type: 'function' },
    // Interpolation
    { pattern: /#\{[^}]*\}/g, type: 'variable' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    { pattern: /\?\w/g, type: 'number' },
    // Function definitions
    { pattern: /\b(def|defp|defmacro|defmacrop|defguard|defguardp)\s+([a-zA-Z_]\w*[?!]?)/g, type: 'keyword', captures: [null, 'keyword', 'function'] },
    // Module definition
    { pattern: /\b(defmodule)\s+([A-Z]\w*(?:\.[A-Z]\w*)*)/g, type: 'keyword', captures: [null, 'keyword', 'class'] },
    // Operators
    { pattern: /\|>|<>|<~>|~>>|<<~|~>|<~|<\|>|\+\+|--|&&?|\|\|?|\\\\|<-|->|=>|::|\.\.\.?|[+\-*\/%&|^!<>=]=?/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '\\' },
    { start: "'''", end: "'''", escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '%{', close: '}' },
  ],
});

export default elixir;
