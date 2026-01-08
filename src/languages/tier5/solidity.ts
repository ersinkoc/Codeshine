/**
 * Solidity language definition
 */
import { defineLang } from '../define-lang.js';

export const solidity = defineLang({
  name: 'solidity',
  aliases: ['sol'],
  extensions: ['.sol'],
  keywords: [
    // Contract definitions
    'pragma', 'solidity', 'import', 'as', 'from',
    'contract', 'interface', 'library', 'is', 'abstract',
    'function', 'constructor', 'receive', 'fallback', 'modifier', 'event', 'error',
    'struct', 'enum', 'type', 'using', 'for',
    // Visibility
    'public', 'private', 'internal', 'external',
    // State mutability
    'pure', 'view', 'payable', 'nonpayable',
    // Storage
    'storage', 'memory', 'calldata', 'immutable', 'constant',
    // Control flow
    'if', 'else', 'for', 'while', 'do', 'break', 'continue', 'return',
    'try', 'catch', 'revert', 'require', 'assert',
    // Assembly
    'assembly', 'let', 'switch', 'case', 'default',
    // Inheritance
    'virtual', 'override',
    // Misc
    'new', 'delete', 'emit', 'indexed', 'anonymous',
    'unchecked',
  ],
  typeKeywords: [
    // Value types
    'bool', 'string', 'bytes', 'address', 'address payable',
    'int', 'int8', 'int16', 'int24', 'int32', 'int40', 'int48', 'int56', 'int64',
    'int72', 'int80', 'int88', 'int96', 'int104', 'int112', 'int120', 'int128',
    'int136', 'int144', 'int152', 'int160', 'int168', 'int176', 'int184', 'int192',
    'int200', 'int208', 'int216', 'int224', 'int232', 'int240', 'int248', 'int256',
    'uint', 'uint8', 'uint16', 'uint24', 'uint32', 'uint40', 'uint48', 'uint56', 'uint64',
    'uint72', 'uint80', 'uint88', 'uint96', 'uint104', 'uint112', 'uint120', 'uint128',
    'uint136', 'uint144', 'uint152', 'uint160', 'uint168', 'uint176', 'uint184', 'uint192',
    'uint200', 'uint208', 'uint216', 'uint224', 'uint232', 'uint240', 'uint248', 'uint256',
    'bytes1', 'bytes2', 'bytes3', 'bytes4', 'bytes5', 'bytes6', 'bytes7', 'bytes8',
    'bytes9', 'bytes10', 'bytes11', 'bytes12', 'bytes13', 'bytes14', 'bytes15', 'bytes16',
    'bytes17', 'bytes18', 'bytes19', 'bytes20', 'bytes21', 'bytes22', 'bytes23', 'bytes24',
    'bytes25', 'bytes26', 'bytes27', 'bytes28', 'bytes29', 'bytes30', 'bytes31', 'bytes32',
    // Reference types
    'mapping', 'array',
    // Fixed point (future)
    'fixed', 'ufixed',
  ],
  constants: [
    'true', 'false',
    'wei', 'gwei', 'ether',
    'seconds', 'minutes', 'hours', 'days', 'weeks',
  ],
  builtins: [
    // Global variables
    'msg', 'block', 'tx', 'abi', 'this', 'super',
    // Block properties
    'blockhash', 'gasleft',
    // Math
    'addmod', 'mulmod', 'keccak256', 'sha256', 'ripemd160', 'ecrecover',
    // ABI
    'encode', 'encodePacked', 'encodeWithSelector', 'encodeWithSignature', 'decode',
    // Address members
    'balance', 'code', 'codehash', 'transfer', 'send', 'call', 'delegatecall', 'staticcall',
    // Type conversions
    'type', 'min', 'max',
    // Error handling
    'selfdestruct',
  ],
  patterns: [
    // NatSpec comments
    { pattern: /\/\/\/.*$/gm, type: 'comment' },
    { pattern: /\/\*\*[\s\S]*?\*\//g, type: 'comment' },
    // Hex literals
    { pattern: /\bhex"[0-9a-fA-F_]*"/g, type: 'string' },
    { pattern: /\bhex'[0-9a-fA-F_]*'/g, type: 'string' },
    // Address literals
    { pattern: /\b0x[0-9a-fA-F]{40}\b/g, type: 'number' },
    // Numbers with units
    { pattern: /\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\s*(?:wei|gwei|ether|seconds?|minutes?|hours?|days?|weeks?)\b/gi, type: 'number' },
    // Numbers
    { pattern: /\b0[xX][0-9a-fA-F_]+\b/g, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?\d+)?\b/g, type: 'number' },
    // Function visibility after returns
    { pattern: /\breturns\s*\([^)]*\)/g, type: 'type' },
    // Event/error definitions
    { pattern: /\b(event|error)\s+([A-Z][a-zA-Z0-9_]*)/g, type: 'keyword', captures: [null, 'keyword', 'class'] },
    // Contract definitions
    { pattern: /\b(contract|interface|library)\s+([A-Z][a-zA-Z0-9_]*)/g, type: 'keyword', captures: [null, 'keyword', 'class'] },
    // Operators
    { pattern: /[+\-*\/%&|^!<>=]=?|&&|\|\||<<|>>|\*\*|=>|\?\./g, type: 'operator' },
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
  ],
});

export default solidity;
