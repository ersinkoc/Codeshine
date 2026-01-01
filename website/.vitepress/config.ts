import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Codeshine',
  description: 'Zero-dependency syntax highlighter for the modern web',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
  ],

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
          { text: 'GitHub', link: 'https://github.com/nicosxt/codeshine' },
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
      { icon: 'github', link: 'https://github.com/nicosxt/codeshine' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/@oxog/codeshine' },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present OXOG',
    },

    search: {
      provider: 'local',
    },
  },
});
