/**
 * Pascal/Delphi/Object Pascal language definition
 */
import { defineLang } from '../define-lang.js';

export const pascal = defineLang({
  name: 'pascal',
  aliases: ['delphi', 'objectpascal', 'freepascal', 'lazarus'],
  extensions: ['.pas', '.pp', '.inc', '.dpr', '.dpk', '.lpr'],
  keywords: [
    // Program structure
    'program', 'unit', 'library', 'package', 'uses', 'interface', 'implementation',
    'initialization', 'finalization', 'exports', 'requires', 'contains',
    // Declarations
    'const', 'var', 'type', 'resourcestring', 'threadvar', 'label', 'out',
    'function', 'procedure', 'constructor', 'destructor', 'operator',
    'property', 'read', 'write', 'default', 'stored', 'nodefault', 'implements',
    // OOP
    'class', 'object', 'record', 'interface', 'dispinterface', 'helper',
    'inherited', 'self', 'private', 'protected', 'public', 'published', 'strict',
    'virtual', 'dynamic', 'abstract', 'override', 'reintroduce', 'overload',
    'message', 'static', 'sealed', 'final',
    // Control flow
    'begin', 'end', 'if', 'then', 'else', 'case', 'of', 'for', 'to', 'downto',
    'do', 'while', 'repeat', 'until', 'with', 'goto', 'break', 'continue', 'exit',
    // Exception handling
    'try', 'except', 'finally', 'raise', 'on', 'at',
    // Operators
    'and', 'or', 'xor', 'not', 'shl', 'shr', 'div', 'mod', 'in', 'is', 'as',
    // Modifiers
    'absolute', 'assembler', 'cdecl', 'external', 'far', 'forward', 'inline',
    'interrupt', 'near', 'pascal', 'register', 'safecall', 'stdcall', 'export',
    'name', 'resident', 'local', 'varargs', 'winapi', 'deprecated', 'platform',
    'experimental', 'unimplemented', 'library', 'delayed',
    // Other
    'array', 'set', 'file', 'packed', 'string', 'nil', 'asm',
  ],
  typeKeywords: [
    // Simple types
    'Boolean', 'ByteBool', 'WordBool', 'LongBool',
    'Byte', 'ShortInt', 'Word', 'SmallInt', 'Cardinal', 'Integer', 'LongWord', 'LongInt',
    'Int64', 'UInt64', 'NativeInt', 'NativeUInt',
    'Single', 'Double', 'Extended', 'Comp', 'Currency', 'Real', 'Real48',
    'Char', 'AnsiChar', 'WideChar', 'UnicodeChar',
    'String', 'ShortString', 'AnsiString', 'WideString', 'UnicodeString', 'RawByteString',
    'PChar', 'PAnsiChar', 'PWideChar', 'PUnicodeChar',
    'Pointer', 'TObject', 'TClass', 'TInterfacedObject', 'IInterface', 'IUnknown',
    'Variant', 'OleVariant', 'TVarRec', 'TDateTime', 'TDate', 'TTime',
  ],
  constants: [
    'True', 'False', 'nil', 'MaxInt', 'MaxLongInt',
  ],
  builtins: [
    // System routines
    'WriteLn', 'Write', 'ReadLn', 'Read', 'Inc', 'Dec', 'Abs', 'Sqr', 'Sqrt',
    'Sin', 'Cos', 'Tan', 'ArcTan', 'Exp', 'Ln', 'Log10', 'Log2', 'Power',
    'Round', 'Trunc', 'Int', 'Frac', 'Floor', 'Ceil',
    'Odd', 'Pred', 'Succ', 'Ord', 'Chr', 'High', 'Low', 'Length', 'SizeOf',
    'Assigned', 'Default', 'TypeInfo', 'GetTypeData',
    'New', 'Dispose', 'GetMem', 'FreeMem', 'ReallocMem', 'AllocMem',
    'SetLength', 'Copy', 'Insert', 'Delete', 'Pos', 'Concat',
    'UpperCase', 'LowerCase', 'Trim', 'TrimLeft', 'TrimRight',
    'IntToStr', 'StrToInt', 'StrToIntDef', 'FloatToStr', 'StrToFloat',
    'Format', 'FormatFloat', 'FormatDateTime',
    'Include', 'Exclude', 'Assert', 'Halt', 'RunError', 'Exit',
    'FillChar', 'Move', 'CompareMem', 'ZeroMemory',
    // File operations
    'AssignFile', 'Reset', 'Rewrite', 'Append', 'CloseFile', 'Eof', 'Eoln',
    'FileExists', 'DirectoryExists', 'ForceDirectories', 'DeleteFile', 'RenameFile',
    'FileAge', 'FileSize', 'FilePos', 'Seek', 'SeekEof', 'SeekEoln',
    // Class helpers
    'Create', 'Destroy', 'Free', 'FreeAndNil', 'ClassName', 'ClassType',
    'ClassParent', 'InheritsFrom', 'InstanceSize',
  ],
  patterns: [
    // Compiler directives
    { pattern: /\{\$[^}]+\}/g, type: 'meta' },
    { pattern: /\(\*\$[^*]*\*\)/g, type: 'meta' },
    // Hexadecimal numbers
    { pattern: /\$[0-9a-fA-F]+/g, type: 'number' },
    // Binary numbers (Free Pascal)
    { pattern: /%[01]+/g, type: 'number' },
    // Octal numbers (Free Pascal)
    { pattern: /&[0-7]+/g, type: 'number' },
    // Float numbers
    { pattern: /\b\d+\.\d+(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Integer numbers
    { pattern: /\b\d+\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/<>=@^]+|:=|\.\./g, type: 'operator' },
  ],
  strings: [
    { start: "'", end: "'", escape: "'" },
    { start: '#', end: /(?=[^0-9$])/, escape: '' },
  ],
  comments: {
    line: '//',
    block: { start: '{', end: '}' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
    { open: 'begin', close: 'end' },
  ],
});

export default pascal;
