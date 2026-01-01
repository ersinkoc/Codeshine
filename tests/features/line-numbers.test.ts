/**
 * Tests for line numbers feature
 */

import { describe, it, expect } from 'vitest';
import {
  generateLineNumber,
  calculateLineNumberWidth,
  generateLineNumberGutter,
} from '../../src/features/line-numbers.js';

describe('generateLineNumber', () => {
  it('should generate a basic line number', () => {
    const html = generateLineNumber(1);

    expect(html).toContain('cs-line-number');
    expect(html).toContain('1');
    expect(html).toContain('<span');
    expect(html).toContain('</span>');
  });

  it('should generate line number with large number', () => {
    const html = generateLineNumber(999);

    expect(html).toContain('999');
  });

  it('should add active class when isActive is true', () => {
    const html = generateLineNumber(5, true);

    expect(html).toContain('cs-line-number');
    expect(html).toContain('cs-line-number--active');
    expect(html).toContain('5');
  });

  it('should add highlighted class when isHighlighted is true', () => {
    const html = generateLineNumber(3, false, true);

    expect(html).toContain('cs-line-number');
    expect(html).toContain('cs-line-number--highlighted');
    expect(html).toContain('3');
  });

  it('should add both active and highlighted classes', () => {
    const html = generateLineNumber(7, true, true);

    expect(html).toContain('cs-line-number');
    expect(html).toContain('cs-line-number--active');
    expect(html).toContain('cs-line-number--highlighted');
    expect(html).toContain('7');
  });

  it('should not add active class when isActive is false', () => {
    const html = generateLineNumber(2, false);

    expect(html).toContain('cs-line-number');
    expect(html).not.toContain('cs-line-number--active');
  });

  it('should not add highlighted class when isHighlighted is false', () => {
    const html = generateLineNumber(2, false, false);

    expect(html).not.toContain('cs-line-number--highlighted');
  });
});

describe('calculateLineNumberWidth', () => {
  it('should calculate width for single digit total', () => {
    const width = calculateLineNumberWidth(5);

    expect(width).toBe('2ch'); // 1 digit + 1
  });

  it('should calculate width for double digit total', () => {
    const width = calculateLineNumberWidth(50);

    expect(width).toBe('3ch'); // 2 digits + 1
  });

  it('should calculate width for triple digit total', () => {
    const width = calculateLineNumberWidth(100);

    expect(width).toBe('4ch'); // 3 digits + 1
  });

  it('should calculate width for large numbers', () => {
    const width = calculateLineNumberWidth(10000);

    expect(width).toBe('6ch'); // 5 digits + 1
  });

  it('should handle 1 line', () => {
    const width = calculateLineNumberWidth(1);

    expect(width).toBe('2ch');
  });
});

describe('generateLineNumberGutter', () => {
  it('should generate gutter for a range of lines', () => {
    const html = generateLineNumberGutter(1, 5);

    expect(html).toContain('cs-line-numbers');
    expect(html).toContain('1');
    expect(html).toContain('2');
    expect(html).toContain('3');
    expect(html).toContain('4');
    expect(html).toContain('5');
  });

  it('should generate single line gutter', () => {
    const html = generateLineNumberGutter(1, 1);

    expect(html).toContain('cs-line-numbers');
    expect(html).toContain('1');
    expect(html).not.toContain('2');
  });

  it('should mark highlighted lines', () => {
    const html = generateLineNumberGutter(1, 5, [2, 4]);

    expect(html).toContain('cs-line-numbers');
    // Line 2 and 4 should be highlighted
    expect(html.match(/cs-line-number--highlighted/g)?.length).toBe(2);
  });

  it('should mark focused lines as active', () => {
    const html = generateLineNumberGutter(1, 5, [], [3]);

    expect(html).toContain('cs-line-numbers');
    expect(html).toContain('cs-line-number--active');
  });

  it('should handle both highlighted and focused lines', () => {
    const html = generateLineNumberGutter(1, 5, [2], [2]);

    expect(html).toContain('cs-line-number--highlighted');
    expect(html).toContain('cs-line-number--active');
  });

  it('should handle empty arrays', () => {
    const html = generateLineNumberGutter(1, 3, [], []);

    expect(html).toContain('cs-line-numbers');
    expect(html).not.toContain('cs-line-number--highlighted');
    expect(html).not.toContain('cs-line-number--active');
  });

  it('should handle startLine greater than 1', () => {
    const html = generateLineNumberGutter(10, 12);

    expect(html).toContain('10');
    expect(html).toContain('11');
    expect(html).toContain('12');
    expect(html).not.toContain('>1<');
  });

  it('should generate proper div wrapper', () => {
    const html = generateLineNumberGutter(1, 2);

    expect(html.startsWith('<div class="cs-line-numbers">')).toBe(true);
    expect(html.endsWith('</div>')).toBe(true);
  });
});
