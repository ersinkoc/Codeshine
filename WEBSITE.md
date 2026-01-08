# Documentation Website Specification

Modern, responsive documentation website for @oxog NPM packages using React 19, Vite 6, Tailwind CSS v4, and @oxog/codeshine for syntax highlighting.

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.x | UI Framework |
| Vite | 6.x | Build Tool |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling (CSS-first config) |
| shadcn/ui | latest | UI Components |
| @oxog/codeshine | latest | Syntax Highlighting |
| Lucide React | latest | Icons |
| React Router | 7.x | Routing |

## Font Requirements

```html
<!-- In index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Required Fonts:**
- **Body Text**: Inter (or Geist)
- **Code/Monospace**: JetBrains Mono

## Project Setup

```bash
# Inside package root
mkdir website && cd website

# Create Vite project with React 19
npm create vite@latest . -- --template react-ts

# Install core dependencies
npm install react@^19 react-dom@^19
npm install react-router-dom@^7
npm install lucide-react

# Install @oxog/codeshine for syntax highlighting
npm install @oxog/codeshine

# Install Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# Install shadcn/ui (follow shadcn setup for v4)
npx shadcn@latest init
```

## Site Structure

```
website/
├── public/
│   ├── CNAME                   # {package-name}.oxog.dev
│   ├── llms.txt                # Copied from package root
│   ├── favicon.svg
│   └── og-image.png            # 1200x630 Open Graph image
├── src/
│   ├── main.tsx                # Entry point
│   ├── App.tsx                 # Router setup
│   ├── index.css               # Tailwind v4 imports + custom styles
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Layout.tsx      # Main layout wrapper
│   │   │   ├── Header.tsx      # Navigation, theme toggle, GitHub star
│   │   │   ├── Sidebar.tsx     # Docs navigation
│   │   │   └── Footer.tsx      # Links, credits, author
│   │   ├── code/
│   │   │   ├── CodeBlock.tsx   # IDE-style wrapper for @oxog/codeshine
│   │   │   └── CodePreview.tsx # Live code preview
│   │   ├── home/
│   │   │   ├── Hero.tsx        # Package intro, install command
│   │   │   ├── Features.tsx    # Key features grid
│   │   │   └── Stats.tsx       # Downloads, stars, bundle size
│   │   └── common/
│   │       ├── ThemeToggle.tsx # Dark/Light mode switch
│   │       ├── CopyButton.tsx  # Copy to clipboard
│   │       ├── GitHubStar.tsx  # GitHub star button with count
│   │       ├── InstallTabs.tsx # npm/yarn/pnpm/bun tabs
│   │       └── SearchDialog.tsx # Search modal (Cmd+K)
│   ├── pages/
│   │   ├── Home.tsx            # Landing page
│   │   ├── docs/
│   │   │   ├── Introduction.tsx
│   │   │   ├── Installation.tsx
│   │   │   ├── QuickStart.tsx
│   │   │   └── [...sections].tsx
│   │   ├── api/
│   │   │   ├── Overview.tsx
│   │   │   ├── Functions.tsx
│   │   │   └── Types.tsx
│   │   ├── Examples.tsx        # Interactive examples
│   │   ├── Plugins.tsx         # Plugin documentation
│   │   └── Playground.tsx      # Live playground
│   ├── hooks/
│   │   ├── useTheme.ts         # Theme management
│   │   └── useClipboard.ts     # Copy functionality
│   └── lib/
│       ├── utils.ts            # Utility functions (cn helper)
│       └── constants.ts        # Package metadata
├── index.html
├── vite.config.ts
├── tailwind.config.ts          # Tailwind v4 config
├── components.json             # shadcn/ui config
├── tsconfig.json
└── package.json
```

## CNAME Configuration

Create `public/CNAME` file:

```
{package-name}.oxog.dev
```

---

## @oxog/codeshine Integration

### Why @oxog/codeshine?

- Zero dependencies (like all @oxog packages)
- 45+ languages supported
- 14 themes (9 dark, 5 light)
- Built-in React components
- Line numbers, highlighting, diff view
- Copy button, language badge
- TypeScript native

### Available Themes

**Dark Themes:** `dracula`, `github-dark`, `vscode-dark`, `monokai`, `nord`, `one-dark`, `tokyo-night`, `catppuccin`, `ayu-dark`

**Light Themes:** `github-light`, `vscode-light`, `one-light`, `solarized-light`, `ayu-light`

### Basic Usage

```tsx
import { CodeBlock } from '@oxog/codeshine/react';

