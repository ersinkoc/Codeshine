/**
 * Protocol Buffers (protobuf) language definition
 */
import { defineLang } from '../define-lang.js';

export const protobuf = defineLang({
  name: 'protobuf',
  aliases: ['proto', 'proto3', 'proto2'],
  extensions: ['.proto'],
  keywords: [
    'syntax', 'package', 'import', 'public', 'weak', 'option',
    'message', 'enum', 'service', 'rpc', 'stream', 'returns',
    'oneof', 'map', 'extensions', 'extend', 'reserved', 'to', 'max',
    'repeated', 'optional', 'required', 'group',
  ],
  typeKeywords: [
    // Scalar types
    'double', 'float', 'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64',
    'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'bool', 'string', 'bytes',
    // Well-known types
    'Any', 'Api', 'BoolValue', 'BytesValue', 'DoubleValue', 'Duration', 'Empty',
    'Enum', 'EnumValue', 'Field', 'FieldMask', 'FloatValue', 'Int32Value', 'Int64Value',
    'ListValue', 'Method', 'Mixin', 'NullValue', 'Option', 'SourceContext', 'StringValue',
    'Struct', 'Timestamp', 'Type', 'UInt32Value', 'UInt64Value', 'Value',
    // Google types
    'google.protobuf', 'google.api', 'google.rpc',
  ],
  constants: [
    'true', 'false', 'inf', 'nan',
  ],
  builtins: [
    // Common options
    'java_package', 'java_outer_classname', 'java_multiple_files', 'java_generate_equals_and_hash',
    'java_string_check_utf8', 'optimize_for', 'go_package', 'cc_generic_services',
    'java_generic_services', 'py_generic_services', 'php_generic_services', 'deprecated',
    'cc_enable_arenas', 'objc_class_prefix', 'csharp_namespace', 'swift_prefix',
    'php_class_prefix', 'php_namespace', 'php_metadata_namespace', 'ruby_package',
    // Enum options
    'allow_alias',
    // Field options
    'ctype', 'packed', 'jstype', 'lazy', 'unverified_lazy', 'weak',
    // Values
    'SPEED', 'CODE_SIZE', 'LITE_RUNTIME', 'STRING', 'CORD', 'STRING_PIECE',
    'JS_NORMAL', 'JS_STRING', 'JS_NUMBER',
  ],
  patterns: [
    // Message/enum type references
    { pattern: /\b[A-Z][a-zA-Z0-9_]*(?:\.[A-Z][a-zA-Z0-9_]*)*/g, type: 'type' },
    // Package names
    { pattern: /(?<=package\s+)[a-z][a-z0-9_]*(?:\.[a-z][a-z0-9_]*)*/g, type: 'variable' },
    // Field numbers
    { pattern: /=\s*\d+/g, type: 'number' },
    // Default values
    { pattern: /(?<=default\s*=\s*)[^\];\s]+/g, type: 'constant' },
    // Import paths
    { pattern: /(?<=import\s+(?:public|weak)?\s*)"[^"]+"/g, type: 'string' },
    // Hexadecimal
    { pattern: /\b0[xX][0-9a-fA-F]+\b/g, type: 'number' },
    // Float numbers
    { pattern: /[+-]?\b\d+\.\d*(?:[eE][+-]?\d+)?/g, type: 'number' },
    // Integer numbers
    { pattern: /[+-]?\b\d+\b/g, type: 'number' },
    // Operators
    { pattern: /[=\[\];{}]/g, type: 'punctuation' },
  ],
  strings: [
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
    { open: '<', close: '>' },
  ],
});

export default protobuf;
