/**
 * Tokyo Night theme
 */

import { defineTheme } from '../define-theme.js';

export const tokyoNight = defineTheme({
  name: 'tokyo-night',
  type: 'dark',

  colors: {
    background: '#1a1b26',
    foreground: '#a9b1d6',
    lineNumber: '#3b4261',
    lineNumberActive: '#a9b1d6',
    lineHighlight: 'rgba(41, 46, 66, 1)',
    selection: 'rgba(45, 51, 81, 1)',
    cursor: '#c0caf5',

    gutterBackground: '#1a1b26',
    gutterBorder: '#1a1b26',

    diffAddedBackground: 'rgba(115, 218, 202, 0.15)',
    diffAddedText: '#73daca',
    diffRemovedBackground: 'rgba(247, 118, 142, 0.15)',
    diffRemovedText: '#f7768e',
    diffModifiedBackground: 'rgba(224, 175, 104, 0.15)',
    diffModifiedText: '#e0af68',

    focusDimmed: 'rgba(169, 177, 214, 0.4)',
    wordHighlight: 'rgba(224, 175, 104, 0.4)',

    border: '#292e42',
    badgeBackground: '#292e42',
    badgeText: '#a9b1d6',
    buttonBackground: '#292e42',
    buttonText: '#a9b1d6',
    buttonHover: '#3b4261',
    scrollbar: 'rgba(59, 66, 97, 0.4)',
    scrollbarHover: 'rgba(59, 66, 97, 0.7)',

    tokens: {
      keyword: '#bb9af7',
      string: '#9ece6a',
      number: '#ff9e64',
      comment: '#565f89',
      operator: '#89ddff',
      punctuation: '#a9b1d6',
      function: '#7aa2f7',
      variable: '#c0caf5',
      class: '#f7768e',
      type: '#2ac3de',
      constant: '#ff9e64',
      property: '#7dcfff',
      attribute: '#bb9af7',
      tag: '#f7768e',
      regexp: '#b4f9f8',
      escape: '#89ddff',
      interpolation: '#c0caf5',
      meta: '#bb9af7',
      invalid: '#f7768e',
    },
  },
});

export default tokyoNight;
