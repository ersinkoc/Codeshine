/**
 * Tests for merge utilities
 */

import { describe, it, expect } from 'vitest';
import { deepMerge, mergeWithDefaults } from '../../src/utils/merge.js';

describe('deepMerge', () => {
  it('should merge simple objects', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  it('should merge nested objects', () => {
    const target = { a: { x: 1, y: 2 }, b: 3 };
    const source = { a: { y: 3, z: 4 } };
    const result = deepMerge(target, source);

    expect(result).toEqual({ a: { x: 1, y: 3, z: 4 }, b: 3 });
  });

  it('should not mutate original objects', () => {
    const target = { a: 1 };
    const source = { b: 2 };
    deepMerge(target, source);

    expect(target).toEqual({ a: 1 });
    expect(source).toEqual({ b: 2 });
  });

  it('should handle empty objects', () => {
    expect(deepMerge({}, { a: 1 })).toEqual({ a: 1 });
    expect(deepMerge({ a: 1 }, {})).toEqual({ a: 1 });
    expect(deepMerge({}, {})).toEqual({});
  });

  it('should handle arrays by replacing', () => {
    const target = { arr: [1, 2] };
    const source = { arr: [3, 4] };
    const result = deepMerge(target, source);

    expect(result.arr).toEqual([3, 4]);
  });

  it('should handle deeply nested objects', () => {
    const target = {
      level1: {
        level2: {
          level3: {
            a: 1,
          },
        },
      },
    };
    const source = {
      level1: {
        level2: {
          level3: {
            b: 2,
          },
        },
      },
    };
    const result = deepMerge(target, source);

    expect(result).toEqual({
      level1: {
        level2: {
          level3: {
            a: 1,
            b: 2,
          },
        },
      },
    });
  });

  it('should handle primitive overrides', () => {
    const target = { a: { nested: 1 } };
    const source = { a: 'string' };
    const result = deepMerge(target, source as unknown as typeof target);

    expect(result).toEqual({ a: 'string' });
  });
});

describe('mergeWithDefaults', () => {
  it('should merge with defaults (shallow)', () => {
    const defaults = { a: 1, b: 2, c: 3 };
    const options = { b: 20 };
    const result = mergeWithDefaults(defaults, options);

    expect(result).toEqual({ a: 1, b: 20, c: 3 });
  });

  it('should handle nested objects (shallow replace)', () => {
    const defaults = {
      theme: { color: 'blue', size: 'medium' },
      enabled: true,
    };
    const options = {
      theme: { color: 'red' },
    };
    const result = mergeWithDefaults(defaults, options);

    // mergeWithDefaults is shallow, so nested objects are replaced
    expect(result).toEqual({
      theme: { color: 'red' },
      enabled: true,
    });
  });

  it('should not mutate defaults', () => {
    const defaults = { a: 1 };
    const options = { b: 2 };
    mergeWithDefaults(defaults, options as unknown as Partial<typeof defaults>);

    expect(defaults).toEqual({ a: 1 });
  });

  it('should handle undefined options', () => {
    const defaults = { a: 1 };
    const result = mergeWithDefaults(defaults, undefined);

    expect(result).toEqual({ a: 1 });
  });

  it('should handle empty options', () => {
    const defaults = { a: 1, b: 2 };
    const result = mergeWithDefaults(defaults, {});

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
