/**
 * Tests for Codeshine engine
 */

import { describe, it, expect } from 'vitest';
import { Codeshine } from '../../src/core/engine.js';

describe('Codeshine', () => {
  it('should create an instance', () => {
    const codeshine = new Codeshine();
    expect(codeshine).toBeInstanceOf(Codeshine);
  });

  it('should highlight code', () => {
    const codeshine = new Codeshine();
    const html = codeshine.highlight('const x = 1;', { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('const');
  });

  it('should use default language', () => {
    const codeshine = new Codeshine({ defaultLanguage: 'javascript' });
    const html = codeshine.highlight('const x = 1;');

    expect(html).toContain('cs-keyword');
  });

  it('should set theme', () => {
    const codeshine = new Codeshine();
    codeshine.setTheme('dracula');

    const theme = codeshine.getTheme();
    expect(theme.name).toBe('dracula');
  });

  it('should set language', () => {
    const codeshine = new Codeshine();
    codeshine.setLanguage('typescript');

    const html = codeshine.highlight('const x: number = 1;');
    expect(html).toContain('cs-codeblock');
  });

  it('should register custom language', () => {
    const codeshine = new Codeshine();

    codeshine.registerLanguage({
      name: 'custom',
      patterns: [
        { pattern: /CUSTOM/, type: 'keyword' },
      ],
    });

    expect(codeshine.getLanguages()).toContain('custom');
  });

  it('should register custom theme', () => {
    const codeshine = new Codeshine();

    codeshine.registerTheme({
      name: 'custom-theme',
      type: 'dark',
      colors: {
        background: '#000',
        foreground: '#fff',
        lineNumber: '#888',
        lineNumberActive: '#fff',
        lineHighlight: 'rgba(255,255,255,0.1)',
        selection: 'rgba(255,255,255,0.2)',
        cursor: '#fff',
        gutterBackground: '#000',
        gutterBorder: '#000',
        diffAddedBackground: '#0f0',
        diffAddedText: '#0f0',
        diffRemovedBackground: '#f00',
        diffRemovedText: '#f00',
        diffModifiedBackground: '#ff0',
        diffModifiedText: '#ff0',
        focusDimmed: 'rgba(255,255,255,0.4)',
        wordHighlight: 'rgba(255,255,0,0.4)',
        border: '#333',
        badgeBackground: '#333',
        badgeText: '#fff',
        buttonBackground: '#333',
        buttonText: '#fff',
        buttonHover: '#444',
        scrollbar: 'rgba(255,255,255,0.2)',
        scrollbarHover: 'rgba(255,255,255,0.3)',
        tokens: {
          keyword: '#f00',
          string: '#0f0',
          number: '#00f',
          comment: '#888',
          operator: '#fff',
          punctuation: '#fff',
          function: '#ff0',
          variable: '#0ff',
          class: '#f0f',
          type: '#f0f',
          constant: '#00f',
          property: '#0ff',
          attribute: '#0ff',
          tag: '#f00',
          regexp: '#0f0',
          escape: '#ff0',
          interpolation: '#f00',
          meta: '#f0f',
          invalid: '#f00',
        },
      },
    });

    expect(codeshine.getThemes()).toContain('custom-theme');
  });

  it('should use plugins', () => {
    const codeshine = new Codeshine();

    let initCalled = false;
    codeshine.use({
      name: 'test-plugin',
      onInit: () => {
        initCalled = true;
      },
    });

    expect(initCalled).toBe(true);
  });

  it('should get all registered languages', () => {
    const codeshine = new Codeshine();
    const languages = codeshine.getLanguages();

    expect(languages).toContain('javascript');
    expect(languages).toContain('typescript');
    expect(languages).toContain('html');
    expect(languages).toContain('css');
  });

  it('should get all registered themes', () => {
    const codeshine = new Codeshine();
    const themes = codeshine.getThemes();

    expect(themes).toContain('github-dark');
    expect(themes).toContain('github-light');
    expect(themes).toContain('monokai');
    expect(themes).toContain('dracula');
  });

  it('should highlight async', async () => {
    const codeshine = new Codeshine();
    const html = await codeshine.highlightAsync('const x = 1;', { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
  });

  it('should stream highlight', async () => {
    const codeshine = new Codeshine();
    const code = 'line1\nline2\nline3';
    const chunks: string[] = [];

    for await (const chunk of codeshine.highlightStream(code, {
      language: 'javascript',
      chunkSize: 1,
    })) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should chain method calls', () => {
    const codeshine = new Codeshine()
      .setTheme('dracula')
      .setLanguage('typescript');

    expect(codeshine.getTheme().name).toBe('dracula');
  });

  it('should pass custom languages in constructor', () => {
    const customLang = {
      name: 'mycustom',
      patterns: [{ pattern: /TEST/, type: 'keyword' as const }],
    };
    const codeshine = new Codeshine({ languages: [customLang] });

    expect(codeshine.getLanguages()).toContain('mycustom');
  });

  it('should pass custom themes in constructor', () => {
    const customTheme = {
      name: 'my-custom-theme',
      type: 'dark' as const,
      colors: {
        background: '#111',
        foreground: '#eee',
        lineNumber: '#888',
        lineNumberActive: '#fff',
        lineHighlight: 'rgba(255,255,255,0.1)',
        selection: 'rgba(255,255,255,0.2)',
        cursor: '#fff',
        gutterBackground: '#111',
        gutterBorder: '#333',
        diffAddedBackground: '#0f0',
        diffAddedText: '#0f0',
        diffRemovedBackground: '#f00',
        diffRemovedText: '#f00',
        diffModifiedBackground: '#ff0',
        diffModifiedText: '#ff0',
        focusDimmed: 'rgba(255,255,255,0.4)',
        wordHighlight: 'rgba(255,255,0,0.4)',
        border: '#333',
        badgeBackground: '#333',
        badgeText: '#fff',
        buttonBackground: '#333',
        buttonText: '#fff',
        buttonHover: '#444',
        scrollbar: 'rgba(255,255,255,0.2)',
        scrollbarHover: 'rgba(255,255,255,0.3)',
        tokens: {
          keyword: '#f00',
          string: '#0f0',
          number: '#00f',
          comment: '#888',
          operator: '#fff',
          punctuation: '#fff',
          function: '#ff0',
          variable: '#0ff',
          class: '#f0f',
          type: '#f0f',
          constant: '#00f',
          property: '#0ff',
          attribute: '#0ff',
          tag: '#f00',
          regexp: '#0f0',
          escape: '#ff0',
          interpolation: '#f00',
          meta: '#f0f',
          invalid: '#f00',
        },
      },
    };
    const codeshine = new Codeshine({ themes: [customTheme] });

    expect(codeshine.getThemes()).toContain('my-custom-theme');
  });

  it('should pass theme in constructor', () => {
    const codeshine = new Codeshine({ theme: 'monokai' });

    expect(codeshine.getTheme().name).toBe('monokai');
  });

  it('should pass plugins in constructor', () => {
    let initCalled = false;
    const _codeshine = new Codeshine({
      plugins: [
        {
          name: 'constructor-plugin',
          onInit: () => {
            initCalled = true;
          },
        },
      ],
    });

    expect(initCalled).toBe(true);
  });

  it('should render plain text without language', () => {
    const codeshine = new Codeshine();
    const html = codeshine.highlight('plain text', {});

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('plain text');
  });

  it('should use plugin onBeforeHighlight hook', () => {
    const codeshine = new Codeshine({ defaultLanguage: 'javascript' });
    codeshine.use({
      name: 'before-plugin',
      onBeforeHighlight: (code, options) => ({
        code: code.toUpperCase(),
        options,
      }),
    });

    const html = codeshine.highlight('const x = 1;');

    expect(html).toContain('CONST');
  });

  it('should use plugin onAfterTokenize hook', () => {
    const codeshine = new Codeshine({ defaultLanguage: 'javascript' });
    let tokensCalled = false;
    codeshine.use({
      name: 'tokenize-plugin',
      onAfterTokenize: (tokens) => {
        tokensCalled = true;
        return tokens;
      },
    });

    codeshine.highlight('const x = 1;');

    expect(tokensCalled).toBe(true);
  });

  it('should use plugin onBeforeRender hook', () => {
    const codeshine = new Codeshine({ defaultLanguage: 'javascript' });
    let renderCalled = false;
    codeshine.use({
      name: 'render-plugin',
      onBeforeRender: (tokens, _options) => {
        renderCalled = true;
        return tokens;
      },
    });

    codeshine.highlight('const x = 1;');

    expect(renderCalled).toBe(true);
  });

  it('should use plugin onAfterRender hook', () => {
    const codeshine = new Codeshine({ defaultLanguage: 'javascript' });
    codeshine.use({
      name: 'after-render-plugin',
      onAfterRender: (html) => {
        return html + '<!-- after -->';
      },
    });

    const html = codeshine.highlight('const x = 1;');

    expect(html).toContain('<!-- after -->');
  });

  it('should register plugin languages', () => {
    const codeshine = new Codeshine();
    codeshine.use({
      name: 'lang-plugin',
      languages: [
        {
          name: 'plugin-lang',
          patterns: [{ pattern: /PLUGIN/, type: 'keyword' }],
        },
      ],
    });

    expect(codeshine.getLanguages()).toContain('plugin-lang');
  });

  it('should register plugin themes', () => {
    const codeshine = new Codeshine();
    codeshine.use({
      name: 'theme-plugin',
      themes: [
        {
          name: 'plugin-theme',
          type: 'dark' as const,
          colors: {
            background: '#000',
            foreground: '#fff',
            lineNumber: '#888',
            lineNumberActive: '#fff',
            lineHighlight: 'rgba(255,255,255,0.1)',
            selection: 'rgba(255,255,255,0.2)',
            cursor: '#fff',
            gutterBackground: '#000',
            gutterBorder: '#000',
            diffAddedBackground: '#0f0',
            diffAddedText: '#0f0',
            diffRemovedBackground: '#f00',
            diffRemovedText: '#f00',
            diffModifiedBackground: '#ff0',
            diffModifiedText: '#ff0',
            focusDimmed: 'rgba(255,255,255,0.4)',
            wordHighlight: 'rgba(255,255,0,0.4)',
            border: '#333',
            badgeBackground: '#333',
            badgeText: '#fff',
            buttonBackground: '#333',
            buttonText: '#fff',
            buttonHover: '#444',
            scrollbar: 'rgba(255,255,255,0.2)',
            scrollbarHover: 'rgba(255,255,255,0.3)',
            tokens: {
              keyword: '#f00',
              string: '#0f0',
              number: '#00f',
              comment: '#888',
              operator: '#fff',
              punctuation: '#fff',
              function: '#ff0',
              variable: '#0ff',
              class: '#f0f',
              type: '#f0f',
              constant: '#00f',
              property: '#0ff',
              attribute: '#0ff',
              tag: '#f00',
              regexp: '#0f0',
              escape: '#ff0',
              interpolation: '#f00',
              meta: '#f0f',
              invalid: '#f00',
            },
          },
        },
      ],
    });

    expect(codeshine.getThemes()).toContain('plugin-theme');
  });

  it('should set theme with Theme object', () => {
    const customTheme = {
      name: 'inline-theme',
      type: 'dark' as const,
      colors: {
        background: '#222',
        foreground: '#ddd',
        lineNumber: '#888',
        lineNumberActive: '#fff',
        lineHighlight: 'rgba(255,255,255,0.1)',
        selection: 'rgba(255,255,255,0.2)',
        cursor: '#fff',
        gutterBackground: '#222',
        gutterBorder: '#333',
        diffAddedBackground: '#0f0',
        diffAddedText: '#0f0',
        diffRemovedBackground: '#f00',
        diffRemovedText: '#f00',
        diffModifiedBackground: '#ff0',
        diffModifiedText: '#ff0',
        focusDimmed: 'rgba(255,255,255,0.4)',
        wordHighlight: 'rgba(255,255,0,0.4)',
        border: '#333',
        badgeBackground: '#333',
        badgeText: '#fff',
        buttonBackground: '#333',
        buttonText: '#fff',
        buttonHover: '#444',
        scrollbar: 'rgba(255,255,255,0.2)',
        scrollbarHover: 'rgba(255,255,255,0.3)',
        tokens: {
          keyword: '#f00',
          string: '#0f0',
          number: '#00f',
          comment: '#888',
          operator: '#fff',
          punctuation: '#fff',
          function: '#ff0',
          variable: '#0ff',
          class: '#f0f',
          type: '#f0f',
          constant: '#00f',
          property: '#0ff',
          attribute: '#0ff',
          tag: '#f00',
          regexp: '#0f0',
          escape: '#ff0',
          interpolation: '#f00',
          meta: '#f0f',
          invalid: '#f00',
        },
      },
    };

    const codeshine = new Codeshine();
    codeshine.setTheme(customTheme);

    expect(codeshine.getTheme().name).toBe('inline-theme');
  });

  it('should handle unknown theme name', () => {
    const codeshine = new Codeshine();
    codeshine.setTheme('unknown-theme-name');

    // Should fall back to github-dark
    expect(codeshine.getTheme().name).toBe('github-dark');
  });

  it('should stream with onChunk callback', async () => {
    const codeshine = new Codeshine({ defaultLanguage: 'javascript' });
    const code = 'line1\nline2\nline3';
    const chunks: { html: string; progress: number }[] = [];

    for await (const _chunk of codeshine.highlightStream(code, {
      chunkSize: 1,
      onChunk: (html, progress) => {
        chunks.push({ html, progress });
      },
    })) {
      // just consume the generator
    }

    expect(chunks.length).toBeGreaterThan(0);
    expect(chunks[chunks.length - 1].progress).toBe(100);
  });

  it('should use theme option in highlight', () => {
    const codeshine = new Codeshine({ defaultLanguage: 'javascript' });
    const html = codeshine.highlight('const x = 1;', { theme: 'monokai' });

    expect(html).toContain('cs-codeblock');
  });
});
