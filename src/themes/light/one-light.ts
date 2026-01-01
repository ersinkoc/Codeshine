/**
 * One Light theme (Atom)
 */

import { defineTheme } from '../define-theme.js';

export const oneLight = defineTheme({
  name: 'one-light',
  type: 'light',

  colors: {
    background: '#fafafa',
    foreground: '#383a42',
    lineNumber: '#9d9d9f',
    lineNumberActive: '#383a42',
    lineHighlight: 'rgba(0, 0, 0, 0.04)',
    selection: 'rgba(56, 58, 66, 0.08)',
    cursor: '#526fff',

    gutterBackground: '#fafafa',
    gutterBorder: '#fafafa',

    diffAddedBackground: 'rgba(80, 161, 79, 0.15)',
    diffAddedText: '#50a14f',
    diffRemovedBackground: 'rgba(228, 86, 73, 0.15)',
    diffRemovedText: '#e45649',
    diffModifiedBackground: 'rgba(193, 132, 1, 0.15)',
    diffModifiedText: '#c18401',

    focusDimmed: 'rgba(56, 58, 66, 0.4)',
    wordHighlight: 'rgba(193, 132, 1, 0.3)',

    border: '#dbdbdc',
    badgeBackground: '#e5e5e6',
    badgeText: '#383a42',
    buttonBackground: '#e5e5e6',
    buttonText: '#383a42',
    buttonHover: '#d4d4d5',
    scrollbar: 'rgba(0, 0, 0, 0.2)',
    scrollbarHover: 'rgba(0, 0, 0, 0.35)',

    tokens: {
      keyword: '#a626a4',
      string: '#50a14f',
      number: '#986801',
      comment: '#a0a1a7',
      operator: '#0184bc',
      punctuation: '#383a42',
      function: '#4078f2',
      variable: '#e45649',
      class: '#c18401',
      type: '#c18401',
      constant: '#986801',
      property: '#e45649',
      attribute: '#986801',
      tag: '#e45649',
      regexp: '#50a14f',
      escape: '#0184bc',
      interpolation: '#383a42',
      meta: '#a626a4',
      invalid: '#e45649',
    },
  },
});

export default oneLight;
