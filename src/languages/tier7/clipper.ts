/**
 * Clipper/Harbour/xBase language definition
 */
import { defineLang } from '../define-lang.js';

export const clipper = defineLang({
  name: 'clipper',
  aliases: ['harbour', 'xbase', 'dbase', 'xharbour'],
  extensions: ['.prg', '.ch', '.hb'],
  keywords: [
    // Control flow
    'IF', 'ELSE', 'ELSEIF', 'ENDIF', 'DO', 'CASE', 'ENDCASE', 'OTHERWISE',
    'FOR', 'TO', 'STEP', 'NEXT', 'WHILE', 'ENDDO', 'EXIT', 'LOOP',
    'BEGIN', 'SEQUENCE', 'RECOVER', 'END', 'BREAK', 'RETURN',
    // Procedure/Function
    'FUNCTION', 'PROCEDURE', 'METHOD', 'STATIC', 'LOCAL', 'PRIVATE', 'PUBLIC',
    'MEMVAR', 'FIELD', 'PARAMETERS', 'REQUEST', 'ANNOUNCE', 'EXTERNAL',
    'INIT', 'EXIT', 'DECLARE',
    // Class
    'CLASS', 'ENDCLASS', 'FROM', 'INHERIT', 'VAR', 'DATA', 'METHOD', 'MESSAGE',
    'CLASSDATA', 'CLASSMETHOD', 'INLINE', 'VIRTUAL', 'DEFERRED', 'FINAL',
    'EXPORTED', 'PROTECTED', 'HIDDEN', 'READONLY', 'SYNC', 'CONSTRUCTOR',
    'DESTRUCTOR', 'ACCESS', 'ASSIGN', 'OPERATOR', 'DELEGATE', 'ERROR',
    'HANDLER', 'NEW', 'SELF', 'SUPER',
    // Database
    'USE', 'SELECT', 'ALIAS', 'INDEX', 'ON', 'TAG', 'SET', 'ORDER', 'DESCENDING',
    'ASCENDING', 'UNIQUE', 'ADDITIVE', 'EXCLUSIVE', 'SHARED', 'READONLY',
    'APPEND', 'BLANK', 'FROM', 'COPY', 'STRUCTURE', 'EXTENDED', 'TO', 'FILE',
    'DELETE', 'RECALL', 'PACK', 'ZAP', 'REPLACE', 'WITH', 'LOCATE', 'FOR',
    'CONTINUE', 'SEEK', 'FIND', 'SKIP', 'GO', 'GOTO', 'TOP', 'BOTTOM',
    'CLOSE', 'ALL', 'DATABASES', 'INDEXES', 'CREATE', 'DATABASE', 'TABLE',
    'COUNT', 'SUM', 'AVERAGE', 'TOTAL', 'UPDATE', 'SORT', 'JOIN', 'REPORT',
    // I/O
    'ACCEPT', 'INPUT', 'WAIT', 'KEYBOARD', 'READ', 'SAY', 'GET', 'CLEAR',
    'GETS', 'DISPLAY', 'LIST', 'EJECT', 'PRINT', 'BROWSE', 'EDIT',
    // Operators
    'AND', 'OR', 'NOT', '.T.', '.F.', '.Y.', '.N.', 'NIL',
    // Preprocessor
    '#INCLUDE', '#DEFINE', '#UNDEF', '#IFDEF', '#IFNDEF', '#ELSE', '#ENDIF',
    '#COMMAND', '#TRANSLATE', '#XCOMMAND', '#XTRANSLATE', '#ERROR', '#STDOUT',
    '#PRAGMA',
  ],
  builtins: [
    // String functions
    'ALLTRIM', 'ASC', 'AT', 'CHR', 'CTOD', 'DTOC', 'DTOS', 'EMPTY', 'HB_STRTOUTF8',
    'HB_UTF8TOSTR', 'ISALPHA', 'ISDIGIT', 'ISLOWER', 'ISUPPER', 'LEFT', 'LEN',
    'LOWER', 'LTRIM', 'MEMOEDIT', 'MEMOLINE', 'MEMOREAD', 'MEMOTRAN', 'MEMOWRIT',
    'MLCOUNT', 'MLPOS', 'OCCURS', 'PADL', 'PADC', 'PADR', 'RAT', 'REPLICATE',
    'RIGHT', 'RTRIM', 'SPACE', 'STR', 'STRTRAN', 'STUFF', 'SUBSTR', 'TRANSFORM',
    'TRIM', 'UPPER', 'VAL', 'VALTYPE',
    // Numeric functions
    'ABS', 'EXP', 'INT', 'LOG', 'MAX', 'MIN', 'MOD', 'ROUND', 'SQRT',
    // Date/Time functions
    'CDOW', 'CMONTH', 'DATE', 'DAY', 'DOW', 'DTOC', 'DTOS', 'MONTH', 'SECONDS',
    'TIME', 'YEAR',
    // Database functions
    'ALIAS', 'BOF', 'DBAPPEND', 'DBCLEARFILTER', 'DBCLEARINDEX', 'DBCLOSEALL',
    'DBCLOSEAREA', 'DBCOMMIT', 'DBCOMMITALL', 'DBCREATE', 'DBCREATEINDEX',
    'DBDELETE', 'DBEDIT', 'DBEVAL', 'DBF', 'DBFILTER', 'DBGOBOTTOM', 'DBGOTO',
    'DBGOTOP', 'DBRECALL', 'DBREINDEX', 'DBRELATION', 'DBRLOCK', 'DBRLOCKLIST',
    'DBRUNLOCK', 'DBSEEK', 'DBSELECTAREA', 'DBSETDRIVER', 'DBSETFILTER',
    'DBSETINDEX', 'DBSETORDER', 'DBSETRELATION', 'DBSKIP', 'DBSTRUCT',
    'DBUNLOCK', 'DBUNLOCKALL', 'DBUSEAREA', 'DELETED', 'EOF', 'FCOUNT',
    'FIELD', 'FIELDGET', 'FIELDNAME', 'FIELDPOS', 'FIELDPUT', 'FLOCK',
    'FOUND', 'HEADER', 'INDEXEXT', 'INDEXKEY', 'INDEXORD', 'LASTREC',
    'LUPDATE', 'NETERR', 'ORDCOUNT', 'ORDKEY', 'ORDNAME', 'ORDNUMBER',
    'RECCOUNT', 'RECNO', 'RECSIZE', 'RLOCK', 'SELECT', 'USED',
    // Array functions
    'AADD', 'ACLONE', 'ACOPY', 'ADEL', 'AEVAL', 'AFILL', 'AINS', 'ARRAY',
    'ASCAN', 'ASIZE', 'ASORT', 'ATAIL', 'LEN',
    // File functions
    'CURDIR', 'DIRECTORY', 'DISKSPACE', 'FCLOSE', 'FCREATE', 'FERASE', 'FERROR',
    'FILE', 'FOPEN', 'FREAD', 'FREADSTR', 'FRENAME', 'FSEEK', 'FWRITE',
    // I/O functions
    'ACCEPT', 'ALERT', 'COL', 'DEVOUT', 'DEVPOS', 'DISPBEGIN', 'DISPBOX',
    'DISPCOUNT', 'DISPEND', 'DISPOUT', 'INKEY', 'INPUT', 'LASTKEY', 'MAXCOL',
    'MAXROW', 'MCOL', 'MROW', 'NEXTKEY', 'OUTSTD', 'OUTERR', 'PCOL', 'PROW',
    'QOUT', 'QQOUT', 'READKEY', 'READVAR', 'ROW', 'SCROLL', 'SETPOS',
    'SETPRC', 'WAIT',
    // Miscellaneous
    'ERRORBLOCK', 'EVAL', 'HB_LANGSELECT', 'PROCLINE', 'PROCNAME', 'SETKEY',
    'TYPE', 'VERSION',
  ],
  patterns: [
    // Preprocessor
    { pattern: /#[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'macro' },
    // Field alias
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*->/g, type: 'property' },
    // Memory variable
    { pattern: /\bM->[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Dates
    { pattern: /\{[^}]*\}/g, type: 'string' },
    // Logical
    { pattern: /\.[TtFfYyNn]\./g, type: 'constant' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!#$^:]+|<>|<=|>=|==|:=|\+=|-=|\*=|\/=|\+\+|--/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '[', end: ']', escape: '' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default clipper;
