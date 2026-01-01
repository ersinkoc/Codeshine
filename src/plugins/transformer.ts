/**
 * Transformer pipeline for Codeshine
 */

import type { Transformer, Token, LineData } from '../core/types.js';
import type { TransformerPipeline } from './types.js';

/**
 * Create a transformer pipeline
 */
export function createTransformerPipeline(): TransformerPipeline {
  const transformers: Transformer[] = [];

  return {
    add(transformer: Transformer): void {
      transformers.push(transformer);
    },

    remove(name: string): boolean {
      const index = transformers.findIndex((t) => t.name === name);
      if (index !== -1) {
        transformers.splice(index, 1);
        return true;
      }
      return false;
    },

    runPre(code: string): string {
      let result = code;
      for (const transformer of transformers) {
        if (transformer.pre) {
          result = transformer.pre(result);
        }
      }
      return result;
    },

    runToken(token: Token): Token | Token[] | null {
      let result: Token | Token[] | null = token;

      for (const transformer of transformers) {
        if (transformer.token && result !== null) {
          if (Array.isArray(result)) {
            const newResults: Token[] = [];
            for (const t of result) {
              const transformed = transformer.token(t);
              if (transformed !== null) {
                if (Array.isArray(transformed)) {
                  newResults.push(...transformed);
                } else {
                  newResults.push(transformed);
                }
              }
            }
            result = newResults.length > 0 ? newResults : null;
          } else {
            result = transformer.token(result);
          }
        }
      }

      return result;
    },

    runLine(line: LineData): LineData {
      let result = line;
      for (const transformer of transformers) {
        if (transformer.line) {
          result = transformer.line(result);
        }
      }
      return result;
    },

    runPost(html: string): string {
      let result = html;
      for (const transformer of transformers) {
        if (transformer.post) {
          result = transformer.post(result);
        }
      }
      return result;
    },
  };
}

/**
 * Built-in transformer: Add line links
 */
export const lineLinksTransformer: Transformer = {
  name: 'line-links',
  line(line: LineData): LineData {
    return {
      ...line,
      attributes: {
        ...line.attributes,
        id: `L${line.number}`,
        'data-line': line.number,
      },
    };
  },
};

/**
 * Built-in transformer: Remove comments
 */
export const removeCommentsTransformer: Transformer = {
  name: 'remove-comments',
  token(token: Token): Token | null {
    if (token.type === 'comment') {
      return null;
    }
    return token;
  },
};

/**
 * Built-in transformer: Normalize whitespace
 */
export const normalizeWhitespaceTransformer: Transformer = {
  name: 'normalize-whitespace',
  pre(code: string): string {
    return code.replace(/\t/g, '  ').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  },
};

/**
 * Built-in transformer: Trim trailing whitespace
 */
export const trimTrailingWhitespaceTransformer: Transformer = {
  name: 'trim-trailing-whitespace',
  pre(code: string): string {
    return code
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n');
  },
};

export default createTransformerPipeline;
