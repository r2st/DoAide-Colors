import { useState } from 'react';
import { getContrastRatio, hexToRgb, rgbToHsl, hslToRgb, rgbToHex } from '../utils/color';
import CopyButton from '../components/CopyButton';

export default function ContrastChecker() {
  const [fg, setFg] = useState('#ffffff');
  const [bg, setBg] = useState('#1a1a2e');

  const ratio = getContrastRatio(fg, bg);
  const ratioStr = ratio.toFixed(2);

  const results = [
    { label: 'AA Normal Text', min: 4.5, pass: ratio >= 4.5 },
    { label: 'AA Large Text', min: 3.0, pass: ratio >= 3.0 },
    { label: 'AAA Normal Text', min: 7.0, pass: ratio >= 7.0 },
    { label: 'AAA Large Text', min: 4.5, pass: ratio >= 4.5 },
  ];

  const swap = () => {
    setFg(bg);
    setBg(fg);
  };

  const suggestFix = () => {
    if (ratio >= 4.5) return null;
    const fgRgb = hexToRgb(fg);
    const fgHsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);
    for (let delta = 1; delta <= 100; delta++) {
      const lighterL = Math.min(100, fgHsl.l + delta);
      const lighterRgb = hslToRgb(fgHsl.h, fgHsl.s, lighterL);
      const lighterHex = rgbToHex(lighterRgb.r, lighterRgb.g, lighterRgb.b);
      if (getContrastRatio(lighterHex, bg) >= 4.5) return lighterHex;

      const darkerL = Math.max(0, fgHsl.l - delta);
      const darkerRgb = hslToRgb(fgHsl.h, fgHsl.s, darkerL);
      const darkerHex = rgbToHex(darkerRgb.r, darkerRgb.g, darkerRgb.b);
      if (getContrastRatio(darkerHex, bg) >= 4.5) return darkerHex;
    }
    return null;
  };

  const suggestion = suggestFix();

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Contrast Checker</h1>
        <p className="text-white/40">Check WCAG AA/AAA accessibility compliance for your color combinations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-end gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm text-white/50 mb-1.5">Text Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={fg} onChange={e => setFg(e.target.value)} className="w-12 h-10 rounded-lg" />
                <input
                  type="text"
                  value={fg}
                  onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setFg(e.target.value); }}
                  className="input-field flex-1 font-mono text-sm"
                />
              </div>
            </div>

            <button onClick={swap} className="p-2.5 mb-0.5 bg-white/5 rounded-lg hover:bg-white/10 text-white/50 transition-colors" title="Swap colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
              </svg>
            </button>

            <div className="flex-1">
              <label className="block text-sm text-white/50 mb-1.5">Background Color</label>
              <div className="flex items-center gap-2">
                <input type="color" value={bg} onChange={e => setBg(e.target.value)} className="w-12 h-10 rounded-lg" />
                <input
                  type="text"
                  value={bg}
                  onChange={e => { if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) setBg(e.target.value); }}
                  className="input-field flex-1 font-mono text-sm"
                />
              </div>
            </div>
          </div>

          <div
            className="rounded-2xl p-8 border border-white/10 mb-6 space-y-4"
            style={{ backgroundColor: bg }}
          >
            <p style={{ color: fg, fontSize: '28px', fontWeight: 700 }}>
              Large Text Preview (24px+)
            </p>
            <p style={{ color: fg, fontSize: '16px' }}>
              Normal body text at 16px. The quick brown fox jumps over the lazy dog. This is how your content will look with these colors.
            </p>
            <p style={{ color: fg, fontSize: '12px' }}>
              Small text at 12px — captions, footnotes, and fine print. Make sure it's still readable.
            </p>
          </div>

          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-white mb-1">{ratioStr}:1</div>
            <div className={`text-sm font-medium ${ratio >= 4.5 ? 'text-green-400' : ratio >= 3.0 ? 'text-yellow-400' : 'text-red-400'}`}>
              {ratio >= 7 ? 'Excellent contrast' : ratio >= 4.5 ? 'Good contrast' : ratio >= 3.0 ? 'Minimum for large text' : 'Poor contrast'}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-brand-card/50 rounded-xl border border-white/5 overflow-hidden mb-6">
            <div className="px-4 py-3 border-b border-white/5">
              <span className="text-sm font-medium text-white/60">WCAG Results</span>
            </div>
            {results.map((r, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < results.length - 1 ? 'border-b border-white/5' : ''}`}>
                <div>
                  <span className="text-sm text-white/80">{r.label}</span>
                  <span className="text-xs text-white/30 ml-2">(&ge; {r.min}:1)</span>
                </div>
                <span className={`flex items-center gap-1.5 text-sm font-medium ${r.pass ? 'text-green-400' : 'text-red-400'}`}>
                  {r.pass ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                  {r.pass ? 'Pass' : 'Fail'}
                </span>
              </div>
            ))}
          </div>

          {suggestion && (
            <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
              <span className="text-sm font-medium text-white/60 block mb-3">Suggested Fix for AA Normal</span>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border border-white/10" style={{ backgroundColor: suggestion }} />
                  <span className="font-mono text-sm text-white/70">{suggestion}</span>
                  <CopyButton text={suggestion} />
                </div>
                <button
                  onClick={() => setFg(suggestion)}
                  className="btn-secondary text-xs"
                >
                  Apply
                </button>
                <span className="text-xs text-green-400">
                  Ratio: {getContrastRatio(suggestion, bg).toFixed(2)}:1
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
