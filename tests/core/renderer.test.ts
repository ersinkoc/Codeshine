/**
 * Tests for renderer
 */

import { describe, it, expect } from 'vitest';
import {
  render,
  renderLine,
  renderToken,
  renderTokens,
  getTokenClass,
} from '../../src/core/renderer.js';
import { githubDark } from '../../src/themes/dark/github-dark.js';
import type { Token, LineData } from '../../src/core/types.js';

describe('getTokenClass', () => {
  it('should generate correct class name', () => {
    expect(getTokenClass('keyword')).toBe('cs-keyword');
    expect(getTokenClass('string')).toBe('cs-string');
    expect(getTokenClass('comment')).toBe('cs-comment');
  });
});

describe('renderToken', () => {
  it('should render token with color', () => {
    const token: Token = { type: 'keyword', value: 'const', start: 0, end: 5 };
    const html = renderToken(token, githubDark);

    expect(html).toContain('cs-keyword');
    expect(html).toContain('const');
    expect(html).toContain('<span');
  });

  it('should escape HTML in token value', () => {
    const token: Token = { type: 'string', value: '<script>', start: 0, end: 8 };
    const html = renderToken(token, githubDark);

    expect(html).toContain('&lt;script&gt;');
    expect(html).not.toContain('<script>');
  });

  it('should render token without inline color if not in theme', () => {
    const token: Token = { type: 'unknown-type', value: 'test', start: 0, end: 4 };
    const html = renderToken(token, githubDark);

    expect(html).toContain('cs-unknown-type');
    expect(html).toContain('test');
  });
});

describe('renderTokens', () => {
  it('should render multiple tokens', () => {
    const tokens: Token[] = [
      { type: 'keyword', value: 'const', start: 0, end: 5 },
      { type: 'plain', value: ' ', start: 5, end: 6 },
      { type: 'variable', value: 'x', start: 6, end: 7 },
    ];
    const html = renderTokens(tokens, githubDark);

    expect(html).toContain('const');
    expect(html).toContain('x');
    expect(html.split('<span').length).toBe(4); // 3 tokens + 1 for split
  });
});

describe('renderLine', () => {
  it('should render a line with tokens', () => {
    const line: LineData = {
      number: 1,
      content: 'const x = 1;',
      tokens: [
        { type: 'keyword', value: 'const', start: 0, end: 5 },
        { type: 'plain', value: ' ', start: 5, end: 6 },
        { type: 'variable', value: 'x', start: 6, end: 7 },
        { type: 'plain', value: ' = ', start: 7, end: 10 },
        { type: 'number', value: '1', start: 10, end: 11 },
        { type: 'punctuation', value: ';', start: 11, end: 12 },
      ],
      classes: ['cs-line'],
      attributes: {},
    };

    const html = renderLine(line, { theme: githubDark });

    expect(html).toContain('const');
    expect(html).toContain('cs-line-content');
  });

  it('should render line numbers when enabled', () => {
    const line: LineData = {
      number: 5,
      content: 'test',
      tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
      classes: ['cs-line'],
      attributes: {},
    };

    const html = renderLine(line, { theme: githubDark, lineNumbers: true });

    expect(html).toContain('cs-line-number');
    expect(html).toContain('5');
  });

  it('should apply highlighted line class', () => {
    const line: LineData = {
      number: 3,
      content: 'highlighted',
      tokens: [{ type: 'plain', value: 'highlighted', start: 0, end: 11 }],
      classes: ['cs-line'],
      attributes: {},
    };

    const html = renderLine(line, {
      theme: githubDark,
      highlightLines: [3],
    });

    expect(html).toContain('cs-line-highlighted');
  });

  it('should apply focused line class', () => {
    const line: LineData = {
      number: 2,
      content: 'focused',
      tokens: [{ type: 'plain', value: 'focused', start: 0, end: 7 }],
      classes: ['cs-line'],
      attributes: {},
    };

    const html = renderLine(line, {
      theme: githubDark,
      focusLines: [2],
    });

    expect(html).toContain('cs-line-focused');
  });

  it('should apply dimmed class for non-focused lines', () => {
    const line: LineData = {
      number: 1,
      content: 'dimmed',
      tokens: [{ type: 'plain', value: 'dimmed', start: 0, end: 6 }],
      classes: ['cs-line'],
      attributes: {},
    };

    const html = renderLine(line, {
      theme: githubDark,
      focusLines: [5, 6], // Different lines
    });

    expect(html).toContain('cs-line-dimmed');
  });

  it('should apply diff markers', () => {
    const addedLine: LineData = {
      number: 1,
      content: 'added',
      tokens: [{ type: 'plain', value: 'added', start: 0, end: 5 }],
      classes: ['cs-line'],
      attributes: {},
    };

    const html = renderLine(addedLine, {
      theme: githubDark,
      diffLines: { added: [1], removed: [], modified: [] },
    });

    expect(html).toContain('cs-line-diff-added');
    expect(html).toContain('cs-diff-marker');
    expect(html).toContain('+');
  });

  it('should apply word highlighting', () => {
    const line: LineData = {
      number: 1,
      content: 'hello world',
      tokens: [{ type: 'plain', value: 'hello world', start: 0, end: 11 }],
      classes: ['cs-line'],
      attributes: {},
    };

    const html = renderLine(line, {
      theme: githubDark,
      highlightWords: ['world'],
    });

    expect(html).toContain('cs-word-highlighted');
  });

  it('should use custom start line number', () => {
    const line: LineData = {
      number: 1,
      content: 'test',
      tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
      classes: ['cs-line'],
      attributes: {},
    };

    const html = renderLine(line, {
      theme: githubDark,
      lineNumbers: true,
      startLine: 100,
    });

    expect(html).toContain('100');
  });

  it('should include line attributes', () => {
    const line: LineData = {
      number: 1,
      content: 'test',
      tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
      classes: ['cs-line'],
      attributes: { 'data-line-id': 'line-1' },
    };

    const html = renderLine(line, { theme: githubDark });

    expect(html).toContain('data-line-id="line-1"');
  });
});

