/**
 * Line number generation for Codeshine
 */

/**
 * Generate line number HTML
 */
export function generateLineNumber(
  lineNumber: number,
  isActive: boolean = false,
  isHighlighted: boolean = false
): string {
  const classes = ['cs-line-number'];

  if (isActive) {
    classes.push('cs-line-number--active');
  }

  if (isHighlighted) {
    classes.push('cs-line-number--highlighted');
  }

  return `<span class="${classes.join(' ')}">${lineNumber}</span>`;
}

/**
 * Calculate line number width for proper alignment
 */
export function calculateLineNumberWidth(totalLines: number): string {
  const digits = String(totalLines).length;
  return `${digits + 1}ch`;
}

/**
 * Generate line number gutter HTML
 */
export function generateLineNumberGutter(
  startLine: number,
  endLine: number,
  highlightedLines: number[] = [],
  focusedLines: number[] = []
): string {
  const lines: string[] = [];

  for (let i = startLine; i <= endLine; i++) {
    const isHighlighted = highlightedLines.includes(i);
    const isFocused = focusedLines.includes(i);
    lines.push(generateLineNumber(i, isFocused, isHighlighted));
  }

  return `<div class="cs-line-numbers">${lines.join('\n')}</div>`;
}

export default generateLineNumber;
