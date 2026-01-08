/**
 * useHighlight hook for React
 */

import { useMemo } from 'react';
import type { UseHighlightOptions, UseHighlightResult } from '../types.js';
import { highlight } from '../../../core/highlighter.js';
import { tokenize } from '../../../core/tokenizer.js';
import { getLanguage } from '../../../languages/index.js';

/**
 * Hook for highlighting code
 */
export function useHighlight(
  code: string,
  options: UseHighlightOptions = {}
): UseHighlightResult {
  const html = useMemo(() => {
    return highlight(code, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, JSON.stringify(options)]);

  const tokens = useMemo(() => {
    if (!options.language) {
      return [];
    }
    const lang = getLanguage(options.language);
    if (!lang) {
      return [];
    }
    return tokenize(code, lang);
  }, [code, options.language]);

  return {
    html,
    tokens,
    loading: false,
  };
}

export default useHighlight;
