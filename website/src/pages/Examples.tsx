import { useState } from 'react';
import { CodeBlock } from '@/components/code/CodeBlock';

const EXAMPLES = [
  {
    id: 'basic',
    title: 'Basic Highlighting',
    description: 'Simple syntax highlighting with language detection.',
    code: `import { highlight } from '@oxog/codeshine';

const code = \`function greet(name) {
  return \\\`Hello, \\\${name}!\\\`;
}\`;

const html = highlight(code, {
  language: 'javascript',
  showLineNumbers: true,
});

document.getElementById('output').innerHTML = html;`,
    language: 'javascript',
  },
  {
    id: 'themes',
    title: 'Using Themes',
    description: 'Apply different themes to your code blocks.',
    code: `import { highlight, themes } from '@oxog/codeshine';

// Available themes
const darkThemes = [
  themes.githubDark,
  themes.draculaDark,
  themes.oneDark,
  themes.tokyoNight,
];

const lightThemes = [
  themes.githubLight,
  themes.oneLight,
];

// Apply a theme
const html = highlight(code, {
  language: 'typescript',
  theme: themes.draculaDark,
});`,
    language: 'typescript',
  },
  {
    id: 'line-highlight',
    title: 'Line Highlighting',
    description: 'Highlight specific lines to draw attention.',
    code: `import { highlight } from '@oxog/codeshine';

const code = \`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));\`;

const html = highlight(code, {
  language: 'javascript',
  showLineNumbers: true,
  highlightLines: [2, 3], // Highlight the recursive case
});`,
    language: 'javascript',
    highlightLines: [4, 5],
  },
  {
    id: 'diff',
    title: 'Diff Highlighting',
    description: 'Show added and removed lines in code diffs.',
    code: `function greet(name) {
  console.log('Deprecated');
  return \`Hello, \${name}!\`;
  return \`Welcome, \${name}!\`;
}`,
    language: 'javascript',
    diffLines: { removed: [2], added: [4] },
  },
  {
    id: 'react',
    title: 'React Component',
    description: 'Use the React component for easy integration.',
    code: `import { CodeBlock } from '@oxog/codeshine/react';
import { themes } from '@oxog/codeshine';

function Documentation() {
  const code = \`const greeting = "Hello, World!";\`;

  return (
    <article>
      <h1>Getting Started</h1>
      <CodeBlock
        code={code}
        language="javascript"
        theme={themes.githubDark}
        showLineNumbers
        highlightLines={[1]}
      />
    </article>
  );
}`,
    language: 'tsx',
  },
  {
    id: 'streaming',
    title: 'Streaming Highlight',
    description: 'Real-time syntax highlighting for streaming content.',
    code: `import { highlightStream } from '@oxog/codeshine';

async function streamCode() {
  const response = await fetch('/api/code-stream');

  const stream = highlightStream({
    language: 'typescript',
    theme: themes.githubDark,
  });

  const reader = response.body
    .pipeThrough(stream)
    .getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Append highlighted HTML
    output.innerHTML += value;
  }
}`,
    language: 'typescript',
  },
  {
    id: 'detection',
    title: 'Language Detection',
    description: 'Automatically detect the programming language.',
    code: `import { detectLanguage, highlight } from '@oxog/codeshine';

const unknownCode = \`
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
\`;

const detection = detectLanguage(unknownCode);
console.log(detection);
// { language: 'python', confidence: 0.95 }

const html = highlight(unknownCode, {
  language: detection.language,
  showLineNumbers: true,
});`,
    language: 'typescript',
  },
  {
    id: 'custom-lang',
    title: 'Custom Language',
    description: 'Define and register your own language.',
    code: `import { defineLang, registerLanguage, highlight } from '@oxog/codeshine';

// Define a custom DSL
const myDSL = defineLang({
  name: 'my-dsl',
  aliases: ['dsl'],
  patterns: [
    { pattern: /\\b(rule|when|then|end)\\b/g, type: 'keyword' },
    { pattern: /\\b(true|false|null)\\b/g, type: 'boolean' },
    { pattern: /"[^"]*"/g, type: 'string' },
    { pattern: /\\b\\d+\\b/g, type: 'number' },
    { pattern: /#.*/g, type: 'comment' },
    { pattern: /\\$[a-zA-Z_][a-zA-Z0-9_]*/g, type: 'variable' },
  ],
});

registerLanguage(myDSL);

const code = \`# Business rule
rule "discount"
when
  $customer.tier == "gold"
  $order.total > 100
then
  $order.discount = 0.15
end\`;

const html = highlight(code, { language: 'my-dsl' });`,
    language: 'typescript',
  },
];

export function Examples() {
  const [activeExample, setActiveExample] = useState(EXAMPLES[0].id);
  const currentExample = EXAMPLES.find((e) => e.id === activeExample)!;

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Examples</h1>
          <p className="text-lg text-muted-foreground">
            Explore common use cases and patterns with @oxog/codeshine.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <nav className="lg:w-64 shrink-0">
            <ul className="space-y-1">
              {EXAMPLES.map((example) => (
                <li key={example.id}>
                  <button
                    onClick={() => setActiveExample(example.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      activeExample === example.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {example.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{currentExample.title}</h2>
                <p className="text-muted-foreground">{currentExample.description}</p>
              </div>
              <CodeBlock
                code={currentExample.code}
                language={currentExample.language}
                showLineNumbers
                highlightLines={(currentExample as { highlightLines?: number[] }).highlightLines}
                diffLines={(currentExample as { diffLines?: { added?: number[]; removed?: number[] } }).diffLines}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
