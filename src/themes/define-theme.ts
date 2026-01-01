/**
 * Theme definition helpers
 */

import type { Theme, ThemeColors, TokenColors } from './types.js';
import { deepMerge } from '../utils/merge.js';

/**
 * Default token colors
 */
const defaultTokenColors: TokenColors = {
  keyword: '#569cd6',
  string: '#ce9178',
  number: '#b5cea8',
  comment: '#6a9955',
  operator: '#d4d4d4',
  punctuation: '#d4d4d4',
  function: '#dcdcaa',
  variable: '#9cdcfe',
  class: '#4ec9b0',
  type: '#4ec9b0',
  constant: '#4fc1ff',
  property: '#9cdcfe',
  attribute: '#9cdcfe',
  tag: '#569cd6',
  regexp: '#d16969',
  escape: '#d7ba7d',
  interpolation: '#569cd6',
  meta: '#c586c0',
  invalid: '#f44747',
};

/**
 * Default dark theme colors
 */
const defaultDarkColors: ThemeColors = {
  background: '#1e1e1e',
  foreground: '#d4d4d4',
  lineNumber: '#858585',
  lineNumberActive: '#c6c6c6',
  lineHighlight: 'rgba(255, 255, 255, 0.1)',
  selection: 'rgba(38, 79, 120, 0.5)',
  cursor: '#aeafad',

  gutterBackground: '#1e1e1e',
  gutterBorder: '#1e1e1e',

  diffAddedBackground: 'rgba(35, 134, 54, 0.2)',
  diffAddedText: '#3fb950',
  diffRemovedBackground: 'rgba(248, 81, 73, 0.2)',
  diffRemovedText: '#f85149',
  diffModifiedBackground: 'rgba(210, 153, 34, 0.2)',
  diffModifiedText: '#d29922',

  focusDimmed: 'rgba(255, 255, 255, 0.4)',
  wordHighlight: 'rgba(255, 255, 0, 0.3)',

  border: '#3c3c3c',
  badgeBackground: '#3c3c3c',
  badgeText: '#cccccc',
  buttonBackground: '#3c3c3c',
  buttonText: '#cccccc',
  buttonHover: '#505050',
  scrollbar: 'rgba(255, 255, 255, 0.2)',
  scrollbarHover: 'rgba(255, 255, 255, 0.3)',

  tokens: defaultTokenColors,
};

/**
 * Default light theme colors
 */
const defaultLightColors: ThemeColors = {
  background: '#ffffff',
  foreground: '#24292e',
  lineNumber: '#959da5',
  lineNumberActive: '#24292e',
  lineHighlight: 'rgba(0, 0, 0, 0.05)',
  selection: 'rgba(3, 102, 214, 0.2)',
  cursor: '#24292e',

  gutterBackground: '#ffffff',
  gutterBorder: '#e1e4e8',

  diffAddedBackground: 'rgba(35, 134, 54, 0.15)',
  diffAddedText: '#22863a',
  diffRemovedBackground: 'rgba(248, 81, 73, 0.15)',
  diffRemovedText: '#cb2431',
  diffModifiedBackground: 'rgba(210, 153, 34, 0.15)',
  diffModifiedText: '#b08800',

  focusDimmed: 'rgba(0, 0, 0, 0.4)',
  wordHighlight: 'rgba(255, 255, 0, 0.4)',

  border: '#e1e4e8',
  badgeBackground: '#e1e4e8',
  badgeText: '#24292e',
  buttonBackground: '#fafbfc',
  buttonText: '#24292e',
  buttonHover: '#f3f4f6',
  scrollbar: 'rgba(0, 0, 0, 0.15)',
  scrollbarHover: 'rgba(0, 0, 0, 0.25)',

  tokens: {
    keyword: '#d73a49',
    string: '#032f62',
    number: '#005cc5',
    comment: '#6a737d',
    operator: '#24292e',
    punctuation: '#24292e',
    function: '#6f42c1',
    variable: '#e36209',
    class: '#6f42c1',
    type: '#6f42c1',
    constant: '#005cc5',
    property: '#005cc5',
    attribute: '#6f42c1',
    tag: '#22863a',
    regexp: '#032f62',
    escape: '#e36209',
    interpolation: '#d73a49',
    meta: '#6f42c1',
    invalid: '#cb2431',
  },
};

/**
 * Define a new theme with defaults
 */
export function defineTheme(
  definition: Partial<Theme> & { name: string; type: 'light' | 'dark' }
): Theme {
  const defaultColors = definition.type === 'dark' ? defaultDarkColors : defaultLightColors;

  const colors: ThemeColors = definition.colors
    ? (deepMerge(
        defaultColors as unknown as Record<string, unknown>,
        definition.colors as unknown as Record<string, unknown>
      ) as unknown as ThemeColors)
    : defaultColors;

  return {
    name: definition.name,
    type: definition.type,
    colors,
    fonts: definition.fonts ?? {
      family: "'Fira Code', 'Consolas', 'Monaco', monospace",
      size: '14px',
      lineHeight: 1.5,
      weight: 400,
    },
    spacing: definition.spacing ?? {
      padding: '16px',
      lineNumberWidth: '40px',
      gutterPadding: '8px',
    },
    borders: definition.borders ?? {
      radius: '8px',
      width: '1px',
    },
  };
}

/**
 * Extend an existing theme
 */
export function extendTheme(
  base: Theme,
  overrides: Partial<Theme> & { name: string }
): Theme {
  const mergedColors = overrides.colors
    ? (deepMerge(
        base.colors as unknown as Record<string, unknown>,
        overrides.colors as unknown as Record<string, unknown>
      ) as unknown as ThemeColors)
    : base.colors;

  return defineTheme({
    ...base,
    ...overrides,
    type: overrides.type ?? base.type,
    colors: mergedColors,
  });
}
