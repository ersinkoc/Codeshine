/**
 * Dockerfile language definition
 */

import { defineLang } from '../define-lang.js';

export const dockerfile = defineLang({
  name: 'dockerfile',
  aliases: ['docker'],
  extensions: ['Dockerfile', '.dockerfile'],
  mimeTypes: ['text/x-dockerfile'],

  keywords: [
    'ADD', 'ARG', 'CMD', 'COPY', 'ENTRYPOINT', 'ENV', 'EXPOSE',
    'FROM', 'HEALTHCHECK', 'LABEL', 'MAINTAINER', 'ONBUILD', 'RUN',
    'SHELL', 'STOPSIGNAL', 'USER', 'VOLUME', 'WORKDIR',
  ],

  patterns: [
    { pattern: /^(?:FROM|RUN|CMD|LABEL|MAINTAINER|EXPOSE|ENV|ADD|COPY|ENTRYPOINT|VOLUME|USER|WORKDIR|ARG|ONBUILD|STOPSIGNAL|HEALTHCHECK|SHELL)\b/mi, type: 'keyword' },
    { pattern: /--[\w-]+=/, type: 'attribute' },
    { pattern: /\$\{[\w:-]+\}|\$[\w]+/, type: 'variable' },
    { pattern: /\b\d+\b/, type: 'number' },
    { pattern: /(?<=AS\s+)\w+/i, type: 'variable' },
  ],

  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
  ],

  comments: {
    line: '#',
  },

  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
  ],
});

export default dockerfile;
