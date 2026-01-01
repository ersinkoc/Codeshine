/**
 * SQL language definition
 */

import { defineLang } from '../define-lang.js';

export const sql = defineLang({
  name: 'sql',
  aliases: ['mysql', 'postgresql', 'postgres', 'sqlite'],
  extensions: ['.sql'],
  mimeTypes: ['application/sql', 'text/x-sql'],

  keywords: [
    'ADD',
    'ALL',
    'ALTER',
    'AND',
    'AS',
    'ASC',
    'BETWEEN',
    'BY',
    'CASE',
    'CHECK',
    'COLUMN',
    'CONSTRAINT',
    'CREATE',
    'CROSS',
    'DATABASE',
    'DEFAULT',
    'DELETE',
    'DESC',
    'DISTINCT',
    'DROP',
    'ELSE',
    'END',
    'ESCAPE',
    'EXCEPT',
    'EXISTS',
    'FOREIGN',
    'FROM',
    'FULL',
    'GROUP',
    'HAVING',
    'IF',
    'IN',
    'INDEX',
    'INNER',
    'INSERT',
    'INTERSECT',
    'INTO',
    'IS',
    'JOIN',
    'KEY',
    'LEFT',
    'LIKE',
    'LIMIT',
    'NOT',
    'NULL',
    'OFFSET',
    'ON',
    'OR',
    'ORDER',
    'OUTER',
    'PRIMARY',
    'REFERENCES',
    'RIGHT',
    'SELECT',
    'SET',
    'TABLE',
    'THEN',
    'UNION',
    'UNIQUE',
    'UPDATE',
    'VALUES',
    'WHEN',
    'WHERE',
    'WITH',
  ],

  typeKeywords: [
    'BIGINT',
    'BINARY',
    'BIT',
    'BLOB',
    'BOOLEAN',
    'CHAR',
    'CHARACTER',
    'DATE',
    'DATETIME',
    'DECIMAL',
    'DOUBLE',
    'ENUM',
    'FLOAT',
    'INT',
    'INTEGER',
    'JSON',
    'LONGBLOB',
    'LONGTEXT',
    'MEDIUMBLOB',
    'MEDIUMINT',
    'MEDIUMTEXT',
    'NUMERIC',
    'REAL',
    'SET',
    'SMALLINT',
    'TEXT',
    'TIME',
    'TIMESTAMP',
    'TINYBLOB',
    'TINYINT',
    'TINYTEXT',
    'UUID',
    'VARBINARY',
    'VARCHAR',
    'YEAR',
  ],

  constants: ['TRUE', 'FALSE', 'NULL', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP'],

  operators: /[+\-*/%=<>!&|^]+|<>|<=|>=|!=|\|\|/,

  patterns: [
    // Parameters
    { pattern: /:\w+|\?\d*|@\w+|\$\d+/, type: 'variable' },

    // Table/column aliases
    { pattern: /(?<=\s+AS\s+)\w+/i, type: 'variable' },

    // Function calls
    { pattern: /\b(?:COUNT|SUM|AVG|MIN|MAX|COALESCE|NULLIF|CAST|CONVERT|CONCAT|SUBSTRING|LENGTH|UPPER|LOWER|TRIM|NOW|DATE|YEAR|MONTH|DAY|HOUR|MINUTE|SECOND)\b(?=\s*\()/i, type: 'function' },

    // Aggregate/window functions
    { pattern: /\b(?:OVER|PARTITION|ROW_NUMBER|RANK|DENSE_RANK|NTILE|LEAD|LAG|FIRST_VALUE|LAST_VALUE)\b/i, type: 'function' },

    // Numbers
    { pattern: /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/, type: 'number' },

    // Identifiers in backticks
    { pattern: /`[^`]+`/, type: 'variable' },

    // Identifiers in brackets
    { pattern: /\[[^\]]+\]/, type: 'variable' },
  ],

  strings: [
    { start: "'", end: "'", escape: "''" },
    { start: '"', end: '"', escape: '""' },
  ],

  comments: {
    line: '--',
    block: { start: '/*', end: '*/' },
  },

  brackets: [
    { open: '(', close: ')' },
  ],
});

export default sql;
