/**
 * Solarized Light theme
 */

import { defineTheme } from '../define-theme.js';

export const solarizedLight = defineTheme({
  name: 'solarized-light',
  type: 'light',

  colors: {
    background: '#fdf6e3',
    foreground: '#657b83',
    lineNumber: '#93a1a1',
    lineNumberActive: '#657b83',
    lineHighlight: 'rgba(238, 232, 213, 1)',
    selection: 'rgba(238, 232, 213, 1)',
    cursor: '#657b83',

    gutterBackground: '#fdf6e3',
    gutterBorder: '#eee8d5',

    diffAddedBackground: 'rgba(133, 153, 0, 0.15)',
    diffAddedText: '#859900',
    diffRemovedBackground: 'rgba(220, 50, 47, 0.15)',
    diffRemovedText: '#dc322f',
    diffModifiedBackground: 'rgba(181, 137, 0, 0.15)',
    diffModifiedText: '#b58900',

    focusDimmed: 'rgba(101, 123, 131, 0.4)',
    wordHighlight: 'rgba(181, 137, 0, 0.3)',

    border: '#eee8d5',
    badgeBackground: '#eee8d5',
    badgeText: '#657b83',
    buttonBackground: '#eee8d5',
    buttonText: '#657b83',
    buttonHover: '#e3dcc9',
    scrollbar: 'rgba(0, 0, 0, 0.15)',
    scrollbarHover: 'rgba(0, 0, 0, 0.25)',

    tokens: {
      keyword: '#859900',
      string: '#2aa198',
      number: '#d33682',
      comment: '#93a1a1',
      operator: '#657b83',
      punctuation: '#657b83',
      function: '#268bd2',
      variable: '#b58900',
      class: '#b58900',
      type: '#b58900',
      constant: '#cb4b16',
      property: '#268bd2',
      attribute: '#b58900',
      tag: '#268bd2',
      regexp: '#dc322f',
      escape: '#dc322f',
      interpolation: '#657b83',
      meta: '#d33682',
      invalid: '#dc322f',
    },
  },
});

export default solarizedLight;
