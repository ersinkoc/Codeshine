/**
 * Vue 3 components for Codeshine
 */

import { h, defineComponent, ref, watch, computed, onMounted, PropType } from 'vue';
import { highlight, highlightAsync } from '../../core/highlighter.js';
import { themes } from '../../themes/index.js';
import type { Theme, HighlightOptions } from '../../core/types.js';

/**
 * CodeBlock component props
 */
export interface CodeBlockProps {
  code: string;
  language?: string;
  theme?: string | Theme;
  lineNumbers?: boolean;
  highlightLines?: number[];
  filename?: string;
  showCopyButton?: boolean;
}

/**
 * Vue 3 CodeBlock component
 */
export const CodeBlock = defineComponent({
  name: 'CodeBlock',
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: 'text',
    },
    theme: {
      type: [String, Object] as PropType<string | Theme>,
      default: 'github-dark',
    },
    lineNumbers: {
      type: Boolean,
      default: false,
    },
    highlightLines: {
      type: Array as PropType<number[]>,
      default: () => [],
    },
    filename: {
      type: String,
      default: undefined,
    },
    showCopyButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const html = ref('');
    const copied = ref(false);

    const resolvedTheme = computed(() => {
      if (typeof props.theme === 'string') {
        return themes[props.theme as keyof typeof themes] || themes.githubDark;
      }
      return props.theme;
    });

    const updateHighlight = () => {
      const options: HighlightOptions = {
        language: props.language,
        theme: resolvedTheme.value,
        lineNumbers: props.lineNumbers,
        highlightLines: props.highlightLines,
        filename: props.filename,
        copyButton: props.showCopyButton,
      };
      html.value = highlight(props.code, options);
    };

    watch(
      () => [props.code, props.language, props.theme, props.lineNumbers, props.highlightLines],
      updateHighlight,
      { immediate: true }
    );

    const copyCode = async () => {
      try {
        await navigator.clipboard.writeText(props.code);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      } catch {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = props.code;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        copied.value = true;
        setTimeout(() => {
          copied.value = false;
        }, 2000);
      }
    };

    return () =>
      h('div', {
        class: 'codeshine-vue-wrapper',
        innerHTML: html.value,
      });
  },
});

/**
 * Async CodeBlock component for large code blocks
 */
export const AsyncCodeBlock = defineComponent({
  name: 'AsyncCodeBlock',
  props: {
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: 'text',
    },
    theme: {
      type: [String, Object] as PropType<string | Theme>,
      default: 'github-dark',
    },
    lineNumbers: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const html = ref('');
    const loading = ref(true);

    const resolvedTheme = computed(() => {
      if (typeof props.theme === 'string') {
        return themes[props.theme as keyof typeof themes] || themes.githubDark;
      }
      return props.theme;
    });

    const updateHighlight = async () => {
      loading.value = true;
      try {
        html.value = await highlightAsync(props.code, {
          language: props.language,
          theme: resolvedTheme.value,
          lineNumbers: props.lineNumbers,
        });
      } finally {
        loading.value = false;
      }
    };

    watch(
      () => [props.code, props.language, props.theme, props.lineNumbers],
      updateHighlight,
      { immediate: true }
    );

    return () =>
      loading.value
        ? h('div', { class: 'codeshine-loading' }, 'Loading...')
        : h('div', {
            class: 'codeshine-vue-wrapper',
            innerHTML: html.value,
          });
  },
});

/**
 * useCodeshine composable
 */
export function useCodeshine(initialTheme: string | Theme = 'github-dark') {
  const currentTheme = ref(
    typeof initialTheme === 'string'
      ? themes[initialTheme as keyof typeof themes] || themes.githubDark
      : initialTheme
  );

  const setTheme = (theme: string | Theme) => {
    if (typeof theme === 'string') {
      currentTheme.value = themes[theme as keyof typeof themes] || themes.githubDark;
    } else {
      currentTheme.value = theme;
    }
  };

  const highlightCode = (code: string, options: Partial<HighlightOptions> = {}) => {
    return highlight(code, {
      ...options,
      theme: options.theme || currentTheme.value,
    });
  };

  const highlightCodeAsync = async (code: string, options: Partial<HighlightOptions> = {}) => {
    return highlightAsync(code, {
      ...options,
      theme: options.theme || currentTheme.value,
    });
  };

  return {
    theme: currentTheme,
    setTheme,
    highlight: highlightCode,
    highlightAsync: highlightCodeAsync,
    themes,
  };
}

export { themes };
