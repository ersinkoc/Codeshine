/**
 * Streaming highlighter for large files
 */

import type { StreamOptions, HighlightOptions, TokenizerState } from './types.js';
import type { LanguageDefinition } from '../languages/types.js';
import { highlight, ensureInitialized } from './highlighter.js';
import { detectLanguage } from './detector.js';
import { tokenizeLine, createDefaultState } from './tokenizer.js';
import { getLanguage } from '../languages/index.js';

/**
 * Default chunk size (lines)
 */
const DEFAULT_CHUNK_SIZE = 100;

/**
 * Normalize a requested chunk size to a positive integer.
 * A chunk size of 0 or less would leave `processed` unchanged forever.
 */
function resolveChunkSize(chunkSize: number | undefined): number {
  if (chunkSize === undefined) return DEFAULT_CHUNK_SIZE;
  const size = Math.trunc(chunkSize);
  return Number.isFinite(size) && size > 0 ? size : DEFAULT_CHUNK_SIZE;
}

/**
 * Resolve the streamed language once and freeze it for every chunk.
 *
 * `highlight()` detects on every call, so letting each chunk detect on its own
 * rendered a mixed-language document chunk by chunk (proven: one stream emitted
 * javascript for the first chunk and python for the rest). Detection now runs on
 * the whole document, as it does for a non-streamed highlight, and `autoDetect`
 * is switched off so a chunk can never override that decision.
 */
function freezeStreamLanguage(code: string, options: StreamOptions): HighlightOptions {
  if (options.language !== undefined) {
    return { ...options, autoDetect: false };
  }

  let language: string | undefined;
  if (options.autoDetect) {
    const detected = detectLanguage(code);
    if (detected.language !== 'text' && detected.confidence > 0) {
      language = detected.language;
    }
  }

  return { ...options, language, autoDetect: false };
}

/**
 * Resolve the frozen language name to its definition for boundary scanning.
 */
function resolveStreamLanguage(options: HighlightOptions): LanguageDefinition | undefined {
  if (!options.language) {
    return undefined;
  }
  ensureInitialized();
  return getLanguage(options.language);
}

/**
 * Is the tokenizer still inside a construct that continues on the next line?
 */
function isOpenState(state: TokenizerState): boolean {
  return (
    state.inString === true ||
    state.inComment === true ||
    state.inTemplate === true ||
    state.embeddedLanguage !== undefined
  );
}

/**
 * Find the end of a chunk without cutting a multi-line construct in half.
 *
 * `tokenize()` carries its state from one line to the next, but each streamed
 * chunk is tokenized on its own, so a chunk that ended inside a block comment or
 * a template literal would restart from a clean state: the continuation lines
 * lose their token and an unterminated literal swallows the rest of the file.
 * The chunk is extended past `requestedEnd` until the tokenizer state is closed.
 * A construct left open at end of input keeps the chunk running to the last line,
 * which is exactly what a non-streamed highlight does with it.
 */
export function resolveChunkEnd(
  lines: string[],
  start: number,
  requestedEnd: number,
  language: LanguageDefinition | undefined
): number {
  if (!language || requestedEnd >= lines.length) {
    return requestedEnd;
  }

  let state = createDefaultState();
  let index = start;

  while (index < lines.length) {
    state = tokenizeLine(lines[index] ?? '', index + 1, language, state).state;
    index++;
    if (index >= requestedEnd && !isOpenState(state)) {
      return index;
    }
  }

  return index;
}

/**
 * Streaming highlight generator
 */
export async function* highlightStream(
  code: string,
  options: StreamOptions = {}
): AsyncGenerator<string, void, unknown> {
  const chunkSize = resolveChunkSize(options.chunkSize);
  const lines = code.split('\n');
  const totalLines = lines.length;
  const streamOptions = freezeStreamLanguage(code, options);
  const streamLanguage = resolveStreamLanguage(streamOptions);

  let processed = 0;
  const startLine = options.startLine ?? 1;

  while (processed < totalLines) {
    const endLine = resolveChunkEnd(
      lines,
      processed,
      Math.min(processed + chunkSize, totalLines),
      streamLanguage
    );
    const chunk = lines.slice(processed, endLine).join('\n');

    const chunkOptions: HighlightOptions = {
      ...streamOptions,
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
      const chunkSize = resolveChunkSize(options.chunkSize);
      const lines = code.split('\n');
      const totalLines = lines.length;
      const streamOptions = freezeStreamLanguage(code, options);
      const streamLanguage = resolveStreamLanguage(streamOptions);

      let processed = 0;
      const startLine = options.startLine ?? 1;

      while (processed < totalLines && !isAborted) {
        // Wait while paused
        while (isPaused && !isAborted) {
          await new Promise((resolve) => setTimeout(resolve, 100));
        }

        if (isAborted) break;

        const endLine = resolveChunkEnd(
          lines,
          processed,
          Math.min(processed + chunkSize, totalLines),
          streamLanguage
        );
        const chunk = lines.slice(processed, endLine).join('\n');

        const chunkOptions: HighlightOptions = {
          ...streamOptions,
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