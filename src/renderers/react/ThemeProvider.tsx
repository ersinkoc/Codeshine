/**
 * ThemeProvider component for React
 */

import React, { createContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Theme } from '../../core/types.js';
import type { ThemeContextValue, ThemeProviderProps } from './types.js';
import { getTheme, getThemeNames, githubDark } from '../../themes/index.js';
import { generateCSSVars } from '../../themes/css-vars.js';

/**
 * Theme context
 */
export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Resolve theme from string or Theme object
 */
function resolveTheme(theme: string | Theme): Theme {
  if (typeof theme === 'string') {
    return getTheme(theme) ?? githubDark;
  }
  return theme;
}

/**
 * ThemeProvider component
 */
export function ThemeProvider({ theme: initialTheme, children }: ThemeProviderProps): JSX.Element {
  const [theme, setThemeState] = useState<Theme>(() => resolveTheme(initialTheme));

  const setTheme = useCallback((newTheme: string | Theme) => {
    setThemeState(resolveTheme(newTheme));
  }, []);

  const themes = useMemo(() => getThemeNames(), []);

  const cssVars = useMemo(() => generateCSSVars(theme), [theme]);

  const value: ThemeContextValue = useMemo(
    () => ({
      theme,
      setTheme,
      themes,
      cssVars,
    }),
    [theme, setTheme, themes, cssVars]
  );

  const style = useMemo(() => {
    const styleObj: Record<string, string> = {};
    for (const [key, val] of Object.entries(cssVars)) {
      styleObj[key] = val;
    }
    return styleObj;
  }, [cssVars]);

  return (
    <ThemeContext.Provider value={value}>
      <div style={style}>{children}</div>
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
