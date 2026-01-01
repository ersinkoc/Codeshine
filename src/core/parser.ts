/**
 * Token stream parser for Codeshine
 */

import type { Token, LineData } from './types.js';
import { getTokensByLine } from './tokenizer.js';

/**
 * Parse tokens into line data structures
 */
export function parseTokensToLines(tokens: Token[]): LineData[] {
  const byLine = getTokensByLine(tokens);
  const lines: LineData[] = [];

  // Get all unique line numbers and sort them
  const lineNumbers = [...byLine.keys()].sort((a, b) => a - b);

  for (const lineNumber of lineNumbers) {
    const lineTokens = byLine.get(lineNumber) ?? [];
    const content = lineTokens.map((t) => t.value).join('');

    lines.push({
      number: lineNumber,
      content: content.replace(/\n$/, ''), // Remove trailing newline from content
      tokens: lineTokens.filter((t) => t.value !== '\n'), // Filter out newline tokens
      attributes: {},
      classes: ['cs-line'],
    });
  }

  return lines;
}

/**
 * Get the content of a specific line
 */
export function getLineContent(lines: LineData[], lineNumber: number): string | undefined {
  const line = lines.find((l) => l.number === lineNumber);
  return line?.content;
}

/**
 * Get tokens for a specific line
 */
export function getLineTokens(lines: LineData[], lineNumber: number): Token[] {
  const line = lines.find((l) => l.number === lineNumber);
  return line?.tokens ?? [];
}

/**
 * Count total lines
 */
export function countLines(code: string): number {
  return code.split('\n').length;
}

/**
 * Split code into lines while preserving line endings
 */
export function splitLines(code: string): string[] {
  return code.split('\n');
}

/**
 * Merge adjacent tokens of the same type
 */
export function mergeAdjacentTokens(tokens: Token[]): Token[] {
  if (tokens.length === 0) return [];

  const merged: Token[] = [];
  let current = { ...tokens[0]! };

  for (let i = 1; i < tokens.length; i++) {
    const token = tokens[i]!;

    if (
      token.type === current.type &&
      token.line === current.line &&
      token.start === current.end
    ) {
      // Merge with current token
      current.value += token.value;
      current.end = token.end;
    } else {
      merged.push(current);
      current = { ...token };
    }
  }

  merged.push(current);
  return merged;
}

/**
 * Filter tokens by type
 */
export function filterTokensByType(tokens: Token[], types: string[]): Token[] {
  return tokens.filter((t) => types.includes(t.type));
}

/**
 * Find all tokens matching a value
 */
export function findTokensByValue(tokens: Token[], value: string): Token[] {
  return tokens.filter((t) => t.value === value);
}

/**
 * Get token at a specific position
 */
export function getTokenAtPosition(
  tokens: Token[],
  line: number,
  column: number
): Token | undefined {
  return tokens.find(
    (t) => t.line === line && t.start <= column && t.end > column
  );
}
