/**
 * Tests for tokenizer
 */

import { describe, it, expect } from 'vitest';
import { tokenize, tokenizeLine, getTokensByLine } from '../../src/core/tokenizer.js';
import { javascript } from '../../src/languages/tier1/javascript.js';

describe('tokenize', () => {
  it('should tokenize JavaScript code', () => {
    const code = 'const x = 42;';
    const tokens = tokenize(code, javascript);

    expect(tokens.length).toBeGreaterThan(0);
    expect(tokens.some(t => t.type === 'keyword' && t.value === 'const')).toBe(true);
    expect(tokens.some(t => t.type === 'number' && t.value === '42')).toBe(true);
  });

  it('should handle strings', () => {
    const code = 'const s = "hello";';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'string' && t.value.includes('hello'))).toBe(true);
  });

  it('should handle template literals', () => {
    const code = 'const s = `hello ${name}`;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'string' || t.type === 'interpolation')).toBe(true);
  });

  it('should handle comments', () => {
    const code = '// this is a comment\nconst x = 1;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'comment')).toBe(true);
  });

  it('should handle block comments', () => {
    const code = '/* block\ncomment */\nconst x = 1;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'comment')).toBe(true);
  });

  it('should handle multi-line strings', () => {
    const code = 'const s = `line1\nline2`;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'string')).toBe(true);
  });

  it('should handle functions', () => {
    const code = 'function foo() {}';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'keyword' && t.value === 'function')).toBe(true);
    expect(tokens.some(t => t.type === 'function' && t.value === 'foo')).toBe(true);
  });

  it('should handle classes', () => {
    const code = 'class MyClass {}';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'keyword' && t.value === 'class')).toBe(true);
    expect(tokens.some(t => t.type === 'class' && t.value === 'MyClass')).toBe(true);
  });

  it('should handle regex', () => {
    const code = 'const re = /test/gi;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'regexp')).toBe(true);
  });

  it('should handle numbers', () => {
    const code = 'const n = 0xFF;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'number' && t.value === '0xFF')).toBe(true);
  });

  it('should track line numbers', () => {
    const code = 'const a = 1;\nconst b = 2;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.line === 1)).toBe(true);
    expect(tokens.some(t => t.line === 2)).toBe(true);
  });

  it('should track positions', () => {
    const code = 'const x = 1;';
    const tokens = tokenize(code, javascript);

    for (const token of tokens) {
      expect(token.start).toBeGreaterThanOrEqual(0);
      expect(token.end).toBeGreaterThan(token.start);
    }
  });
});

describe('tokenizeLine', () => {
  it('should tokenize a single line', () => {
    const result = tokenizeLine('const x = 1;', 1, javascript);

    expect(result.tokens.length).toBeGreaterThan(0);
    expect(result.state).toBeDefined();
  });

  it('should continue state across lines', () => {
    const result1 = tokenizeLine('const s = "hello', 1, javascript);
    // Multi-line string state should be preserved
    expect(result1.state).toBeDefined();
  });
});

describe('getTokensByLine', () => {
  it('should group tokens by line', () => {
    const code = 'const a = 1;\nconst b = 2;';
    const tokens = tokenize(code, javascript);
    const byLine = getTokensByLine(tokens);

    expect(byLine.has(1)).toBe(true);
    expect(byLine.has(2)).toBe(true);
  });
});

