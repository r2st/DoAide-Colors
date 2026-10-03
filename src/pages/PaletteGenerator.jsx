import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generatePalette, randomHex, isLightColor, hexToRgb, rgbToHsl } from '../utils/color';
import { copyToClipboard } from '../utils/clipboard';
import CopyButton from '../components/CopyButton';
import ShareButtons from '../components/ShareButtons';

const harmonies = ['complementary', 'analogous', 'triadic', 'split-complementary', 'tetradic'];

export default function PaletteGenerator() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [baseColor, setBaseColor] = useState('#6366f1');
  const [harmony, setHarmony] = useState('complementary');
  const [colors, setColors] = useState([]);
  const [locked, setLocked] = useState([false, false, false, false, false]);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const paletteRef = useRef(null);

  useEffect(() => {
    const urlColors = searchParams.get('colors');
    if (urlColors) {
      const parsed = urlColors.split(',').map(c => (c.startsWith('#') ? c : '#' + c));
      if (parsed.length === 5 && parsed.every(c => /^#[0-9a-fA-F]{6}$/.test(c))) {
        setColors(parsed);
        setBaseColor(parsed[0]);
        return;
      }
    }
    generate();
  }, []);

  const generate = () => {
    const newColors = generatePalette(baseColor, harmony);
    setColors(prev =>
      newColors.map((c, i) => (locked[i] && prev[i] ? prev[i] : c))
    );
  };

  const randomize = () => {
    const newBase = randomHex();
    setBaseColor(newBase);
    const newColors = generatePalette(newBase, harmony);
    setColors(prev =>
      newColors.map((c, i) => (locked[i] && prev[i] ? prev[i] : c))
    );
  };

  const toggleLock = (index) => {
    setLocked(prev => prev.map((l, i) => (i === index ? !l : l)));
  };

  const shareUrl = () => {
    const url = `${window.location.origin}/palette?colors=${colors.map(c => c.replace('#', '')).join(',')}`;
    setSearchParams({ colors: colors.map(c => c.replace('#', '')).join(',') });
    return url;
  };

  const cssVars = colors
    .map((c, i) => `  --color-${i + 1}: ${c};`)
    .join('\n');
  const cssCode = `:root {\n${cssVars}\n}`;

  const handleCopyCSS = async () => {
    await copyToClipboard(cssCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 1500);
  };

  const exportAsPNG = async () => {
    const { toPng } = await import('html-to-image');
    if (!paletteRef.current) return;
    const dataUrl = await toPng(paletteRef.current, { backgroundColor: '#0f0f1a' });
    const link = document.createElement('a');
    link.download = 'doaide-palette.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Color Palette Generator</h1>
        <p className="text-white/40">Generate harmonious 5-color palettes for your design projects.</p>
      </div>

      <div className="flex flex-wrap items-end gap-4 mb-8">
        <div>
          <label className="block text-sm text-white/50 mb-1.5">Base Color</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={baseColor}
              onChange={e => setBaseColor(e.target.value)}
              className="w-12 h-10 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={baseColor}
              onChange={e => {
                const v = e.target.value;
                if (/^#[0-9a-fA-F]{0,6}$/.test(v)) setBaseColor(v);
              }}
              className="input-field w-28 font-mono text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/50 mb-1.5">Harmony</label>
          <select
            value={harmony}
            onChange={e => setHarmony(e.target.value)}
            className="input-field text-sm capitalize"
          >
            {harmonies.map(h => (
              <option key={h} value={h} className="bg-brand-dark capitalize">{h}</option>
            ))}
          </select>
        </div>

        <button onClick={generate} className="btn-primary">
          Generate
        </button>
        <button onClick={randomize} className="btn-secondary">
          Randomize
        </button>
      </div>

      {colors.length > 0 && (
        <>
          <div ref={paletteRef} className="rounded-2xl overflow-hidden mb-6">
            <div className="flex flex-col sm:flex-row">
              {colors.map((color, i) => {
                const light = isLightColor(color);
                const rgb = hexToRgb(color);
                const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
                return (
                  <div
                    key={i}
                    className="flex-1 h-32 sm:h-40 flex flex-col items-center justify-center gap-2 relative group"
                    style={{ backgroundColor: color }}
                  >
                    <button
                      onClick={() => toggleLock(i)}
                      className={`absolute top-3 right-3 p-1.5 rounded-lg transition-all ${
                        locked[i]
                          ? (light ? 'bg-black/20 text-black' : 'bg-white/20 text-white')
                          : (light ? 'text-black/30 hover:text-black/60' : 'text-white/30 hover:text-white/60')
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        {locked[i] ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                        )}
                      </svg>
                    </button>
                    <span className={`font-mono text-sm font-semibold ${light ? 'text-black/80' : 'text-white/90'}`}>
                      {color.toUpperCase()}
                    </span>
                    <span className={`text-xs ${light ? 'text-black/50' : 'text-white/40'}`}>
                      hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                    </span>
                    <CopyButton
                      text={color}
                      className={`text-xs ${light ? 'text-black/50 hover:text-black' : 'text-white/40 hover:text-white'}`}
                    />
                  </div>
                );
              })}
            </div>
            <div className="bg-brand-dark/80 text-center py-1.5">
              <span className="text-[10px] text-white/20">Made with DoAide Colors</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={handleCopyCSS} className="btn-secondary">
              {copiedCSS ? 'Copied!' : 'Copy CSS Variables'}
            </button>
            <button onClick={exportAsPNG} className="btn-secondary">
              Export as PNG
            </button>
            <button onClick={shareUrl} className="btn-secondary">
              Share via URL
            </button>
            <ShareButtons
              url={`${window.location.origin}/palette?colors=${colors.map(c => c.replace('#', '')).join(',')}`}
              text="Check out this color palette I made!"
            />
          </div>

          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/60">CSS Variables</span>
              <CopyButton text={cssCode} label="Copy" />
            </div>
            <pre className="text-sm font-mono text-brand-gold/80 overflow-x-auto">{cssCode}</pre>
          </div>
        </>
      )}
    </div>
  );
}
