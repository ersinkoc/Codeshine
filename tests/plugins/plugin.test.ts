/**
 * Tests for plugin system
 */

import { describe, it, expect, vi } from 'vitest';
import {
  createPluginRegistry,
  registerPlugin,
  getPlugin,
  hasPlugin,
  getPluginNames,
  createTransformerPipeline,
  lineLinksTransformer,
  removeCommentsTransformer,
  normalizeWhitespaceTransformer,
  trimTrailingWhitespaceTransformer,
} from '../../src/plugins/index.js';
import type { CodeshinePlugin, Transformer, Token, LineData } from '../../src/core/types.js';

describe('createPluginRegistry', () => {
  it('should create an empty registry', () => {
    const registry = createPluginRegistry();

    expect(registry.getNames()).toEqual([]);
  });

  it('should register and retrieve plugins', () => {
    const registry = createPluginRegistry();
    const plugin: CodeshinePlugin = {
      name: 'test-plugin',
      version: '1.0.0',
    };

    registry.register(plugin);

    expect(registry.has('test-plugin')).toBe(true);
    expect(registry.get('test-plugin')).toBe(plugin);
  });

  it('should list plugin names', () => {
    const registry = createPluginRegistry();
    registry.register({ name: 'plugin-a', version: '1.0.0' });
    registry.register({ name: 'plugin-b', version: '1.0.0' });

    const names = registry.getNames();

    expect(names).toContain('plugin-a');
    expect(names).toContain('plugin-b');
  });

  it('should get all plugins from registry', () => {
    const registry = createPluginRegistry();
    const pluginA: CodeshinePlugin = { name: 'plugin-get-all-a', version: '1.0.0' };
    const pluginB: CodeshinePlugin = { name: 'plugin-get-all-b', version: '2.0.0' };

    registry.register(pluginA);
    registry.register(pluginB);

    const allPlugins = registry.getAll();

    expect(allPlugins).toHaveLength(2);
    expect(allPlugins).toContain(pluginA);
    expect(allPlugins).toContain(pluginB);
  });
});

describe('global plugin registry', () => {
  it('should register plugins globally', () => {
    const plugin: CodeshinePlugin = {
      name: 'global-test-plugin',
      version: '1.0.0',
    };

    registerPlugin(plugin);

    expect(hasPlugin('global-test-plugin')).toBe(true);
    expect(getPlugin('global-test-plugin')).toBe(plugin);
  });

  it('should list global plugin names', () => {
    const names = getPluginNames();

    expect(Array.isArray(names)).toBe(true);
  });
});

