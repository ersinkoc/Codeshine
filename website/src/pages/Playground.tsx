import { useState, useMemo } from 'react';
import { highlight, themes, detectLanguage } from '@oxog/codeshine';
import { useTheme } from '@/hooks/useTheme';

const SAMPLE_CODES: Record<string, string> = {
  javascript: `// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log(\`Fibonacci(10) = \${result}\`);`,

  typescript: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`,

  python: `# Python Example
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

print(quicksort([3, 6, 8, 10, 1, 2, 1]))`,

  rust: `// Rust Example
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    let sum: i32 = numbers
        .iter()
        .filter(|&n| n % 2 == 0)
        .map(|n| n * 2)
        .sum();

    println!("Sum of doubled evens: {}", sum);
}`,

  go: `// Go Example
package main

import "fmt"

func main() {
    messages := make(chan string)

    go func() {
        messages <- "Hello, World!"
    }()

    msg := <-messages
    fmt.Println(msg)
}`,
};

const THEME_OPTIONS = [
  { value: 'githubDark', label: 'GitHub Dark' },
  { value: 'githubLight', label: 'GitHub Light' },
  { value: 'draculaDark', label: 'Dracula' },
  { value: 'oneDark', label: 'One Dark' },
  { value: 'oneLight', label: 'One Light' },
  { value: 'tokyoNight', label: 'Tokyo Night' },
];

const LANGUAGE_OPTIONS = [
  'javascript',
  'typescript',
  'python',
  'rust',
  'go',
  'java',
  'c',
  'cpp',
  'csharp',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'html',
  'css',
  'json',
  'yaml',
  'sql',
  'bash',
];

export function Playground() {
  const { resolvedTheme } = useTheme();
  const [code, setCode] = useState(SAMPLE_CODES.typescript);
  const [language, setLanguage] = useState('typescript');
  const [themeName, setThemeName] = useState(resolvedTheme === 'dark' ? 'githubDark' : 'githubLight');
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [highlightLinesInput, setHighlightLinesInput] = useState('');

  const highlightLines = useMemo(() => {
    if (!highlightLinesInput.trim()) return [];
    return highlightLinesInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));
  }, [highlightLinesInput]);

  const theme = themes[themeName as keyof typeof themes];

  const highlightedHtml = useMemo(() => {
    try {
      return highlight(code, {
        language,
        theme,
        lineNumbers: showLineNumbers,
        highlightLines: highlightLines.length > 0 ? highlightLines : undefined,
      });
    } catch {
      return '<pre class="text-red-500">Error highlighting code</pre>';
    }
  }, [code, language, theme, showLineNumbers, highlightLines]);

  const detectedLanguage = useMemo(() => {
    try {
      return detectLanguage(code);
    } catch {
      return null;
    }
  }, [code]);

  const handleSampleClick = (lang: string) => {
    if (SAMPLE_CODES[lang]) {
      setCode(SAMPLE_CODES[lang]);
      setLanguage(lang);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Playground</h1>
          <p className="text-lg text-muted-foreground">
            Experiment with @oxog/codeshine in real-time.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Input</h2>
              <div className="flex gap-2">
                {Object.keys(SAMPLE_CODES).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleSampleClick(lang)}
                    className={`px-2 py-1 text-xs rounded ${
                      language === lang
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 p-4 font-mono text-sm bg-muted rounded-lg border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Paste your code here..."
              spellCheck={false}
            />

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 bg-muted rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Theme</label>
                <select
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  className="w-full px-3 py-2 bg-muted rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {THEME_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Highlight Lines</label>
                <input
                  type="text"
                  value={highlightLinesInput}
                  onChange={(e) => setHighlightLinesInput(e.target.value)}
                  placeholder="e.g., 1, 3, 5"
                  className="w-full px-3 py-2 bg-muted rounded-md border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex items-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showLineNumbers}
                    onChange={(e) => setShowLineNumbers(e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm">Show Line Numbers</span>
                </label>
              </div>
            </div>

            {detectedLanguage && (
              <div className="text-sm text-muted-foreground">
                Detected:{' '}
                <span className="font-mono">
                  {detectedLanguage.language} ({Math.round(detectedLanguage.confidence * 100)}%
                  confidence)
                </span>
              </div>
            )}
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Output</h2>
            <div
              className="rounded-lg overflow-hidden border codeshine-output"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
            <style>{`
              .codeshine-output pre {
                margin: 0;
                padding: 0.75rem 1rem;
                font-family: "JetBrains Mono", Menlo, Monaco, monospace;
                font-size: 0.8125rem;
                line-height: 1.5;
                overflow-x: auto;
              }
              .codeshine-output code {
                font-family: inherit;
              }
              .codeshine-output .cs-line {
                display: flex;
                min-height: 1.35rem;
              }
              .codeshine-output .cs-line-number {
                flex-shrink: 0;
                width: 2.5rem;
                text-align: right;
                padding-right: 1rem;
                user-select: none;
                opacity: 0.4;
              }
              .codeshine-output .cs-line-content {
                flex: 1;
                white-space: pre;
              }
              .codeshine-output .cs-line-highlighted {
                background: rgba(59, 130, 246, 0.15);
              }
              .codeshine-output .cs-line-diff-added {
                background: rgba(34, 197, 94, 0.15);
              }
              .codeshine-output .cs-line-diff-removed {
                background: rgba(239, 68, 68, 0.15);
              }
            `}</style>

            <details className="text-sm">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                View HTML Output
              </summary>
              <pre className="mt-2 p-4 bg-muted rounded-lg overflow-auto text-xs max-h-40">
                {highlightedHtml}
              </pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