<CodeBlock 
  code={code} 
  language="typescript" 
  theme="github-dark"
  lineNumbers 
  copyButton
/>
```

### IDE-Style Code Block Wrapper

Create a wrapper component that provides macOS-style window chrome:

```tsx
// src/components/code/CodeBlock.tsx
import { useState } from 'react';
import { CodeBlock as CodeshinBlock } from '@oxog/codeshine/react';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  highlightLines?: (number | string)[];
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  className?: string;
}

export function CodeBlock({ 
  code, 
  language, 
  filename,
  highlightLines,
  showLineNumbers = true,
  showCopyButton = true,
  className
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { resolvedTheme } = useTheme();
  
  // Sync codeshine theme with app theme
  const codeTheme = resolvedTheme === 'dark' ? 'github-dark' : 'github-light';
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn(
      "relative group rounded-xl overflow-hidden",
      "border border-border bg-card shadow-sm",
      "my-4",
      className
    )}>
      {/* IDE Header - macOS style */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/50 border-b border-border">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors" />
          </div>
          {/* Filename or language */}
          {filename && (
            <span className="text-sm text-muted-foreground font-mono">
              {filename}
            </span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">
            {language}
          </span>
          {showCopyButton && (
            <button
              onClick={handleCopy}
              className={cn(
                "flex items-center gap-1.5 px-2 py-1 rounded-md text-xs",
                "text-muted-foreground hover:text-foreground",
                "hover:bg-accent transition-colors"
              )}
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-500" />
                  <span className="text-green-500">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {/* Code Block - @oxog/codeshine */}
      <div className="overflow-x-auto">
        <CodeshinBlock
          code={code.trim()}
          language={language}
          theme={codeTheme}
          lineNumbers={showLineNumbers}
          highlightLines={highlightLines}
        />
      </div>
    </div>
  );
}
```

### Advanced Code Block Features

```tsx
// With line highlighting
<CodeBlock 
  code={code} 
  language="typescript"
  filename="src/index.ts"
  highlightLines={[2, 3, '5-7']}
/>

// With diff view (use codeshine directly)
import { CodeBlock as CodeshinBlock } from '@oxog/codeshine/react';

<CodeshinBlock
  code={code}
  language="typescript"
  theme={codeTheme}
  diffLines={{
    added: [3, 4],
    removed: [1],
    modified: [7]
  }}
/>

// With word highlighting
<CodeshinBlock
  code={code}
  language="typescript"
  theme={codeTheme}
  highlightWords={['useState', 'useEffect']}
/>
```

---

## Theme System

### Theme Provider

```tsx
// src/hooks/useTheme.ts
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'dark' | 'light';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 'system';
    }
    return 'system';
  });

  const resolvedTheme = theme === 'system'
    ? (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolvedTheme);
    localStorage.setItem('theme', theme);
  }, [theme, resolvedTheme]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}
```

### Theme Toggle Component

```tsx
// src/components/common/ThemeToggle.tsx
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
```

---

## Color System (Tailwind v4 + shadcn/ui)

```css
/* src/index.css */
@import "tailwindcss";

