/**
 * Tests for core highlighter
 */

import { describe, it, expect } from 'vitest';
import { highlight, highlightAsync } from '../../src/core/highlighter.js';

describe('highlight', () => {
  it('should highlight JavaScript code', () => {
    const code = 'const x = 42;';
    const html = highlight(code, { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('const');
    expect(html).toContain('42');
  });

  it('should apply theme', () => {
    const code = 'const x = 1;';
    const html = highlight(code, {
      language: 'javascript',
      theme: 'github-dark',
    });

    expect(html).toContain('background');
    expect(html).toContain('#0d1117');
  });

  it('should show line numbers when enabled', () => {
    const code = 'line 1\nline 2\nline 3';
    const html = highlight(code, {
      language: 'javascript',
      lineNumbers: true,
    });

    expect(html).toContain('cs-line-number');
    expect(html).toContain('1');
    expect(html).toContain('2');
    expect(html).toContain('3');
  });

  it('should start line numbers from specified number', () => {
    const code = 'line 1\nline 2';
    const html = highlight(code, {
      language: 'javascript',
      lineNumbers: true,
      startLine: 10,
    });

    expect(html).toContain('10');
    expect(html).toContain('11');
  });

  it('should highlight specified lines', () => {
    const code = 'line 1\nline 2\nline 3';
    const html = highlight(code, {
      language: 'javascript',
      highlightLines: [2],
    });

    expect(html).toContain('cs-line-highlighted');
  });

  it('should apply focus mode', () => {
    const code = 'line 1\nline 2\nline 3';
    const html = highlight(code, {
      language: 'javascript',
      focusLines: [2],
    });

    expect(html).toContain('cs-line-focused');
    expect(html).toContain('cs-line-dimmed');
  });

  it('should apply diff markers', () => {
    const code = 'line 1\nline 2\nline 3';
    const html = highlight(code, {
      language: 'javascript',
      diffLines: {
        added: [1],
        removed: [2],
        modified: [3],
      },
    });

    expect(html).toContain('cs-line-diff-added');
    expect(html).toContain('cs-line-diff-removed');
    expect(html).toContain('cs-line-diff-modified');
  });

  it('should show copy button when enabled', () => {
    const code = 'const x = 1;';
    const html = highlight(code, {
      language: 'javascript',
      copyButton: true,
    });

    expect(html).toContain('cs-copy-button');
  });

  it('should show language badge when enabled', () => {
    const code = 'const x = 1;';
    const html = highlight(code, {
      language: 'javascript',
      showLanguageBadge: true,
    });

    expect(html).toContain('cs-language-badge');
    expect(html).toContain('JavaScript');
  });

  it('should show filename when provided', () => {
    const code = 'const x = 1;';
    const html = highlight(code, {
      language: 'javascript',
      filename: 'example.js',
    });

    expect(html).toContain('cs-filename');
    expect(html).toContain('example.js');
  });

  it('should apply max height', () => {
    const code = 'const x = 1;';
    const html = highlight(code, {
      language: 'javascript',
      maxHeight: '400px',
    });

    expect(html).toContain('max-height:400px');
    expect(html).toContain('overflow-y:auto');
  });

  it('should handle collapsible', () => {
    const code = 'const x = 1;';
    const html = highlight(code, {
      language: 'javascript',
      collapsible: true,
    });

    expect(html).toContain('cs-collapsible');
    expect(html).toContain('cs-collapse-toggle');
  });

  it('should return plain text for unknown language', () => {
    const code = 'some plain text';
    const html = highlight(code);

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('some plain text');
  });

  it('should handle empty code', () => {
    const html = highlight('', { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
  });

  it('should escape HTML special characters in text content', () => {
    // When highlighting as JS, angle brackets in strings should be escaped
    const code = 'const x = "<div>test</div>";';
    const html = highlight(code, { language: 'javascript' });

    // The angle brackets should be escaped in the output
    expect(html).toContain('&lt;div&gt;');
    expect(html).toContain('&lt;/div&gt;');
  });
});

describe('highlightAsync', () => {
  it('should return a promise', async () => {
    const code = 'const x = 1;';
    const result = highlightAsync(code, { language: 'javascript' });

    expect(result).toBeInstanceOf(Promise);
  });

  it('should resolve to highlighted HTML', async () => {
    const code = 'const x = 1;';
    const html = await highlightAsync(code, { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
    expect(html).toContain('const');
  });
});
