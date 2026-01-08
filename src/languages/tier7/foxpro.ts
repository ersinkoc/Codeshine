/**
 * FoxPro/Visual FoxPro language definition
 */
import { defineLang } from '../define-lang.js';

export const foxpro = defineLang({
  name: 'foxpro',
  aliases: ['vfp', 'visualfoxpro', 'foxbase'],
  extensions: ['.prg', '.fxp', '.spr', '.mpr', '.qpr'],
  keywords: [
    // Program control
    'IF', 'ELSE', 'ELSEIF', 'ENDIF', 'IIF', 'DO', 'CASE', 'ENDCASE', 'OTHERWISE',
    'FOR', 'ENDFOR', 'NEXT', 'TO', 'STEP', 'LOOP', 'EXIT', 'SCAN', 'ENDSCAN',
    'WHILE', 'ENDWHILE', 'DO', 'WHILE', 'ENDDO', 'PROCEDURE', 'ENDPROC',
    'FUNCTION', 'ENDFUNC', 'RETURN', 'PARAMETERS', 'LPARAMETERS', 'PRIVATE',
    'PUBLIC', 'LOCAL', 'REGIONAL', 'DIMENSION', 'DECLARE', 'EXTERNAL',
    'TRY', 'CATCH', 'FINALLY', 'ENDTRY', 'THROW', 'WITH', 'ENDWITH',
    'DEFINE', 'CLASS', 'ENDDEFINE', 'AS', 'OF', 'OLEPUBLIC', 'IMPLEMENTS',
    'HIDDEN', 'PROTECTED', 'THIS', 'THISFORM', 'THISFORMSET',
    'ADD', 'OBJECT', 'NODEFAULT', 'DODEFAULT',
    // Data
    'SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'GROUP', 'HAVING', 'INTO', 'ARRAY',
    'CURSOR', 'TABLE', 'USE', 'IN', 'ALIAS', 'EXCLUSIVE', 'SHARED', 'NOUPDATE',
    'AGAIN', 'INDEX', 'ON', 'TAG', 'SET', 'FILTER', 'KEY', 'LOCATE', 'CONTINUE',
    'SEEK', 'FIND', 'SKIP', 'GO', 'GOTO', 'TOP', 'BOTTOM', 'RECORD', 'RECNO',
    'APPEND', 'BLANK', 'INSERT', 'DELETE', 'RECALL', 'PACK', 'ZAP', 'REPLACE',
    'GATHER', 'SCATTER', 'COPY', 'STRUCTURE', 'EXTENDED', 'CREATE', 'MODIFY',
    'ALTER', 'DROP', 'RENAME', 'COUNT', 'SUM', 'AVERAGE', 'CALCULATE', 'TOTAL',
    'UPDATE', 'JOIN', 'UNION', 'ALL', 'DISTINCT', 'INNER', 'LEFT', 'RIGHT',
    'OUTER', 'FULL', 'CROSS', 'BROWSE', 'EDIT', 'CHANGE',
    // Boolean
    'AND', 'OR', 'NOT', '.T.', '.F.', '.Y.', '.N.', '.NULL.',
    // I/O
    'REPORT', 'FORM', 'LABEL', 'PREVIEW', 'TO', 'PRINT', 'FILE', 'PROMPT',
    'WAIT', 'ACCEPT', 'INPUT', 'READ', 'EVENTS', 'CLEAR', 'KEYBOARD', 'INKEY',
    'DISPLAY', 'LIST', 'TYPE', 'EJECT', 'PRINTJOB', 'ENDPRINTJOB',
  ],
  builtins: [
    // String functions
    'ALLTRIM', 'AT', 'ATC', 'ATCC', 'ATCLINE', 'ATLINE', 'BETWEEN', 'CHR',
    'CHRSAW', 'CHRTRAN', 'CHRTRANC', 'CTOD', 'DTOC', 'DTOT', 'DTOS', 'EMPTY',
    'EVL', 'GETWORDCOUNT', 'GETWORDNUM', 'ISALPHA', 'ISBLANK', 'ISDIGIT',
    'ISLOWER', 'ISNULL', 'ISUPPER', 'LEFT', 'LEN', 'LIKE', 'LOWER', 'LTRIM',
    'NVL', 'OCCURS', 'PADL', 'PADC', 'PADR', 'PROPER', 'RAT', 'RATLINE',
    'REPLICATE', 'RIGHT', 'RTRIM', 'SPACE', 'STR', 'STRCONV', 'STREXTRACT',
    'STRTRAN', 'STUFF', 'STUFFC', 'SUBSTR', 'SUBSTRC', 'TRANSFORM', 'TRIM',
    'TTOC', 'TTOD', 'UPPER', 'VAL',
    // Numeric functions
    'ABS', 'ACOS', 'ASIN', 'ATAN', 'ATN2', 'CEILING', 'COS', 'DTOR', 'EXP',
    'FLOOR', 'INT', 'LOG', 'LOG10', 'MAX', 'MIN', 'MOD', 'PI', 'RAND', 'ROUND',
    'RTOD', 'SIGN', 'SIN', 'SQRT', 'TAN',
    // Date/Time functions
    'CDOW', 'CMONTH', 'DATE', 'DATETIME', 'DAY', 'DMY', 'DOW', 'GOMONTH',
    'HOUR', 'MDY', 'MINUTE', 'MONTH', 'QUARTER', 'SEC', 'SECONDS', 'TIME',
    'WEEK', 'YEAR',
    // Database functions
    'ALIAS', 'BOF', 'CURSORTOXML', 'XMLTOCURSOR', 'DBF', 'DELETED', 'EOF',
    'FCOUNT', 'FIELD', 'FLDLIST', 'FOUND', 'GETFLDSTATE', 'HEADER', 'KEY',
    'KEYMATCH', 'LOOKUP', 'NDX', 'ORDER', 'RECCOUNT', 'RECNO', 'RECSIZE',
    'RELATION', 'SEEK', 'SELECT', 'SQLCANCEL', 'SQLCOLUMNS', 'SQLCOMMIT',
    'SQLCONNECT', 'SQLDISCONNECT', 'SQLEXEC', 'SQLGETPROP', 'SQLMORERESULTS',
    'SQLPREPARE', 'SQLROLLBACK', 'SQLSETPROP', 'SQLSTRINGCONNECT', 'SQLTABLES',
    'TAG', 'TAGCOUNT', 'TAGNO', 'TARGET', 'USED',
    // Array functions
    'ACOPY', 'ADEL', 'ADIR', 'AELEMENT', 'AFIELDS', 'AINS', 'ALEN', 'ALINES',
    'ASCAN', 'ASELOBJ', 'ASORT', 'ASUBSCRIPT', 'ATAGINFO', 'AUSED',
    // Object/Class functions
    'ADDPROPERTY', 'AMEMBERS', 'ACLASS', 'COMPOBJ', 'CREATEOBJECT',
    'CREATEOBJECTEX', 'DODEFAULT', 'EVALUATE', 'GETOBJECT', 'NEWOBJECT',
    'PEMSTATUS', 'REMOVEPROPERTY', 'SYS', 'TYPE', 'VARTYPE',
    // File functions
    'ADIR', 'CURDIR', 'DEFAULTEXT', 'DIRECTORY', 'DRIVETYPE', 'FCHSIZE',
    'FCLOSE', 'FCREATE', 'FEOF', 'FERROR', 'FFLUSH', 'FGETS', 'FILE', 'FOPEN',
    'FPUTS', 'FREAD', 'FSEEK', 'FULLPATH', 'FWRITE', 'GETENV', 'HOME', 'JUSTDRIVE',
    'JUSTEXT', 'JUSTFNAME', 'JUSTPATH', 'JUSTSTEM', 'LOCFILE', 'PUTFILE', 'SYS',
  ],
  patterns: [
    // Preprocessor
    { pattern: /#[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'macro' },
    // Memory variables
    { pattern: /\b[mM]\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Object properties
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'property' },
    // Dates
    { pattern: /\{[^}]*\}/g, type: 'string' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!#$^]+|<>|<=|>=|==|!=|\|\||&&/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '[', end: ']', escape: '' },
  ],
  comments: {
    line: '*',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default foxpro;
