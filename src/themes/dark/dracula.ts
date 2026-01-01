/**
 * Dracula theme
 */

import { defineTheme } from '../define-theme.js';

export const dracula = defineTheme({
  name: 'dracula',
  type: 'dark',

  colors: {
    background: '#282a36',
    foreground: '#f8f8f2',
    lineNumber: '#6272a4',
    lineNumberActive: '#f8f8f2',
    lineHighlight: 'rgba(68, 71, 90, 0.5)',
    selection: 'rgba(68, 71, 90, 1)',
    cursor: '#f8f8f2',

    gutterBackground: '#282a36',
    gutterBorder: '#282a36',

    diffAddedBackground: 'rgba(80, 250, 123, 0.2)',
    diffAddedText: '#50fa7b',
    diffRemovedBackground: 'rgba(255, 85, 85, 0.2)',
    diffRemovedText: '#ff5555',
    diffModifiedBackground: 'rgba(255, 184, 108, 0.2)',
    diffModifiedText: '#ffb86c',

    focusDimmed: 'rgba(248, 248, 242, 0.4)',
    wordHighlight: 'rgba(241, 250, 140, 0.4)',

    border: '#44475a',
    badgeBackground: '#44475a',
    badgeText: '#f8f8f2',
    buttonBackground: '#44475a',
    buttonText: '#f8f8f2',
    buttonHover: '#6272a4',
    scrollbar: 'rgba(98, 114, 164, 0.4)',
    scrollbarHover: 'rgba(98, 114, 164, 0.7)',

    tokens: {
      keyword: '#ff79c6',
      string: '#f1fa8c',
      number: '#bd93f9',
      comment: '#6272a4',
      operator: '#ff79c6',
      punctuation: '#f8f8f2',
      function: '#50fa7b',
      variable: '#f8f8f2',
      class: '#8be9fd',
      type: '#8be9fd',
      constant: '#bd93f9',
      property: '#f8f8f2',
      attribute: '#50fa7b',
      tag: '#ff79c6',
      regexp: '#f1fa8c',
      escape: '#ff79c6',
      interpolation: '#f8f8f2',
      meta: '#ff79c6',
      invalid: '#ff5555',
    },
  },
});

export default dracula;
