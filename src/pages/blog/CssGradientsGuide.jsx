import { Link } from 'react-router-dom';
import Head from '../../components/Head';

export default function CssGradientsGuide() {
  return (
    <div>
      <Head
        title="CSS Gradients: Linear, Radial, and Conic — The Complete Guide"
        description="Everything you need to know about CSS gradients — syntax, examples, browser support, and creative techniques for modern web design."
        path="/blog/css-gradients-complete-guide"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'CSS Gradients: Linear, Radial, and Conic — The Complete Guide',
          description: 'Everything you need to know about CSS gradients — syntax, examples, browser support, and creative techniques for modern web design.',
          datePublished: '2026-10-08',
          author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
          publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
          mainEntityOfPage: 'https://colors.doaide.com/blog/css-gradients-complete-guide',
        }}
      />

      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-sm text-white/40 hover:text-brand-gold transition-colors no-underline mb-6 inline-block">&larr; Back to Blog</Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
            CSS Gradients: Linear, Radial, and Conic — The Complete Guide
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/40">
            <span>October 8, 2026</span>
            <span>|</span>
            <span>7 min read</span>
          </div>
        </header>

        <div className="prose-custom space-y-6 text-white/70 leading-relaxed">
          <p>
            CSS gradients let you create smooth color transitions without images — they're resolution-independent, performant, and endlessly flexible. Every modern browser supports them, and they're one of the most powerful tools for adding visual depth to your designs.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Linear Gradients</h2>
          <p>
            Linear gradients transition along a straight line. The simplest form takes two colors:
          </p>
          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5 my-4">
            <code className="text-sm font-mono text-brand-gold/80 block">background: linear-gradient(to right, #6366f1, #ec4899);</code>
          </div>
          <div className="h-16 rounded-xl mb-4" style={{ background: 'linear-gradient(to right, #6366f1, #ec4899)' }} />

          <h3 className="text-lg font-semibold text-white mt-6 mb-3">Direction</h3>
          <p>
            Control direction with angles or keywords. <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">45deg</code> points to the top-right, <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">to bottom</code> is the default (180°). Common angles: 0° (up), 90° (right), 135° (diagonal), 180° (down).
          </p>

          <h3 className="text-lg font-semibold text-white mt-6 mb-3">Color Stops</h3>
          <p>
            You can add multiple stops with positions to control where each color appears:
          </p>
          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5 my-4">
            <code className="text-sm font-mono text-brand-gold/80 block whitespace-pre-wrap">background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);</code>
          </div>
          <div className="h-16 rounded-xl mb-4" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }} />

          <h3 className="text-lg font-semibold text-white mt-6 mb-3">Hard Stops (Stripes)</h3>
          <p>
            Setting two color stops at the same position creates a hard edge instead of a smooth transition — useful for stripes, progress bars, and flags:
          </p>
          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5 my-4">
            <code className="text-sm font-mono text-brand-gold/80 block whitespace-pre-wrap">background: linear-gradient(to right, #f44 33%, #fff 33% 66%, #44f 66%);</code>
          </div>
          <div className="h-16 rounded-xl mb-4" style={{ background: 'linear-gradient(to right, #f44 33%, #fff 33% 66%, #44f 66%)' }} />

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Radial Gradients</h2>
          <p>
            Radial gradients emanate from a center point outward. By default they form an ellipse matching the element's aspect ratio:
          </p>
          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5 my-4">
            <code className="text-sm font-mono text-brand-gold/80 block">background: radial-gradient(circle, #43e97b, #38f9d7, #667eea);</code>
          </div>
          <div className="h-32 rounded-xl mb-4" style={{ background: 'radial-gradient(circle, #43e97b, #38f9d7, #667eea)' }} />

          <p>
            Control the shape with <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">circle</code> or <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">ellipse</code>, and the center with <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">at 30% 70%</code>. Size keywords like <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">closest-side</code> and <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">farthest-corner</code> control how far the gradient extends.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Conic Gradients</h2>
          <p>
            Conic gradients sweep around a center point like the hands of a clock. They're perfect for pie charts, color wheels, and decorative patterns:
          </p>
          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5 my-4">
            <code className="text-sm font-mono text-brand-gold/80 block">background: conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);</code>
          </div>
          <div className="h-32 w-32 rounded-full mx-auto mb-4" style={{ background: 'conic-gradient(from 0deg, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' }} />

          <p>
            The <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">from</code> keyword sets the starting angle, and <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">at</code> sets the center point.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Repeating Gradients</h2>
          <p>
            Prefix any gradient type with <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">repeating-</code> to tile it. This is the easiest way to create patterns:
          </p>
          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5 my-4">
            <code className="text-sm font-mono text-brand-gold/80 block whitespace-pre-wrap">background: repeating-linear-gradient(45deg, #0000 0 10px, #6366f120 10px 20px);</code>
          </div>
          <div className="h-24 rounded-xl mb-4" style={{ background: 'repeating-linear-gradient(45deg, transparent 0px 10px, rgba(99,102,241,0.12) 10px 20px)' }} />

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Performance Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Gradients are resolution-independent</strong> — they look sharp on any screen, unlike raster images.</li>
            <li><strong className="text-white">Avoid animating gradients directly.</strong> Browsers can't hardware-accelerate gradient transitions. Instead, layer a pseudo-element with the second gradient and animate its opacity.</li>
            <li><strong className="text-white">Keep stop counts reasonable.</strong> More than 5–6 stops rarely add visual value but increase rendering cost.</li>
            <li><strong className="text-white">Use gradients instead of images</strong> for abstract backgrounds — faster load, smaller page weight, and easier to maintain.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Creative Techniques</h2>
          <p>
            <strong className="text-white">Glassmorphism backgrounds:</strong> Combine a translucent gradient with <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">backdrop-filter: blur()</code> for frosted-glass cards.
          </p>
          <p>
            <strong className="text-white">Mesh gradients:</strong> Layer 3–4 radial gradients at different positions to approximate the organic look of mesh gradients in design tools.
          </p>
          <p>
            <strong className="text-white">Text gradients:</strong> Apply a gradient to text with <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">background-clip: text</code> and <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">-webkit-text-fill-color: transparent</code>.
          </p>

          <div className="bg-brand-card/50 rounded-xl p-6 border border-white/5 mt-10">
            <h3 className="text-lg font-semibold text-white mb-2">Build Your Gradient</h3>
            <p className="text-white/50 mb-4">Create CSS gradients visually with our free generator — linear, radial, and conic with live preview.</p>
            <Link to="/gradient" className="btn-primary no-underline inline-block">
              Open Gradient Generator
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
