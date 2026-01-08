/**
 * HCL (HashiCorp Configuration Language) definition
 */
import { defineLang } from '../define-lang.js';

export const hcl = defineLang({
  name: 'hcl',
  aliases: ['hashicorp'],
  extensions: ['.hcl'],
  keywords: [
    'for', 'in', 'if', 'else', 'endif', 'endfor', 'true', 'false', 'null',
  ],
  builtins: [
    // Numeric functions
    'abs', 'ceil', 'floor', 'log', 'max', 'min', 'parseint', 'pow', 'signum',
    // String functions
    'chomp', 'format', 'formatlist', 'indent', 'join', 'lower', 'regex',
    'regexall', 'replace', 'split', 'strrev', 'substr', 'title', 'trim',
    'trimprefix', 'trimsuffix', 'trimspace', 'upper',
    // Collection functions
    'alltrue', 'anytrue', 'chunklist', 'coalesce', 'coalescelist', 'compact',
    'concat', 'contains', 'distinct', 'element', 'flatten', 'index', 'keys',
    'length', 'list', 'lookup', 'map', 'matchkeys', 'merge', 'one', 'range',
    'reverse', 'setintersection', 'setproduct', 'setsubtract', 'setunion',
    'slice', 'sort', 'sum', 'transpose', 'values', 'zipmap',
    // Encoding functions
    'base64decode', 'base64encode', 'base64gzip', 'csvdecode', 'jsondecode',
    'jsonencode', 'textdecodebase64', 'textencodebase64', 'urlencode', 'yamldecode', 'yamlencode',
    // Filesystem functions
    'abspath', 'dirname', 'pathexpand', 'basename', 'file', 'fileexists',
    'fileset', 'filebase64', 'templatefile',
    // Date/time functions
    'formatdate', 'timeadd', 'timestamp', 'plantimestamp',
    // Hash/crypto functions
    'base64sha256', 'base64sha512', 'bcrypt', 'filebase64sha256', 'filebase64sha512',
    'filemd5', 'filesha1', 'filesha256', 'filesha512', 'md5', 'rsadecrypt',
    'sha1', 'sha256', 'sha512', 'uuid', 'uuidv5',
    // IP network functions
    'cidrhost', 'cidrnetmask', 'cidrsubnet', 'cidrsubnets',
    // Type conversion functions
    'can', 'defaults', 'nonsensitive', 'sensitive', 'tobool', 'tolist', 'tomap',
    'tonumber', 'toset', 'tostring', 'try', 'type',
  ],
  patterns: [
    // Block types
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_-]*\s*(?=\{)/g, type: 'keyword' },
    // References
    { pattern: /\b(?:var|local|data|module|path|terraform|each|count|self)\b/g, type: 'keyword' },
    // Attribute names
    { pattern: /\b[a-zA-Z_][a-zA-Z0-9_-]*\s*(?==)/g, type: 'property' },
    // Interpolation
    { pattern: /\$\{[^}]+\}/g, type: 'interpolation' },
    { pattern: /%\{[^}]+\}/g, type: 'interpolation' },
    // Numbers
    { pattern: /\b0x[0-9a-fA-F]+\b/g, type: 'number' },
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%<>=!&|]+|\.\.\.|\?\?/g, type: 'operator' },
  ],
  strings: [
    { start: '<<-', end: /\n[A-Z]+$/, escape: '\\' },
    { start: '<<', end: /\n[A-Z]+$/, escape: '\\' },
    { start: '"', end: '"', escape: '\\', interpolation: { start: '${', end: '}' } },
  ],
  comments: {
    line: '#',
    block: { start: '/*', end: '*/' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default hcl;
