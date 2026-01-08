/**
 * Terraform/HCL language definition
 */
import { defineLang } from '../define-lang.js';

export const terraform = defineLang({
  name: 'terraform',
  aliases: ['hcl', 'tf'],
  extensions: ['.tf', '.tfvars', '.hcl'],
  keywords: [
    // Block types
    'terraform', 'provider', 'resource', 'data', 'variable', 'output', 'locals',
    'module', 'moved', 'import', 'removed', 'check',
    // Meta-arguments
    'count', 'for_each', 'depends_on', 'provider', 'lifecycle', 'provisioner',
    'connection',
    // Lifecycle
    'create_before_destroy', 'prevent_destroy', 'ignore_changes', 'replace_triggered_by',
    'precondition', 'postcondition',
    // Provisioners
    'local-exec', 'remote-exec', 'file',
    // Conditions
    'if', 'else', 'endif',
  ],
  typeKeywords: [
    'string', 'number', 'bool', 'list', 'set', 'map', 'object', 'tuple', 'any',
    'null', 'true', 'false',
  ],
  builtins: [
    // Numeric functions
    'abs', 'ceil', 'floor', 'log', 'max', 'min', 'parseint', 'pow', 'signum',
    // String functions
    'chomp', 'format', 'formatlist', 'indent', 'join', 'lower', 'regex', 'regexall',
    'replace', 'split', 'strrev', 'substr', 'title', 'trim', 'trimprefix', 'trimsuffix',
    'trimspace', 'upper', 'startswith', 'endswith', 'strcontains',
    // Collection functions
    'alltrue', 'anytrue', 'chunklist', 'coalesce', 'coalescelist', 'compact', 'concat',
    'contains', 'distinct', 'element', 'flatten', 'index', 'keys', 'length', 'list',
    'lookup', 'map', 'matchkeys', 'merge', 'one', 'range', 'reverse', 'setintersection',
    'setproduct', 'setsubtract', 'setunion', 'slice', 'sort', 'sum', 'transpose',
    'values', 'zipmap',
    // Encoding functions
    'base64decode', 'base64encode', 'base64gzip', 'csvdecode', 'jsondecode', 'jsonencode',
    'textdecodebase64', 'textencodebase64', 'urlencode', 'yamldecode', 'yamlencode',
    // Filesystem functions
    'abspath', 'dirname', 'pathexpand', 'basename', 'file', 'fileexists', 'fileset',
    'filebase64', 'templatefile', 'filemd5', 'filesha1', 'filesha256', 'filesha512',
    // Date and time
    'formatdate', 'plantimestamp', 'timeadd', 'timecmp', 'timestamp',
    // Hash and crypto
    'base64sha256', 'base64sha512', 'bcrypt', 'md5', 'rsadecrypt', 'sha1', 'sha256',
    'sha512', 'uuid', 'uuidv5',
    // IP network functions
    'cidrhost', 'cidrnetmask', 'cidrsubnet', 'cidrsubnets',
    // Type conversion
    'can', 'issensitive', 'nonsensitive', 'sensitive', 'tobool', 'tolist', 'tomap',
    'tonumber', 'toset', 'tostring', 'try', 'type',
    // Special
    'templatefile', 'templatestring', 'provider', 'self', 'each', 'count', 'path',
    'terraform', 'var', 'local', 'module', 'data',
  ],
  patterns: [
    // Block types
    { pattern: /\b(resource|data|provider|module|variable|output|locals|terraform)\s+"([^"]+)"\s+"?([^"{\s]+)"?/g, type: 'keyword' },
    // Attribute access
    { pattern: /\b(var|local|module|data|each|count|self|path|terraform)\.[a-zA-Z_][\w.]*/g, type: 'variable' },
    // Interpolation
    { pattern: /\$\{[^}]+\}/g, type: 'variable' },
    // For expressions
    { pattern: /\bfor\s+\w+(?:\s*,\s*\w+)?\s+in\b/g, type: 'keyword' },
    // Splat
    { pattern: /\[\*\]/g, type: 'operator' },
    { pattern: /\.\*/g, type: 'operator' },
    // Numbers
    { pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Heredoc
    { pattern: /<<-?(\w+)[\s\S]*?\n\1/g, type: 'string' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=]=?|&&|\|\||=>/g, type: 'operator' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
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

export default terraform;
