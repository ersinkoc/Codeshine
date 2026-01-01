/**
 * Monokai theme
 */

import { defineTheme } from '../define-theme.js';

export const monokai = defineTheme({
  name: 'monokai',
  type: 'dark',

  colors: {
    background: '#272822',
    foreground: '#f8f8f2',
    lineNumber: '#90908a',
    lineNumberActive: '#f8f8f2',
    lineHighlight: 'rgba(255, 255, 255, 0.07)',
    selection: 'rgba(73, 72, 62, 0.5)',
    cursor: '#f8f8f0',

    gutterBackground: '#272822',
    gutterBorder: '#272822',

    diffAddedBackground: 'rgba(166, 226, 46, 0.2)',
    diffAddedText: '#a6e22e',
    diffRemovedBackground: 'rgba(249, 38, 114, 0.2)',
    diffRemovedText: '#f92672',
    diffModifiedBackground: 'rgba(230, 219, 116, 0.2)',
    diffModifiedText: '#e6db74',

    focusDimmed: 'rgba(248, 248, 242, 0.4)',
    wordHighlight: 'rgba(230, 219, 116, 0.4)',

    border: '#49483e',
    badgeBackground: '#49483e',
    badgeText: '#f8f8f2',
    buttonBackground: '#49483e',
    buttonText: '#f8f8f2',
    buttonHover: '#75715e',
    scrollbar: 'rgba(121, 121, 121, 0.4)',
    scrollbarHover: 'rgba(121, 121, 121, 0.7)',

    tokens: {
      keyword: '#f92672',
      string: '#e6db74',
      number: '#ae81ff',
      comment: '#75715e',
      operator: '#f92672',
      punctuation: '#f8f8f2',
      function: '#a6e22e',
      variable: '#f8f8f2',
      class: '#a6e22e',
      type: '#66d9ef',
      constant: '#ae81ff',
      property: '#f8f8f2',
      attribute: '#a6e22e',
      tag: '#f92672',
      regexp: '#e6db74',
      escape: '#ae81ff',
      interpolation: '#f8f8f2',
      meta: '#f92672',
      invalid: '#f92672',
    },
  },
});

export default monokai;
