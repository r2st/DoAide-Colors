import { Link } from 'react-router-dom';
import Head from '../components/Head';
import { blogPosts } from '../data/blogPosts';

export default function Blog() {
  return (
    <div>
      <Head
        title="Blog"
        description="Color theory, accessibility guides, and design tips from DoAide Colors. Learn WCAG contrast, CSS gradients, palette building, and more."
        path="/blog"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'DoAide Colors Blog',
          url: 'https://colors.doaide.com/blog',
          description: 'Color theory, accessibility guides, and design tips for designers and developers.',
          publisher: { '@type': 'Organization', name: 'DoAide', url: 'https://doaide.com' },
        }}
      />

      <div className="mb-8">
        <h1 className="section-title">Blog</h1>
        <p className="text-white/40">Color theory, accessibility, and design tips for modern web projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="tool-card group no-underline block"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-white/30">{post.date}</span>
              <span className="text-xs text-white/20">|</span>
              <span className="text-xs text-white/30">{post.readTime}</span>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-gold transition-colors leading-snug">
              {post.title}
            </h2>
            <p className="text-sm text-white/40 leading-relaxed mb-3">
              {post.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/5 text-white/40 px-2 py-0.5 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
