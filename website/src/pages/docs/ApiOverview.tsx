import { CodeBlock } from '@/components/code/CodeBlock';

const CORE_FUNCTIONS = [
  {
    name: 'highlight',
    signature: 'highlight(code: string, options?: HighlightOptions): string',
    description: 'Highlights code and returns HTML string.',
    example: `import { highlight } from '@oxog/codeshine';

const html = highlight(\`const x = 42;\`, {
  language: 'javascript',
  theme: themes.githubDark,
  showLineNumbers: true,
});`,
  },
  {
    name: 'highlightSync',
    signature: 'highlightSync(code: string, options?: HighlightOptions): string',
    description: 'Synchronous version of highlight. Same API.',
    example: `import { highlightSync } from '@oxog/codeshine';

const html = highlightSync(code, { language: 'typescript' });`,
  },
  {
    name: 'tokenize',
    signature: 'tokenize(code: string, language: string): Token[]',
    description: 'Returns array of tokens without rendering to HTML.',
    example: `import { tokenize } from '@oxog/codeshine';

const tokens = tokenize('const x = 42;', 'javascript');
// [{ type: 'keyword', value: 'const' }, ...]`,
  },
  {
    name: 'detectLanguage',
    signature: 'detectLanguage(code: string): DetectionResult',
    description: 'Detects the programming language of the given code.',
    example: `import { detectLanguage } from '@oxog/codeshine';

const result = detectLanguage('def hello(): pass');
// { language: 'python', confidence: 0.95 }`,
  },
];

const STREAMING_API = [
  {
    name: 'highlightStream',
    signature: 'highlightStream(options?: StreamOptions): TransformStream',
    description: 'Creates a TransformStream for streaming syntax highlighting.',
    example: `import { highlightStream } from '@oxog/codeshine';

const stream = highlightStream({
  language: 'javascript',
  theme: themes.githubDark,
});

// Pipe chunks through
const reader = inputStream.pipeThrough(stream).getReader();`,
  },
];

const REACT_API = [
  {
    name: 'CodeBlock',
    signature: '<CodeBlock code={string} language={string} ... />',
    description: 'React component for rendering highlighted code.',
    example: `import { CodeBlock } from '@oxog/codeshine/react';

function App() {
  return (
    <CodeBlock
      code="const x = 42;"
      language="javascript"
      showLineNumbers
      highlightLines={[1]}
    />
  );
}`,
  },
  {
    name: 'StreamingCodeBlock',
    signature: '<StreamingCodeBlock stream={ReadableStream} ... />',
    description: 'React component for streaming code display.',
    example: `import { StreamingCodeBlock } from '@oxog/codeshine/react';

function App() {
  return (
    <StreamingCodeBlock
      stream={codeStream}
      language="typescript"
      onComplete={() => console.log('Done!')}
    />
  );
}`,
  },
];

export function ApiOverview() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">API Reference</h1>
        <p className="text-lg text-muted-foreground">
          Complete API documentation for @oxog/codeshine.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Core Functions</h2>
        {CORE_FUNCTIONS.map((fn) => (
          <div key={fn.name} className="space-y-3 border rounded-lg p-4">
            <div>
              <h3 className="text-xl font-semibold font-mono">{fn.name}</h3>
              <code className="text-sm text-muted-foreground">{fn.signature}</code>
            </div>
            <p className="text-muted-foreground">{fn.description}</p>
            <CodeBlock code={fn.example} language="typescript" />
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Streaming API</h2>
        {STREAMING_API.map((fn) => (
          <div key={fn.name} className="space-y-3 border rounded-lg p-4">
            <div>
              <h3 className="text-xl font-semibold font-mono">{fn.name}</h3>
              <code className="text-sm text-muted-foreground">{fn.signature}</code>
            </div>
            <p className="text-muted-foreground">{fn.description}</p>
            <CodeBlock code={fn.example} language="typescript" />
          </div>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">React Components</h2>
        {REACT_API.map((fn) => (
          <div key={fn.name} className="space-y-3 border rounded-lg p-4">
            <div>
              <h3 className="text-xl font-semibold font-mono">{fn.name}</h3>
              <code className="text-sm text-muted-foreground">{fn.signature}</code>
            </div>
            <p className="text-muted-foreground">{fn.description}</p>
            <CodeBlock code={fn.example} language="tsx" />
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">HighlightOptions</h2>
        <CodeBlock
          code={`interface HighlightOptions {
  // Language to use for highlighting
  language?: string;

  // Theme to apply
  theme?: Theme;

  // Show line numbers (default: false)
  showLineNumbers?: boolean;

  // Lines to highlight (1-indexed)
  highlightLines?: number[];

  // Show language badge
  showLanguageBadge?: boolean;

  // Diff highlighting
  diffLines?: {
    added?: number[];
    removed?: number[];
  };

  // Auto-detect language
  autoDetect?: boolean;

  // Custom class name
  className?: string;
}`}
          language="typescript"
          title="types.ts"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Token Types</h2>
        <CodeBlock
          code={`enum TokenType {
  plain = 'plain',
  keyword = 'keyword',
  string = 'string',
  number = 'number',
  comment = 'comment',
  operator = 'operator',
  punctuation = 'punctuation',
  function = 'function',
  variable = 'variable',
  className = 'class-name',
  property = 'property',
  regex = 'regex',
  builtin = 'builtin',
  constant = 'constant',
  boolean = 'boolean',
  // ... and more
}`}
          language="typescript"
        />
      </section>
    </div>
  );
}
