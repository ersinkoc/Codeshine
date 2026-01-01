/**
 * High Contrast Dark theme
 */

import { defineTheme } from '../define-theme.js';

export const highContrastDark = defineTheme({
  name: 'high-contrast-dark',
  type: 'dark',

  colors: {
    background: '#000000',
    foreground: '#ffffff',
    lineNumber: '#ffffff',
    lineNumberActive: '#ffff00',
    lineHighlight: 'rgba(255, 255, 255, 0.1)',
    selection: 'rgba(255, 255, 0, 0.3)',
    cursor: '#ffffff',

    gutterBackground: '#000000',
    gutterBorder: '#6fc3df',

    diffAddedBackground: 'rgba(0, 255, 0, 0.2)',
    diffAddedText: '#00ff00',
    diffRemovedBackground: 'rgba(255, 0, 0, 0.2)',
    diffRemovedText: '#ff0000',
    diffModifiedBackground: 'rgba(255, 255, 0, 0.2)',
    diffModifiedText: '#ffff00',

    focusDimmed: 'rgba(255, 255, 255, 0.4)',
    wordHighlight: 'rgba(255, 255, 0, 0.5)',

    border: '#6fc3df',
    badgeBackground: '#000000',
    badgeText: '#ffffff',
    buttonBackground: '#000000',
    buttonText: '#ffffff',
    buttonHover: '#ffffff',
    scrollbar: 'rgba(255, 255, 255, 0.4)',
    scrollbarHover: 'rgba(255, 255, 255, 0.7)',

    tokens: {
      keyword: '#569cd6',
      string: '#ce9178',
      number: '#b5cea8',
      comment: '#7ca668',
      operator: '#ffffff',
      punctuation: '#ffffff',
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
      invalid: '#f48771',
    },
  },
});

export default highContrastDark;
