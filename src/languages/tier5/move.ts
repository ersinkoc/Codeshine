/**
 * Move language definition (Sui/Aptos blockchain)
 */
import { defineLang } from '../define-lang.js';

export const move = defineLang({
  name: 'move',
  aliases: ['sui-move', 'aptos-move'],
  extensions: ['.move'],
  keywords: [
    // Module structure
    'module', 'script', 'address', 'use', 'as', 'friend', 'public', 'entry',
    // Definitions
    'struct', 'resource', 'fun', 'const', 'let', 'mut',
    // Control flow
    'if', 'else', 'while', 'loop', 'return', 'abort', 'break', 'continue',
    // Modifiers
    'native', 'acquires', 'has', 'copy', 'drop', 'store', 'key',
    // Other
    'move', 'spec', 'schema', 'invariant', 'ensures', 'requires', 'aborts_if',
    'modifies', 'emits', 'apply', 'pragma', 'include', 'assume', 'assert',
  ],
  typeKeywords: [
    // Primitive types
    'u8', 'u16', 'u32', 'u64', 'u128', 'u256', 'bool', 'address', 'signer', 'vector',
    // Type keywords
    'Self', 'phantom',
  ],
  constants: [
    'true', 'false',
  ],
  builtins: [
    // Vector operations
    'empty', 'length', 'borrow', 'push_back', 'pop_back', 'destroy_empty',
    'swap', 'singleton', 'reverse', 'append', 'is_empty', 'contains',
    'index_of', 'remove', 'swap_remove', 'borrow_mut',
    // Sui specific
    'transfer', 'share_object', 'freeze_object', 'public_transfer',
    'public_share_object', 'public_freeze_object',
    'tx_context', 'sender', 'fresh_object_address',
    // Common stdlib
    'assert', 'borrow_global', 'borrow_global_mut', 'move_from', 'move_to',
    'exists', 'freeze', 'emit',
  ],
  patterns: [
    // Address literals
    { pattern: /@0x[0-9a-fA-F]+/g, type: 'constant' },
    { pattern: /@[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'constant' },
    // Abilities
    { pattern: /\b(?:copy|drop|store|key)\b/g, type: 'type' },
    // Generic parameters
    { pattern: /<[^>]+>/g, type: 'type' },
    // Hexadecimal numbers
    { pattern: /\b0x[0-9a-fA-F_]+\b/g, type: 'number' },
    // Numbers
    { pattern: /\b\d[0-9_]*(?:u8|u16|u32|u64|u128|u256)?\b/g, type: 'number' },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=]+|::|&&|\|\||=>|<=/g, type: 'operator' },
  ],
  strings: [
    { start: 'b"', end: '"', escape: '\\' },
    { start: 'x"', end: '"', escape: '\\' },
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
    { open: '<', close: '>' },
  ],
});

export default move;
