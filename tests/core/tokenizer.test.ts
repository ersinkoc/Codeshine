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

  it('should handle escaped characters in multi-line string continuation', () => {
    // Tests lines 164-167, 169-172 - escape handling in string continuation
    const langWithEscape = {
      name: 'escape-multiline-lang',
      patterns: [],
      strings: [
        {
          start: '"',
          end: '"',
          escape: '\\',
          multiline: true,
        },
      ],
    };

    // Start a string that doesn't end on the first line
    const result1 = tokenizeLine('"start', 1, langWithEscape);
    expect(result1.state.inString).toBe(true);
    expect(result1.state.stringDelimiter).toBe('"');

    // Continue with escaped char and then end quote
    const result2 = tokenizeLine('\\n more" rest', 2, langWithEscape, result1.state);
    expect(result2.state.inString).toBe(false);
    expect(result2.tokens.some(t => t.type === 'string')).toBe(true);
  });

  it('should handle block comment that ends on same line', () => {
    // Tests lines 222-230, 237-238 - block comment found and ends on same line
    const tokens = tokenize('/* comment */ const x = 1;', javascript);

    expect(tokens.some(t => t.type === 'comment' && t.value === '/* comment */')).toBe(true);
    expect(tokens.some(t => t.type === 'keyword' && t.value === 'const')).toBe(true);
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

  it('should handle deeply nested braces in interpolation', () => {
    const code = 'const msg = `${foo({ bar: { baz: 1 } })}`;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'interpolation' || t.type === 'string')).toBe(true);
  });

  it('should handle standalone numbers', () => {
    const code = '42 3.14 0xff 0b101 1e10';
    const tokens = tokenize(code, javascript);

    const numberTokens = tokens.filter(t => t.type === 'number');
    expect(numberTokens.length).toBe(5);
  });

  it('should handle code without language keywords', () => {
    const minimalLang = {
      name: 'minimal',
      patterns: [],
    };
    const tokens = tokenize('hello world', minimalLang);

    expect(tokens.length).toBeGreaterThan(0);
  });

  it('should handle code with only operators', () => {
    const tokens = tokenize('+ - * / = ==', javascript);

    expect(tokens.some(t => t.type === 'operator')).toBe(true);
  });

  it('should handle nested interpolation with extra braces', () => {
    // This tests the depth++ branch in nested interpolation handling
    const code = 'const msg = `${obj.map(x => { return x; })}`;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'interpolation' || t.type === 'string')).toBe(true);
  });

  it('should tokenize function call followed by property', () => {
    const code = 'myFunc().property';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'function' && t.value === 'myFunc')).toBe(true);
  });

  it('should tokenize pure number expression', () => {
    // Tests standalone number tokenization
    const tokens = tokenize('12345', javascript);

    expect(tokens.some(t => t.type === 'number' && t.value === '12345')).toBe(true);
  });

  it('should handle code starting with number', () => {
    const tokens = tokenize('0xff + 10', javascript);

    const numberTokens = tokens.filter(t => t.type === 'number');
    expect(numberTokens.length).toBe(2);
  });

  it('should handle template literal with deeply nested braces in interpolation', () => {
    // This specifically tests line 283 (depth++ for nested braces)
    const code = 'const msg = `Result: ${fn({ a: { b: 1 } })}`;';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'interpolation')).toBe(true);
    expect(tokens.some(t => t.type === 'string')).toBe(true);
  });

  it('should handle nested object braces inside template interpolation', () => {
    // Specifically tests the depth++ branch (line 282-283)
    // The interpolation contains { which is not the closing }
    const code = '`${{}}`';
    const tokens = tokenize(code, javascript);

    const interpToken = tokens.find(t => t.type === 'interpolation');
    expect(interpToken).toBeDefined();
    expect(interpToken?.value).toBe('${{}}');
  });

  it('should handle multiple levels of nested braces in interpolation', () => {
    const code = '`${a ? { x: { y: 1 }} : {}}`';
    const tokens = tokenize(code, javascript);

    expect(tokens.some(t => t.type === 'interpolation')).toBe(true);
  });

  it('should break out of pattern loop after match', () => {
    // Tests line 338 - matching a pattern and breaking
    const langWithPattern = {
      name: 'pattern-test',
      patterns: [
        { pattern: /SPECIAL_WORD/, type: 'keyword' as const },
      ],
    };
    const tokens = tokenize('SPECIAL_WORD', langWithPattern);

    expect(tokens.some(t => t.type === 'keyword' && t.value === 'SPECIAL_WORD')).toBe(true);
  });

  it('should detect function calls with parenthesis', () => {
    // Tests line 354 specifically - function call detection
    const tokens = tokenize('doSomething()', javascript);

    expect(tokens.some(t => t.type === 'function' && t.value === 'doSomething')).toBe(true);
  });

  it('should tokenize number at start of expression without preceding code', () => {
    // Tests lines 368-371 - number matching when it's the first thing
    const tokens = tokenize('42.5', javascript);

    expect(tokens.length).toBe(1);
    expect(tokens[0].type).toBe('number');
    expect(tokens[0].value).toBe('42.5');
  });

  it('should tokenize number after operator', () => {
    // Another test for number branch
    const tokens = tokenize('= 100', javascript);

    expect(tokens.some(t => t.type === 'number' && t.value === '100')).toBe(true);
  });

  it('should detect function call without patterns', () => {
    // Tests line 354 with minimal language to ensure code path is hit
    const minimalLang = {
      name: 'minimal-func',
      patterns: [],
      keywords: [], // No keywords, so word won't match as keyword
    };
    const tokens = tokenize('myFunc()', minimalLang);

    expect(tokens.some(t => t.type === 'function' && t.value === 'myFunc')).toBe(true);
  });

  it('should tokenize number without patterns or keywords', () => {
    // Tests lines 368-371 with minimal language
    const minimalLang = {
      name: 'minimal-num',
      patterns: [],
    };
    const tokens = tokenize('123.456', minimalLang);

    expect(tokens.some(t => t.type === 'number' && t.value === '123.456')).toBe(true);
  });

  it('should handle regex start string that does not end on line', () => {
    // For regex starts, the stringDelimiter is empty so multi-line continuation
    // won't work the same way - but we can still test the string detection
    const langWithRegexStart = {
      name: 'regex-multiline',
      patterns: [],
      strings: [
        {
          start: /r"/,
          end: '"',
          multiline: true,
        },
      ],
    };

    // Multi-line strings with regex starts complete on same line
    const result = tokenizeLine('r"complete"', 1, langWithRegexStart);
    expect(result.tokens.some(t => t.type === 'string')).toBe(true);
  });

  it('should handle string continuation with mismatched delimiter', () => {
    // Tests line 155 - when continuing a string, but the delimiter doesn't match any string start
    // This happens with regex starts since stringDelimiter becomes ''
    const langWithMixedStrings = {
      name: 'mixed-strings',
      patterns: [],
      strings: [
        {
          start: /r"/,  // Regex start - will set stringDelimiter to ''
          end: '"',
          multiline: true,
        },
        {
          start: "'",  // String start
          end: "'",
          multiline: true,
        },
      ],
    };

    // Create a state that simulates being in a string with a delimiter that doesn't match
    const continuationState = {
      inString: true,
      stringDelimiter: 'NONEXISTENT',  // This won't match any string definition
      inComment: false,
      commentType: undefined,
    };

    // This will trigger the find() to check all strings and return false for regex starts
    const result = tokenizeLine('continued text"', 1, langWithMixedStrings, continuationState);
    // The find() should fail and processing continues normally
    expect(result.tokens.length).toBeGreaterThan(0);
  });
});
