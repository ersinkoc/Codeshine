/**
 * Cassandra Query Language (CQL) definition
 */
import { defineLang } from '../define-lang.js';

export const cassandra = defineLang({
  name: 'cassandra',
  aliases: ['cql', 'cqlsh'],
  extensions: ['.cql'],
  keywords: [
    // Data definition
    'CREATE', 'ALTER', 'DROP', 'TRUNCATE', 'KEYSPACE', 'TABLE', 'INDEX', 'TYPE',
    'FUNCTION', 'AGGREGATE', 'TRIGGER', 'MATERIALIZED', 'VIEW', 'ROLE', 'USER',
    // Data manipulation
    'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'BATCH', 'BEGIN', 'APPLY', 'UNLOGGED',
    'COUNTER', 'LOGGED',
    // Clauses
    'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'CONTAINS', 'KEY', 'SET', 'VALUES',
    'INTO', 'USING', 'TTL', 'TIMESTAMP', 'IF', 'EXISTS', 'LIMIT', 'ORDER', 'BY',
    'ASC', 'DESC', 'ALLOW', 'FILTERING', 'PER', 'PARTITION', 'TOKEN', 'DISTINCT',
    'AS', 'CLUSTERING', 'STATIC', 'FROZEN', 'WITH', 'PRIMARY', 'COMPACT', 'STORAGE',
    'REPLICATION', 'DURABLE_WRITES', 'CLASS', 'SIMPLE', 'NETWORK_TOPOLOGY',
    'ON', 'TO', 'OF', 'GRANT', 'REVOKE', 'ALL', 'PERMISSIONS', 'NORECURSIVE',
    'DESCRIBE', 'USE', 'JSON', 'DEFAULT', 'UNSET', 'NULL', 'GROUP',
  ],
  typeKeywords: [
    'ascii', 'bigint', 'blob', 'boolean', 'counter', 'date', 'decimal', 'double',
    'duration', 'float', 'inet', 'int', 'smallint', 'text', 'time', 'timestamp',
    'timeuuid', 'tinyint', 'uuid', 'varchar', 'varint',
    'list', 'map', 'set', 'tuple', 'frozen',
  ],
  constants: [
    'TRUE', 'FALSE', 'NULL', 'NaN', 'INFINITY',
  ],
  builtins: [
    // Aggregate functions
    'COUNT', 'MIN', 'MAX', 'AVG', 'SUM',
    // Scalar functions
    'TOKEN', 'WRITETIME', 'TTL', 'CAST', 'NOW', 'UUID', 'TIMEUUID', 'MINTIMEUUID',
    'MAXTIMEUUID', 'DATEOF', 'UNIXTIMESTAMPOF', 'TOUNIXTIMESTAMP', 'TOTIMESTAMP',
    'TODATE', 'TOUNIXEPOCH', 'BLOBASASCII', 'BLOBASBIGINT', 'BLOBASBOOLEAN',
    'BLOBASDECIMAL', 'BLOBASDOUBLE', 'BLOBASFLOAT', 'BLOBASINT', 'BLOBASSMALLINT',
    'BLOBASTEXT', 'BLOBASTIMESTAMP', 'BLOBASTIMEUUID', 'BLOBASTINYINT',
    'BLOBASUUID', 'BLOBASVARCHAR', 'BLOBASVARINT', 'ASCIIASBLO', 'BIGINTASBLOB',
    'BOOLEANASBLOB', 'DECIMALASBLOB', 'DOUBLEASBLOB', 'FLOATASBLOB', 'INTASBLOB',
    'SMALLINTASBLOB', 'TEXTASBLOB', 'TIMESTAMPASBLOB', 'TIMEUUIDASBLOB',
    'TINYINTASBLOB', 'UUIDASBLOB', 'VARCHARASBLOB', 'VARINTASBLOB',
  ],
  patterns: [
    // UUID
    { pattern: /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/g, type: 'constant' },
    // Bind markers
    { pattern: /\?/g, type: 'variable' },
    { pattern: /:[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!]+/g, type: 'operator' },
  ],
  strings: [
    { start: "$$", end: "$$", escape: '' },
    { start: "'", end: "'", escape: "'" },
    { start: '"', end: '"', escape: '"' },
  ],
  comments: {
    line: '--',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '<', close: '>' },
  ],
});

export default cassandra;
