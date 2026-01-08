/**
 * Groovy language definition
 */
import { defineLang } from '../define-lang.js';

export const groovy = defineLang({
  name: 'groovy',
  aliases: ['gvy', 'gy', 'gsh'],
  extensions: ['.groovy', '.gvy', '.gy', '.gsh', '.gradle'],
  keywords: [
    'abstract', 'as', 'assert', 'break', 'case', 'catch', 'class', 'const',
    'continue', 'def', 'default', 'do', 'else', 'enum', 'extends', 'final',
    'finally', 'for', 'goto', 'if', 'implements', 'import', 'in', 'instanceof',
    'interface', 'native', 'new', 'null', 'package', 'private', 'protected',
    'public', 'return', 'static', 'strictfp', 'super', 'switch', 'synchronized',
    'this', 'throw', 'throws', 'trait', 'transient', 'try', 'var', 'volatile',
    'while', 'with',
  ],
  typeKeywords: [
    'boolean', 'byte', 'char', 'double', 'float', 'int', 'long', 'short', 'void',
    'Boolean', 'Byte', 'Character', 'Double', 'Float', 'Integer', 'Long', 'Short', 'Void',
    'String', 'Object', 'Class', 'List', 'Map', 'Set', 'Collection', 'Closure',
    'BigDecimal', 'BigInteger', 'Date', 'File', 'Pattern', 'Matcher',
    'GString', 'Range', 'Tuple', 'GroovyObject', 'MetaClass',
  ],
  constants: [
    'true', 'false', 'null', 'it',
  ],
  builtins: [
    // Object methods
    'print', 'println', 'printf', 'sprintf',
    'each', 'eachWithIndex', 'collect', 'collectEntries', 'collectMany',
    'find', 'findAll', 'findResult', 'findResults', 'findIndexOf', 'findLastIndexOf', 'findIndexValues',
    'grep', 'any', 'every', 'count', 'countBy', 'groupBy', 'unique', 'sort', 'reverse',
    'first', 'last', 'head', 'tail', 'init', 'take', 'takeWhile', 'drop', 'dropWhile',
    'inject', 'sum', 'min', 'max', 'flatten', 'intersect', 'disjoint', 'plus', 'minus',
    'multiply', 'tokenize', 'split', 'join', 'with', 'tap', 'identity',
    'getClass', 'getMetaClass', 'setMetaClass', 'invokeMethod', 'getProperty', 'setProperty',
    // String methods
    'capitalize', 'uncapitalize', 'center', 'padLeft', 'padRight', 'contains', 'count',
    'denormalize', 'eachLine', 'eachMatch', 'expand', 'expandLine', 'find', 'findAll',
    'getAt', 'leftShift', 'matches', 'minus', 'multiply', 'next', 'normalize',
    'padLeft', 'padRight', 'plus', 'previous', 'readLines', 'replaceAll', 'replaceFirst',
    'reverse', 'size', 'split', 'splitEachLine', 'stripIndent', 'stripMargin',
    'toBoolean', 'toBigDecimal', 'toBigInteger', 'toDouble', 'toFloat', 'toInteger', 'toLong', 'toList',
    'toLowerCase', 'toUpperCase', 'trim', 'tokenize',
    // File/IO
    'getText', 'setText', 'readLines', 'eachLine', 'eachFile', 'eachFileRecurse',
    'withInputStream', 'withOutputStream', 'withReader', 'withWriter',
    'newInputStream', 'newOutputStream', 'newReader', 'newWriter',
    // Assert
    'assert',
  ],
  patterns: [
    // Annotations
    { pattern: /@[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*/g, type: 'decorator' },
    // GString interpolation
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    { pattern: /\$[a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)*/g, type: 'variable' },
    // Regex
    { pattern: /~\/(?:[^\/\\]|\\.)*\/[gimsux]*/g, type: 'regexp' },
    { pattern: /\/(?:[^\/\\]|\\.)+\/[gimsux]*/g, type: 'regexp' },
    // Slashy strings
    { pattern: /\/[^\/\n]+\//g, type: 'string' },
    // Closures
    { pattern: /\{[\s]*->/g, type: 'keyword' },
    // Safe navigation & spread
    { pattern: /\?\.|\.&|\*\.|\.@|\.\*/g, type: 'operator' },
    // Elvis operator
    { pattern: /\?:/g, type: 'operator' },
    // Spaceship operator
    { pattern: /<=>/g, type: 'operator' },
    // Range operators
    { pattern: /\.\.<|\.\./g, type: 'operator' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+[gGlLiIdDfF]?\b/g, type: 'number' },
    { pattern: /\b0[bB][01_]+[gGlLiIdDfF]?\b/g, type: 'number' },
    { pattern: /\b0[0-7_]+[gGlLiIdDfF]?\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.\d[\d_]*)?(?:[eE][+-]?\d+)?[gGlLiIdDfF]?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=]=?|&&|\|\||<<|>>|>>>|~|\+\+|--|\*\*/g, type: 'operator' },
  ],
  strings: [
    { start: '"""', end: '"""', escape: '\\' },
    { start: "'''", end: "'''", escape: '\\' },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
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

export default groovy;