describe('tokenizer edge cases', () => {
  it('should handle block comment spanning multiple lines', () => {
    const code = '/* start\nmiddle\nend */\nconst x = 1;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'comment')).toBe(true);
    expect(tokens.some(t => t.type === 'keyword' && t.value === 'const')).toBe(true);
  });

  it('should handle block comment that does not end on same line', () => {
    const result = tokenizeLine('/* comment start', 1, javascript);

    expect(result.tokens.some(t => t.type === 'comment')).toBe(true);
    expect(result.state.inComment).toBe(true);
    expect(result.state.commentType).toBe('block');
  });

  it('should continue block comment on next line', () => {
    const result1 = tokenizeLine('/* comment', 1, javascript);
    const result2 = tokenizeLine('still comment */', 2, javascript, result1.state);

    expect(result2.tokens.some(t => t.type === 'comment')).toBe(true);
    expect(result2.state.inComment).toBe(false);
  });

  it('should handle block comment continuing without end', () => {
    const result1 = tokenizeLine('/* comment', 1, javascript);
    const result2 = tokenizeLine('still comment', 2, javascript, result1.state);

    expect(result2.tokens.some(t => t.type === 'comment')).toBe(true);
    expect(result2.state.inComment).toBe(true);
  });

  it('should handle operators as array', () => {
    const langWithArrayOps = {
      name: 'test-lang',
      patterns: [],
      operators: ['+', '-', '===', '!=='],
    };
    const tokens = tokenize('a + b === c', langWithArrayOps);

    expect(tokens.some(t => t.type === 'operator' && t.value === '+')).toBe(true);
    expect(tokens.some(t => t.type === 'operator' && t.value === '===')).toBe(true);
  });

  it('should handle operators as regex', () => {
    const tokens = tokenize('x + y - z', javascript);

    expect(tokens.some(t => t.type === 'operator')).toBe(true);
  });

  it('should handle type keywords', () => {
    const langWithTypes = {
      name: 'test-type-lang',
      patterns: [],
      typeKeywords: ['int', 'string', 'boolean'],
    };
    const tokens = tokenize('int x', langWithTypes);

    expect(tokens.some(t => t.type === 'type' && t.value === 'int')).toBe(true);
  });

  it('should handle constants', () => {
    const langWithConsts = {
      name: 'test-const-lang',
      patterns: [],
      constants: ['TRUE', 'FALSE', 'NULL'],
    };
    const tokens = tokenize('TRUE', langWithConsts);

    expect(tokens.some(t => t.type === 'constant' && t.value === 'TRUE')).toBe(true);
  });

  it('should handle binary numbers', () => {
    const tokens = tokenize('const b = 0b1010;', javascript);

    expect(tokens.some(t => t.type === 'number' && t.value === '0b1010')).toBe(true);
  });

  it('should handle octal numbers', () => {
    const tokens = tokenize('const o = 0o755;', javascript);

    expect(tokens.some(t => t.type === 'number' && t.value === '0o755')).toBe(true);
  });

  it('should handle scientific notation', () => {
    const tokens = tokenize('const e = 1.5e10;', javascript);

    expect(tokens.some(t => t.type === 'number' && t.value === '1.5e10')).toBe(true);
  });

  it('should handle escaped characters in strings', () => {
    const tokens = tokenize('const s = "hello\\nworld";', javascript);

    expect(tokens.some(t => t.type === 'string')).toBe(true);
  });

  it('should handle string with regex end pattern', () => {
    const langWithRegexEnd = {
      name: 'regex-end-lang',
      patterns: [],
      strings: [
        {
          start: "'",
          end: /'/,
          escape: '\\',
        },
      ],
    };
    const tokens = tokenize("const s = 'test';", langWithRegexEnd);

    expect(tokens.some(t => t.type === 'string')).toBe(true);
  });

  it('should handle string with regex start pattern', () => {
    const langWithRegexStart = {
      name: 'regex-start-lang',
      patterns: [],
      strings: [
        {
          start: /r"/,
          end: '"',
          escape: '\\',
        },
      ],
    };
    const tokens = tokenize('r"test"', langWithRegexStart);

    expect(tokens.some(t => t.type === 'string')).toBe(true);
  });

  it('should handle multi-line string continuation', () => {
    const langWithMultiline = {
      name: 'multiline-lang',
      patterns: [],
      strings: [
        {
          start: '"""',
          end: '"""',
          multiline: true,
        },
      ],
    };

    const result1 = tokenizeLine('"""start', 1, langWithMultiline);
    expect(result1.state.inString).toBe(true);

    const result2 = tokenizeLine('middle', 2, langWithMultiline, result1.state);
    expect(result2.state.inString).toBe(true);

    const result3 = tokenizeLine('end"""', 3, langWithMultiline, result2.state);
    expect(result3.state.inString).toBe(false);
  });

  it('should handle string without closing', () => {
    const tokens = tokenize('const s = "unclosed', javascript);

    expect(tokens.some(t => t.type === 'string')).toBe(true);
  });

  it('should handle empty line', () => {
    const result = tokenizeLine('', 1, javascript);

    expect(result.tokens.length).toBe(0);
  });

  it('should handle whitespace-only line', () => {
    const result = tokenizeLine('   ', 1, javascript);

    expect(result.tokens.length).toBe(1);
    expect(result.tokens[0].type).toBe('plain');
  });

  it('should handle mixed tabs and spaces', () => {
    const result = tokenizeLine('\t  \t const', 1, javascript);

    expect(result.tokens.length).toBeGreaterThan(0);
  });

  it('should handle unknown characters as plain', () => {
    const tokens = tokenize('const x = @;', javascript);

    expect(tokens.some(t => t.value === '@')).toBe(true);
  });

  it('should handle variables starting with uppercase as class', () => {
    const tokens = tokenize('MyClass.method()', javascript);

    expect(tokens.some(t => t.type === 'class' && t.value === 'MyClass')).toBe(true);
  });

  it('should handle function calls', () => {
    const tokens = tokenize('myFunc()', javascript);

    expect(tokens.some(t => t.type === 'function' && t.value === 'myFunc')).toBe(true);
  });

  it('should handle custom pattern scopes', () => {
    const langWithScopes = {
      name: 'scoped-lang',
      patterns: [
        {
          pattern: /SCOPED/,
          type: 'keyword' as const,
          scopes: ['meta.keyword'],
        },
      ],
    };
    const tokens = tokenize('SCOPED', langWithScopes);

    expect(tokens.some(t => t.scopes?.includes('meta.keyword'))).toBe(true);
  });

  it('should handle interpolation in template strings', () => {
    const code = 'const msg = `Hello, ${name}!`;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'interpolation')).toBe(true);
  });

  it('should handle nested braces in interpolation', () => {
    const code = 'const msg = `${obj.nested}`;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'interpolation' || t.type === 'string')).toBe(true);
  });
});
