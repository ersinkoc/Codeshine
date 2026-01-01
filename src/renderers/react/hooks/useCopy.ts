/**
 * useCopy hook for React
 */

import { useState, useCallback } from 'react';
import type { UseCopyResult } from '../types.js';

/**
 * Hook for copying text to clipboard
 */
export function useCopy(resetDelay: number = 2000): UseCopyResult {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string): Promise<void> => {
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setError(null);

          setTimeout(() => {
            setCopied(false);
          }, resetDelay);
        } else {
          // Fallback for older browsers
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.left = '-9999px';
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);

          setCopied(true);
          setError(null);

          setTimeout(() => {
            setCopied(false);
          }, resetDelay);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to copy'));
        setCopied(false);
      }
    },
    [resetDelay]
  );

  return { copy, copied, error };
}

export default useCopy;
