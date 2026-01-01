/**
 * Tests for features exports
 */

import { describe, it, expect } from 'vitest';
import {
  generateLineNumber,
  calculateLineNumberWidth,
  generateLineNumberGutter,
} from '../../src/features/index.js';

describe('features exports', () => {
  it('should export generateLineNumber', () => {
    expect(typeof generateLineNumber).toBe('function');
    const result = generateLineNumber(1);
    expect(result).toContain('cs-line-number');
  });

  it('should export calculateLineNumberWidth', () => {
    expect(typeof calculateLineNumberWidth).toBe('function');
    const result = calculateLineNumberWidth(10);
    expect(result).toBe('3ch');
  });

  it('should export generateLineNumberGutter', () => {
    expect(typeof generateLineNumberGutter).toBe('function');
    const result = generateLineNumberGutter(1, 3);
    expect(result).toContain('cs-line-numbers');
  });
});
