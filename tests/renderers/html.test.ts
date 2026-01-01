/**
 * Tests for HTML renderer exports
 */

import { describe, it, expect } from 'vitest';
import {
  render,
  renderLine,
  renderToken,
  renderTokens,
  getTokenClass,
} from '../../src/renderers/html/index.js';
import { githubDark } from '../../src/themes/dark/github-dark.js';
import type { Token, LineData } from '../../src/core/types.js';

describe('HTML renderer exports', () => {
  it('should export render function', () => {
    expect(typeof render).toBe('function');
  });

  it('should export renderLine function', () => {
    expect(typeof renderLine).toBe('function');
  });

  it('should export renderToken function', () => {
    expect(typeof renderToken).toBe('function');
  });

  it('should export renderTokens function', () => {
    expect(typeof renderTokens).toBe('function');
  });

  it('should export getTokenClass function', () => {
    expect(typeof getTokenClass).toBe('function');
  });

  it('should render with exported functions', () => {
    const token: Token = { type: 'keyword', value: 'const', start: 0, end: 5 };
    const html = renderToken(token, githubDark);

    expect(html).toContain('const');
    expect(html).toContain('cs-keyword');
  });

  it('should render lines with exported render function', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'test',
        tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, { theme: githubDark });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('test');
  });
});
