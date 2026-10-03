import { useState, useEffect } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToCmyk, getColorName } from '../utils/color';
import CopyButton from '../components/CopyButton';

export default function ColorPicker() {
  const [hex, setHex] = useState('#6366f1');
  const [rgb, setRgb] = useState({ r: 99, g: 102, b: 241 });
  const [hsl, setHsl] = useState({ h: 239, s: 84, l: 67 });
  const [cmyk, setCmyk] = useState({ c: 59, m: 58, y: 0, k: 5 });
  const [history, setHistory] = useState([]);

  const updateFromHex = (h) => {
    if (!/^#[0-9a-fA-F]{6}$/.test(h)) return;
    const r = hexToRgb(h);
    const hs = rgbToHsl(r.r, r.g, r.b);
    const c = rgbToCmyk(r.r, r.g, r.b);
    setHex(h);
    setRgb(r);
    setHsl(hs);
    setCmyk(c);
  };

  const updateFromRgb = (r, g, b) => {
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));
    const h = rgbToHex(r, g, b);
    const hs = rgbToHsl(r, g, b);
    const c = rgbToCmyk(r, g, b);
    setHex(h);
    setRgb({ r, g, b });
    setHsl(hs);
    setCmyk(c);
  };

  const updateFromHsl = (h, s, l) => {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s));
    l = Math.max(0, Math.min(100, l));
    const r = hslToRgb(h, s, l);
    const hx = rgbToHex(r.r, r.g, r.b);
    const c = rgbToCmyk(r.r, r.g, r.b);
    setHex(hx);
    setRgb(r);
    setHsl({ h, s, l });
    setCmyk(c);
  };

  const addToHistory = () => {
    setHistory(prev => {
      const next = [hex, ...prev.filter(c => c !== hex)];
      return next.slice(0, 12);
    });
  };

  useEffect(() => {
    const timer = setTimeout(addToHistory, 500);
    return () => clearTimeout(timer);
  }, [hex]);

  const colorName = getColorName(hex);

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Color Picker</h1>
        <p className="text-white/40">Pick any color and get values in every format.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div
            className="w-full h-48 rounded-2xl mb-4 flex items-end justify-between p-4 border border-white/10"
            style={{ backgroundColor: hex }}
          >
            <span className="font-mono text-sm font-bold px-2 py-1 rounded bg-black/30 text-white">
              {hex.toUpperCase()}
            </span>
            <span className="text-sm px-2 py-1 rounded bg-black/30 text-white">
              {colorName}
            </span>
          </div>

          <input
            type="color"
            value={hex}
            onChange={e => updateFromHex(e.target.value)}
            className="w-full h-12 rounded-xl cursor-pointer mb-6"
          />

          <div className="space-y-4">
            <label className="block text-sm font-medium text-white/50 mb-2">Hue</label>
            <input
              type="range"
              min="0"
              max="360"
              value={hsl.h}
              onChange={e => updateFromHsl(parseInt(e.target.value), hsl.s, hsl.l)}
              className="w-full"
              style={{
                background: `linear-gradient(to right, hsl(0,${hsl.s}%,${hsl.l}%), hsl(60,${hsl.s}%,${hsl.l}%), hsl(120,${hsl.s}%,${hsl.l}%), hsl(180,${hsl.s}%,${hsl.l}%), hsl(240,${hsl.s}%,${hsl.l}%), hsl(300,${hsl.s}%,${hsl.l}%), hsl(360,${hsl.s}%,${hsl.l}%))`,
              }}
            />
            <label className="block text-sm font-medium text-white/50 mb-2">Saturation</label>
            <input
              type="range"
              min="0"
              max="100"
              value={hsl.s}
              onChange={e => updateFromHsl(hsl.h, parseInt(e.target.value), hsl.l)}
              className="w-full"
            />
            <label className="block text-sm font-medium text-white/50 mb-2">Lightness</label>
            <input
              type="range"
              min="0"
              max="100"
              value={hsl.l}
              onChange={e => updateFromHsl(hsl.h, hsl.s, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/50">HEX</span>
              <CopyButton text={hex} label="Copy" />
            </div>
            <input
              type="text"
              value={hex}
              onChange={e => {
                const v = e.target.value;
                setHex(v);
                if (/^#[0-9a-fA-F]{6}$/.test(v)) updateFromHex(v);
              }}
              className="input-field w-full font-mono"
            />
          </div>

          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/50">RGB</span>
              <CopyButton text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} label="Copy" />
            </div>
            <div className="flex gap-2">
              {['r', 'g', 'b'].map(ch => (
                <div key={ch} className="flex-1">
                  <label className="text-xs text-white/30 uppercase">{ch}</label>
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb[ch]}
                    onChange={e => updateFromRgb(
                      ch === 'r' ? parseInt(e.target.value) || 0 : rgb.r,
                      ch === 'g' ? parseInt(e.target.value) || 0 : rgb.g,
                      ch === 'b' ? parseInt(e.target.value) || 0 : rgb.b
                    )}
                    className="input-field w-full font-mono text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/50">HSL</span>
              <CopyButton text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} label="Copy" />
            </div>
            <div className="flex gap-2">
              {[
                { key: 'h', label: 'H', max: 360 },
                { key: 's', label: 'S', max: 100 },
                { key: 'l', label: 'L', max: 100 },
              ].map(({ key, label, max }) => (
                <div key={key} className="flex-1">
                  <label className="text-xs text-white/30">{label}</label>
                  <input
                    type="number"
                    min="0"
                    max={max}
                    value={hsl[key]}
                    onChange={e => updateFromHsl(
                      key === 'h' ? parseInt(e.target.value) || 0 : hsl.h,
                      key === 's' ? parseInt(e.target.value) || 0 : hsl.s,
                      key === 'l' ? parseInt(e.target.value) || 0 : hsl.l
                    )}
                    className="input-field w-full font-mono text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/50">CMYK</span>
              <CopyButton text={`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`} label="Copy" />
            </div>
            <div className="flex gap-2">
              {['c', 'm', 'y', 'k'].map(ch => (
                <div key={ch} className="flex-1">
                  <label className="text-xs text-white/30 uppercase">{ch}</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={cmyk[ch]}
                    readOnly
                    className="input-field w-full font-mono text-sm opacity-70"
                  />
                </div>
              ))}
            </div>
          </div>

          {history.length > 0 && (
            <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
              <span className="text-sm font-medium text-white/50 block mb-3">Recent Colors</span>
              <div className="flex flex-wrap gap-2">
                {history.map((c, i) => (
                  <button
                    key={`${c}-${i}`}
                    className="w-8 h-8 rounded-lg border border-white/10 hover:scale-110 transition-transform"
                    style={{ backgroundColor: c }}
                    onClick={() => updateFromHex(c)}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
