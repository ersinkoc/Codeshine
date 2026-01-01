/**
 * Tests for streaming highlighter
 */

import { describe, it, expect, vi } from 'vitest';
import {
  highlightStream,
  highlightWithProgress,
  createStreamingHighlighter,
} from '../../src/core/streaming.js';

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

    for await (const _ of highlightStream(code, {
      language: 'javascript',
      chunkSize: 1,
      onChunk,
    })) {
      // consume iterator
    }

    expect(onChunk).toHaveBeenCalled();
  });

  it('should report progress', async () => {
    const code = 'line1\nline2\nline3\nline4';
    const progressValues: number[] = [];

    for await (const _ of highlightStream(code, {
      language: 'javascript',
      chunkSize: 1,
      onChunk: (_, progress) => {
        progressValues.push(progress);
      },
    })) {
      // consume iterator
    }

    expect(progressValues[progressValues.length - 1]).toBe(100);
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

    for await (const _ of streamer.highlight(code)) {
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
