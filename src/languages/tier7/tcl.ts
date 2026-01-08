/**
 * Tcl (Tool Command Language) definition
 */
import { defineLang } from '../define-lang.js';

export const tcl = defineLang({
  name: 'tcl',
  aliases: ['tk', 'wish', 'tclsh'],
  extensions: ['.tcl', '.tk'],
  keywords: [
    // Control flow
    'if', 'then', 'else', 'elseif', 'for', 'foreach', 'while', 'switch',
    'break', 'continue', 'return', 'catch', 'try', 'throw', 'error',
    // Procedures
    'proc', 'rename', 'uplevel', 'upvar', 'global', 'variable', 'namespace',
    // Data structures
    'set', 'unset', 'array', 'dict', 'list', 'lindex', 'llength', 'lappend',
    'linsert', 'lrange', 'lreplace', 'lsearch', 'lsort', 'lset', 'lrepeat',
    'lassign', 'lmap', 'lreverse',
    // String operations
    'string', 'append', 'format', 'scan', 'regexp', 'regsub', 'subst',
    'split', 'join', 'concat',
    // I/O
    'puts', 'gets', 'read', 'open', 'close', 'eof', 'flush', 'seek', 'tell',
    'fconfigure', 'fileevent', 'socket', 'chan',
    // Math
    'expr', 'incr', 'abs', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'cos',
    'cosh', 'double', 'entier', 'exp', 'floor', 'fmod', 'hypot', 'int',
    'isqrt', 'log', 'log10', 'max', 'min', 'pow', 'rand', 'round', 'sin',
    'sinh', 'sqrt', 'srand', 'tan', 'tanh', 'wide',
    // Other
    'eval', 'exec', 'source', 'package', 'info', 'trace', 'after', 'update',
    'vwait', 'exit', 'interp', 'load', 'binary', 'encoding', 'clock', 'time',
    'file', 'glob', 'cd', 'pwd', 'pid', 'apply', 'coroutine', 'yield', 'tailcall',
  ],
  constants: [
    'true', 'false', 'yes', 'no', 'on', 'off',
    'stdin', 'stdout', 'stderr',
    'tcl_version', 'tcl_patchLevel', 'tcl_library', 'tcl_platform',
    'env', 'argc', 'argv', 'argv0', 'errorCode', 'errorInfo',
  ],
  builtins: [
    // Tk widgets
    'button', 'canvas', 'checkbutton', 'entry', 'frame', 'label', 'labelframe',
    'listbox', 'menu', 'menubutton', 'message', 'panedwindow', 'radiobutton',
    'scale', 'scrollbar', 'spinbox', 'text', 'toplevel', 'ttk::button',
    'ttk::checkbutton', 'ttk::combobox', 'ttk::entry', 'ttk::frame',
    'ttk::label', 'ttk::labelframe', 'ttk::menubutton', 'ttk::notebook',
    'ttk::panedwindow', 'ttk::progressbar', 'ttk::radiobutton', 'ttk::scale',
    'ttk::scrollbar', 'ttk::separator', 'ttk::sizegrip', 'ttk::spinbox',
    'ttk::style', 'ttk::treeview',
    // Tk commands
    'bind', 'bindtags', 'clipboard', 'destroy', 'event', 'focus', 'font',
    'grab', 'grid', 'image', 'lower', 'option', 'pack', 'place', 'raise',
    'selection', 'tk', 'tkwait', 'winfo', 'wm',
  ],
  patterns: [
    // Variables
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_:]*/g, type: 'variable' },
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    { pattern: /\[/g, type: 'punctuation' },
    { pattern: /\]/g, type: 'punctuation' },
    // Namespace separators
    { pattern: /::/g, type: 'operator' },
    // Numbers
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\', interpolation: { start: '$', end: '' } },
    { start: '{', end: '}', escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default tcl;
