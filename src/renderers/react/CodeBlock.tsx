/**
 * CodeBlock component for React
 */

import { useMemo, useCallback, type MouseEvent } from 'react';
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

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;

      // Handle copy button click
      const copyButton = target.closest('.cs-copy-button');
      if (copyButton) {
        copy(code);
        onCopy?.(code);
        return;
      }

      // Handle line click
      const lineElement = target.closest('[data-line]');
      if (lineElement) {
        const lineNumber = parseInt(lineElement.getAttribute('data-line') ?? '0', 10);
        if (lineNumber > 0) {
          onLineClick?.(lineNumber);
        }
      }
    },
    [code, copy, onCopy, onLineClick]
  );

  // Update copy button text when copied
  const processedHtml = useMemo(() => {
    if (copied) {
      return html.replace(
        /<span class="cs-copy-text">Copy<\/span>/,
        '<span class="cs-copy-text">Copied!</span>'
      );
    }
    return html;
  }, [html, copied]);

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
      onClick={handleClick}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
}

export default CodeBlock;
