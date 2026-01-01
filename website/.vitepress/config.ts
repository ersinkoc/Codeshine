import { defineConfig } from 'vitepress';
// Use relative path to dist for CI/CD compatibility
// Path is relative to .vitepress/config.ts -> ../../dist
import { Codeshine } from '../../dist/esm/core/engine.js';
import { themes } from '../../dist/esm/themes/index.js';

// Create Codeshine instance for syntax highlighting
const codeshine = new Codeshine({
  theme: themes.vsDark,
});

export default defineConfig({
  title: 'Codeshine',
  description: 'Zero-dependency syntax highlighter for the modern web',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],

  markdown: {
    // Use Codeshine for code highlighting
    highlight: (code, lang) => {
      try {
        return codeshine.highlight(code, {
          language: lang || 'text',
          lineNumbers: false,
        });
      } catch {
        return `<pre><code>${code}</code></pre>`;
      }
    },
  },

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' },
      { text: 'Themes', link: '/guide/themes' },
      { text: 'Languages', link: '/guide/languages' },
      {
        text: 'v1.0.0',
        items: [
          { text: 'GitHub', link: 'https://github.com/ersinkoc/codeshine' },
        ],
      },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'What is Codeshine?', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Examples', link: '/guide/examples' },
          ],
        },
        {
          text: 'Customization',
          items: [
            { text: 'Themes', link: '/guide/themes' },
            { text: 'Languages', link: '/guide/languages' },
          ],
        },
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Overview', link: '/api/' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ersinkoc/codeshine' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@oxog/codeshine' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Ersin KOÇ',
    },

    search: {
      provider: 'local',
    },
  },
});
