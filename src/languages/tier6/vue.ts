/**
 * Vue SFC language definition
 */
import { defineLang } from '../define-lang.js';

export const vue = defineLang({
  name: 'vue',
  aliases: ['vue-html', 'vue3'],
  extensions: ['.vue'],
  keywords: [
    // Vue directives
    'v-if', 'v-else', 'v-else-if', 'v-for', 'v-on', 'v-bind', 'v-model', 'v-slot',
    'v-pre', 'v-once', 'v-cloak', 'v-show', 'v-html', 'v-text', 'v-memo',
    // Shorthand
    '@', ':', '#',
    // Modifiers
    'stop', 'prevent', 'capture', 'self', 'once', 'passive',
    'lazy', 'number', 'trim',
    'enter', 'tab', 'delete', 'esc', 'space', 'up', 'down', 'left', 'right',
    'ctrl', 'alt', 'shift', 'meta', 'exact',
    // Script setup
    'setup', 'lang', 'scoped', 'module', 'src',
    // Component options
    'defineProps', 'defineEmits', 'defineExpose', 'defineOptions', 'defineSlots', 'defineModel',
    'withDefaults', 'useSlots', 'useAttrs',
    // Composition API
    'ref', 'reactive', 'computed', 'watch', 'watchEffect', 'watchPostEffect', 'watchSyncEffect',
    'onMounted', 'onUnmounted', 'onBeforeMount', 'onBeforeUnmount', 'onUpdated', 'onBeforeUpdate',
    'onActivated', 'onDeactivated', 'onErrorCaptured', 'onRenderTracked', 'onRenderTriggered',
    'onServerPrefetch',
    'provide', 'inject', 'readonly', 'shallowRef', 'shallowReactive', 'shallowReadonly',
    'toRef', 'toRefs', 'toRaw', 'markRaw', 'isRef', 'isReactive', 'isReadonly', 'isProxy',
    'unref', 'triggerRef', 'customRef', 'effectScope', 'getCurrentScope', 'onScopeDispose',
    'nextTick', 'defineComponent', 'defineAsyncComponent', 'h', 'mergeProps', 'cloneVNode',
    'isVNode', 'resolveComponent', 'resolveDirective', 'withDirectives', 'withModifiers',
  ],
  typeKeywords: [],
  builtins: [
    // Built-in components
    'component', 'transition', 'transition-group', 'keep-alive', 'slot', 'teleport', 'suspense',
    // Special elements
    'template', 'script', 'style',
  ],
  patterns: [
    // Template block
    { pattern: /<template[^>]*>[\s\S]*?<\/template>/gi, type: 'default' },
    // Script block
    { pattern: /<script[^>]*>[\s\S]*?<\/script>/gi, type: 'default' },
    // Style block
    { pattern: /<style[^>]*>[\s\S]*?<\/style>/gi, type: 'default' },
    // Vue directives
    { pattern: /v-[\w-]+(?::[^\s=>"']+)?(?:\.[^\s=>"']+)*/g, type: 'keyword' },
    // Shorthand directives
    { pattern: /[@:#][\w-]+(?:\.[^\s=>"']+)*/g, type: 'keyword' },
    // Interpolation
    { pattern: /\{\{[\s\S]*?\}\}/g, type: 'variable' },
    // Attributes
    { pattern: /[a-zA-Z-]+(?==)/g, type: 'property' },
    // Tag names
    { pattern: /<\/?[a-zA-Z][\w-]*/g, type: 'tag' },
    // Component names (PascalCase)
    { pattern: /<\/?[A-Z][\w]*/g, type: 'class' },
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

export default vue;
