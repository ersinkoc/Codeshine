/**
 * Plugin exports
 */

// Types
export type {
  CodeshinePlugin,
  Transformer,
  LineData,
  Token,
  HighlightOptions,
  PluginRegistry,
  TransformerPipeline,
} from './types.js';

// Registry
export {
  createPluginRegistry,
  globalPluginRegistry,
  registerPlugin,
  getPlugin,
  hasPlugin,
  getPluginNames,
} from './registry.js';

// Transformers
export {
  createTransformerPipeline,
  lineLinksTransformer,
  removeCommentsTransformer,
  normalizeWhitespaceTransformer,
  trimTrailingWhitespaceTransformer,
} from './transformer.js';
