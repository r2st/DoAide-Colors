import { Link } from 'react-router-dom';
import Head from '../../components/Head';

export default function WcagContrastGuide() {
  return (
    <div>
      <Head
        title="WCAG Color Contrast: A Complete Guide for Web Accessibility"
        description="Learn WCAG 2.1 AA and AAA color contrast requirements, how to test your designs, and practical tips to make your website accessible to all users."
        path="/blog/wcag-color-contrast-guide"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: 'WCAG Color Contrast: A Complete Guide for Web Accessibility',
          description: 'Learn WCAG 2.1 AA and AAA color contrast requirements, how to test your designs, and practical tips to make your website accessible.',
          datePublished: '2026-10-01',
          author: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
          publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
          mainEntityOfPage: 'https://colors.doaide.com/blog/wcag-color-contrast-guide',
        }}
      />

      <article className="max-w-3xl mx-auto">
        <Link to="/blog" className="text-sm text-white/40 hover:text-brand-gold transition-colors no-underline mb-6 inline-block">&larr; Back to Blog</Link>

        <header className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight">
            WCAG Color Contrast: A Complete Guide for Web Accessibility
          </h1>
          <div className="flex items-center gap-3 text-sm text-white/40">
            <span>October 1, 2026</span>
            <span>|</span>
            <span>8 min read</span>
          </div>
        </header>

        <div className="prose-custom space-y-6 text-white/70 leading-relaxed">
          <p>
            Over 1 billion people worldwide live with some form of visual impairment. When your website's text doesn't have enough contrast against its background, it becomes unreadable for millions of users. The Web Content Accessibility Guidelines (WCAG) provide clear, measurable standards to prevent this.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">What Is Color Contrast Ratio?</h2>
          <p>
            Color contrast ratio is a numerical value that describes the difference in perceived brightness between two colors. It ranges from <strong className="text-white">1:1</strong> (no contrast — identical colors) to <strong className="text-white">21:1</strong> (maximum contrast — pure black on pure white).
          </p>
          <p>
            The formula uses <em>relative luminance</em>, which accounts for how human eyes perceive different wavelengths of light. Green appears brighter than blue at the same intensity, so the formula weights the channels accordingly: <code className="text-brand-gold/80 bg-white/5 px-1.5 py-0.5 rounded">L = 0.2126R + 0.7152G + 0.0722B</code>.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">WCAG 2.1 Contrast Requirements</h2>

          <div className="bg-brand-card/50 rounded-xl border border-white/5 overflow-hidden my-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Level</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Normal Text</th>
                  <th className="text-left px-4 py-3 text-white/50 font-medium">Large Text</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="px-4 py-3 text-white font-medium">AA</td>
                  <td className="px-4 py-3">4.5:1</td>
                  <td className="px-4 py-3">3:1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-white font-medium">AAA</td>
                  <td className="px-4 py-3">7:1</td>
                  <td className="px-4 py-3">4.5:1</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong className="text-white">Large text</strong> is defined as 18pt (24px) or 14pt bold (approximately 18.66px bold). Everything smaller is normal text. UI components and graphical objects require at least 3:1 contrast against adjacent colors.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Common Mistakes</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-white">Light gray text on white backgrounds</strong> — the most common violation. Gray text (#999) on white has only 2.85:1 contrast, failing every WCAG level.</li>
            <li><strong className="text-white">Placeholder text</strong> — form placeholders are often too low contrast. If users rely on them for instructions, they must meet 4.5:1.</li>
            <li><strong className="text-white">Colored text on colored backgrounds</strong> — a blue link on a dark blue banner might look distinct on your monitor but fails for users with color vision deficiency.</li>
            <li><strong className="text-white">Gradients and images</strong> — text placed over variable backgrounds needs sufficient contrast at every point where text appears.</li>
          </ul>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">How to Test Contrast</h2>
          <p>
            Use our free <Link to="/contrast" className="text-brand-gold hover:underline">Contrast Checker</Link> tool to instantly evaluate any color combination. Enter your text and background colors to see the exact ratio and WCAG compliance for all levels.
          </p>
          <p>
            The tool also suggests accessible alternatives when your combination fails — it adjusts the text color's lightness until it reaches AA compliance while staying as close to your original choice as possible.
          </p>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Practical Tips</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li><strong className="text-white">Start with contrast in mind</strong> — choose your background and text colors early, not as an afterthought.</li>
            <li><strong className="text-white">Use 7:1 as your target</strong> — aiming for AAA means you'll comfortably pass AA even when brand colors shift slightly.</li>
            <li><strong className="text-white">Test in both light and dark modes</strong> — colors that pass in one theme often fail in the other.</li>
            <li><strong className="text-white">Don't rely on color alone</strong> — use icons, underlines, or patterns alongside color to convey meaning.</li>
            <li><strong className="text-white">Check interactive states</strong> — hover, focus, and disabled states all need sufficient contrast too.</li>
          </ol>

          <h2 className="text-xl font-bold text-white mt-10 mb-4">Beyond Contrast: Color Blindness</h2>
          <p>
            About 8% of men and 0.5% of women have some form of color vision deficiency. The most common type, deuteranomaly (red-green), makes it hard to distinguish between reds and greens. Design patterns that rely solely on red vs. green (like form validation) exclude these users.
          </p>
          <p>
            Sufficient contrast helps, but combine it with redundant cues: icons for success/error states, text labels alongside color-coded charts, and patterns in addition to fills.
          </p>

          <div className="bg-brand-card/50 rounded-xl p-6 border border-white/5 mt-10">
            <h3 className="text-lg font-semibold text-white mb-2">Try It Now</h3>
            <p className="text-white/50 mb-4">Test your color combinations with our free contrast checker — instant results, no login required.</p>
            <Link to="/contrast" className="btn-primary no-underline inline-block">
              Open Contrast Checker
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
