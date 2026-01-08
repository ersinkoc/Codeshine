/**
 * GDScript (Godot Engine) language definition
 */
import { defineLang } from '../define-lang.js';

export const gdscript = defineLang({
  name: 'gdscript',
  aliases: ['godot', 'gd'],
  extensions: ['.gd'],
  keywords: [
    // Control flow
    'if', 'elif', 'else', 'for', 'while', 'match', 'break', 'continue', 'pass',
    'return', 'when',
    // Declarations
    'class', 'class_name', 'extends', 'is', 'as', 'self', 'signal', 'func',
    'static', 'const', 'enum', 'var', 'onready', 'export', 'setget', 'tool',
    'master', 'puppet', 'slave', 'remotesync', 'sync', 'remote', 'mastersync',
    'puppetsync',
    // Other
    'in', 'not', 'and', 'or', 'true', 'false', 'null', 'assert', 'yield',
    'preload', 'await', 'breakpoint', 'super',
  ],
  typeKeywords: [
    'void', 'bool', 'int', 'float', 'String', 'Vector2', 'Vector2i', 'Rect2',
    'Rect2i', 'Vector3', 'Vector3i', 'Transform2D', 'Plane', 'Quaternion',
    'AABB', 'Basis', 'Transform3D', 'Color', 'StringName', 'NodePath', 'RID',
    'Object', 'Callable', 'Signal', 'Dictionary', 'Array', 'PackedByteArray',
    'PackedInt32Array', 'PackedInt64Array', 'PackedFloat32Array', 'PackedFloat64Array',
    'PackedStringArray', 'PackedVector2Array', 'PackedVector3Array', 'PackedColorArray',
  ],
  constants: [
    'true', 'false', 'null', 'PI', 'TAU', 'INF', 'NAN',
  ],
  builtins: [
    // Math functions
    'abs', 'absf', 'absi', 'acos', 'asin', 'atan', 'atan2', 'ceil', 'clamp',
    'clampf', 'clampi', 'cos', 'cosh', 'cubic_interpolate', 'db2linear',
    'dectime', 'deg2rad', 'ease', 'exp', 'floor', 'fmod', 'fposmod', 'inverse_lerp',
    'is_equal_approx', 'is_inf', 'is_nan', 'is_zero_approx', 'lerp', 'lerp_angle',
    'lerpf', 'linear2db', 'log', 'max', 'maxf', 'maxi', 'min', 'minf', 'mini',
    'move_toward', 'nearest_po2', 'pingpong', 'posmod', 'pow', 'rad2deg',
    'rand_from_seed', 'randf', 'randf_range', 'randfn', 'randi', 'randi_range',
    'randomize', 'range', 'range_lerp', 'round', 'seed', 'sign', 'signf', 'signi',
    'sin', 'sinh', 'smoothstep', 'snapped', 'sqrt', 'step_decimals', 'tan', 'tanh',
    'typeof', 'wrapf', 'wrapi',
    // Conversion functions
    'bool', 'int', 'float', 'str', 'var2str', 'str2var', 'var2bytes', 'bytes2var',
    // Type checking
    'type_exists', 'typeof', 'is_instance_valid', 'is_instance_of',
    // Utility
    'print', 'print_rich', 'print_debug', 'print_stack', 'prints', 'printt',
    'printerr', 'printraw', 'push_error', 'push_warning',
    'get_stack', 'hash', 'inst2dict', 'dict2inst', 'len', 'load', 'preload',
    'weakref',
    // Node functions
    'get_node', 'get_parent', 'get_tree', 'get_children', 'add_child', 'remove_child',
    'queue_free', 'ready', 'process', 'physics_process', 'input', 'unhandled_input',
  ],
  patterns: [
    // Annotations
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Node paths
    { pattern: /\$[a-zA-Z_/][a-zA-Z0-9_/]*/g, type: 'variable' },
    // String names
    { pattern: /&"[^"]*"/g, type: 'string' },
    // Node paths with %
    { pattern: /%[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Hexadecimal
    { pattern: /\b0x[0-9a-fA-F_]+\b/g, type: 'number' },
    // Binary
    { pattern: /\b0b[01_]+\b/g, type: 'number' },
    // Float
    { pattern: /\b\d[\d_]*\.\d[\d_]*(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Integer
    { pattern: /\b\d[\d_]*\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|->|:=|\.\.|\*\*/g, type: 'operator' },
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
  ],
});

export default gdscript;
