/**
 * High Contrast Light theme
 */

import { defineTheme } from '../define-theme.js';

export const highContrastLight = defineTheme({
  name: 'high-contrast-light',
  type: 'light',

  colors: {
    background: '#ffffff',
    foreground: '#000000',
    lineNumber: '#000000',
    lineNumberActive: '#0000ff',
    lineHighlight: 'rgba(0, 0, 0, 0.1)',
    selection: 'rgba(0, 0, 255, 0.3)',
    cursor: '#000000',

    gutterBackground: '#ffffff',
    gutterBorder: '#0f4a85',

    diffAddedBackground: 'rgba(0, 128, 0, 0.2)',
    diffAddedText: '#008000',
    diffRemovedBackground: 'rgba(255, 0, 0, 0.2)',
    diffRemovedText: '#ff0000',
    diffModifiedBackground: 'rgba(0, 0, 255, 0.2)',
    diffModifiedText: '#0000ff',

    focusDimmed: 'rgba(0, 0, 0, 0.4)',
    wordHighlight: 'rgba(255, 255, 0, 0.7)',

    border: '#0f4a85',
    badgeBackground: '#ffffff',
    badgeText: '#000000',
    buttonBackground: '#ffffff',
    buttonText: '#000000',
    buttonHover: '#000000',
    scrollbar: 'rgba(0, 0, 0, 0.4)',
    scrollbarHover: 'rgba(0, 0, 0, 0.7)',

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

export default highContrastLight;
