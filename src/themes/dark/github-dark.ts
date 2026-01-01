/**
 * GitHub Dark theme
 */

import { defineTheme } from '../define-theme.js';

export const githubDark = defineTheme({
  name: 'github-dark',
  type: 'dark',

  colors: {
    background: '#0d1117',
    foreground: '#c9d1d9',
    lineNumber: '#8b949e',
    lineNumberActive: '#c9d1d9',
    lineHighlight: 'rgba(110, 118, 129, 0.1)',
    selection: 'rgba(56, 139, 253, 0.4)',
    cursor: '#c9d1d9',

    gutterBackground: '#0d1117',
    gutterBorder: '#21262d',

    diffAddedBackground: 'rgba(46, 160, 67, 0.15)',
    diffAddedText: '#3fb950',
    diffRemovedBackground: 'rgba(248, 81, 73, 0.15)',
    diffRemovedText: '#f85149',
    diffModifiedBackground: 'rgba(210, 153, 34, 0.15)',
    diffModifiedText: '#d29922',

    focusDimmed: 'rgba(201, 209, 217, 0.4)',
    wordHighlight: 'rgba(210, 153, 34, 0.4)',

    border: '#30363d',
    badgeBackground: '#21262d',
    badgeText: '#c9d1d9',
    buttonBackground: '#21262d',
    buttonText: '#c9d1d9',
    buttonHover: '#30363d',
    scrollbar: 'rgba(110, 118, 129, 0.4)',
    scrollbarHover: 'rgba(110, 118, 129, 0.6)',

    tokens: {
      keyword: '#ff7b72',
      string: '#a5d6ff',
      number: '#79c0ff',
      comment: '#8b949e',
      operator: '#c9d1d9',
      punctuation: '#c9d1d9',
      function: '#d2a8ff',
      variable: '#ffa657',
      class: '#7ee787',
      type: '#7ee787',
      constant: '#79c0ff',
      property: '#79c0ff',
      attribute: '#7ee787',
      tag: '#7ee787',
      regexp: '#7ee787',
      escape: '#79c0ff',
      interpolation: '#ff7b72',
      meta: '#ff7b72',
      invalid: '#f85149',
    },
  },
});

export default githubDark;
