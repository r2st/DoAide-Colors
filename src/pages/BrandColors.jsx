import { useState } from 'react';
import brandColors from '../data/brandColors';
import { isLightColor } from '../utils/color';
import { copyToClipboard } from '../utils/clipboard';

const categories = ['all', 'tech', 'indian', 'design'];

export default function BrandColors() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [copiedColor, setCopiedColor] = useState('');

  const filtered = brandColors.filter(brand => {
    const matchCat = category === 'all' || brand.category === category;
    const matchSearch = brand.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleCopy = async (hex) => {
    await copyToClipboard(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(''), 1500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Brand Colors</h1>
        <p className="text-white/40">Curated color palettes from popular brands worldwide.</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                category === cat ? 'bg-brand-gold text-brand-darker' : 'bg-white/5 text-white/50 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search brands..."
          className="input-field text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(brand => (
          <div key={brand.name} className="bg-brand-card/50 rounded-xl border border-white/5 p-4 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-white">{brand.name}</span>
              <span className="text-xs text-white/30 capitalize">{brand.category}</span>
            </div>
            <div className="flex gap-2">
              {brand.colors.map((color, i) => {
                const light = isLightColor(color);
                return (
                  <button
                    key={i}
                    className="flex-1 h-16 rounded-lg flex items-center justify-center border border-white/5 hover:scale-105 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => handleCopy(color)}
                    title={`Copy ${color}`}
                  >
                    <span className={`text-[10px] font-mono ${
                      copiedColor === color ? 'font-bold' : ''
                    } ${light ? 'text-black/60' : 'text-white/60'}`}>
                      {copiedColor === color ? 'Copied!' : color}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-white/20">No brands found matching your search.</div>
      )}
    </div>
  );
}
