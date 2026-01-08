import { CodeBlock } from '@/components/code/CodeBlock';

export function Installation() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Installation</h1>
        <p className="text-lg text-muted-foreground">
          Install Codeshine using your preferred package manager.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">npm</h2>
        <CodeBlock code="npm install @oxog/codeshine" language="bash" showLineNumbers={false} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">pnpm</h2>
        <CodeBlock code="pnpm add @oxog/codeshine" language="bash" showLineNumbers={false} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">yarn</h2>
        <CodeBlock code="yarn add @oxog/codeshine" language="bash" showLineNumbers={false} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">bun</h2>
        <CodeBlock code="bun add @oxog/codeshine" language="bash" showLineNumbers={false} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">CDN Usage</h2>
        <p className="text-muted-foreground">
          You can also use Codeshine directly in the browser via CDN:
        </p>

        <h3 className="text-lg font-medium mt-4">ESM (recommended)</h3>
        <CodeBlock
          code={`<script type="module">
  import { highlight } from 'https://unpkg.com/@oxog/codeshine/dist/browser/codeshine.esm.min.js';

  const html = highlight('const x = 1;', { language: 'javascript' });
  document.getElementById('code').innerHTML = html;
</script>`}
          language="html"
        />

        <h3 className="text-lg font-medium mt-4">IIFE (for older browsers)</h3>
        <CodeBlock
          code={`<script src="https://unpkg.com/@oxog/codeshine/dist/browser/codeshine.iife.min.js"></script>
<script>
  const { highlight } = Codeshine;
  const html = highlight('const x = 1;', { language: 'javascript' });
  document.getElementById('code').innerHTML = html;
</script>`}
          language="html"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Requirements</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Node.js 18.0.0 or higher (for Node.js usage)</li>
          <li>Modern browser with ES2020 support (for browser usage)</li>
          <li>React 17+ (for React components)</li>
        </ul>
      </section>
    </div>
  );
}
