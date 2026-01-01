/**
 * Tests for parser
 */

import { describe, it, expect } from 'vitest';
import {
  parseTokensToLines,
  getLineContent,
  getLineTokens,
  countLines,
  splitLines,
  mergeAdjacentTokens,
  filterTokensByType,
  findTokensByValue,
  getTokenAtPosition,
} from '../../src/core/parser.js';
import { tokenize } from '../../src/core/tokenizer.js';
import { javascript } from '../../src/languages/tier1/javascript.js';

describe('parseTokensToLines', () => {
  it('should parse tokens into line data', () => {
    const code = 'const a = 1;\nconst b = 2;';
    const tokens = tokenize(code, javascript);
    const lines = parseTokensToLines(tokens);

    expect(lines.length).toBe(2);
    expect(lines[0]?.number).toBe(1);
    expect(lines[1]?.number).toBe(2);
  });

  it('should include line content', () => {
    const code = 'const x = 1;';
    const tokens = tokenize(code, javascript);
    const lines = parseTokensToLines(tokens);

    expect(lines[0]?.content).toBe('const x = 1;');
  });

  it('should include line tokens', () => {
    const code = 'const x = 1;';
    const tokens = tokenize(code, javascript);
    const lines = parseTokensToLines(tokens);

    expect(lines[0]?.tokens.length).toBeGreaterThan(0);
  });

  it('should include default classes', () => {
    const code = 'const x = 1;';
    const tokens = tokenize(code, javascript);
    const lines = parseTokensToLines(tokens);

    expect(lines[0]?.classes).toContain('cs-line');
  });
});

describe('getLineContent', () => {
  it('should get content for a specific line', () => {
    const code = 'line 1\nline 2\nline 3';
    const tokens = tokenize(code, javascript);
    const lines = parseTokensToLines(tokens);

    expect(getLineContent(lines, 2)).toBe('line 2');
  });

  it('should return undefined for non-existent line', () => {
    const code = 'line 1';
    const tokens = tokenize(code, javascript);
    const lines = parseTokensToLines(tokens);

    expect(getLineContent(lines, 99)).toBeUndefined();
  });
});

describe('getLineTokens', () => {
  it('should get tokens for a specific line', () => {
    const code = 'const a = 1;\nconst b = 2;';
    const tokens = tokenize(code, javascript);
    const lines = parseTokensToLines(tokens);

    const lineTokens = getLineTokens(lines, 1);
    expect(lineTokens.length).toBeGreaterThan(0);
  });

  it('should return empty array for non-existent line', () => {
    const code = 'const x = 1;';
    const tokens = tokenize(code, javascript);
    const lines = parseTokensToLines(tokens);

    expect(getLineTokens(lines, 99)).toEqual([]);
  });
});

describe('countLines', () => {
  it('should count lines in code', () => {
    expect(countLines('a\nb\nc')).toBe(3);
    expect(countLines('single line')).toBe(1);
    expect(countLines('')).toBe(1);
  });
});

describe('splitLines', () => {
  it('should split code into lines', () => {
    const lines = splitLines('a\nb\nc');
    expect(lines).toEqual(['a', 'b', 'c']);
  });
});

describe('mergeAdjacentTokens', () => {
  it('should merge adjacent tokens of same type', () => {
    const tokens = [
      { type: 'plain' as const, value: 'a', start: 0, end: 1, line: 1 },
      { type: 'plain' as const, value: 'b', start: 1, end: 2, line: 1 },
      { type: 'keyword' as const, value: 'c', start: 2, end: 3, line: 1 },
    ];

    const merged = mergeAdjacentTokens(tokens);
    expect(merged.length).toBe(2);
    expect(merged[0]?.value).toBe('ab');
  });

  it('should not merge tokens on different lines', () => {
    const tokens = [
      { type: 'plain' as const, value: 'a', start: 0, end: 1, line: 1 },
      { type: 'plain' as const, value: 'b', start: 0, end: 1, line: 2 },
    ];

    const merged = mergeAdjacentTokens(tokens);
    expect(merged.length).toBe(2);
  });

  it('should handle empty tokens', () => {
    expect(mergeAdjacentTokens([])).toEqual([]);
  });
});

describe('filterTokensByType', () => {
  it('should filter tokens by type', () => {
    const code = 'const x = 1; // comment';
    const tokens = tokenize(code, javascript);

    const keywords = filterTokensByType(tokens, ['keyword']);
    expect(keywords.every(t => t.type === 'keyword')).toBe(true);
  });
});

describe('findTokensByValue', () => {
  it('should find tokens by value', () => {
    const code = 'const x = 1; const y = 2;';
    const tokens = tokenize(code, javascript);

    const constTokens = findTokensByValue(tokens, 'const');
    expect(constTokens.length).toBe(2);
  });
});

describe('getTokenAtPosition', () => {
  it('should get token at position', () => {
    const code = 'const x = 1;';
    const tokens = tokenize(code, javascript);

    const token = getTokenAtPosition(tokens, 1, 0);
    expect(token).toBeDefined();
    expect(token?.value).toBe('const');
  });

  it('should return undefined for position outside tokens', () => {
    const code = 'const x = 1;';
    const tokens = tokenize(code, javascript);

    expect(getTokenAtPosition(tokens, 99, 0)).toBeUndefined();
  });
});
