/**
 * CodeBlock component for React
 */

import React, { useMemo, useCallback } from 'react';
import type { CodeBlockProps } from './types.js';
import { useHighlight } from './hooks/useHighlight.js';
import { useCopy } from './hooks/useCopy.js';

/**
 * CodeBlock component
 */
export function CodeBlock({
  code,
  language,
  autoDetect = false,
  theme,
  lineNumbers = false,
  startLine = 1,
  highlightLines,
  focusLines,
  diffLines,
  highlightWords,
  highlightRanges,
  showLanguageBadge = false,
  copyButton = false,
  filename,
  wrapLines = false,
  maxHeight,
  collapsible = false,
  defaultCollapsed = false,
  onCopy,
  onLineClick,
  className,
  style,
  tabSize = 2,
}: CodeBlockProps): JSX.Element {
  const { html } = useHighlight(code, {
    language,
    autoDetect,
    theme,
    lineNumbers,
    startLine,
    highlightLines,
    focusLines,
    diffLines,
    highlightWords,
    highlightRanges,
    showLanguageBadge,
    copyButton,
    filename,
    wrapLines,
    maxHeight,
    collapsible,
    defaultCollapsed,
    tabSize,
  });

  const { copy, copied } = useCopy();

  const handleCopy = useCallback(() => {
    copy(code);
    onCopy?.(code);
  }, [code, copy, onCopy]);

  const handleLineClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      const lineElement = target.closest('[data-line]');
      if (lineElement) {
        const lineNumber = parseInt(lineElement.getAttribute('data-line') ?? '0', 10);
        if (lineNumber > 0) {
          onLineClick?.(lineNumber);
        }
      }
    },
    [onLineClick]
  );

  const containerClassName = useMemo(() => {
    const classes = ['cs-container'];
    if (className) {
      classes.push(className);
    }
    return classes.join(' ');
  }, [className]);

  return (
    <div
      className={containerClassName}
      style={style}
      onClick={handleLineClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default CodeBlock;