describe('render', () => {
  it('should render complete code block', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'const x = 1;',
        tokens: [{ type: 'plain', value: 'const x = 1;', start: 0, end: 12 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, { theme: githubDark });

    expect(html).toContain('<pre');
    expect(html).toContain('cs-codeblock');
    expect(html).toContain('<code');
    expect(html).toContain('cs-code');
    expect(html).toContain('</pre>');
  });

  it('should apply highlightRanges', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'const x = 1;',
        tokens: [{ type: 'plain', value: 'const x = 1;', start: 0, end: 12 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      highlightRanges: [{ line: 1, start: 0, end: 5 }],
    });

    expect(html).toContain('cs-codeblock');
  });

  it('should handle highlightRanges with out of bounds', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'test',
        tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      highlightRanges: [{ line: 1, start: -1, end: 100 }],
    });

    expect(html).toContain('cs-codeblock');
  });

  it('should handle highlightRanges with custom className', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'const x = 1;',
        tokens: [{ type: 'plain', value: 'const x = 1;', start: 0, end: 12 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      highlightRanges: [{ line: 1, start: 0, end: 5, className: 'custom-class' }],
    });

    expect(html).toContain('cs-codeblock');
  });

  it('should handle highlightRanges with custom style', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'const x = 1;',
        tokens: [{ type: 'plain', value: 'const x = 1;', start: 0, end: 12 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      highlightRanges: [{ line: 1, start: 0, end: 5, style: 'background: yellow;' }],
    });

    expect(html).toContain('cs-codeblock');
  });

  it('should include header with filename', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'test',
        tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      filename: 'example.js',
    });

    expect(html).toContain('cs-header');
    expect(html).toContain('cs-filename');
    expect(html).toContain('example.js');
  });

  it('should include copy button when enabled', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'test',
        tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      copyButton: true,
    });

    expect(html).toContain('cs-copy-button');
    expect(html).toContain('Copy');
  });

  it('should include language badge when enabled', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'test',
        tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      showLanguageBadge: true,
      language: 'javascript',
    });

    expect(html).toContain('cs-language-badge');
    expect(html).toContain('JavaScript');
  });

  it('should apply wrap class when wrapLines is true', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'test',
        tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      wrapLines: true,
    });

    expect(html).toContain('cs-wrap');
  });

  it('should apply max height style', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'test',
        tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      maxHeight: '400px',
    });

    expect(html).toContain('max-height:400px');
    expect(html).toContain('overflow-y:auto');
  });

  it('should apply collapsible classes', () => {
    const lines: LineData[] = [
      {
        number: 1,
        content: 'test',
        tokens: [{ type: 'plain', value: 'test', start: 0, end: 4 }],
        classes: ['cs-line'],
        attributes: {},
      },
    ];

    const html = render(lines, {
      theme: githubDark,
      collapsible: true,
      defaultCollapsed: true,
    });

    expect(html).toContain('cs-collapsible');
    expect(html).toContain('cs-collapsed');
    expect(html).toContain('cs-collapse-toggle');
  });

  it('should apply theme styles', () => {
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

    expect(html).toContain('background:');
    expect(html).toContain('color:');
  });
});
