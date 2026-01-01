/**
 * Nord theme
 */

import { defineTheme } from '../define-theme.js';

export const nord = defineTheme({
  name: 'nord',
  type: 'dark',

  colors: {
    background: '#2e3440',
    foreground: '#d8dee9',
    lineNumber: '#4c566a',
    lineNumberActive: '#d8dee9',
    lineHighlight: 'rgba(76, 86, 106, 0.3)',
    selection: 'rgba(76, 86, 106, 1)',
    cursor: '#d8dee9',

    gutterBackground: '#2e3440',
    gutterBorder: '#2e3440',

    diffAddedBackground: 'rgba(163, 190, 140, 0.2)',
    diffAddedText: '#a3be8c',
    diffRemovedBackground: 'rgba(191, 97, 106, 0.2)',
    diffRemovedText: '#bf616a',
    diffModifiedBackground: 'rgba(235, 203, 139, 0.2)',
    diffModifiedText: '#ebcb8b',

    focusDimmed: 'rgba(216, 222, 233, 0.4)',
    wordHighlight: 'rgba(235, 203, 139, 0.4)',

    border: '#4c566a',
    badgeBackground: '#3b4252',
    badgeText: '#d8dee9',
    buttonBackground: '#3b4252',
    buttonText: '#d8dee9',
    buttonHover: '#434c5e',
    scrollbar: 'rgba(76, 86, 106, 0.4)',
    scrollbarHover: 'rgba(76, 86, 106, 0.7)',

    tokens: {
      keyword: '#81a1c1',
      string: '#a3be8c',
      number: '#b48ead',
      comment: '#616e88',
      operator: '#81a1c1',
      punctuation: '#eceff4',
      function: '#88c0d0',
      variable: '#d8dee9',
      class: '#8fbcbb',
      type: '#8fbcbb',
      constant: '#b48ead',
      property: '#d8dee9',
      attribute: '#8fbcbb',
      tag: '#81a1c1',
      regexp: '#ebcb8b',
      escape: '#ebcb8b',
      interpolation: '#d8dee9',
      meta: '#5e81ac',
      invalid: '#bf616a',
    },
  },
});

export default nord;
