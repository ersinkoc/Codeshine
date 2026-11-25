/**
 * Tests for streaming highlighter
 */

import { describe, it, expect, vi } from 'vitest';
import {
  highlightStream,
  highlightWithProgress,
  createStreamingHighlighter,
} from '../../src/core/streaming.js';
import { highlight } from '../../src/core/highlighter.js';
import { Codeshine } from '../../src/core/engine.js';

// A single HTML page whose script section looks like JavaScript on its own.
const MIXED_DOC = [
  '<!DOCTYPE html>',
  '<html>',
  '<head>',
  '<title>Demo</title>',
  '</head>',
  '<body>',
  '<div class="app" id="root"></div>',
  '<script>',
  'const total = 0;',
  'let index = 1;',
  'function add(x, y) { return x + y; }',
  'console.log(add(index, total));',
  'const doubled = total * 2;',
  'let label = "sum";',
  'console.log(doubled, label);',
  'export default add;',
  '</script>',
  '</body>',
  '</html>',
].join('\n');

describe('highlightStream', () => {
  it('should stream highlight in chunks', async () => {
    const code = 'line1\nline2\nline3\nline4\nline5';
    const chunks: string[] = [];

    for await (const chunk of highlightStream(code, {
      language: 'javascript',
      chunkSize: 2,
    })) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should call onChunk callback', async () => {
    const code = 'line1\nline2\nline3';
    const onChunk = vi.fn();

    for await (const _chunk of highlightStream(code, {
      language: 'javascript',
      chunkSize: 1,
      onChunk,
    })) {
      // consume iterator
    }

    expect(onChunk).toHaveBeenCalled();
  });

  it('should terminate for non-positive chunk sizes', async () => {
    // Regression: chunkSize <= 0 left `processed` unchanged and streamed forever.
    for (const chunkSize of [0, -1]) {
      const chunks: string[] = [];
      for await (const chunk of highlightStream('a\nb\nc', { language: 'javascript', chunkSize })) {
        chunks.push(chunk);
      }
      expect(chunks).toHaveLength(1);
    }
  });

  it('should report progress', async () => {
    const code = 'line1\nline2\nline3\nline4';
    const progressValues: number[] = [];

    for await (const _chunk of highlightStream(code, {
      language: 'javascript',
      chunkSize: 1,
      onChunk: (_html, progress) => {
        progressValues.push(progress);
      },
    })) {
      // consume iterator
    }

    expect(progressValues[progressValues.length - 1]).toBe(100);
  });

  it('should use one detected language for every chunk', async () => {
    // Regression: autoDetect ran per chunk, so one stream rendered this page as
    // html, html, javascript, html.
    const lines = MIXED_DOC.split('\n');
    const index = { value: 0 };
    const expected = () =>
      highlight(lines.slice(index.value, index.value + 5).join('\n'), {
        language: 'html',
        startLine: index.value + 1,
      });

    for await (const html of highlightStream(MIXED_DOC, { autoDetect: true, chunkSize: 5 })) {
      expect(html).toBe(expected());
      index.value += 5;
    }
    expect(index.value).toBe(20);
  });

  it('should stay consistent for every chunk size', async () => {
    for (const chunkSize of [1, 2, 3, 5, 7, 12]) {
      const lines = MIXED_DOC.split('\n');
      let offset = 0;
      for await (const html of highlightStream(MIXED_DOC, { autoDetect: true, chunkSize })) {
        expect(html).toBe(
          highlight(lines.slice(offset, offset + chunkSize).join('\n'), {
            language: 'html',
            startLine: offset + 1,
          })
        );
        offset += chunkSize;
      }
    }
  });

  it('should resolve the language once for the class API too', async () => {
    const engine = new Codeshine({ defaultLanguage: 'javascript' });
    const lines = MIXED_DOC.split('\n');

    let offset = 0;
    for await (const html of engine.highlightStream(MIXED_DOC, {
      autoDetect: true,
      chunkSize: 5,
    })) {
      expect(html).toBe(
        highlight(lines.slice(offset, offset + 5).join('\n'), {
          language: 'html',
          startLine: offset + 1,
        })
      );
      offset += 5;
    }
  });
});

describe('highlightWithProgress', () => {
  it('should return complete HTML', async () => {
    const code = 'const x = 1;';
    const html = await highlightWithProgress(code, { language: 'javascript' });

    expect(html).toContain('cs-codeblock');
  });

  it('should call progress callback', async () => {
    const code = 'line1\nline2';
    const onChunk = vi.fn();

    await highlightWithProgress(code, {
      language: 'javascript',
      chunkSize: 1,
      onChunk,
    });

    expect(onChunk).toHaveBeenCalled();
  });
});

describe('createStreamingHighlighter', () => {
  it('should create a streaming highlighter', () => {
    const streamer = createStreamingHighlighter();

    expect(streamer).toHaveProperty('highlight');
    expect(streamer).toHaveProperty('pause');
    expect(streamer).toHaveProperty('resume');
    expect(streamer).toHaveProperty('abort');
  });

  it('should stream highlight', async () => {
    const streamer = createStreamingHighlighter({ language: 'javascript' });
    const code = 'const x = 1;';
    const chunks: string[] = [];

    for await (const chunk of streamer.highlight(code)) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should track paused state', () => {
    const streamer = createStreamingHighlighter();

    expect(streamer.isPaused).toBe(false);
    streamer.pause();
    expect(streamer.isPaused).toBe(true);
    streamer.resume();
    expect(streamer.isPaused).toBe(false);
  });

  it('should track aborted state', () => {
    const streamer = createStreamingHighlighter();

    expect(streamer.isAborted).toBe(false);
    streamer.abort();
    expect(streamer.isAborted).toBe(true);
  });

  it('should abort streaming', async () => {
    const streamer = createStreamingHighlighter({
      language: 'javascript',
      chunkSize: 1,
    });
    const code = 'line1\nline2\nline3\nline4\nline5';
    const chunks: string[] = [];

    // Abort after first chunk
    setTimeout(() => streamer.abort(), 0);

    for await (const chunk of streamer.highlight(code)) {
      chunks.push(chunk);
      if (chunks.length >= 2) break;
    }

    expect(chunks.length).toBeLessThanOrEqual(2);
  });

  it('should pause and resume streaming', async () => {
    const streamer = createStreamingHighlighter({
      language: 'javascript',
      chunkSize: 1,
    });
    const code = 'line1\nline2\nline3';
    const chunks: string[] = [];

    // Start paused, then resume after a short delay
    streamer.pause();
    setTimeout(() => streamer.resume(), 50);

    for await (const chunk of streamer.highlight(code)) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBeGreaterThan(0);
  });

  it('should call onChunk callback during streaming', async () => {
    const onChunk = vi.fn();
    const streamer = createStreamingHighlighter({
      language: 'javascript',
      chunkSize: 1,
      onChunk,
    });
    const code = 'line1\nline2';

    for await (const _chunk of streamer.highlight(code)) {
      // consume
    }

    expect(onChunk).toHaveBeenCalled();
  });

  it('should handle empty code', async () => {
    const streamer = createStreamingHighlighter({ language: 'javascript' });
    const chunks: string[] = [];

    for await (const chunk of streamer.highlight('')) {
      chunks.push(chunk);
    }

    expect(chunks.length).toBe(1);
  });
});
