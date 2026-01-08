import { CodeBlock } from '@/components/code/CodeBlock';

const LANGUAGE_TIERS = [
  {
    name: 'Tier 1 (Core)',
    languages: ['JavaScript', 'TypeScript', 'JSX', 'TSX', 'HTML', 'CSS', 'JSON', 'Markdown'],
  },
  {
    name: 'Tier 2 (Popular)',
    languages: ['Python', 'Java', 'C', 'C++', 'C#', 'Go', 'Rust', 'Ruby', 'PHP', 'Swift', 'Kotlin'],
  },
  {
    name: 'Tier 3 (Web/Config)',
    languages: ['Bash', 'GraphQL', 'PowerShell', 'SQL', 'TOML', 'XML', 'YAML'],
  },
  {
    name: 'Tier 4 (Data)',
    languages: ['CSV', 'Diff', 'JSON5', 'Regex'],
  },
  {
    name: 'Tier 5 (Extended)',
    languages: ['Lua', 'Dockerfile', 'Perl', 'R', 'Scala', 'Haskell', 'Elixir', 'and more...'],
  },
];

export function Languages() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-4">Languages</h1>
        <p className="text-lg text-muted-foreground">
          Codeshine supports 45+ programming languages out of the box.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Specifying Language</h2>
        <p className="text-muted-foreground">
          Use the <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">language</code> option:
        </p>
        <CodeBlock
          code={`import { highlight } from '@oxog/codeshine';

highlight(code, { language: 'typescript' });
highlight(code, { language: 'python' });
highlight(code, { language: 'rust' });`}
          language="javascript"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Supported Languages</h2>
        {LANGUAGE_TIERS.map((tier) => (
          <div key={tier.name} className="space-y-2">
            <h3 className="text-lg font-medium">{tier.name}</h3>
            <div className="flex flex-wrap gap-2">
              {tier.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-1 rounded-md bg-muted text-sm font-mono"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Language Aliases</h2>
        <p className="text-muted-foreground">
          Many languages have aliases for convenience:
        </p>
        <CodeBlock
          code={`// These are equivalent
highlight(code, { language: 'javascript' });
highlight(code, { language: 'js' });

highlight(code, { language: 'typescript' });
highlight(code, { language: 'ts' });

highlight(code, { language: 'python' });
highlight(code, { language: 'py' });`}
          language="javascript"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Auto Detection</h2>
        <p className="text-muted-foreground">
          Let Codeshine detect the language automatically:
        </p>
        <CodeBlock
          code={`import { detectLanguage, highlight } from '@oxog/codeshine';

const code = \`
def hello():
    print("Hello!")
\`;

// Detect language
const result = detectLanguage(code);
console.log(result);
// { language: 'python', confidence: 0.95 }

// Or use autoDetect
const html = highlight(code, { autoDetect: true });`}
          language="javascript"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Custom Languages</h2>
        <p className="text-muted-foreground">
          Register your own language definitions:
        </p>
        <CodeBlock
          code={`import { defineLang, registerLanguage } from '@oxog/codeshine';

const myLang = defineLang({
  name: 'my-lang',
  aliases: ['ml'],
  patterns: [
    { pattern: /\\b(if|else|while|for)\\b/g, type: 'keyword' },
    { pattern: /"[^"]*"/g, type: 'string' },
    { pattern: /\\b\\d+\\b/g, type: 'number' },
  ],
  comments: {
    line: '//',
    block: { start: '/*', end: '*/' },
  },
});

registerLanguage(myLang);

// Now use it
highlight(code, { language: 'my-lang' });`}
          language="typescript"
          title="custom-language.ts"
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Get Language Info</h2>
        <CodeBlock
          code={`import { getLanguage, getLanguageNames, hasLanguage } from '@oxog/codeshine';

// Check if language is supported
const supported = hasLanguage('typescript'); // true

// Get language definition
const lang = getLanguage('typescript');

// Get all language names
const names = getLanguageNames();
// ['javascript', 'typescript', 'python', ...]`}
          language="javascript"
        />
      </section>
    </div>
  );
}
