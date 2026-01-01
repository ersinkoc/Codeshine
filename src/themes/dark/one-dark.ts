/**
 * One Dark theme (Atom)
 */

import { defineTheme } from '../define-theme.js';

export const oneDark = defineTheme({
  name: 'one-dark',
  type: 'dark',

  colors: {
    background: '#282c34',
    foreground: '#abb2bf',
    lineNumber: '#636d83',
    lineNumberActive: '#abb2bf',
    lineHighlight: 'rgba(99, 109, 131, 0.2)',
    selection: 'rgba(62, 68, 81, 1)',
    cursor: '#528bff',

    gutterBackground: '#282c34',
    gutterBorder: '#282c34',

    diffAddedBackground: 'rgba(152, 195, 121, 0.2)',
    diffAddedText: '#98c379',
    diffRemovedBackground: 'rgba(224, 108, 117, 0.2)',
    diffRemovedText: '#e06c75',
    diffModifiedBackground: 'rgba(229, 192, 123, 0.2)',
    diffModifiedText: '#e5c07b',

    focusDimmed: 'rgba(171, 178, 191, 0.4)',
    wordHighlight: 'rgba(229, 192, 123, 0.4)',

    border: '#3e4451',
    badgeBackground: '#3e4451',
    badgeText: '#abb2bf',
    buttonBackground: '#3e4451',
    buttonText: '#abb2bf',
    buttonHover: '#4b5263',
    scrollbar: 'rgba(99, 109, 131, 0.4)',
    scrollbarHover: 'rgba(99, 109, 131, 0.7)',

    tokens: {
      keyword: '#c678dd',
      string: '#98c379',
      number: '#d19a66',
      comment: '#5c6370',
      operator: '#56b6c2',
      punctuation: '#abb2bf',
      function: '#61afef',
      variable: '#e06c75',
      class: '#e5c07b',
      type: '#e5c07b',
      constant: '#d19a66',
      property: '#e06c75',
      attribute: '#d19a66',
      tag: '#e06c75',
      regexp: '#98c379',
      escape: '#56b6c2',
      interpolation: '#abb2bf',
      meta: '#c678dd',
      invalid: '#e06c75',
    },
  },
});

export default oneDark;
