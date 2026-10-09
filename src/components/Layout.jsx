import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navLinks = [
  { path: '/palette', label: 'Palette' },
  { path: '/picker', label: 'Picker' },
  { path: '/gradient', label: 'Gradient' },
  { path: '/contrast', label: 'Contrast' },
  { path: '/extract', label: 'Extract' },
  { path: '/converter', label: 'Converter' },
  { path: '/tailwind', label: 'Tailwind' },
  { path: '/brands', label: 'Brands' },
  { path: '/shadow', label: 'Shadow' },
  { path: '/fonts', label: 'Fonts' },
  { path: '/blog', label: 'Blog' },
];

export default function Layout() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-brand-darker">
      <header className="sticky top-0 z-50 bg-brand-darker/90 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 no-underline">
            <span className="text-xl font-bold text-white">DoAide</span>
            <span className="text-xl font-bold italic text-brand-gold">Colors</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                  location.pathname === link.path
                    ? 'bg-brand-gold/20 text-brand-gold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden border-t border-white/5 bg-brand-darker/95 backdrop-blur">
            <div className="px-4 py-3 flex flex-wrap gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors no-underline ${
                    location.pathname === link.path
                      ? 'bg-brand-gold/20 text-brand-gold'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-white/5 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-white/40">Made with</span>
            <span className="text-brand-gold">&#9829;</span>
            <span className="text-sm text-white/40">by</span>
            <a href="https://doaide.com" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-brand-gold transition-colors no-underline">
              DoAide
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-white/30">Free forever. No login required.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
