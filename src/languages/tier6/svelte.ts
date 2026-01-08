/**
 * Svelte language definition
 */
import { defineLang } from '../define-lang.js';

export const svelte = defineLang({
  name: 'svelte',
  aliases: [],
  extensions: ['.svelte'],
  keywords: [
    // Control flow
    'if', 'else', 'each', 'as', 'await', 'then', 'catch', 'key', 'snippet', 'render',
    // Reactivity
    '$state', '$derived', '$effect', '$props', '$bindable', '$inspect', '$host',
    // Legacy reactivity
    '$:', 'let', 'const', 'export',
    // Directives
    'on', 'bind', 'class', 'style', 'use', 'transition', 'in', 'out', 'animate',
    // Modifiers
    'preventDefault', 'stopPropagation', 'passive', 'nonpassive', 'capture', 'once', 'self', 'trusted',
    'local', 'global',
    // Special elements
    '@html', '@debug', '@const',
  ],
  typeKeywords: [],
  builtins: [
    // Components
    'svelte:self', 'svelte:component', 'svelte:element', 'svelte:window', 'svelte:document',
    'svelte:body', 'svelte:head', 'svelte:options', 'svelte:fragment', 'svelte:boundary',
    // Lifecycle (Svelte 5)
    'onMount', 'onDestroy', 'beforeUpdate', 'afterUpdate', 'tick', 'untrack', 'mount', 'unmount',
    // Transitions
    'fade', 'blur', 'fly', 'slide', 'scale', 'draw', 'crossfade',
    // Animation
    'flip',
    // Motion
    'tweened', 'spring',
    // Stores
    'writable', 'readable', 'derived', 'get',
    // Context
    'setContext', 'getContext', 'hasContext', 'getAllContexts',
    // Events
    'createEventDispatcher',
    // Actions
    'action',
  ],
  patterns: [
    // Logic blocks
    { pattern: /\{#(?:if|each|await|key|snippet)\b[^}]*\}/g, type: 'keyword' },
    { pattern: /\{:(?:else|then|catch)\b[^}]*\}/g, type: 'keyword' },
    { pattern: /\{\/(?:if|each|await|key|snippet)\}/g, type: 'keyword' },
    // Special tags
    { pattern: /\{@(?:html|debug|const|render)\b[^}]*\}/g, type: 'keyword' },
    // Reactivity ($state, $derived, etc)
    { pattern: /\$(?:state|derived|effect|props|bindable|inspect|host)\b/g, type: 'keyword' },
    // Reactive statements (legacy)
    { pattern: /\$:/g, type: 'keyword' },
    // Store auto-subscription
    { pattern: /\$[a-zA-Z_]\w*/g, type: 'variable' },
    // Expressions
    { pattern: /\{[^{}]*\}/g, type: 'variable' },
    // Directives
    { pattern: /(?:on|bind|class|style|use|transition|in|out|animate):[a-zA-Z_][\w|]*/g, type: 'keyword' },
    // Attributes
    { pattern: /[a-zA-Z_][\w-]*(?==)/g, type: 'property' },
    // Tag names
    { pattern: /<\/?[a-zA-Z][\w-]*/g, type: 'tag' },
    // Component names (PascalCase)
    { pattern: /<\/?[A-Z][\w.]*/g, type: 'class' },
    // Svelte elements
    { pattern: /<\/?svelte:[a-z]+/g, type: 'keyword' },
  ],
  strings: [
    { start: '"', end: '"', escape: '\\' },
    { start: "'", end: "'", escape: '\\' },
    { start: '`', end: '`', escape: '\\' },
  ],
  comments: {
    block: { start: '<!--', end: '-->' },
  },
  brackets: [
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '(', close: ')' },
    { open: '<', close: '>' },
  ],
  embedded: [
    { language: 'javascript', start: '<script>', end: '</script>' },
    { language: 'typescript', start: '<script lang="ts">', end: '</script>' },
    { language: 'css', start: '<style>', end: '</style>' },
    { language: 'scss', start: '<style lang="scss">', end: '</style>' },
  ],
});

export default svelte;
