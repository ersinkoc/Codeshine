import { Outlet, Link, useLocation } from 'react-router-dom';
import { DOCS_SIDEBAR } from '@/lib/constants';
import { cn } from '@/lib/utils';

export function DocsLayout() {
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <nav className="sticky top-20 space-y-6">
            {DOCS_SIDEBAR.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold text-sm text-foreground mb-2">
                  {section.title}
                </h4>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        to={item.href}
                        className={cn(
                          'block py-1.5 px-3 text-sm rounded-md transition-colors',
                          location.pathname === item.href
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <article className="prose prose-slate dark:prose-invert max-w-none">
            <Outlet />
          </article>
        </div>
      </div>
    </div>
  );
}
