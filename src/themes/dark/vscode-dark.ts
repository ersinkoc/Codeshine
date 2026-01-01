/**
 * VS Code Dark+ theme
 */

import { defineTheme } from '../define-theme.js';

export const vscodeDark = defineTheme({
  name: 'vscode-dark',
  type: 'dark',

  colors: {
    background: '#1e1e1e',
    foreground: '#d4d4d4',
    lineNumber: '#858585',
    lineNumberActive: '#c6c6c6',
    lineHighlight: 'rgba(255, 255, 255, 0.07)',
    selection: 'rgba(38, 79, 120, 0.5)',
    cursor: '#aeafad',

    gutterBackground: '#1e1e1e',
    gutterBorder: '#1e1e1e',

    diffAddedBackground: 'rgba(35, 134, 54, 0.2)',
    diffAddedText: '#3fb950',
    diffRemovedBackground: 'rgba(248, 81, 73, 0.2)',
    diffRemovedText: '#f85149',
    diffModifiedBackground: 'rgba(210, 153, 34, 0.2)',
    diffModifiedText: '#d29922',

    focusDimmed: 'rgba(212, 212, 212, 0.4)',
    wordHighlight: 'rgba(87, 87, 87, 0.7)',

    border: '#3c3c3c',
    badgeBackground: '#4d4d4d',
    badgeText: '#cccccc',
    buttonBackground: '#0e639c',
    buttonText: '#ffffff',
    buttonHover: '#1177bb',
    scrollbar: 'rgba(121, 121, 121, 0.4)',
    scrollbarHover: 'rgba(121, 121, 121, 0.7)',

    tokens: {
      keyword: '#569cd6',
      string: '#ce9178',
      number: '#b5cea8',
      comment: '#6a9955',
      operator: '#d4d4d4',
      punctuation: '#d4d4d4',
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
      invalid: '#f44747',
    },
  },
});

export default vscodeDark;
