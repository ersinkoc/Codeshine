<script lang="ts">
  /**
   * Svelte CodeBlock component for Codeshine
   */
  import { onMount, afterUpdate } from 'svelte';
  import { highlight } from '../../core/highlighter.js';
  import { themes } from '../../themes/index.js';
  import type { Theme } from '../../core/types.js';

  // Props
  export let code: string;
  export let language: string = 'text';
  export let theme: string | Theme = 'github-dark';
  export let lineNumbers: boolean = false;
  export let highlightLines: number[] = [];
  export let filename: string | undefined = undefined;
  export let showCopyButton: boolean = false;

  // State
  let html = '';
  let copied = false;

  // Resolve theme
  function getTheme(): Theme {
    if (typeof theme === 'string') {
      return themes[theme as keyof typeof themes] || themes.githubDark;
    }
    return theme;
  }

  // Update highlight
  function updateHighlight() {
    html = highlight(code, {
      language,
      theme: getTheme(),
      lineNumbers,
      highlightLines,
      filename,
      copyButton: showCopyButton,
    });
  }

  // Copy code to clipboard
  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    }
  }

  // Reactive updates
  $: code, language, theme, lineNumbers, highlightLines, updateHighlight();

  onMount(() => {
    updateHighlight();
  });
</script>

<div class="codeshine-svelte-wrapper">
  {@html html}
</div>

<style>
  .codeshine-svelte-wrapper {
    width: 100%;
  }
</style>
