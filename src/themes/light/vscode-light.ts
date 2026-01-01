/**
 * VS Code Light+ theme
 */

import { defineTheme } from '../define-theme.js';

export const vscodeLight = defineTheme({
  name: 'vscode-light',
  type: 'light',

  colors: {
    background: '#ffffff',
    foreground: '#000000',
    lineNumber: '#237893',
    lineNumberActive: '#0b216f',
    lineHighlight: 'rgba(0, 0, 0, 0.04)',
    selection: 'rgba(173, 214, 255, 1)',
    cursor: '#000000',

    gutterBackground: '#ffffff',
    gutterBorder: '#ffffff',

    diffAddedBackground: 'rgba(35, 134, 54, 0.15)',
    diffAddedText: '#22863a',
    diffRemovedBackground: 'rgba(248, 81, 73, 0.15)',
    diffRemovedText: '#cb2431',
    diffModifiedBackground: 'rgba(210, 153, 34, 0.15)',
    diffModifiedText: '#b08800',

    focusDimmed: 'rgba(0, 0, 0, 0.4)',
    wordHighlight: 'rgba(87, 87, 87, 0.25)',

    border: '#e1e4e8',
    badgeBackground: '#e1e4e8',
    badgeText: '#000000',
    buttonBackground: '#007acc',
    buttonText: '#ffffff',
    buttonHover: '#0062a3',
    scrollbar: 'rgba(100, 100, 100, 0.4)',
    scrollbarHover: 'rgba(100, 100, 100, 0.7)',

    tokens: {
      keyword: '#0000ff',
      string: '#a31515',
      number: '#098658',
      comment: '#008000',
      operator: '#000000',
      punctuation: '#000000',
      function: '#795e26',
      variable: '#001080',
      class: '#267f99',
      type: '#267f99',
      constant: '#0070c1',
      property: '#001080',
      attribute: '#ff0000',
      tag: '#800000',
      regexp: '#811f3f',
      escape: '#ee0000',
      interpolation: '#000000',
      meta: '#af00db',
      invalid: '#cd3131',
    },
  },
});

export default vscodeLight;
