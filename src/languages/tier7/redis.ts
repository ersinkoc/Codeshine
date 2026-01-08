/**
 * Redis commands language definition
 */
import { defineLang } from '../define-lang.js';

export const redis = defineLang({
  name: 'redis',
  aliases: ['redis-cli'],
  extensions: ['.redis'],
  keywords: [
    // String commands
    'APPEND', 'DECR', 'DECRBY', 'GET', 'GETDEL', 'GETEX', 'GETRANGE', 'GETSET',
    'INCR', 'INCRBY', 'INCRBYFLOAT', 'LCS', 'MGET', 'MSET', 'MSETNX', 'PSETEX',
    'SET', 'SETEX', 'SETNX', 'SETRANGE', 'STRLEN',
    // List commands
    'BLMOVE', 'BLMPOP', 'BLPOP', 'BRPOP', 'BRPOPLPUSH', 'LINDEX', 'LINSERT',
    'LLEN', 'LMOVE', 'LMPOP', 'LPOP', 'LPOS', 'LPUSH', 'LPUSHX', 'LRANGE',
    'LREM', 'LSET', 'LTRIM', 'RPOP', 'RPOPLPUSH', 'RPUSH', 'RPUSHX',
    // Set commands
    'SADD', 'SCARD', 'SDIFF', 'SDIFFSTORE', 'SINTER', 'SINTERCARD', 'SINTERSTORE',
    'SISMEMBER', 'SMEMBERS', 'SMISMEMBER', 'SMOVE', 'SPOP', 'SRANDMEMBER',
    'SREM', 'SSCAN', 'SUNION', 'SUNIONSTORE',
    // Hash commands
    'HDEL', 'HEXISTS', 'HGET', 'HGETALL', 'HINCRBY', 'HINCRBYFLOAT', 'HKEYS',
    'HLEN', 'HMGET', 'HMSET', 'HRANDFIELD', 'HSCAN', 'HSET', 'HSETNX',
    'HSTRLEN', 'HVALS',
    // Sorted set commands
    'BZMPOP', 'BZPOPMAX', 'BZPOPMIN', 'ZADD', 'ZCARD', 'ZCOUNT', 'ZDIFF',
    'ZDIFFSTORE', 'ZINCRBY', 'ZINTER', 'ZINTERCARD', 'ZINTERSTORE', 'ZLEXCOUNT',
    'ZMPOP', 'ZMSCORE', 'ZPOPMAX', 'ZPOPMIN', 'ZRANDMEMBER', 'ZRANGE',
    'ZRANGEBYLEX', 'ZRANGEBYSCORE', 'ZRANGESTORE', 'ZRANK', 'ZREM',
    'ZREMRANGEBYLEX', 'ZREMRANGEBYRANK', 'ZREMRANGEBYSCORE', 'ZREVRANGE',
    'ZREVRANGEBYLEX', 'ZREVRANGEBYSCORE', 'ZREVRANK', 'ZSCAN', 'ZSCORE',
    'ZUNION', 'ZUNIONSTORE',
    // Key commands
    'COPY', 'DEL', 'DUMP', 'EXISTS', 'EXPIRE', 'EXPIREAT', 'EXPIRETIME',
    'KEYS', 'MIGRATE', 'MOVE', 'OBJECT', 'PERSIST', 'PEXPIRE', 'PEXPIREAT',
    'PEXPIRETIME', 'PTTL', 'RANDOMKEY', 'RENAME', 'RENAMENX', 'RESTORE',
    'SCAN', 'SORT', 'SORT_RO', 'TOUCH', 'TTL', 'TYPE', 'UNLINK', 'WAIT', 'WAITAOF',
    // Stream commands
    'XACK', 'XADD', 'XAUTOCLAIM', 'XCLAIM', 'XDEL', 'XGROUP', 'XINFO', 'XLEN',
    'XPENDING', 'XRANGE', 'XREAD', 'XREADGROUP', 'XREVRANGE', 'XSETID', 'XTRIM',
    // Pub/Sub commands
    'PSUBSCRIBE', 'PUBLISH', 'PUBSUB', 'PUNSUBSCRIBE', 'SPUBLISH', 'SSUBSCRIBE',
    'SUBSCRIBE', 'SUNSUBSCRIBE', 'UNSUBSCRIBE',
    // Transaction commands
    'DISCARD', 'EXEC', 'MULTI', 'UNWATCH', 'WATCH',
    // Script commands
    'EVAL', 'EVALSHA', 'EVALSHA_RO', 'EVAL_RO', 'FCALL', 'FCALL_RO', 'FUNCTION',
    'SCRIPT',
    // Server commands
    'ACL', 'BGREWRITEAOF', 'BGSAVE', 'CLIENT', 'CLUSTER', 'COMMAND', 'CONFIG',
    'DBSIZE', 'DEBUG', 'FAILOVER', 'FLUSHALL', 'FLUSHDB', 'INFO', 'LASTSAVE',
    'LATENCY', 'LOLWUT', 'MEMORY', 'MODULE', 'MONITOR', 'PSYNC', 'REPLCONF',
    'REPLICAOF', 'RESET', 'ROLE', 'SAVE', 'SHUTDOWN', 'SLAVEOF', 'SLOWLOG',
    'SWAPDB', 'SYNC', 'TIME',
    // Connection commands
    'AUTH', 'CLIENT', 'ECHO', 'HELLO', 'PING', 'QUIT', 'SELECT',
    // Geo commands
    'GEOADD', 'GEODIST', 'GEOHASH', 'GEOPOS', 'GEORADIUS', 'GEORADIUSBYMEMBER',
    'GEOSEARCH', 'GEOSEARCHSTORE',
    // HyperLogLog commands
    'PFADD', 'PFCOUNT', 'PFDEBUG', 'PFMERGE', 'PFSELFTEST',
    // Bitmap commands
    'BITCOUNT', 'BITFIELD', 'BITFIELD_RO', 'BITOP', 'BITPOS', 'GETBIT', 'SETBIT',
  ],
  constants: [
    'OK', 'QUEUED', 'nil', 'true', 'false',
    'NX', 'XX', 'GT', 'LT', 'EX', 'PX', 'EXAT', 'PXAT', 'KEEPTTL', 'IFEXX', 'IFEXXX',
    'GET', 'ABSTTL', 'LIMIT', 'MATCH', 'COUNT', 'TYPE', 'ASC', 'DESC', 'ALPHA',
    'WITHSCORES', 'REV', 'BYLEX', 'BYSCORE', 'CH', 'INCR',
  ],
  patterns: [
    // Variables/keys
    { pattern: /[a-zA-Z_][a-zA-Z0-9_:.-]*/g, type: 'variable' },
    // Numbers
    { pattern: /[+-]?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[*?]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],
  comments: {
    line: '#',
  },
  brackets: [
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default redis;
