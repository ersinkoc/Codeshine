/**
 * useHighlight hook for React
 */

import { useMemo, useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);

  const html = useMemo(() => {
    return highlight(code, options);
  }, [code, options.language, options.theme, JSON.stringify(options)]);

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
    loading,
  };
}

export default useHighlight;
