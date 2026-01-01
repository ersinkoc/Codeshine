/**
 * Range parsing utilities for line numbers
 */

import type { LineRange } from '../core/types.js';

/**
 * Parse a range string like "1,3-5,8" into an array of line numbers
 */
export function parseRangeString(range: string): number[] {
  const result: number[] = [];
  const parts = range.split(',').map((p) => p.trim());

  for (const part of parts) {
    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = parseInt(startStr ?? '', 10);
      const end = parseInt(endStr ?? '', 10);

      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = start; i <= end; i++) {
          result.push(i);
        }
      }
    } else {
      const num = parseInt(part, 10);
      if (!isNaN(num)) {
        result.push(num);
      }
    }
  }

  return [...new Set(result)].sort((a, b) => a - b);
}

/**
 * Parse a LineRange into an array of line numbers
 */
export function parseLineRange(range: LineRange): number[] {
  if (typeof range === 'number') {
    return [range];
  }

  if (typeof range === 'string') {
    return parseRangeString(range);
  }

  if (Array.isArray(range) && range.length === 2) {
    const [start, end] = range;
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  }

  return [];
}

/**
 * Parse multiple LineRange items into a single array of line numbers
 */
export function parseLineRanges(ranges: LineRange[] | string | undefined): number[] {
  if (!ranges) {
    return [];
  }

  if (typeof ranges === 'string') {
    return parseRangeString(ranges);
  }

  const result: number[] = [];
  for (const range of ranges) {
    result.push(...parseLineRange(range));
  }

  return [...new Set(result)].sort((a, b) => a - b);
}

/**
 * Check if a line number is in the given ranges
 */
export function isLineInRanges(line: number, ranges: number[]): boolean {
  return ranges.includes(line);
}

/**
 * Convert an array of line numbers to a compact range string
 */
export function toRangeString(lines: number[]): string {
  if (lines.length === 0) {
    return '';
  }

  const sorted = [...lines].sort((a, b) => a - b);
  const ranges: string[] = [];
  let rangeStart = sorted[0]!;
  let rangeEnd = sorted[0]!;

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i]!;
    if (current === rangeEnd + 1) {
      rangeEnd = current;
    } else {
      ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);
      rangeStart = current;
      rangeEnd = current;
    }
  }

  ranges.push(rangeStart === rangeEnd ? `${rangeStart}` : `${rangeStart}-${rangeEnd}`);

  return ranges.join(',');
}
