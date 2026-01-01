/**
 * Python language definition
 */

import { defineLang } from '../define-lang.js';

export const python = defineLang({
  name: 'python',
  aliases: ['py', 'python3'],
  extensions: ['.py', '.pyw', '.pyi'],
  mimeTypes: ['text/x-python', 'application/x-python'],

  keywords: [
    'False',
    'None',
    'True',
    'and',
    'as',
    'assert',
    'async',
    'await',
    'break',
    'class',
    'continue',
    'def',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'from',
    'global',
    'if',
    'import',
    'in',
    'is',
    'lambda',
    'nonlocal',
    'not',
    'or',
    'pass',
    'raise',
    'return',
    'try',
    'while',
    'with',
    'yield',
    'match',
    'case',
  ],

  typeKeywords: [
    'int',
    'float',
    'str',
    'bool',
    'list',
    'dict',
    'tuple',
    'set',
    'frozenset',
    'bytes',
    'bytearray',
    'complex',
    'type',
    'object',
  ],

  constants: ['True', 'False', 'None', 'NotImplemented', 'Ellipsis', '__debug__'],

  operators: /[+\-*/%@&|^~<>=!]+|\/\/|<<|>>|\*\*|:=|->|<>|\.\.\./,

  patterns: [
    // Decorators
    { pattern: /@[\w.]+/, type: 'meta' },

    // F-strings
    { pattern: /f"(?:[^"\\]|\\.)*"/, type: 'string' },
    { pattern: /f'(?:[^'\\]|\\.)*'/, type: 'string' },

    // Raw strings
    { pattern: /r"(?:[^"\\]|\\.)*"/, type: 'string' },
    { pattern: /r'(?:[^'\\]|\\.)*'/, type: 'string' },

    // Byte strings
    { pattern: /b"(?:[^"\\]|\\.)*"/, type: 'string' },
    { pattern: /b'(?:[^'\\]|\\.)*'/, type: 'string' },

    // Triple-quoted strings
    { pattern: /"""[\s\S]*?"""/, type: 'string' },
    { pattern: /'''[\s\S]*?'''/, type: 'string' },

    // Function definitions
    { pattern: /(?<=def\s+)\w+/, type: 'function' },

    // Class definitions
    { pattern: /(?<=class\s+)\w+/, type: 'class' },

    // Built-in functions
    { pattern: /\b(?:print|len|range|type|int|str|float|list|dict|set|tuple|bool|abs|all|any|bin|callable|chr|classmethod|compile|complex|delattr|dir|divmod|enumerate|eval|exec|filter|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|isinstance|issubclass|iter|len|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|repr|reversed|round|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip|__import__|ascii|breakpoint)\b(?=\s*\()/, type: 'function' },

    // Magic methods
    { pattern: /__\w+__/, type: 'meta' },

    // Self/cls
    { pattern: /\b(?:self|cls)\b/, type: 'variable' },

    // Numbers
    { pattern: /\b0[xX][\da-fA-F_]+\b/, type: 'number' },
    { pattern: /\b0[oO][0-7_]+\b/, type: 'number' },
    { pattern: /\b0[bB][01_]+\b/, type: 'number' },
    { pattern: /\b\d[\d_]*(?:\.[\d_]+)?(?:[eE][+-]?[\d_]+)?j?\b/, type: 'number' },

    // Property access
    { pattern: /(?<=\.)\w+/, type: 'property' },

    // Function call
    { pattern: /\b\w+(?=\s*\()/, type: 'function' },

    // Class name (PascalCase)
    { pattern: /\b[A-Z]\w*\b/, type: 'class' },
  ],

  strings: [
    { start: '"""', end: '"""', multiline: true },
    { start: "'''", end: "'''", multiline: true },
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],

  comments: {
    line: '#',
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default python;
