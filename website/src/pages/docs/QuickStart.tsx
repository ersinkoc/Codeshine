import { CodeBlock } from '@/components/code/CodeBlock';

export function QuickStart() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Quick Start</h1>
        <p className="text-lg text-muted-foreground">
          Get up and running with Codeshine in minutes.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Usage</h2>
        <p className="text-muted-foreground">
          The simplest way to use Codeshine is with the <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">highlight</code> function:
        </p>
        <CodeBlock
          code={`import { highlight } from '@oxog/codeshine';

const code = \`function hello(name) {
  console.log(\\\`Hello, \\\${name}!\\\`);
}\`;

const html = highlight(code, {
  language: 'javascript',
});

document.getElementById('code').innerHTML = html;`}
          language="javascript"
          title="basic.js"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Options</h2>
        <p className="text-muted-foreground">
          Customize the output with various options:
        </p>
        <CodeBlock
          code={`const html = highlight(code, {
  language: 'typescript',
  theme: 'github-dark',
  lineNumbers: true,
  highlightLines: [2, 3],
  copyButton: true,
  showLanguageBadge: true,
});`}
          language="javascript"
          highlightLines={[3, 4, 5, 6, 7]}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Async Highlighting</h2>
        <p className="text-muted-foreground">
          For non-blocking highlighting of large files:
        </p>
        <CodeBlock
          code={`import { highlightAsync } from '@oxog/codeshine';

const html = await highlightAsync(largeCode, {
  language: 'javascript',
  theme: 'dracula',
});`}
          language="javascript"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Using the Codeshine Class</h2>
        <p className="text-muted-foreground">
          For multiple highlights with shared configuration:
        </p>
        <CodeBlock
          code={`import { Codeshine } from '@oxog/codeshine';

const codeshine = new Codeshine({
  theme: 'github-dark',
  defaultLanguage: 'javascript',
});

// Highlight multiple code blocks
const html1 = codeshine.highlight('const x = 1;');
const html2 = codeshine.highlight('const y = 2;');

// Change theme dynamically
codeshine.setTheme('monokai');
const html3 = codeshine.highlight('const z = 3;');`}
          language="javascript"
          title="class-usage.js"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">React Integration</h2>
        <p className="text-muted-foreground">
          Using the React component:
        </p>
        <CodeBlock
          code={`import { CodeBlock } from '@oxog/codeshine/react';

function App() {
  return (
    <CodeBlock
      code={\`console.log('Hello!');\`}
      language="javascript"
      theme="dracula"
      lineNumbers
      copyButton
    />
  );
}`}
          language="tsx"
          title="App.tsx"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Auto Language Detection</h2>
        <p className="text-muted-foreground">
          Let Codeshine automatically detect the language:
        </p>
        <CodeBlock
          code={`import { highlight, detectLanguage } from '@oxog/codeshine';

const code = \`
def hello():
    print("Hello, World!")
\`;

// Detect language
const result = detectLanguage(code);
console.log(result); // { language: 'python', confidence: 0.95 }

// Or use autoDetect option
const html = highlight(code, { autoDetect: true });`}
          language="javascript"
        />
      </section>
    </div>
  );
}
