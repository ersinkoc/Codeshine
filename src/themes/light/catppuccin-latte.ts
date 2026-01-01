/**
 * Catppuccin Latte theme (Light)
 */

import { defineTheme } from '../define-theme.js';

export const catppuccinLatte = defineTheme({
  name: 'catppuccin-latte',
  type: 'light',

  colors: {
    background: '#eff1f5',
    foreground: '#4c4f69',
    lineNumber: '#8c8fa1',
    lineNumberActive: '#4c4f69',
    lineHighlight: 'rgba(172, 176, 190, 0.3)',
    selection: 'rgba(172, 176, 190, 0.5)',
    cursor: '#dc8a78',

    gutterBackground: '#eff1f5',
    gutterBorder: '#eff1f5',

    diffAddedBackground: 'rgba(64, 160, 43, 0.15)',
    diffAddedText: '#40a02b',
    diffRemovedBackground: 'rgba(210, 15, 57, 0.15)',
    diffRemovedText: '#d20f39',
    diffModifiedBackground: 'rgba(223, 142, 29, 0.15)',
    diffModifiedText: '#df8e1d',

    focusDimmed: 'rgba(76, 79, 105, 0.4)',
    wordHighlight: 'rgba(223, 142, 29, 0.3)',

    border: '#ccd0da',
    badgeBackground: '#ccd0da',
    badgeText: '#4c4f69',
    buttonBackground: '#ccd0da',
    buttonText: '#4c4f69',
    buttonHover: '#bcc0cc',
    scrollbar: 'rgba(140, 143, 161, 0.4)',
    scrollbarHover: 'rgba(140, 143, 161, 0.7)',

    tokens: {
      keyword: '#8839ef',
      string: '#40a02b',
      number: '#fe640b',
      comment: '#9ca0b0',
      operator: '#04a5e5',
      punctuation: '#4c4f69',
      function: '#1e66f5',
      variable: '#ea76cb',
      class: '#df8e1d',
      type: '#df8e1d',
      constant: '#fe640b',
      property: '#04a5e5',
      attribute: '#df8e1d',
      tag: '#d20f39',
      regexp: '#40a02b',
      escape: '#dd7878',
      interpolation: '#4c4f69',
      meta: '#8839ef',
      invalid: '#d20f39',
    },
  },
});

export default catppuccinLatte;
