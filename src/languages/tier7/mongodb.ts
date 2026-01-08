/**
 * MongoDB query language definition
 */
import { defineLang } from '../define-lang.js';

export const mongodb = defineLang({
  name: 'mongodb',
  aliases: ['mongo', 'mongosh'],
  extensions: ['.mongodb', '.mongo'],
  keywords: [
    // CRUD operations
    'find', 'findOne', 'findOneAndUpdate', 'findOneAndDelete', 'findOneAndReplace',
    'insertOne', 'insertMany', 'updateOne', 'updateMany', 'deleteOne', 'deleteMany',
    'replaceOne', 'bulkWrite', 'save', 'remove', 'drop',
    // Aggregation
    'aggregate', 'count', 'countDocuments', 'estimatedDocumentCount', 'distinct',
    // Index operations
    'createIndex', 'createIndexes', 'dropIndex', 'dropIndexes', 'getIndexes', 'reIndex',
    // Collection operations
    'createCollection', 'renameCollection', 'stats', 'validate', 'compact',
    // Database operations
    'use', 'show', 'db', 'help', 'exit', 'quit',
  ],
  constants: [
    'true', 'false', 'null', 'undefined', 'NaN', 'Infinity',
    'ObjectId', 'ISODate', 'Timestamp', 'NumberLong', 'NumberInt', 'NumberDecimal',
    'BinData', 'UUID', 'MinKey', 'MaxKey', 'DBRef', 'Code', 'Symbol', 'Regex',
  ],
  builtins: [
    // Query operators
    '$eq', '$ne', '$gt', '$gte', '$lt', '$lte', '$in', '$nin',
    '$and', '$or', '$not', '$nor', '$exists', '$type', '$mod', '$regex', '$text',
    '$where', '$all', '$elemMatch', '$size', '$bitsAllClear', '$bitsAllSet',
    '$bitsAnyClear', '$bitsAnySet', '$geoIntersects', '$geoWithin', '$near',
    '$nearSphere', '$expr', '$jsonSchema', '$comment',
    // Update operators
    '$set', '$unset', '$inc', '$mul', '$rename', '$min', '$max', '$currentDate',
    '$addToSet', '$pop', '$pull', '$push', '$pullAll', '$each', '$position',
    '$slice', '$sort', '$bit', '$setOnInsert',
    // Aggregation stages
    '$match', '$group', '$project', '$sort', '$limit', '$skip', '$unwind',
    '$lookup', '$graphLookup', '$facet', '$bucket', '$bucketAuto', '$sortByCount',
    '$addFields', '$replaceRoot', '$replaceWith', '$redact', '$sample', '$count',
    '$merge', '$out', '$unionWith', '$setWindowFields', '$densify', '$fill',
    // Aggregation expressions
    '$sum', '$avg', '$first', '$last', '$max', '$min', '$push', '$addToSet',
    '$stdDevPop', '$stdDevSamp', '$accumulator', '$mergeObjects', '$top', '$bottom',
    '$topN', '$bottomN', '$firstN', '$lastN', '$maxN', '$minN',
    '$concat', '$substr', '$substrBytes', '$substrCP', '$toLower', '$toUpper',
    '$strcasecmp', '$trim', '$ltrim', '$rtrim', '$split', '$strLenBytes', '$strLenCP',
    '$indexOfBytes', '$indexOfCP', '$regexFind', '$regexFindAll', '$regexMatch',
    '$dateToString', '$dateFromString', '$dateToParts', '$dateFromParts',
    '$year', '$month', '$dayOfMonth', '$dayOfWeek', '$dayOfYear', '$hour',
    '$minute', '$second', '$millisecond', '$week', '$isoWeek', '$isoWeekYear',
    '$add', '$subtract', '$multiply', '$divide', '$mod', '$abs', '$ceil', '$floor',
    '$ln', '$log', '$log10', '$pow', '$sqrt', '$trunc', '$exp', '$round',
    '$cond', '$ifNull', '$switch', '$arrayElemAt', '$arrayToObject', '$objectToArray',
    '$concatArrays', '$filter', '$isArray', '$map', '$range', '$reduce', '$reverseArray',
    '$zip', '$setEquals', '$setIntersection', '$setUnion', '$setDifference',
    '$setIsSubset', '$anyElementTrue', '$allElementsTrue', '$literal', '$meta',
    '$type', '$convert', '$toBool', '$toDate', '$toDecimal', '$toDouble', '$toInt',
    '$toLong', '$toObjectId', '$toString', '$isNumber', '$rand', '$sampleRate',
  ],
  patterns: [
    // ObjectId
    { pattern: /ObjectId\s*\(\s*["'][0-9a-fA-F]{24}["']\s*\)/g, type: 'constant' },
    // ISODate
    { pattern: /ISODate\s*\([^)]*\)/g, type: 'constant' },
    // Field references
    { pattern: /\$[a-zA-Z_][a-zA-Z0-9_.]*/g, type: 'variable' },
    // Property access
    { pattern: /\.[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'property' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|]+/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default mongodb;
