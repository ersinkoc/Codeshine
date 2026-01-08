import { Heart, Github, Package } from 'lucide-react';
import { GITHUB_REPO, NPM_PACKAGE, VERSION } from '@/lib/constants';

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
              Ersin KOC
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
