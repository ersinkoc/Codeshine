/**
 * Svelte exports for Codeshine
 *
 * Usage:
 * ```svelte
 * <script>
 *   import { CodeBlock } from '@oxog/codeshine/svelte';
 * </script>
 *
 * <CodeBlock code="const x = 1;" language="javascript" />
 * ```
 */

export { default as CodeBlock } from './CodeBlock.svelte';
export { themes } from '../../themes/index.js';
export { highlight, highlightAsync } from '../../core/highlighter.js';
