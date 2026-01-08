/**
 * Prisma schema language definition
 */
import { defineLang } from '../define-lang.js';

export const prisma = defineLang({
  name: 'prisma',
  aliases: [],
  extensions: ['.prisma'],
  keywords: [
    'datasource', 'generator', 'model', 'enum', 'type', 'view',
  ],
  typeKeywords: [
    // Scalar types
    'String', 'Boolean', 'Int', 'BigInt', 'Float', 'Decimal', 'DateTime', 'Json', 'Bytes',
    // Unsupported type
    'Unsupported',
  ],
  constants: [
    'true', 'false', 'null',
  ],
  builtins: [
    // Attributes
    '@id', '@unique', '@default', '@relation', '@map', '@updatedAt', '@ignore', '@db',
    '@@id', '@@unique', '@@index', '@@map', '@@ignore', '@@fulltext', '@@schema',
    // Functions
    'autoincrement', 'cuid', 'uuid', 'now', 'dbgenerated', 'env',
    // Database specific
    'postgresql', 'mysql', 'sqlite', 'sqlserver', 'mongodb', 'cockroachdb',
    // Relation actions
    'Cascade', 'Restrict', 'NoAction', 'SetNull', 'SetDefault',
    // Index types
    'Hash', 'BTree', 'Gist', 'SpGist', 'Gin', 'Brin',
  ],
  patterns: [
    // Attributes
    { pattern: /@@?[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'decorator' },
    // Type modifiers (optional, array)
    { pattern: /\[\]|\?/g, type: 'operator' },
    // Field names
    { pattern: /^\s*[a-z_][a-zA-Z0-9_]*/gm, type: 'property' },
    // Model/enum names
    { pattern: /(?<=(?:model|enum|type|view)\s+)[A-Z][a-zA-Z0-9_]*/g, type: 'class' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[=:]/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '(', close: ')' },
    { open: '[', close: ']' },
  ],
});

export default prisma;
