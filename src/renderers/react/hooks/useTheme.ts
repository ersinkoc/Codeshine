/**
 * useTheme hook for React
 */

import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider.js';

/**
 * Hook for accessing and updating theme
 */
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export default useTheme;
