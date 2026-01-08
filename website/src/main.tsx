import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/hooks/useTheme';
import App from './App';
import './index.css';

// Register all languages for syntax highlighting
import { registerLanguage, allLanguages } from '@oxog/codeshine';

// Register all available languages
allLanguages.forEach((lang) => {
  registerLanguage(lang);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
