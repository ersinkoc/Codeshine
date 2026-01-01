/**
 * Plugin types for Codeshine
 */

export type {
  CodeshinePlugin,
  Transformer,
  LineData,
  Token,
  HighlightOptions,
  CodeshineInstance,
} from '../core/types.js';

/**
 * Plugin registry interface
 */
export interface PluginRegistry {
  register(plugin: import('../core/types.js').CodeshinePlugin): void;
  get(name: string): import('../core/types.js').CodeshinePlugin | undefined;
  has(name: string): boolean;
  getAll(): import('../core/types.js').CodeshinePlugin[];
  getNames(): string[];
}

/**
 * Transformer pipeline interface
 */
export interface TransformerPipeline {
  add(transformer: import('../core/types.js').Transformer): void;
  remove(name: string): boolean;
  runPre(code: string): string;
  runToken(
    token: import('../core/types.js').Token
  ): import('../core/types.js').Token | import('../core/types.js').Token[] | null;
  runLine(line: import('../core/types.js').LineData): import('../core/types.js').LineData;
  runPost(html: string): string;
}
