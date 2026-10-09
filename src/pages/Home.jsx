import { Link } from 'react-router-dom';
import Head from '../components/Head';

const tools = [
  {
    path: '/palette',
    title: 'Color Palette Generator',
    desc: 'Generate harmonious 5-color palettes with complementary, analogous, triadic, and more harmony rules.',
    icon: '🎨',
    gradient: 'from-purple-500/20 to-pink-500/20',
  },
  {
    path: '/picker',
    title: 'Color Picker',
    desc: 'Advanced color picker with HEX, RGB, HSL, and CMYK output — copy any format instantly.',
    icon: '🔍',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    path: '/gradient',
    title: 'Gradient Generator',
    desc: 'Create CSS gradients — linear, radial, and conic — with multiple color stops and live preview.',
    icon: '🌈',
    gradient: 'from-orange-500/20 to-red-500/20',
  },
  {
    path: '/contrast',
    title: 'Contrast Checker',
    desc: 'WCAG AA/AAA accessibility contrast checker — see if your text is readable on any background.',
    icon: '♿',
    gradient: 'from-green-500/20 to-emerald-500/20',
  },
  {
    path: '/extract',
    title: 'Image Color Extractor',
    desc: 'Upload an image and extract a dominant color palette — perfect for moodboards.',
    icon: '📷',
    gradient: 'from-amber-500/20 to-yellow-500/20',
  },
  {
    path: '/converter',
    title: 'Color Converter',
    desc: 'Convert between HEX, RGB, HSL, CMYK formats with named color approximation.',
    icon: '🔄',
    gradient: 'from-teal-500/20 to-blue-500/20',
  },
  {
    path: '/tailwind',
    title: 'Tailwind Color Finder',
    desc: 'Input any color and find the closest Tailwind CSS color class — with distance score.',
    icon: '💨',
    gradient: 'from-sky-500/20 to-indigo-500/20',
  },
  {
    path: '/brands',
    title: 'Brand Colors',
    desc: 'Curated brand color palettes from Google, Apple, Meta, Flipkart, Zomato, and more.',
    icon: '🏢',
    gradient: 'from-violet-500/20 to-purple-500/20',
  },
  {
    path: '/shadow',
    title: 'CSS Shadow Generator',
    desc: 'Box shadow generator with live preview — adjust blur, spread, offset, and color.',
    icon: '🔲',
    gradient: 'from-slate-500/20 to-gray-500/20',
  },
  {
    path: '/fonts',
    title: 'Font Pairing',
    desc: 'Suggested Google Font pairings with live preview — find your perfect typography combo.',
    icon: '🔤',
    gradient: 'from-rose-500/20 to-pink-500/20',
  },
];

export default function Home() {
  return (
    <div>
      <Head
        title="Free Color Tools for Designers & Developers"
        description="Generate color palettes, CSS gradients, check WCAG contrast, convert hex/rgb/hsl, extract colors from images — all free, no login required."
        path="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'DoAide Colors',
          url: 'https://colors.doaide.com',
          description: 'Free color tools for designers and developers — palette generator, gradient maker, contrast checker, color converter.',
          applicationCategory: 'DesignApplication',
          operatingSystem: 'Any',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
        }}
      />
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          <span>DoAide </span>
          <span className="italic text-brand-gold" style={{ fontFamily: "'Playfair Display', serif" }}>Colors</span>
        </h1>
        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-8">
          Free color tools for designers and developers. Generate palettes, create gradients, check contrast, extract colors from images — no login, no limits.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/palette" className="btn-primary no-underline">
            Generate Palette
          </Link>
          <Link to="/gradient" className="btn-secondary no-underline">
            Make Gradient
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 pb-12">
        {tools.map(tool => (
          <Link
            key={tool.path}
            to={tool.path}
            className="tool-card group no-underline block"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-4`}>
              {tool.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors">
              {tool.title}
            </h3>
            <p className="text-sm text-white/40 leading-relaxed">
              {tool.desc}
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}
