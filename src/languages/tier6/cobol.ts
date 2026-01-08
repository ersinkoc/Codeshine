/**
 * COBOL programming language definition
 */
import { defineLang } from '../define-lang.js';

export const cobol = defineLang({
  name: 'cobol',
  aliases: ['cob', 'cbl'],
  extensions: ['.cob', '.cbl', '.cpy'],
  keywords: [
    // Divisions
    'IDENTIFICATION', 'ENVIRONMENT', 'DATA', 'PROCEDURE', 'DIVISION',
    // Sections
    'CONFIGURATION', 'INPUT-OUTPUT', 'FILE', 'WORKING-STORAGE', 'LOCAL-STORAGE',
    'LINKAGE', 'REPORT', 'SCREEN', 'SECTION',
    // Paragraphs
    'PROGRAM-ID', 'AUTHOR', 'DATE-WRITTEN', 'DATE-COMPILED', 'SECURITY',
    'SOURCE-COMPUTER', 'OBJECT-COMPUTER', 'SPECIAL-NAMES', 'FILE-CONTROL',
    'I-O-CONTROL', 'FD', 'SD', 'RD', 'CD',
    // Data description
    'PIC', 'PICTURE', 'VALUE', 'VALUES', 'COMP', 'COMPUTATIONAL', 'BINARY',
    'PACKED-DECIMAL', 'DISPLAY', 'INDEX', 'POINTER', 'USAGE', 'SIGN', 'OCCURS',
    'DEPENDING', 'ON', 'ASCENDING', 'DESCENDING', 'KEY', 'INDEXED', 'BY',
    'REDEFINES', 'RENAMES', 'FILLER', 'BLANK', 'WHEN', 'ZERO', 'ZEROS', 'ZEROES',
    'SPACE', 'SPACES', 'LOW-VALUE', 'LOW-VALUES', 'HIGH-VALUE', 'HIGH-VALUES',
    'QUOTE', 'QUOTES', 'ALL',
    // Procedure verbs
    'ACCEPT', 'ADD', 'ALTER', 'CALL', 'CANCEL', 'CLOSE', 'COMPUTE', 'CONTINUE',
    'DELETE', 'DISPLAY', 'DIVIDE', 'ENTRY', 'EVALUATE', 'EXIT', 'GO', 'GOBACK',
    'IF', 'INITIALIZE', 'INSPECT', 'INVOKE', 'MERGE', 'MOVE', 'MULTIPLY', 'OPEN',
    'PERFORM', 'READ', 'RELEASE', 'RETURN', 'REWRITE', 'SEARCH', 'SET', 'SORT',
    'START', 'STOP', 'STRING', 'SUBTRACT', 'UNSTRING', 'WRITE',
    // Clauses
    'ALSO', 'AND', 'ARE', 'AT', 'BEFORE', 'AFTER', 'BEGINNING', 'ENDING',
    'BY', 'CHARACTERS', 'CLASS', 'CONDITION', 'CONTENT', 'CONVERTING',
    'CORRESPONDING', 'COUNT', 'DEBUGGING', 'DECLARATIVES', 'DELIMITED',
    'DELIMITER', 'DOWN', 'DUPLICATES', 'ELSE', 'END', 'EQUAL', 'ERROR',
    'EXCEPTION', 'EXTEND', 'FALSE', 'FILE', 'FIRST', 'FOR', 'FROM', 'FUNCTION',
    'GIVING', 'GREATER', 'IN', 'INITIAL', 'INTO', 'INVALID', 'IS', 'LEADING',
    'LESS', 'LINE', 'LINES', 'LOCK', 'MODE', 'NEGATIVE', 'NEXT', 'NOT', 'NUMERIC',
    'OF', 'OFF', 'OMITTED', 'OR', 'ORDER', 'OTHER', 'OUTPUT', 'OVERFLOW', 'PAGE',
    'PERFORM', 'PLUS', 'POSITIVE', 'PROCEDURE', 'PROCESSING', 'PROGRAM', 'RANDOM',
    'RECORD', 'REFERENCE', 'RELATIVE', 'REMAINDER', 'REPLACING', 'RETURNING',
    'REVERSED', 'ROUNDED', 'RUN', 'SAME', 'SENTENCE', 'SEQUENTIAL', 'SIZE',
    'STANDARD', 'STATUS', 'TALLYING', 'THAN', 'THEN', 'THROUGH', 'THRU', 'TIMES',
    'TO', 'TRAILING', 'TRUE', 'UNIT', 'UNTIL', 'UP', 'UPON', 'USING', 'VARYING',
    'WITH', 'END-ADD', 'END-CALL', 'END-COMPUTE', 'END-DELETE', 'END-DIVIDE',
    'END-EVALUATE', 'END-IF', 'END-MULTIPLY', 'END-PERFORM', 'END-READ',
    'END-RETURN', 'END-REWRITE', 'END-SEARCH', 'END-START', 'END-STRING',
    'END-SUBTRACT', 'END-UNSTRING', 'END-WRITE',
  ],
  constants: [
    'ZERO', 'ZEROS', 'ZEROES', 'SPACE', 'SPACES', 'LOW-VALUE', 'LOW-VALUES',
    'HIGH-VALUE', 'HIGH-VALUES', 'QUOTE', 'QUOTES', 'NULL', 'NULLS', 'TRUE', 'FALSE',
  ],
  builtins: [
    // Intrinsic functions
    'ABS', 'ACOS', 'ANNUITY', 'ASIN', 'ATAN', 'CHAR', 'COS', 'CURRENT-DATE',
    'DATE-OF-INTEGER', 'DATE-TO-YYYYMMDD', 'DAY-OF-INTEGER', 'DAY-TO-YYYYDDD',
    'DISPLAY-OF', 'E', 'EXP', 'EXP10', 'FACTORIAL', 'FRACTION-PART', 'INTEGER',
    'INTEGER-OF-DATE', 'INTEGER-OF-DAY', 'INTEGER-PART', 'LENGTH', 'LENGTH-AN',
    'LOG', 'LOG10', 'LOWER-CASE', 'MAX', 'MEAN', 'MEDIAN', 'MIDRANGE', 'MIN',
    'MOD', 'NATIONAL-OF', 'NUMVAL', 'NUMVAL-C', 'ORD', 'ORD-MAX', 'ORD-MIN',
    'PI', 'PRESENT-VALUE', 'RANDOM', 'RANGE', 'REM', 'REVERSE', 'SIN', 'SQRT',
    'STANDARD-DEVIATION', 'SUM', 'TAN', 'TEST-DATE-YYYYMMDD', 'TEST-DAY-YYYYDDD',
    'TRIM', 'UPPER-CASE', 'VARIANCE', 'WHEN-COMPILED', 'YEAR-TO-YYYY',
  ],
  patterns: [
    // Level numbers
    { pattern: /^\s*(?:0[1-9]|[1-4][0-9]|66|77|88)\b/gm, type: 'number' },
    // Picture clauses
    { pattern: /PIC(?:TURE)?\s+IS\s+[9AXVSZPB\-\+\*\$,.\(\)]+/gi, type: 'type' },
    { pattern: /PIC(?:TURE)?\s+[9AXVSZPB\-\+\*\$,.\(\)]+/gi, type: 'type' },
    // Paragraph/Section names
    { pattern: /^[\s]*[A-Z0-9][A-Z0-9-]*\s*\./gm, type: 'label' },
    // Numbers
    { pattern: /[+-]?\b\d+(?:\.\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/=<>]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '"' },
    { start: "'", end: "'", escape: "'" },
  ],
  comments: {
    line: '*>',
  },
  brackets: [
    { open: '(', close: ')' },
  ],
});

export default cobol;
