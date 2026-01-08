/**
 * Streaming highlighter for large files
 */

import type { StreamOptions, HighlightOptions } from './types.js';
import { highlight } from './highlighter.js';

/**
 * Default chunk size (lines)
 */
const DEFAULT_CHUNK_SIZE = 100;

/**
 * Streaming highlight generator
 */
export async function* highlightStream(
  code: string,
  options: StreamOptions = {}
): AsyncGenerator<string, void, unknown> {
  const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const lines = code.split('\n');
  const totalLines = lines.length;

  let processed = 0;
  const startLine = options.startLine ?? 1;

  while (processed < totalLines) {
    const endLine = Math.min(processed + chunkSize, totalLines);
    const chunk = lines.slice(processed, endLine).join('\n');

    const chunkOptions: HighlightOptions = {
      ...options,
      startLine: startLine + processed,
    };

    const html = highlight(chunk, chunkOptions);

    processed = endLine;
    const progress = Math.round((processed / totalLines) * 100);

    if (options.onChunk) {
      options.onChunk(html, progress);
    }

    yield html;

    // Yield to event loop to allow UI updates
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
}

/**
 * Highlight with progress callback
 */
export async function highlightWithProgress(
  code: string,
  options: StreamOptions = {}
): Promise<string> {
  const chunks: string[] = [];

  for await (const chunk of highlightStream(code, options)) {
    chunks.push(chunk);
  }

  return chunks.join('');
}

/**
 * Create a streaming highlighter that can be paused/resumed
 */
export function createStreamingHighlighter(options: StreamOptions = {}) {
  let isPaused = false;
  let isAborted = false;

  return {
    async *highlight(code: string): AsyncGenerator<string, void, unknown> {
      const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
      const lines = code.split('\n');
      const totalLines = lines.length;

      let processed = 0;
      const startLine = options.startLine ?? 1;

      while (processed < totalLines && !isAborted) {
        // Wait while paused
        while (isPaused && !isAborted) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (isAborted) break;

        const endLine = Math.min(processed + chunkSize, totalLines);
        const chunk = lines.slice(processed, endLine).join('\n');

        const chunkOptions: HighlightOptions = {
          ...options,
          startLine: startLine + processed,
        };

        const html = highlight(chunk, chunkOptions);

        processed = endLine;
        const progress = Math.round((processed / totalLines) * 100);

        if (options.onChunk) {
          options.onChunk(html, progress);
        }

        yield html;
        
        // Yield to event loop to allow UI updates
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    },

    pause(): void {
      isPaused = true;
    },

    resume(): void {
      isPaused = false;
    },

    abort(): void {
      isAborted = true;
    },

    get isPaused(): boolean {
      return isPaused;
    },

    get isAborted(): boolean {
      return isAborted;
    },
  };
}

export default highlightStream;