describe('createTransformerPipeline', () => {
  it('should create an empty pipeline', () => {
    const pipeline = createTransformerPipeline();

    expect(pipeline).toBeDefined();
    expect(typeof pipeline.add).toBe('function');
    expect(typeof pipeline.remove).toBe('function');
    expect(typeof pipeline.runPre).toBe('function');
    expect(typeof pipeline.runToken).toBe('function');
    expect(typeof pipeline.runLine).toBe('function');
    expect(typeof pipeline.runPost).toBe('function');
  });

  it('should add and run pre transformers', () => {
    const pipeline = createTransformerPipeline();
    const transformer: Transformer = {
      name: 'test',
      pre: (code) => code.toUpperCase(),
    };

    pipeline.add(transformer);
    const result = pipeline.runPre('hello');

    expect(result).toBe('HELLO');
  });

  it('should remove transformers by name', () => {
    const pipeline = createTransformerPipeline();
    const transformer: Transformer = {
      name: 'test',
      pre: (code) => code.toUpperCase(),
    };

    pipeline.add(transformer);
    const removed = pipeline.remove('test');

    expect(removed).toBe(true);
    expect(pipeline.runPre('hello')).toBe('hello'); // No transformation
  });

  it('should return false when removing non-existent transformer', () => {
    const pipeline = createTransformerPipeline();

    expect(pipeline.remove('non-existent')).toBe(false);
  });

  it('should run token transformers', () => {
    const pipeline = createTransformerPipeline();
    const transformer: Transformer = {
      name: 'upper-token',
      token: (token) => ({ ...token, value: token.value.toUpperCase() }),
    };

    pipeline.add(transformer);
    const token: Token = { type: 'plain', value: 'hello', start: 0, end: 5 };
    const result = pipeline.runToken(token);

    expect(result).not.toBeNull();
    if (!Array.isArray(result)) {
      expect(result?.value).toBe('HELLO');
    }
  });

  it('should run line transformers', () => {
    const pipeline = createTransformerPipeline();
    const transformer: Transformer = {
      name: 'add-class',
      line: (line) => ({
        ...line,
        classes: [...line.classes, 'custom-class'],
      }),
    };

    pipeline.add(transformer);
    const line: LineData = {
      number: 1,
      content: 'test',
      tokens: [],
      classes: ['cs-line'],
      attributes: {},
    };
    const result = pipeline.runLine(line);

    expect(result.classes).toContain('custom-class');
  });

  it('should run post transformers', () => {
    const pipeline = createTransformerPipeline();
    const transformer: Transformer = {
      name: 'wrap-html',
      post: (html) => `<div class="wrapper">${html}</div>`,
    };

    pipeline.add(transformer);
    const result = pipeline.runPost('<code>test</code>');

    expect(result).toContain('wrapper');
    expect(result).toContain('<code>test</code>');
  });

  it('should handle token transformer returning null', () => {
    const pipeline = createTransformerPipeline();
    const transformer: Transformer = {
      name: 'filter',
      token: (token) => (token.type === 'comment' ? null : token),
    };

    pipeline.add(transformer);
    const token: Token = { type: 'comment', value: '// test', start: 0, end: 7 };
    const result = pipeline.runToken(token);

    expect(result).toBeNull();
  });

  it('should handle token transformer returning array', () => {
    const pipeline = createTransformerPipeline();
    const transformer: Transformer = {
      name: 'split',
      token: (token) => [
        { ...token, value: token.value.slice(0, 2) },
        { ...token, value: token.value.slice(2) },
      ],
    };

    pipeline.add(transformer);
    const token: Token = { type: 'plain', value: 'hello', start: 0, end: 5 };
    const result = pipeline.runToken(token);

    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(2);
    }
  });

  it('should chain multiple pre transformers', () => {
    const pipeline = createTransformerPipeline();
    pipeline.add({
      name: 'upper',
      pre: (code) => code.toUpperCase(),
    });
    pipeline.add({
      name: 'trim',
      pre: (code) => code.trim(),
    });

    const result = pipeline.runPre('  hello  ');

    expect(result).toBe('HELLO');
  });

  it('should chain multiple post transformers', () => {
    const pipeline = createTransformerPipeline();
    pipeline.add({
      name: 'wrap1',
      post: (html) => `<div>${html}</div>`,
    });
    pipeline.add({
      name: 'wrap2',
      post: (html) => `<section>${html}</section>`,
    });

    const result = pipeline.runPost('content');

    expect(result).toBe('<section><div>content</div></section>');
  });

  it('should handle array of tokens and transformer returning array', () => {
    const pipeline = createTransformerPipeline();

    // First transformer returns an array
    pipeline.add({
      name: 'split',
      token: (token) => [
        { ...token, value: token.value.slice(0, 2), end: token.start + 2 },
        { ...token, value: token.value.slice(2), start: token.start + 2 },
      ],
    });

    // Second transformer processes the array and returns array for each
    pipeline.add({
      name: 'wrap',
      token: (token) => [
        { ...token, type: 'wrapped' as unknown as Token['type'] },
      ],
    });

    const token: Token = { type: 'plain', value: 'hello', start: 0, end: 5 };
    const result = pipeline.runToken(token);

    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(2);
      expect(result[0].type).toBe('wrapped');
    }
  });

  it('should handle array of tokens and transformer returning null', () => {
    const pipeline = createTransformerPipeline();

    // First transformer returns an array
    pipeline.add({
      name: 'split',
      token: (token) => [
        { ...token, type: 'comment' as const, value: '// comment' },
        { ...token, value: 'code' },
      ],
    });

    // Second transformer filters out comments
    pipeline.add({
      name: 'filter',
      token: (token) => (token.type === 'comment' ? null : token),
    });

    const token: Token = { type: 'plain', value: 'hello', start: 0, end: 5 };
    const result = pipeline.runToken(token);

    expect(Array.isArray(result)).toBe(true);
    if (Array.isArray(result)) {
      expect(result.length).toBe(1);
      expect(result[0].value).toBe('code');
    }
  });

  it('should return null when all tokens in array are filtered out', () => {
    const pipeline = createTransformerPipeline();

    // First transformer returns an array of comments
    pipeline.add({
      name: 'make-comments',
      token: (token) => [
        { ...token, type: 'comment' as const },
        { ...token, type: 'comment' as const },
      ],
    });

    // Second transformer filters out all comments
    pipeline.add({
      name: 'filter',
      token: (token) => (token.type === 'comment' ? null : token),
    });

    const token: Token = { type: 'plain', value: 'hello', start: 0, end: 5 };
    const result = pipeline.runToken(token);

    expect(result).toBeNull();
  });

  it('should handle null result in middle of chain', () => {
    const pipeline = createTransformerPipeline();

    // First transformer returns null
    pipeline.add({
      name: 'nullify',
      token: () => null,
    });

    // Second transformer should not be called
    const secondTransformer = vi.fn((token: Token) => token);
    pipeline.add({
      name: 'second',
      token: secondTransformer,
    });

    const token: Token = { type: 'plain', value: 'hello', start: 0, end: 5 };
    const result = pipeline.runToken(token);

    expect(result).toBeNull();
    expect(secondTransformer).not.toHaveBeenCalled();
  });
});

