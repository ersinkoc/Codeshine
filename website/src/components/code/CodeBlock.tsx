import { useState, useEffect } from 'react';
import { Copy, Check, Palette, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { highlight } from '@oxog/codeshine';
import { useTheme } from '@/hooks/useTheme';

const themes = {
  dark: [
    'github-dark',
    'dracula',
    'vscode-dark',
    'monokai',
    'nord',
    'one-dark',
    'tokyo-night',
    'catppuccin',
    'ayu-dark',
  ],
  light: [
    'github-light',
    'vscode-light',
    'one-light',
    'solarized-light',
    'ayu-light',
  ],
};

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  diffLines?: { added?: number[]; removed?: number[] };
  className?: string;
}

export function CodeBlock({
  code,
  language = 'typescript',
  title,
  showLineNumbers = true,
  highlightLines = [],
  diffLines,
  className,
}: CodeBlockProps) {
  const { resolvedTheme: siteTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState(siteTheme === 'light' ? 'github-light' : 'github-dark');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  // Check if current theme is light or dark
  const isLightTheme = themes.light.includes(currentTheme);

  // Update theme when site theme changes (only if not manually overridden)
  useEffect(() => {
    setCurrentTheme(siteTheme === 'light' ? 'github-light' : 'github-dark');
  }, [siteTheme]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Decode escape sequences
  const decodedCode = code.replace(/\\`/g, '`').replace(/\\\$/g, '$');

  // Highlight code on mount or theme change
  useEffect(() => {
    try {
      const highlighted = highlight(decodedCode, {
        language,
        theme: currentTheme,
        lineNumbers: showLineNumbers,
        highlightLines,
        diffLines,
      });
      setHtml(highlighted);
    } catch (error) {
      console.error('Highlighting error:', error);
      // Fallback: escape and wrap in pre/code
      const escaped = decodedCode
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      setHtml(`<pre class="p-4"><code>${escaped}</code></pre>`);
    }
  }, [decodedCode, language, currentTheme, showLineNumbers, highlightLines, diffLines]);

  return (
    <div className={cn(
      'group relative my-6 overflow-hidden rounded-lg border',
      isLightTheme
        ? 'border-gray-300 bg-white'
        : 'border-gray-700/50 bg-[#1e1e1e]',
      className
    )}>
      {/* Header */}
      {title && (
        <div className={cn(
          'flex items-center justify-between border-b px-4 py-2',
          isLightTheme
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-700/50 bg-[#252526]'
        )}>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className={cn(
              'ml-2 text-xs font-mono',
              isLightTheme ? 'text-gray-600' : 'text-gray-400'
            )}>{title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-xs uppercase',
              isLightTheme ? 'text-gray-500' : 'text-gray-500'
            )}>{language}</span>
          </div>
        </div>
      )}

      <div className={cn(
        'relative',
        isLightTheme ? 'bg-gray-50' : 'bg-[#1e1e1e]'
      )}>
        {/* Top action bar - only show when no title or in code area */}
        <div className={cn(
          'flex items-center justify-between px-3 py-2 border-b',
          isLightTheme
            ? 'border-gray-200'
            : 'border-gray-700/30'
        )}>
          {/* Language indicator */}
          <span className={cn(
            'text-xs uppercase',
            isLightTheme ? 'text-gray-500' : 'text-gray-500'
          )}>{language}</span>

          {/* Theme selector & Copy */}
          <div className="flex items-center gap-2">
            {/* Theme dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className={cn(
                  'flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors',
                  isLightTheme
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                )}
              >
                <Palette className="h-3.5 w-3.5" />
                <span className="capitalize">{currentTheme.replace('-', ' ')}</span>
                <ChevronDown className="h-3 w-3" />
              </button>

              {showThemeDropdown && (
                <div className={cn(
                  'absolute right-0 top-full mt-1 z-20 w-48 rounded-md border shadow-xl',
                  isLightTheme
                    ? 'border-gray-200 bg-white'
                    : 'border-gray-700/50 bg-[#252526]'
                )}>
                  {/* Dark themes */}
                  <div className="p-1">
                    <div className={cn(
                      'px-2 py-1 text-xs font-semibold uppercase tracking-wide',
                      isLightTheme ? 'text-gray-500' : 'text-gray-500'
                    )}>Dark</div>
                    {themes.dark.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setCurrentTheme(t);
                          setShowThemeDropdown(false);
                        }}
                        className={cn(
                          'w-full text-left px-2 py-1.5 rounded text-xs capitalize transition-colors',
                          currentTheme === t
                            ? 'bg-primary/20 text-primary'
                            : isLightTheme
                              ? 'text-gray-700 hover:bg-gray-100'
                              : 'text-gray-300 hover:bg-gray-700/50'
                        )}
                      >
                        {t.replace('-', ' ')}
                      </button>
                    ))}
                  </div>

                  {/* Light themes */}
                  <div className={cn(
                    'border-t p-1',
                    isLightTheme ? 'border-gray-200' : 'border-gray-700/50'
                  )}>
                    <div className={cn(
                      'px-2 py-1 text-xs font-semibold uppercase tracking-wide',
                      isLightTheme ? 'text-gray-500' : 'text-gray-500'
                    )}>Light</div>
                    {themes.light.map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setCurrentTheme(t);
                          setShowThemeDropdown(false);
                        }}
                        className={cn(
                          'w-full text-left px-2 py-1.5 rounded text-xs capitalize transition-colors',
                          currentTheme === t
                            ? 'bg-primary/20 text-primary'
                            : isLightTheme
                              ? 'text-gray-700 hover:bg-gray-100'
                              : 'text-gray-300 hover:bg-gray-700/50'
                        )}
                      >
                        {t.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Copy button */}
            <button
              onClick={handleCopy}
              className={cn(
                'rounded p-1.5 opacity-0 transition-opacity group-hover:opacity-100',
                isLightTheme
                  ? 'text-gray-600 hover:bg-gray-200'
                  : 'text-gray-400 hover:bg-gray-700/50'
              )}
              aria-label="Copy code"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-400" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Highlighted Code */}
        <div
          className="codeshine-block overflow-x-auto text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Custom styles for Codeshine output */}
        <style>{`
          .codeshine-block pre {
            margin: 0;
            padding: 0.75rem 1rem;
            background: transparent !important;
            font-family: "JetBrains Mono", Menlo, Monaco, monospace;
            font-size: 0.8125rem;
            line-height: 1.5;
          }
          .codeshine-block code {
            font-family: inherit;
            background: transparent !important;
          }
          .codeshine-block .cs-line {
            display: flex;
            min-height: 1.35rem;
          }
          .codeshine-block .cs-line-number {
            flex-shrink: 0;
            width: 2.5rem;
            text-align: right;
            padding-right: 1rem;
            user-select: none;
            opacity: 0.4;
          }
          .codeshine-block .cs-line-content {
            flex: 1;
            white-space: pre;
          }
          .codeshine-block .cs-line-highlighted {
            background: rgba(59, 130, 246, 0.15);
            margin: 0 -1rem;
            padding: 0 1rem;
          }
          .codeshine-block .cs-line-diff-added {
            background: rgba(34, 197, 94, 0.15);
          }
          .codeshine-block .cs-line-diff-removed {
            background: rgba(239, 68, 68, 0.15);
          }
        `}</style>
      </div>
    </div>
  );
}
