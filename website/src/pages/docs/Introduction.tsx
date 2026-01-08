import { CodeBlock } from '@/components/code/CodeBlock';

export function Introduction() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Introduction</h1>
        <p className="text-lg text-muted-foreground">
          Codeshine is a zero-dependency syntax highlighter built for the modern web.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">What is Codeshine?</h2>
        <p className="text-muted-foreground">
          Codeshine is a fast, lightweight syntax highlighting library that works in any JavaScript environment.
          It supports 135+ programming languages, 14 beautiful themes, and provides first-class React integration.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li><strong>Zero Dependencies</strong> - No external runtime dependencies</li>
          <li><strong>135+ Languages</strong> - JavaScript, TypeScript, Python, Rust, Go, and more</li>
          <li><strong>14 Themes</strong> - GitHub, Dracula, Nord, One Dark, Tokyo Night, etc.</li>
          <li><strong>React Ready</strong> - First-class React components and hooks</li>
          <li><strong>TypeScript Native</strong> - Full type safety with strict mode</li>
          <li><strong>Streaming</strong> - Progressive rendering for large files</li>
          <li><strong>Line Features</strong> - Numbers, highlighting, diff view</li>
          <li><strong>Customizable</strong> - Create custom themes and plugins</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Quick Example</h2>
        <CodeBlock
          code={`import { highlight } from '@oxog/codeshine';

const html = highlight(\`
function greet(name) {
  return \\\`Hello, \\\${name}!\\\`;
}
\`, {
  language: 'javascript',
  theme: 'github-dark',
  lineNumbers: true
});

document.getElementById('code').innerHTML = html;`}
          language="javascript"
          title="example.js"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">React Usage</h2>
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
    </div>
  );
}
