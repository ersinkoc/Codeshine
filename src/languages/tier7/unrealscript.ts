/**
 * UnrealScript language definition (Unreal Engine 3)
 */
import { defineLang } from '../define-lang.js';

export const unrealscript = defineLang({
  name: 'unrealscript',
  aliases: ['uc', 'usc'],
  extensions: ['.uc'],
  keywords: [
    'class', 'extends', 'implements', 'within', 'abstract', 'config', 'native',
    'nativereplication', 'dependson', 'perobjectconfig', 'transient', 'noexport',
    'notplaceable', 'placeable', 'hidedropdown', 'editinlinenew', 'noteditinlinenew',
    'exportstructs', 'cacheexempt', 'hidecategories', 'showcategories',
    'collapsecategories', 'dontcollapsecategories', 'parseconfig',
    'var', 'local', 'const', 'enum', 'struct', 'array', 'map', 'delegate',
    'function', 'event', 'state', 'simulated', 'exec', 'static', 'final',
    'iterator', 'latent', 'singular', 'client', 'server', 'reliable', 'unreliable',
    'private', 'protected', 'public', 'editconst', 'editconstarray', 'edithide',
    'editinline', 'editinlineuse', 'editinlinenotify', 'export', 'noclear',
    'noimport', 'duplicatetransient', 'input', 'travel', 'globalconfig',
    'localized', 'repnotify', 'repretry', 'interp', 'deprecated', 'databinding',
    'editoronly', 'notforconsole', 'archetype', 'crosslevelactive', 'crosslevelpassive',
    'if', 'else', 'for', 'foreach', 'while', 'do', 'until', 'switch', 'case',
    'default', 'break', 'continue', 'return', 'goto', 'stop', 'assert',
    'ignores', 'auto', 'begin', 'end',
    'true', 'false', 'none', 'self', 'super', 'global', 'outer', 'new', 'vect',
    'rot', 'rng', 'arraycount', 'enumcount', 'sizeof', 'nameof',
    'replication', 'reliable', 'unreliable', 'cpptext', 'structcpptext',
    'structdefaultproperties', 'defaultproperties',
  ],
  typeKeywords: [
    'byte', 'int', 'bool', 'float', 'string', 'name', 'vector', 'rotator',
    'color', 'plane', 'coords', 'quat', 'matrix', 'box', 'guid',
    'pointer', 'object', 'actor', 'class', 'interface', 'delegate',
    'array', 'map', 'void', 'coerce', 'optional', 'skip', 'out', 'ref',
  ],
  builtins: [
    // Math
    'Abs', 'Sin', 'Cos', 'Tan', 'ASin', 'ACos', 'ATan', 'ATan2', 'Exp', 'Loge',
    'Sqrt', 'Square', 'Pow', 'Rand', 'FRand', 'RandRange', 'FMin', 'FMax',
    'Min', 'Max', 'Clamp', 'FClamp', 'Lerp', 'Ceil', 'Floor', 'Round',
    // String
    'Len', 'InStr', 'Mid', 'Left', 'Right', 'Caps', 'Locs', 'Chr', 'Asc',
    'Repl', 'Split', 'JoinArray', 'ParseStringIntoArray',
    // Vector/Rotator
    'VSize', 'VSize2D', 'VSizeSq', 'VSizeSq2D', 'Normal', 'GetAxes', 'GetUnAxes',
    'OrthoRotation', 'RotRand', 'ClampRotAxis', 'NormalizeRotAxis',
    'MakeRotator', 'BreakRotator',
    // Object
    'Spawn', 'Destroy', 'SetTimer', 'ClearTimer', 'IsTimerActive', 'GetTimerCount',
    'GetTimerRate', 'SetTickGroup', 'Sleep', 'FinishAnim',
    // Logging
    'Log', 'Warn', 'LogInternal', 'WarnInternal', 'ScriptLog',
    // Array
    'Find', 'Insert', 'Remove', 'RemoveItem', 'AddItem', 'InsertItem', 'Sort',
    'Length',
    // Misc
    'DynamicLoadObject', 'FindObject', 'PathName', 'BeginState', 'EndState',
    'GotoState', 'PushState', 'PopState', 'GetStateName', 'IsInState', 'IsA',
  ],
  patterns: [
    // Exec functions
    { pattern: /\bexec\s+function\b/g, type: 'keyword' },
    // State labels
    { pattern: /^\s*[a-zA-Z_][a-zA-Z0-9_]*:/gm, type: 'label' },
    // Preprocessor
    { pattern: /`[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'macro' },
    // Numbers
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:f)?\b/gi, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~@$#?:]+|&&|\|\||<<|>>/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '<', close: '>' },
  ],
});

export default unrealscript;
