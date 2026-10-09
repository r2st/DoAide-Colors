import { useEffect } from 'react';

export default function Head({ title, description, path, jsonLd }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — DoAide Colors` : 'DoAide Colors — Free Color Tools for Designers';
    document.title = fullTitle;

    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    const desc = description || 'Free color tools for designers and developers — generate palettes, gradients, check contrast, convert colors. No login required.';
    setMeta('name', 'description', desc);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', desc);
    setMeta('property', 'og:url', `https://colors.doaide.com${path || ''}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://colors.doaide.com${path || '/'}`);

    let ldScript = document.getElementById('page-jsonld');
    if (jsonLd) {
      if (!ldScript) {
        ldScript = document.createElement('script');
        ldScript.id = 'page-jsonld';
        ldScript.type = 'application/ld+json';
        document.head.appendChild(ldScript);
      }
      ldScript.textContent = JSON.stringify(jsonLd);
    } else if (ldScript) {
      ldScript.remove();
    }

    return () => {
      if (ldScript && document.head.contains(ldScript)) ldScript.remove();
    };
  }, [title, description, path, jsonLd]);

  return null;
}
