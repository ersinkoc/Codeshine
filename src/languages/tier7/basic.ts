/**
 * BASIC (Beginner's All-purpose Symbolic Instruction Code) language definition
 */
import { defineLang } from '../define-lang.js';

export const basic = defineLang({
  name: 'basic',
  aliases: ['bas', 'vb', 'qbasic', 'gwbasic', 'freebasic'],
  extensions: ['.bas', '.bi', '.vb'],
  keywords: [
    // Program flow
    'IF', 'THEN', 'ELSE', 'ELSEIF', 'ENDIF', 'END', 'FOR', 'TO', 'STEP', 'NEXT',
    'WHILE', 'WEND', 'DO', 'LOOP', 'UNTIL', 'SELECT', 'CASE', 'GOTO', 'GOSUB',
    'RETURN', 'ON', 'ERROR', 'RESUME', 'EXIT', 'CONTINUE', 'STOP',
    // Declarations
    'DIM', 'AS', 'TYPE', 'CONST', 'STATIC', 'SHARED', 'COMMON', 'DECLARE',
    'FUNCTION', 'SUB', 'BYVAL', 'BYREF', 'PRIVATE', 'PUBLIC', 'PROPERTY',
    'CLASS', 'MODULE', 'NAMESPACE', 'IMPORTS', 'USING',
    // Data types
    'INTEGER', 'LONG', 'SINGLE', 'DOUBLE', 'STRING', 'BOOLEAN', 'BYTE',
    'VARIANT', 'OBJECT', 'DATE', 'CURRENCY', 'DECIMAL', 'SHORT', 'UINTEGER',
    'ULONG', 'USHORT', 'UBYTE', 'ANY', 'PTR', 'POINTER',
    // Data
    'DATA', 'READ', 'RESTORE', 'LET',
    // I/O
    'PRINT', 'INPUT', 'LINE', 'OPEN', 'CLOSE', 'GET', 'PUT', 'SEEK', 'LOC', 'LOF',
    'EOF', 'WRITE', 'APPEND', 'OUTPUT', 'RANDOM', 'BINARY', 'ACCESS', 'LOCK',
    // Graphics
    'SCREEN', 'CLS', 'COLOR', 'LOCATE', 'PSET', 'LINE', 'CIRCLE', 'PAINT',
    'DRAW', 'GET', 'PUT', 'PALETTE', 'VIEW', 'WINDOW', 'PCOPY',
    // Sound
    'BEEP', 'SOUND', 'PLAY',
    // Operators
    'AND', 'OR', 'NOT', 'XOR', 'EQV', 'IMP', 'MOD',
    // Other
    'REM', 'OPTION', 'BASE', 'DEF', 'SEG', 'FN', 'USR', 'CALL', 'CHAIN',
    'CLEAR', 'SWAP', 'ERASE', 'REDIM', 'PRESERVE', 'LBOUND', 'UBOUND',
    'NEW', 'DELETE', 'ME', 'MYBASE', 'MYCLASS', 'NOTHING', 'NULL',
    'TRUE', 'FALSE',
  ],
  builtins: [
    // Math
    'ABS', 'SGN', 'INT', 'FIX', 'CINT', 'CLNG', 'CSNG', 'CDBL', 'SQR', 'EXP',
    'LOG', 'SIN', 'COS', 'TAN', 'ATN', 'RND', 'RANDOMIZE', 'VAL',
    // String
    'LEN', 'LEFT$', 'RIGHT$', 'MID$', 'INSTR', 'CHR$', 'ASC', 'STR$', 'HEX$',
    'OCT$', 'SPACE$', 'STRING$', 'UCASE$', 'LCASE$', 'LTRIM$', 'RTRIM$', 'TRIM$',
    'REPLACE', 'SPLIT', 'JOIN', 'FORMAT', 'FORMAT$',
    // Array/Type
    'LBOUND', 'UBOUND', 'VARTYPE', 'TYPENAME', 'SIZEOF', 'OFFSETOF',
    // Date/Time
    'DATE$', 'TIME$', 'TIMER', 'NOW', 'YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE',
    'SECOND', 'DATESERIAL', 'TIMESERIAL', 'DATEVALUE', 'TIMEVALUE',
    // File
    'FREEFILE', 'FILELEN', 'FILEATTR', 'FILEDATETIME', 'DIR$', 'CURDIR$',
    'CHDIR', 'MKDIR', 'RMDIR', 'KILL', 'NAME', 'FILECOPY', 'SETATTR', 'GETATTR',
    // System
    'ENVIRON$', 'COMMAND$', 'SHELL', 'SYSTEM', 'END', 'SLEEP', 'WAIT',
    // Memory
    'PEEK', 'POKE', 'VARPTR', 'VARSEG', 'SADD', 'SSEG', 'FRE',
    // Input
    'INKEY$', 'INPUT$', 'STICK', 'STRIG', 'PEN',
    // Misc
    'IIF', 'SWITCH', 'CHOOSE', 'CBOOL', 'CBYTE', 'CDATE', 'CDEC', 'CCUR',
    'CSTR', 'CVAR', 'CVDATE', 'ARRAY', 'ISARRAY', 'ISDATE', 'ISEMPTY',
    'ISERROR', 'ISMISSING', 'ISNULL', 'ISNUMERIC', 'ISOBJECT',
  ],
  patterns: [
    // Line numbers
    { pattern: /^\s*\d+/gm, type: 'label' },
    // Labels
    { pattern: /^[a-zA-Z_][a-zA-Z0-9_]*:/gm, type: 'label' },
    // Type suffixes
    { pattern: /[a-zA-Z_][a-zA-Z0-9_]*[$%&!#@]/g, type: 'variable' },
    // Hex numbers
    { pattern: /&[Hh][0-9a-fA-F]+&?/g, type: 'number' },
    // Octal numbers
    { pattern: /&[Oo][0-7]+&?/g, type: 'number' },
    // Binary numbers
    { pattern: /&[Bb][01]+&?/g, type: 'number' },
    // Decimal numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eEdD][+-]?\d+)?[!#%&]?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/\\^<>=]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '""' },
  ],
  comments: {
    line: "'",
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default basic;
