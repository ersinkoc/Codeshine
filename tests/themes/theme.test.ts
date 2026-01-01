/**
 * Tests for theme system
 */

import { describe, it, expect } from 'vitest';
import {
  defineTheme,
  extendTheme,
  registerTheme,
  getTheme,
  hasTheme,
  getThemeNames,
  generateCSSVars,
  generateCSSString,
  injectThemeStyles,
  removeThemeStyles,
} from '../../src/themes/index.js';
import { githubDark } from '../../src/themes/dark/github-dark.js';
import { githubLight } from '../../src/themes/light/github-light.js';
import type { Theme } from '../../src/core/types.js';

describe('defineTheme', () => {
  it('should create a theme with required properties', () => {
    const theme = defineTheme({
      name: 'test-theme',
      type: 'dark',
      colors: {
        background: '#1e1e1e',
        foreground: '#d4d4d4',
        tokens: {
          keyword: '#569cd6',
          string: '#ce9178',
        },
      },
    });

    expect(theme.name).toBe('test-theme');
    expect(theme.type).toBe('dark');
    expect(theme.colors.background).toBe('#1e1e1e');
    expect(theme.colors.tokens.keyword).toBe('#569cd6');
  });

  it('should include optional properties', () => {
    const theme = defineTheme({
      name: 'custom-theme',
      type: 'light',
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        tokens: {},
      },
      fonts: {
        family: 'Fira Code',
        size: '14px',
        lineHeight: '1.6',
      },
      spacing: {
        padding: '16px',
      },
      borders: {
        radius: '8px',
      },
    });

    expect(theme.fonts?.family).toBe('Fira Code');
    expect(theme.spacing?.padding).toBe('16px');
    expect(theme.borders?.radius).toBe('8px');
  });
});

describe('extendTheme', () => {
  it('should extend an existing theme', () => {
    const extended = extendTheme(githubDark, {
      name: 'github-dark-custom',
      colors: {
        background: '#000000',
      },
    });

    expect(extended.name).toBe('github-dark-custom');
    expect(extended.colors.background).toBe('#000000');
    expect(extended.colors.foreground).toBe(githubDark.colors.foreground);
    expect(extended.type).toBe('dark');
  });

  it('should preserve base theme token colors', () => {
    const extended = extendTheme(githubDark, {
      name: 'extended',
    });

    expect(extended.colors.tokens).toEqual(githubDark.colors.tokens);
  });

  it('should allow overriding specific token colors', () => {
    const extended = extendTheme(githubDark, {
      name: 'extended',
      colors: {
        tokens: {
          keyword: '#ff0000',
        },
      },
    });

    expect(extended.colors.tokens.keyword).toBe('#ff0000');
  });
});

describe('registerTheme / getTheme / hasTheme', () => {
  it('should register and retrieve a theme', () => {
    const theme = defineTheme({
      name: 'my-custom-theme',
      type: 'dark',
      colors: {
        background: '#1a1a1a',
        foreground: '#ffffff',
        tokens: {},
      },
    });

    registerTheme(theme);

    expect(hasTheme('my-custom-theme')).toBe(true);
    expect(getTheme('my-custom-theme')).toBe(theme);
  });

  it('should return undefined for non-existent theme', () => {
    expect(getTheme('non-existent')).toBeUndefined();
  });

  it('should return false for non-existent theme', () => {
    expect(hasTheme('non-existent')).toBe(false);
  });
});

describe('getThemeNames', () => {
  it('should return array of theme names', () => {
    const names = getThemeNames();

    expect(Array.isArray(names)).toBe(true);
    expect(names.length).toBeGreaterThan(0);
  });

  it('should include registered themes', () => {
    const theme = defineTheme({
      name: 'registered-test-theme',
      type: 'dark',
      colors: {
        background: '#000',
        foreground: '#fff',
        tokens: {},
      },
    });
    registerTheme(theme);

    const names = getThemeNames();
    expect(names).toContain('registered-test-theme');
  });
});

describe('generateCSSVars', () => {
  it('should generate CSS variables object', () => {
    const vars = generateCSSVars(githubDark);

    // Uses --cs-bg prefix for background
    expect(vars).toHaveProperty('--cs-bg');
    expect(vars).toHaveProperty('--cs-fg');
    expect(vars['--cs-bg']).toBe(githubDark.colors.background);
  });

  it('should include token color variables', () => {
    const vars = generateCSSVars(githubDark);

    expect(vars).toHaveProperty('--cs-token-keyword');
    expect(vars).toHaveProperty('--cs-token-string');
  });

  it('should include font variables if present', () => {
    const theme = defineTheme({
      name: 'test',
      type: 'dark',
      colors: {
        background: '#000',
        foreground: '#fff',
        tokens: {},
      },
      fonts: {
        family: 'Monaco',
        size: '12px',
        lineHeight: '1.5',
      },
    });

    const vars = generateCSSVars(theme);

    expect(vars['--cs-font-family']).toBe('Monaco');
    expect(vars['--cs-font-size']).toBe('12px');
    expect(vars['--cs-line-height']).toBe('1.5');
  });
});

describe('generateCSSString', () => {
  it('should generate CSS string', () => {
    const css = generateCSSString(githubDark);

    expect(typeof css).toBe('string');
    expect(css).toContain(':root');
    expect(css).toContain('--cs-bg');
  });

  it('should include custom selector', () => {
    const css = generateCSSString(githubDark, '.custom-code');

    expect(css).toContain('.custom-code');
  });

  it('should include token color variables', () => {
    const css = generateCSSString(githubDark);

    expect(css).toContain('--cs-token-keyword');
    expect(css).toContain('--cs-token-string');
    expect(css).toContain('--cs-token-comment');
  });
});

describe('injectThemeStyles / removeThemeStyles', () => {
  it('should not throw in Node environment', () => {
    // In Node.js, document is undefined so these functions return early
    expect(() => injectThemeStyles(githubDark)).not.toThrow();
    expect(() => injectThemeStyles(githubDark, { scope: '.code', id: 'test-id' })).not.toThrow();
  });

  it('should not throw when removing styles in Node environment', () => {
    expect(() => removeThemeStyles('github-dark')).not.toThrow();
  });
});

describe('built-in themes', () => {
  it('github-dark should have correct properties', () => {
    expect(githubDark.name).toBe('github-dark');
    expect(githubDark.type).toBe('dark');
    expect(githubDark.colors.background).toBeDefined();
    expect(githubDark.colors.tokens.keyword).toBeDefined();
  });

  it('github-light should have correct properties', () => {
    expect(githubLight.name).toBe('github-light');
    expect(githubLight.type).toBe('light');
    expect(githubLight.colors.background).toBeDefined();
    expect(githubLight.colors.tokens.keyword).toBeDefined();
  });

  it('all themes should have required token colors', () => {
    const themes: Theme[] = [githubDark, githubLight];
    const requiredTokens = ['keyword', 'string', 'comment', 'number', 'function'];

    for (const theme of themes) {
      for (const token of requiredTokens) {
        expect(theme.colors.tokens[token as keyof typeof theme.colors.tokens]).toBeDefined();
      }
    }
  });
});
