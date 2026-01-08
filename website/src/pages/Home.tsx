import { Link } from 'react-router-dom';
import { ArrowRight, Github, Package, Code, Palette, Zap, FileCode, Check, Sparkles, Layers, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/code/CodeBlock';
import { PACKAGE_NAME, GITHUB_REPO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const INSTALL_COMMANDS = {
  npm: 'npm install @oxog/codeshine',
  yarn: 'yarn add @oxog/codeshine',
  pnpm: 'pnpm add @oxog/codeshine',
  bun: 'bun add @oxog/codeshine',
};

const DEMO_CODE = `import { highlight } from '@oxog/codeshine';

const code = \`function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`;
}\`;

const html = highlight(code, {
  language: 'typescript',
  theme: 'github-dark',
  lineNumbers: true,
});`;

const STATS = [
  { value: '~25KB', label: 'GZIPPED', description: 'Tiny bundle size', icon: Package, color: 'from-violet-500 to-purple-500' },
  { value: '0', label: 'DEPENDENCIES', description: 'Zero runtime deps', icon: Sparkles, color: 'from-pink-500 to-rose-500' },
  { value: '100%', label: 'TYPESCRIPT', description: 'Full type safety', icon: Code, color: 'from-cyan-500 to-blue-500' },
  { value: 'React+', label: 'FRAMEWORKS', description: 'Vue, Svelte, Vanilla', icon: Layers, color: 'from-emerald-500 to-green-500' },
];

const FEATURES = [
  {
    title: 'Zero Dependencies',
    description: 'No runtime dependencies means smaller bundle size and faster load times.',
    icon: Sparkles,
    color: 'from-violet-500 to-purple-500',
  },
  {
    title: 'TypeScript Native',
    description: 'Built with TypeScript strict mode for excellent type safety and DX.',
    icon: Code,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    title: '14 Beautiful Themes',
    description: 'GitHub, Dracula, Nord, Tokyo Night, and more built-in themes.',
    icon: Palette,
    color: 'from-pink-500 to-rose-500',
  },
  {
    title: '135+ Languages',
    description: 'JavaScript, TypeScript, Python, Rust, Go, and many more supported.',
    icon: FileCode,
    color: 'from-amber-500 to-orange-500',
    isNew: true,
  },
  {
    title: 'Streaming Support',
    description: 'Real-time syntax highlighting for streaming content and large files.',
    icon: Zap,
    color: 'from-emerald-500 to-green-500',
    isNew: true,
  },
  {
    title: 'Line Features',
    description: 'Line numbers, highlighting, diff view, and focus mode built-in.',
    icon: Layers,
    color: 'from-blue-500 to-indigo-500',
    isNew: true,
  },
];

const FRAMEWORKS = [
  { name: 'React', color: 'bg-cyan-500' },
  { name: 'Vue', color: 'bg-emerald-500' },
  { name: 'Svelte', color: 'bg-orange-500' },
  { name: 'JS', color: 'bg-yellow-500' },
];

export function Home() {
  const [packageManager, setPackageManager] = useState<keyof typeof INSTALL_COMMANDS>('npm');
  const [copied, setCopied] = useState(false);

  const copyInstallCommand = async () => {
    await navigator.clipboard.writeText(INSTALL_COMMANDS[packageManager]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{PACKAGE_NAME}</span>
            </div>

            {/* Title with gradient */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Zero-dependency
              </span>
              <br />
              <span className="text-foreground">
                Syntax Highlighter
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Lightweight, framework-agnostic syntax highlighting with{' '}
              <span className="text-foreground font-medium">beautiful themes</span>.
              Works with React, Vue, Svelte, or vanilla JavaScript.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button asChild size="lg" className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0 px-8">
                <Link to="/docs">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-violet-500/30 hover:bg-violet-500/10">
                <a href={`https://github.com/${GITHUB_REPO}`} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </a>
              </Button>
            </div>

            {/* Install Command */}
            <div className="flex flex-col items-center gap-3">
              <div className="inline-flex gap-1 p-1 rounded-lg bg-muted/50 border border-border/50">
                {Object.keys(INSTALL_COMMANDS).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPackageManager(pm as keyof typeof INSTALL_COMMANDS)}
                    className={cn(
                      'px-3 py-1.5 text-sm font-medium rounded-md transition-all',
                      packageManager === pm
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {pm}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border/50">
                <code className="font-mono text-sm text-muted-foreground">
                  {INSTALL_COMMANDS[packageManager]}
                </code>
                <button
                  onClick={copyInstallCommand}
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </button>
              </div>
            </div>

            {/* Framework badges */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="flex -space-x-1">
                {FRAMEWORKS.map((fw) => (
                  <div
                    key={fw.name}
                    className={cn('w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-background', fw.color)}
                  >
                    {fw.name[0]}
                  </div>
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Works with React, Vue, Svelte & Vanilla JS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={cn('w-14 h-14 rounded-2xl bg-gradient-to-br mx-auto mb-4 flex items-center justify-center', stat.color)}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className={cn('text-3xl md:text-4xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent', stat.color)}>
                  {stat.value}
                </div>
                <div className="text-xs font-semibold text-muted-foreground tracking-wider mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium mb-4">
                <Code className="w-4 h-4" />
                Live Demo
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">See it in action</h2>
              <p className="text-muted-foreground">Beautiful syntax highlighting with just a few lines of code</p>
            </div>
            <CodeBlock code={DEMO_CODE} language="typescript" title="example.ts" highlightLines={[7, 8, 9]} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 text-violet-400 text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for modern syntax highlighting, nothing you don't
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group relative p-6 rounded-2xl bg-card border border-border/50 hover:border-violet-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
              >
                {feature.isNew && (
                  <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    New
                  </div>
                )}
                <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4', feature.color)}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Add beautiful syntax highlighting to your project in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white border-0 px-8">
                <Link to="/docs">
                  Read the Docs
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/playground">
                  Try the Playground
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
