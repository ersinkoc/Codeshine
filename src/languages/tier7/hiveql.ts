/**
 * HiveQL (Apache Hive) language definition
 */
import { defineLang } from '../define-lang.js';

export const hiveql = defineLang({
  name: 'hiveql',
  aliases: ['hive', 'hql'],
  extensions: ['.hql', '.hive', '.q'],
  keywords: [
    // DDL
    'CREATE', 'DROP', 'ALTER', 'TRUNCATE', 'SHOW', 'DESCRIBE', 'USE', 'DATABASE',
    'SCHEMA', 'TABLE', 'VIEW', 'INDEX', 'FUNCTION', 'MACRO', 'TEMPORARY', 'EXTERNAL',
    'IF', 'EXISTS', 'NOT', 'LIKE', 'RLIKE', 'REGEXP', 'COMMENT', 'PARTITIONED',
    'CLUSTERED', 'SORTED', 'BY', 'INTO', 'BUCKETS', 'SKEWED', 'STORED', 'AS',
    'DIRECTORIES', 'LOCATION', 'TBLPROPERTIES', 'SERDEPROPERTIES', 'ROW', 'FORMAT',
    'DELIMITED', 'FIELDS', 'TERMINATED', 'ESCAPED', 'COLLECTION', 'ITEMS', 'KEYS',
    'LINES', 'NULL', 'DEFINED', 'SERDE', 'INPUTFORMAT', 'OUTPUTFORMAT', 'TEXTFILE',
    'SEQUENCEFILE', 'RCFILE', 'ORC', 'PARQUET', 'AVRO', 'JSONFILE',
    // DML
    'SELECT', 'FROM', 'WHERE', 'GROUP', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET',
    'UNION', 'ALL', 'DISTINCT', 'DISTRIBUTE', 'SORT', 'CLUSTER', 'INSERT', 'INTO',
    'OVERWRITE', 'DIRECTORY', 'LOCAL', 'VALUES', 'UPDATE', 'DELETE', 'MERGE',
    'LOAD', 'DATA', 'INPATH', 'EXPORT', 'IMPORT',
    // Joins
    'JOIN', 'INNER', 'OUTER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'SEMI', 'ANTI',
    'ON', 'USING', 'LATERAL', 'VIEW', 'EXPLODE', 'POSEXPLODE', 'INLINE', 'STACK',
    // Set operations
    'UNION', 'INTERSECT', 'EXCEPT', 'MINUS',
    // Windowing
    'OVER', 'PARTITION', 'ROWS', 'RANGE', 'BETWEEN', 'UNBOUNDED', 'PRECEDING',
    'FOLLOWING', 'CURRENT', 'ROW',
    // Case
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
    // Subqueries
    'IN', 'ANY', 'SOME', 'EXISTS', 'WITH',
    // Operators
    'AND', 'OR', 'NOT', 'IS', 'TRUE', 'FALSE', 'UNKNOWN', 'BETWEEN', 'LIKE',
    'RLIKE', 'REGEXP', 'DIV',
    // Partition management
    'PARTITION', 'PARTITIONS', 'ADD', 'RENAME', 'EXCHANGE', 'RECOVER', 'TOUCH',
    'ARCHIVE', 'UNARCHIVE', 'SET', 'UNSET', 'ENABLE', 'DISABLE', 'NO_DROP',
    'OFFLINE', 'REBUILD', 'COMPACT',
    // Transactions
    'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION',
    // Other
    'ANALYZE', 'COMPUTE', 'STATISTICS', 'EXPLAIN', 'EXTENDED', 'DEPENDENCY',
    'AUTHORIZATION', 'FORMATTED', 'MSCK', 'REPAIR', 'LOCK', 'UNLOCK', 'LOCKS',
  ],
  typeKeywords: [
    'TINYINT', 'SMALLINT', 'INT', 'INTEGER', 'BIGINT', 'FLOAT', 'DOUBLE', 'DECIMAL',
    'NUMERIC', 'BOOLEAN', 'STRING', 'VARCHAR', 'CHAR', 'BINARY', 'DATE', 'TIMESTAMP',
    'INTERVAL', 'ARRAY', 'MAP', 'STRUCT', 'UNIONTYPE', 'VOID',
  ],
  builtins: [
    // Math functions
    'abs', 'acos', 'asin', 'atan', 'bin', 'bround', 'cbrt', 'ceil', 'ceiling',
    'conv', 'cos', 'degrees', 'e', 'exp', 'factorial', 'floor', 'greatest', 'hex',
    'least', 'ln', 'log', 'log10', 'log2', 'negative', 'pi', 'pmod', 'positive',
    'pow', 'power', 'radians', 'rand', 'round', 'shiftleft', 'shiftright',
    'shiftrightunsigned', 'sign', 'sin', 'sqrt', 'tan', 'unhex', 'width_bucket',
    // String functions
    'ascii', 'base64', 'char_length', 'character_length', 'chr', 'concat',
    'concat_ws', 'context_ngrams', 'decode', 'elt', 'encode', 'field',
    'find_in_set', 'format_number', 'get_json_object', 'in_file', 'initcap',
    'instr', 'json_tuple', 'lcase', 'length', 'levenshtein', 'locate', 'lower',
    'lpad', 'ltrim', 'ngrams', 'octet_length', 'parse_url', 'printf', 'regexp_extract',
    'regexp_replace', 'repeat', 'replace', 'reverse', 'rpad', 'rtrim', 'sentences',
    'soundex', 'space', 'split', 'str_to_map', 'substr', 'substring',
    'substring_index', 'translate', 'trim', 'ucase', 'unbase64', 'upper',
    // Date functions
    'add_months', 'current_date', 'current_timestamp', 'date_add', 'date_format',
    'date_sub', 'datediff', 'day', 'dayofmonth', 'dayofweek', 'dayofyear',
    'extract', 'from_unixtime', 'from_utc_timestamp', 'hour', 'last_day',
    'minute', 'month', 'months_between', 'next_day', 'quarter', 'second',
    'to_date', 'to_unix_timestamp', 'to_utc_timestamp', 'trunc', 'unix_timestamp',
    'weekofyear', 'year',
    // Collection functions
    'array', 'array_contains', 'map', 'map_keys', 'map_values', 'size', 'sort_array',
    'struct',
    // Aggregate functions
    'avg', 'count', 'max', 'min', 'sum', 'collect_list', 'collect_set', 'corr',
    'covar_pop', 'covar_samp', 'histogram_numeric', 'ntile', 'percentile',
    'percentile_approx', 'regr_avgx', 'regr_avgy', 'regr_count', 'regr_intercept',
    'regr_r2', 'regr_slope', 'regr_sxx', 'regr_sxy', 'regr_syy', 'stddev',
    'stddev_pop', 'stddev_samp', 'var_pop', 'var_samp', 'variance',
    // Window functions
    'cume_dist', 'dense_rank', 'first_value', 'lag', 'last_value', 'lead',
    'nth_value', 'percent_rank', 'rank', 'row_number',
    // Conditional functions
    'assert_true', 'coalesce', 'if', 'isnotnull', 'isnull', 'nullif', 'nvl', 'nvl2',
    // Type conversion
    'binary', 'cast',
    // Misc
    'current_database', 'current_user', 'hash', 'java_method', 'md5', 'reflect',
    'sha', 'sha1', 'sha2', 'crc32', 'aes_decrypt', 'aes_encrypt', 'version', 'xpath',
  ],
  patterns: [
    // Variables
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    // Parameters
    { pattern: /:[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
    // Table.column
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_]*\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'property' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[LSYD]?\b/gi, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|^~]+|<>|<=|>=|!=|<=>|\|\|/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '' },
  ],
  comments: {
    line: '--',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
  ],
});

export default hiveql;