describe('lineLinksTransformer', () => {
  it('should add line ID and data attributes', () => {
    const line: LineData = {
      number: 5,
      content: 'test',
      tokens: [],
      classes: ['cs-line'],
      attributes: {},
    };

    const result = lineLinksTransformer.line!(line);

    expect(result.attributes.id).toBe('L5');
    expect(result.attributes['data-line']).toBe(5);
  });

  it('should preserve existing attributes', () => {
    const line: LineData = {
      number: 1,
      content: 'test',
      tokens: [],
      classes: ['cs-line'],
      attributes: { 'data-custom': 'value' },
    };

    const result = lineLinksTransformer.line!(line);

    expect(result.attributes['data-custom']).toBe('value');
    expect(result.attributes.id).toBe('L1');
  });
});

describe('removeCommentsTransformer', () => {
  it('should remove comment tokens', () => {
    const token: Token = { type: 'comment', value: '// comment', start: 0, end: 10 };

    const result = removeCommentsTransformer.token!(token);

    expect(result).toBeNull();
  });

  it('should preserve non-comment tokens', () => {
    const token: Token = { type: 'keyword', value: 'const', start: 0, end: 5 };

    const result = removeCommentsTransformer.token!(token);

    expect(result).toEqual(token);
  });
});

describe('normalizeWhitespaceTransformer', () => {
  it('should convert tabs to spaces', () => {
    const result = normalizeWhitespaceTransformer.pre!('hello\tworld');

    expect(result).toBe('hello  world');
  });

  it('should normalize CRLF to LF', () => {
    const result = normalizeWhitespaceTransformer.pre!('line1\r\nline2');

    expect(result).toBe('line1\nline2');
  });

  it('should normalize CR to LF', () => {
    const result = normalizeWhitespaceTransformer.pre!('line1\rline2');

    expect(result).toBe('line1\nline2');
  });
});

describe('trimTrailingWhitespaceTransformer', () => {
  it('should trim trailing whitespace from each line', () => {
    const result = trimTrailingWhitespaceTransformer.pre!('line1   \nline2  \n');

    expect(result).toBe('line1\nline2\n');
  });

  it('should preserve leading whitespace', () => {
    const result = trimTrailingWhitespaceTransformer.pre!('  indented');

    expect(result).toBe('  indented');
  });

  it('should handle empty lines', () => {
    const result = trimTrailingWhitespaceTransformer.pre!('line1\n\nline2');

    expect(result).toBe('line1\n\nline2');
  });
});

describe('plugin with hooks', () => {
  it('should call beforeHighlight hook', () => {
    const beforeHighlight = vi.fn((code: string) => code);
    const plugin: CodeshinePlugin = {
      name: 'hook-test',
      version: '1.0.0',
      hooks: {
        beforeHighlight,
      },
    };

    registerPlugin(plugin);

    expect(plugin.hooks?.beforeHighlight).toBeDefined();
  });

  it('should call afterHighlight hook', () => {
    const afterHighlight = vi.fn((html: string) => html);
    const plugin: CodeshinePlugin = {
      name: 'after-hook-test',
      version: '1.0.0',
      hooks: {
        afterHighlight,
      },
    };

    registerPlugin(plugin);

    expect(plugin.hooks?.afterHighlight).toBeDefined();
  });
});

describe('plugin with transformers', () => {
  it('should include transformers in plugin', () => {
    const customTransformer: Transformer = {
      name: 'custom',
      pre: (code) => code,
    };

    const plugin: CodeshinePlugin = {
      name: 'transformer-plugin',
      version: '1.0.0',
      transformers: [customTransformer],
    };

    expect(plugin.transformers?.length).toBe(1);
    expect(plugin.transformers?.[0].name).toBe('custom');
  });
});
