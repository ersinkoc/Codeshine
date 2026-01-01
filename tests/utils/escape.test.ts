/**
 * Tests for escape utilities
 */

import { describe, it, expect } from 'vitest';
import { escapeHtml, unescapeHtml, escapeRegExp } from '../../src/utils/escape.js';

describe('escapeHtml', () => {
  it('should escape HTML special characters', () => {
    expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
    expect(escapeHtml('a & b')).toBe('a &amp; b');
    expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;');
    expect(escapeHtml("'single'")).toBe('&#39;single&#39;');
  });

  it('should handle empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('should not modify strings without special characters', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
    expect(escapeHtml('123')).toBe('123');
  });

  it('should handle mixed content', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
    );
  });

  it('should handle multiple occurrences', () => {
    expect(escapeHtml('<<>>')).toBe('&lt;&lt;&gt;&gt;');
    expect(escapeHtml('&&&&')).toBe('&amp;&amp;&amp;&amp;');
  });
});

describe('unescapeHtml', () => {
  it('should unescape HTML entities', () => {
    expect(unescapeHtml('&lt;div&gt;')).toBe('<div>');
    expect(unescapeHtml('a &amp; b')).toBe('a & b');
    expect(unescapeHtml('&quot;quoted&quot;')).toBe('"quoted"');
    expect(unescapeHtml('&#39;single&#39;')).toBe("'single'");
  });

  it('should handle empty string', () => {
    expect(unescapeHtml('')).toBe('');
  });

  it('should not modify strings without entities', () => {
    expect(unescapeHtml('hello world')).toBe('hello world');
  });

  it('should be inverse of escapeHtml', () => {
    const original = '<script>alert("test")</script>';
    expect(unescapeHtml(escapeHtml(original))).toBe(original);
  });
});

describe('escapeRegExp', () => {
  it('should escape regex special characters', () => {
    expect(escapeRegExp('.')).toBe('\\.');
    expect(escapeRegExp('*')).toBe('\\*');
    expect(escapeRegExp('+')).toBe('\\+');
    expect(escapeRegExp('?')).toBe('\\?');
    expect(escapeRegExp('^')).toBe('\\^');
    expect(escapeRegExp('$')).toBe('\\$');
    expect(escapeRegExp('{')).toBe('\\{');
    expect(escapeRegExp('}')).toBe('\\}');
    expect(escapeRegExp('(')).toBe('\\(');
    expect(escapeRegExp(')')).toBe('\\)');
    expect(escapeRegExp('|')).toBe('\\|');
    expect(escapeRegExp('[')).toBe('\\[');
    expect(escapeRegExp(']')).toBe('\\]');
    expect(escapeRegExp('\\')).toBe('\\\\');
  });

  it('should handle empty string', () => {
    expect(escapeRegExp('')).toBe('');
  });

  it('should not modify strings without special characters', () => {
    expect(escapeRegExp('hello')).toBe('hello');
  });

  it('should handle complex patterns', () => {
    expect(escapeRegExp('file.txt')).toBe('file\\.txt');
    expect(escapeRegExp('[a-z]+')).toBe('\\[a-z\\]\\+');
  });

  it('should create usable regex patterns', () => {
    const text = 'test.file';
    const escaped = escapeRegExp(text);
    const regex = new RegExp(escaped);
    expect(regex.test('test.file')).toBe(true);
    expect(regex.test('testXfile')).toBe(false);
  });
});
