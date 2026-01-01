/**
 * Tests for hash utilities
 */

import { describe, it, expect } from 'vitest';
import { hash, hashHex, contentId } from '../../src/utils/hash.js';

describe('hash', () => {
  it('should generate consistent hash for same input', () => {
    const input = 'hello world';
    const hash1 = hash(input);
    const hash2 = hash(input);

    expect(hash1).toBe(hash2);
  });

  it('should generate different hashes for different inputs', () => {
    const hash1 = hash('hello');
    const hash2 = hash('world');

    expect(hash1).not.toBe(hash2);
  });

  it('should return a number', () => {
    const result = hash('test');

    expect(typeof result).toBe('number');
  });

  it('should handle empty string', () => {
    const result = hash('');

    expect(typeof result).toBe('number');
  });

  it('should handle unicode characters', () => {
    const result = hash('你好世界');

    expect(typeof result).toBe('number');
  });

  it('should handle long strings', () => {
    const longString = 'a'.repeat(10000);
    const result = hash(longString);

    expect(typeof result).toBe('number');
  });
});

describe('hashHex', () => {
  it('should generate hex string', () => {
    const result = hashHex('test');

    expect(typeof result).toBe('string');
    expect(/^[0-9a-f]+$/.test(result)).toBe(true);
  });

  it('should generate consistent hex for same input', () => {
    const hex1 = hashHex('hello');
    const hex2 = hashHex('hello');

    expect(hex1).toBe(hex2);
  });

  it('should generate different hex for different inputs', () => {
    const hex1 = hashHex('hello');
    const hex2 = hashHex('world');

    expect(hex1).not.toBe(hex2);
  });
});

describe('contentId', () => {
  it('should generate content ID', () => {
    const id = contentId('const x = 1;');

    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('should generate consistent IDs for same content', () => {
    const code = 'function test() {}';
    const id1 = contentId(code);
    const id2 = contentId(code);

    expect(id1).toBe(id2);
  });

  it('should generate different IDs for different content', () => {
    const id1 = contentId('const x = 1;');
    const id2 = contentId('const y = 2;');

    expect(id1).not.toBe(id2);
  });

  it('should handle whitespace differences', () => {
    const id1 = contentId('const x = 1;');
    const id2 = contentId('const  x  =  1;');

    expect(id1).not.toBe(id2);
  });

  it('should prefix with cs-', () => {
    const id = contentId('test');

    expect(id.startsWith('cs-')).toBe(true);
  });
});
