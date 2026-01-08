import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/Home';
import { DocsLayout } from '@/components/layout/DocsLayout';
import { Introduction } from '@/pages/docs/Introduction';
import { Installation } from '@/pages/docs/Installation';
import { QuickStart } from '@/pages/docs/QuickStart';
import { Themes } from '@/pages/docs/Themes';
import { Languages } from '@/pages/docs/Languages';
import { ApiOverview } from '@/pages/docs/ApiOverview';
import { Examples } from '@/pages/Examples';
import { Playground } from '@/pages/Playground';
import { LanguageShowcase } from '@/pages/LanguageShowcase';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<Introduction />} />
          <Route path="installation" element={<Installation />} />
          <Route path="quick-start" element={<QuickStart />} />
          <Route path="themes" element={<Themes />} />
          <Route path="languages" element={<Languages />} />
          <Route path="api" element={<ApiOverview />} />
        </Route>
        <Route path="examples" element={<Examples />} />
        <Route path="playground" element={<Playground />} />
        <Route path="showcase" element={<LanguageShowcase />} />
      </Route>
    </Routes>
  );
}
