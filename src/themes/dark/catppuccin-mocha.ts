/**
 * Catppuccin Mocha theme
 */

import { defineTheme } from '../define-theme.js';

export const catppuccinMocha = defineTheme({
  name: 'catppuccin-mocha',
  type: 'dark',

  colors: {
    background: '#1e1e2e',
    foreground: '#cdd6f4',
    lineNumber: '#6c7086',
    lineNumberActive: '#cdd6f4',
    lineHighlight: 'rgba(88, 91, 112, 0.3)',
    selection: 'rgba(88, 91, 112, 1)',
    cursor: '#f5e0dc',

    gutterBackground: '#1e1e2e',
    gutterBorder: '#1e1e2e',

    diffAddedBackground: 'rgba(166, 227, 161, 0.15)',
    diffAddedText: '#a6e3a1',
    diffRemovedBackground: 'rgba(243, 139, 168, 0.15)',
    diffRemovedText: '#f38ba8',
    diffModifiedBackground: 'rgba(249, 226, 175, 0.15)',
    diffModifiedText: '#f9e2af',

    focusDimmed: 'rgba(205, 214, 244, 0.4)',
    wordHighlight: 'rgba(249, 226, 175, 0.4)',

    border: '#313244',
    badgeBackground: '#313244',
    badgeText: '#cdd6f4',
    buttonBackground: '#313244',
    buttonText: '#cdd6f4',
    buttonHover: '#45475a',
    scrollbar: 'rgba(88, 91, 112, 0.4)',
    scrollbarHover: 'rgba(88, 91, 112, 0.7)',

    tokens: {
      keyword: '#cba6f7',
      string: '#a6e3a1',
      number: '#fab387',
      comment: '#6c7086',
      operator: '#89dceb',
      punctuation: '#cdd6f4',
      function: '#89b4fa',
      variable: '#f5c2e7',
      class: '#f9e2af',
      type: '#f9e2af',
      constant: '#fab387',
      property: '#89dceb',
      attribute: '#f9e2af',
      tag: '#f38ba8',
      regexp: '#a6e3a1',
      escape: '#f2cdcd',
      interpolation: '#cdd6f4',
      meta: '#cba6f7',
      invalid: '#f38ba8',
    },
  },
});

export default catppuccinMocha;
