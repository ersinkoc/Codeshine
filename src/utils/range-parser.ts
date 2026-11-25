/**
 * Range parsing utilities for line numbers
 */

import type { LineRange } from '../core/types.js';

/**
 * Maximum number of line numbers a single range normalisation produces.
 *
 * Range strings are public input (`highlightLines: '1-999999'`), so expanding
 * `start..end` without a bound would let eleven characters ask for an
 * arbitrarily large allocation. Highlighting more lines than this is not
 * renderable anyway, so everything past the limit is ignored.
 */
export const MAX_RANGE_LINES = 1_000_000;

/**
 * Append the inclusive interval `start..end` to `target`, stopping at
 * `MAX_RANGE_LINES` so expansion stays bounded.
 */
function appendRange(target: number[], start: number, end: number): void {
  for (let i = start; i <= end && target.length < MAX_RANGE_LINES; i++) {
    target.push(i);
  }
}

/**
 * Parse a range string like "1,3-5,8" into an array of line numbers.
 *
 * At most `MAX_RANGE_LINES` (1,000,000) line numbers are returned; parts that
 * fall past the limit are ignored.
 */
export function parseRangeString(range: string): number[] {
  const result: number[] = [];
  const parts = range.split(',').map((p) => p.trim());

  for (const part of parts) {
    if (result.length >= MAX_RANGE_LINES) {
      break;
    }

    if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = parseInt(startStr ?? '', 10);
      const end = parseInt(endStr ?? '', 10);

      if (!isNaN(start) && !isNaN(end) && start <= end) {
        appendRange(result, start, end);
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
    appendRange(result, start, end);
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
    if (result.length >= MAX_RANGE_LINES) {
      break;
    }

    // Push one number at a time: `push(...parsed)` overflows the call stack
    // once a range expands past the engine's argument limit.
    for (const line of parseLineRange(range)) {
      if (result.length >= MAX_RANGE_LINES) {
        break;
      }
      result.push(line);
    }
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
