/**
 * GitHub Light theme
 */

import { defineTheme } from '../define-theme.js';

export const githubLight = defineTheme({
  name: 'github-light',
  type: 'light',

  colors: {
    background: '#ffffff',
    foreground: '#24292e',
    lineNumber: '#959da5',
    lineNumberActive: '#24292e',
    lineHighlight: 'rgba(3, 102, 214, 0.05)',
    selection: 'rgba(3, 102, 214, 0.2)',
    cursor: '#24292e',

    gutterBackground: '#ffffff',
    gutterBorder: '#e1e4e8',

    diffAddedBackground: 'rgba(46, 160, 67, 0.15)',
    diffAddedText: '#22863a',
    diffRemovedBackground: 'rgba(248, 81, 73, 0.15)',
    diffRemovedText: '#cb2431',
    diffModifiedBackground: 'rgba(210, 153, 34, 0.15)',
    diffModifiedText: '#b08800',

    focusDimmed: 'rgba(36, 41, 46, 0.4)',
    wordHighlight: 'rgba(255, 223, 93, 0.5)',

    border: '#e1e4e8',
    badgeBackground: '#f6f8fa',
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
      operator: '#d73a49',
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
      interpolation: '#24292e',
      meta: '#6f42c1',
      invalid: '#cb2431',
    },
  },
});

export default githubLight;