@theme {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 0% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 3.9%;
    --primary: 262 83% 58%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;
    --muted: 0 0% 96.1%;
    --muted-foreground: 0 0% 45.1%;
    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;
    --ring: 262 83% 58%;
    --radius: 0.75rem;
  }

  .dark {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;
    --card: 0 0% 6%;
    --card-foreground: 0 0% 98%;
    --popover: 0 0% 6%;
    --popover-foreground: 0 0% 98%;
    --primary: 262 83% 58%;
    --primary-foreground: 0 0% 98%;
    --secondary: 0 0% 14.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 0 0% 14.9%;
    --muted-foreground: 0 0% 63.9%;
    --accent: 0 0% 14.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
    --ring: 262 83% 58%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground antialiased;
    font-family: var(--font-sans);
  }
  
  code, pre {
    font-family: var(--font-mono);
  }
  
  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    @apply bg-transparent;
  }
  
  ::-webkit-scrollbar-thumb {
    @apply bg-border rounded-full;
  }
  
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-muted-foreground/50;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Required Components

### Header with GitHub Star

```tsx
// src/components/layout/Header.tsx
import { Github, Star, Menu, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/button';
import { PACKAGE_NAME, GITHUB_REPO, NPM_PACKAGE } from '@/lib/constants';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <Package className="h-6 w-6 text-primary" />
          <span className="font-bold">{PACKAGE_NAME}</span>
        </Link>
        
        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
            Docs
          </Link>
          <Link to="/api" className="text-muted-foreground hover:text-foreground transition-colors">
            API
          </Link>
          <Link to="/examples" className="text-muted-foreground hover:text-foreground transition-colors">
            Examples
          </Link>
          <Link to="/playground" className="text-muted-foreground hover:text-foreground transition-colors">
            Playground
          </Link>
        </nav>
        
        {/* Right side */}
        <div className="flex flex-1 items-center justify-end gap-2">
          {/* GitHub Star Button */}
          <a
            href={`https://github.com/${GITHUB_REPO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            <Star className="h-4 w-4" />
            <span className="text-sm font-medium">Star</span>
          </a>
          
          {/* npm link */}
          <a
            href={`https://www.npmjs.com/package/${NPM_PACKAGE}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Package className="h-5 w-5" />
            </Button>
          </a>
          
          {/* GitHub link */}
          <a
            href={`https://github.com/${GITHUB_REPO}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          
          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
```

### Footer with Author Credit

```tsx
// src/components/layout/Footer.tsx
import { Heart, Github, Package } from 'lucide-react';
import { PACKAGE_NAME, GITHUB_REPO, NPM_PACKAGE, VERSION } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Made with love */}
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with{' '}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />{' '}
            by{' '}
            <a 
              href="https://github.com/ersinkoc" 
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              Ersin KOÇ
            </a>
          </div>
          
          {/* Links */}
          <div className="flex items-center gap-6">
            <a 
              href={`https://github.com/${GITHUB_REPO}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a 
              href={`https://www.npmjs.com/package/${NPM_PACKAGE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Package className="h-4 w-4" />
              npm
            </a>
          </div>
          
          {/* Version & License */}
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span>v{VERSION}</span>
            <span>•</span>
            <span>MIT License</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

### Constants File

```tsx
// src/lib/constants.ts
export const PACKAGE_NAME = '@oxog/{{PACKAGE_SHORT_NAME}}';
export const GITHUB_REPO = 'ersinkoc/{{REPO_NAME}}';
export const NPM_PACKAGE = '@oxog/{{PACKAGE_SHORT_NAME}}';
export const VERSION = '{{VERSION}}';
export const DESCRIPTION = '{{DESCRIPTION}}';
export const DOMAIN = '{{PACKAGE_SHORT_NAME}}.oxog.dev';
```

---

## Required Pages

### 1. Landing Page (Home.tsx)

Must include:
- Hero section with package name and @oxog namespace badge
- One-line description/tagline
- Install command with package manager tabs (npm/yarn/pnpm/bun)
- CTA buttons: "Get Started" | "View on GitHub"
- Key features grid (4-6 features with Lucide icons)
- Quick code example in IDE-style CodeBlock
- Stats bar (bundle size, zero deps, coverage, TypeScript)
- Animated background (subtle gradient or particles)

### 2. Docs Pages

Must include:
- Left sidebar navigation with collapsible sections
- Breadcrumb navigation
- Table of contents (right side, sticky)
- Previous/Next page navigation
- "Edit on GitHub" link
- Code examples using CodeBlock component

### 3. API Reference

Must include:
- All public functions documented
- TypeScript signatures
- Parameters in table format
- Return types with descriptions
- Usage examples for each function
- Search/filter functionality

### 4. Examples Page

Must include:
- Categorized examples (Basic, Plugins, Advanced, Integrations)
- CodeBlock with syntax highlighting
- Expected output shown
- Copy-to-clipboard on all examples
- Links to full example files in repo

### 5. Plugins Page

Must include:
- Core plugins list with descriptions
- Optional plugins list
- How to enable optional plugins
- How to create custom plugins
- Plugin lifecycle diagram

### 6. Playground Page

Should include:
- Monaco Editor or CodeMirror for editing
- Real-time output preview
- Preset examples dropdown
- Share button (URL state encoding)
- Reset button
- Console output panel

---

## SEO & Meta Tags

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>{{PACKAGE_NAME}} - {{SHORT_DESCRIPTION}}</title>
  <meta name="description" content="{{DETAILED_DESCRIPTION}}" />
  <meta name="keywords" content="{{KEYWORDS}}" />
  <meta name="author" content="Ersin KOÇ" />
  
  <link rel="canonical" href="https://{{DOMAIN}}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{{PACKAGE_NAME}}" />
  <meta property="og:description" content="{{ONE_LINE_DESCRIPTION}}" />
  <meta property="og:url" content="https://{{DOMAIN}}" />
  <meta property="og:image" content="https://{{DOMAIN}}/og-image.png" />
  <meta property="og:site_name" content="{{PACKAGE_NAME}}" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{{PACKAGE_NAME}}" />
  <meta name="twitter:description" content="{{ONE_LINE_DESCRIPTION}}" />
  <meta name="twitter:image" content="https://{{DOMAIN}}/og-image.png" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

---

## Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          codeshine: ['@oxog/codeshine'],
        },
      },
    },
  },
});
```

---

## Package.json

```json
{
  "name": "{{REPO_NAME}}-website",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "@oxog/codeshine": "^1.0.0",
    "lucide-react": "^0.460.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-router-dom": "^7.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.15.0",
    "@tailwindcss/vite": "^4.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "eslint": "^9.15.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.12.0",
    "tailwindcss": "^4.0.0",
    "typescript": "~5.6.0",
    "typescript-eslint": "^8.15.0",
    "vite": "^6.0.0"
  }
}
```

---

## Performance Requirements

- **Lighthouse Score**: > 90 for all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Total Bundle Size**: < 200KB gzipped
- **Code Splitting**: By route (React.lazy)
- **Font Loading**: `font-display: swap`

## Accessibility Requirements

- WCAG 2.1 AA compliance
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Skip to content link
- Sufficient color contrast (4.5:1 for text)
- Focus indicators visible
- Proper heading hierarchy
- Reduced motion support

---

## Checklist

Before deployment, verify:

- [ ] All code blocks use @oxog/codeshine with theme sync
- [ ] Dark/Light theme toggle works correctly
- [ ] CodeBlock themes sync with app theme (github-dark/github-light)
- [ ] JetBrains Mono font loads for code
- [ ] Inter font loads for body text
- [ ] GitHub star button works
- [ ] npm install command is correct
- [ ] Footer shows "Made with ❤️ by Ersin KOÇ"
- [ ] GitHub link points to ersinkoc/{repo}
- [ ] CNAME file has {package}.oxog.dev
- [ ] llms.txt copied to public folder
- [ ] Mobile responsive (320px - 1920px)
- [ ] Lighthouse score > 90
- [ ] All internal links work
- [ ] Copy buttons functional