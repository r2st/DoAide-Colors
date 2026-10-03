import { useState, useMemo } from 'react';
import tailwindColors, { findClosestTailwind } from '../data/tailwindColors';
import { isLightColor } from '../utils/color';
import CopyButton from '../components/CopyButton';

const colorFamilies = {};
for (const [name, hex] of Object.entries(tailwindColors)) {
  const family = name.replace(/-\d+$/, '');
  if (!colorFamilies[family]) colorFamilies[family] = [];
  colorFamilies[family].push({ name, hex });
}

export default function TailwindFinder() {
  const [input, setInput] = useState('#6366f1');

  const result = useMemo(() => {
    if (!/^#[0-9a-fA-F]{6}$/.test(input)) return null;
    return findClosestTailwind(input);
  }, [input]);

  const matchFamily = result ? result.name.replace(/-\d+$/, '') : null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Tailwind Color Finder</h1>
        <p className="text-white/40">Find the closest Tailwind CSS color class for any color.</p>
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-8">
        <div>
          <label className="block text-sm text-white/50 mb-1.5">Your Color</label>
          <div className="flex items-center gap-2">
            <input type="color" value={input} onChange={e => setInput(e.target.value)} className="w-12 h-10 rounded-lg" />
            <input
              type="text"
              value={input}
              onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setInput(e.target.value); }}
              className="input-field w-32 font-mono text-sm"
            />
          </div>
        </div>
      </div>

      {result && (
        <>
          <div className="bg-brand-card/50 rounded-xl p-6 border border-white/5 mb-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-xl border border-white/10" style={{ backgroundColor: input }} />
                  <span className="text-xs text-white/40 mt-1 block">Your color</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white/20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-xl border border-white/10" style={{ backgroundColor: result.hex }} />
                  <span className="text-xs text-white/40 mt-1 block">Tailwind match</span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <div className="text-lg font-semibold text-white">{result.name}</div>
                <div className="font-mono text-sm text-white/60">{result.hex}</div>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 bg-white/5 rounded px-2 py-1 text-xs font-mono text-white/60">
                    bg-{result.name} <CopyButton text={`bg-${result.name}`} />
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/5 rounded px-2 py-1 text-xs font-mono text-white/60">
                    text-{result.name} <CopyButton text={`text-${result.name}`} />
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/5 rounded px-2 py-1 text-xs font-mono text-white/60">
                    border-{result.name} <CopyButton text={`border-${result.name}`} />
                  </span>
                </div>
                <div className="text-xs text-white/30">Distance: {result.distance.toFixed(1)} (lower is closer)</div>
              </div>
            </div>
          </div>

          {matchFamily && colorFamilies[matchFamily] && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">{matchFamily} shade family</h3>
              <div className="flex rounded-xl overflow-hidden">
                {colorFamilies[matchFamily].map(c => {
                  const light = isLightColor(c.hex);
                  return (
                    <div
                      key={c.name}
                      className={`flex-1 h-16 flex items-center justify-center ${c.name === result.name ? 'ring-2 ring-brand-gold ring-inset' : ''}`}
                      style={{ backgroundColor: c.hex }}
                    >
                      <span className={`text-[10px] font-mono ${light ? 'text-black/50' : 'text-white/50'}`}>
                        {c.name.split('-')[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">All Tailwind Colors</h3>
        <div className="space-y-3">
          {Object.entries(colorFamilies).map(([family, shades]) => (
            <div key={family}>
              <span className="text-xs text-white/40 block mb-1 capitalize">{family}</span>
              <div className="flex rounded-lg overflow-hidden">
                {shades.map(c => {
                  const light = isLightColor(c.hex);
                  return (
                    <div
                      key={c.name}
                      className="flex-1 h-8 flex items-center justify-center cursor-pointer hover:scale-y-125 transition-transform"
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setInput(c.hex)}
                      title={`${c.name}: ${c.hex}`}
                    >
                      <span className={`text-[8px] font-mono hidden sm:block ${light ? 'text-black/40' : 'text-white/40'}`}>
                        {c.name.split('-')[1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
