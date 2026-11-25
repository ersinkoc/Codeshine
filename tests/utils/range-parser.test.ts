/**
 * Tests for range parser utilities
 */

import { describe, it, expect } from 'vitest';
import {
  MAX_RANGE_LINES,
  parseRangeString,
  parseLineRange,
  parseLineRanges,
  isLineInRanges,
  toRangeString,
} from '../../src/utils/range-parser.js';

describe('parseRangeString', () => {
  it('should parse single number', () => {
    expect(parseRangeString('5')).toEqual([5]);
  });

  it('should parse comma-separated numbers', () => {
    expect(parseRangeString('1,3,5')).toEqual([1, 3, 5]);
  });

  it('should parse ranges', () => {
    expect(parseRangeString('1-5')).toEqual([1, 2, 3, 4, 5]);
  });

  it('should parse mixed format', () => {
    expect(parseRangeString('1,3-5,7')).toEqual([1, 3, 4, 5, 7]);
  });

  it('should handle spaces', () => {
    expect(parseRangeString('1, 3, 5')).toEqual([1, 3, 5]);
  });

  it('should return empty array for invalid input', () => {
    expect(parseRangeString('')).toEqual([]);
    expect(parseRangeString('invalid')).toEqual([]);
  });

  it('should deduplicate numbers', () => {
    const result = parseRangeString('1,1,2,2');
    expect(result).toEqual([1, 2]);
  });

  it('should sort results', () => {
    expect(parseRangeString('5,1,3')).toEqual([1, 3, 5]);
  });
});

describe('parseLineRange', () => {
  it('should parse single number', () => {
    expect(parseLineRange(5)).toEqual([5]);
  });

  it('should parse string range', () => {
    expect(parseLineRange('1-3')).toEqual([1, 2, 3]);
  });

  it('should parse tuple [start, end]', () => {
    expect(parseLineRange([1, 3])).toEqual([1, 2, 3]);
  });

  it('should handle single number tuple', () => {
    expect(parseLineRange([5, 5])).toEqual([5]);
  });

  it('should return empty for invalid input', () => {
    expect(parseLineRange([] as unknown as [number, number])).toEqual([]);
  });
});

describe('parseLineRanges', () => {
  it('should parse array of numbers', () => {
    const result = parseLineRanges([1, 2, 5]);
    expect(result).toEqual([1, 2, 5]);
  });

  it('should parse string', () => {
    expect(parseLineRanges('1-3')).toEqual([1, 2, 3]);
  });

  it('should handle undefined', () => {
    expect(parseLineRanges(undefined)).toEqual([]);
  });

  it('should handle empty array', () => {
    expect(parseLineRanges([])).toEqual([]);
  });

  it('should merge and deduplicate', () => {
    const result = parseLineRanges([1, 2, [1, 3]]);
    expect(result).toEqual([1, 2, 3]);
  });
});

describe('range expansion bound', () => {
  it('should clamp oversized ranges to MAX_RANGE_LINES', () => {
    expect(MAX_RANGE_LINES).toBe(1_000_000);

    const stringRange = parseRangeString('1-5000000');
    expect(stringRange).toHaveLength(MAX_RANGE_LINES);
    expect(stringRange[0]).toBe(1);
    expect(stringRange[stringRange.length - 1]).toBe(MAX_RANGE_LINES);

    expect(parseLineRange([1, 5_000_000])).toHaveLength(MAX_RANGE_LINES);
  });

  it('should normalise large ranges without overflowing the call stack', () => {
    expect(() => parseLineRanges(['1-500000'])).not.toThrow();
    expect(parseLineRanges(['1-500000'])).toHaveLength(500_000);
    expect(parseLineRanges(['1-2000000'])).toHaveLength(MAX_RANGE_LINES);
  });

  it('should ignore parts past the limit', () => {
    expect(parseRangeString(`1-${MAX_RANGE_LINES},${MAX_RANGE_LINES + 5}`)).not.toContain(
      MAX_RANGE_LINES + 5
    );
  });
});

describe('isLineInRanges', () => {
  it('should return true if line is in array', () => {
    expect(isLineInRanges(3, [1, 2, 3, 4, 5])).toBe(true);
  });

  it('should return false if line is not in array', () => {
    expect(isLineInRanges(10, [1, 2, 3, 4, 5])).toBe(false);
  });

  it('should check first element', () => {
    expect(isLineInRanges(1, [1, 2, 3])).toBe(true);
  });

  it('should check last element', () => {
    expect(isLineInRanges(3, [1, 2, 3])).toBe(true);
  });

  it('should handle empty array', () => {
    expect(isLineInRanges(5, [])).toBe(false);
  });
});

describe('toRangeString', () => {
  it('should convert single number', () => {
    expect(toRangeString([5])).toBe('5');
  });

  it('should convert non-consecutive numbers', () => {
    expect(toRangeString([1, 3, 5])).toBe('1,3,5');
  });

  it('should convert consecutive numbers to range', () => {
    expect(toRangeString([1, 2, 3, 4, 5])).toBe('1-5');
  });

  it('should handle mixed consecutive and non-consecutive', () => {
    expect(toRangeString([1, 2, 3, 7, 8, 9])).toBe('1-3,7-9');
    expect(toRangeString([1, 2, 3, 5, 7, 8, 9])).toBe('1-3,5,7-9');
  });

  it('should handle empty array', () => {
    expect(toRangeString([])).toBe('');
  });

  it('should handle unsorted input', () => {
    expect(toRangeString([5, 1, 3, 2, 4])).toBe('1-5');
  });
});
