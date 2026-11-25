/**
 * Whitespace helpers for Codeshine
 */

/**
 * Expand tab characters to spaces using tab stops of `tabSize` columns.
 *
 * The column is tracked across the whole input so a tab after text advances to
 * the next stop, and it resets on every newline. Input is returned unchanged
 * when `tabSize` is missing or not a positive number.
 */
export function expandTabs(code: string, tabSize: number | undefined): string {
  if (tabSize === undefined) return code;

  const requested = Math.floor(tabSize);
  if (!Number.isFinite(requested) || requested <= 0) return code;

  // A tab stop wider than this is not meaningful and would allocate absurdly
  // large strings; clamp so caller input cannot exhaust memory.
  const size = Math.min(requested, 256);

  let result = '';
  let column = 0;

  for (const char of code) {
    if (char === '\t') {
      const spaces = size - (column % size);
      result += ' '.repeat(spaces);
      column += spaces;
      continue;
    }

    result += char;
    column = char === '\n' || char === '\r' ? 0 : column + 1;
  }

  return result;
}

export default expandTabs;
