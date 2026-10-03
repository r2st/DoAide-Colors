import { useState } from 'react';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToCmyk, cmykToRgb, getColorName, isLightColor } from '../utils/color';
import CopyButton from '../components/CopyButton';

const formats = ['HEX', 'RGB', 'HSL', 'CMYK'];

function parseInput(format, value) {
  try {
    if (format === 'HEX') {
      let hex = value.trim();
      if (!hex.startsWith('#')) hex = '#' + hex;
      if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
        const rgb = hexToRgb(hex);
        return { r: rgb.r, g: rgb.g, b: rgb.b };
      }
      if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
        const expanded = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
        const rgb = hexToRgb(expanded);
        return { r: rgb.r, g: rgb.g, b: rgb.b };
      }
    }
    if (format === 'RGB') {
      const match = value.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
      if (match) {
        return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
      }
    }
    if (format === 'HSL') {
      const match = value.match(/(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
      if (match) {
        const rgb = hslToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        return { r: rgb.r, g: rgb.g, b: rgb.b };
      }
    }
    if (format === 'CMYK') {
      const match = value.match(/(\d+)%?\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*,\s*(\d+)%?/);
      if (match) {
        const rgb = cmykToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4]));
        return { r: rgb.r, g: rgb.g, b: rgb.b };
      }
    }
  } catch {}
  return null;
}

export default function ColorConverter() {
  const [format, setFormat] = useState('HEX');
  const [input, setInput] = useState('#6366f1');
  const [error, setError] = useState(false);

  const rgb = parseInput(format, input);
  const valid = rgb !== null;

  const hex = valid ? rgbToHex(rgb.r, rgb.g, rgb.b) : '';
  const hsl = valid ? rgbToHsl(rgb.r, rgb.g, rgb.b) : { h: 0, s: 0, l: 0 };
  const cmyk = valid ? rgbToCmyk(rgb.r, rgb.g, rgb.b) : { c: 0, m: 0, y: 0, k: 0 };
  const name = valid ? getColorName(hex) : '';

  const handleInput = (v) => {
    setInput(v);
    setError(parseInput(format, v) === null && v.length > 2);
  };

  const placeholders = {
    HEX: '#6366f1',
    RGB: '99, 102, 241',
    HSL: '239, 84, 67',
    CMYK: '59, 58, 0, 5',
  };

  const outputs = valid ? [
    { label: 'HEX', value: hex.toUpperCase() },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
    { label: 'Color Name', value: name },
  ] : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Color Converter</h1>
        <p className="text-white/40">Convert colors between HEX, RGB, HSL, and CMYK formats.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <label className="block text-sm text-white/50 mb-2">Input Format</label>
            <div className="flex gap-2">
              {formats.map(f => (
                <button
                  key={f}
                  onClick={() => { setFormat(f); setInput(''); setError(false); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    format === f ? 'bg-brand-gold text-brand-darker' : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-white/50 mb-1.5">Enter {format} Value</label>
            <input
              type="text"
              value={input}
              onChange={e => handleInput(e.target.value)}
              placeholder={placeholders[format]}
              className={`input-field w-full font-mono text-lg ${error ? 'border-red-500/50 focus:border-red-500' : ''}`}
            />
            {error && (
              <p className="text-xs text-red-400 mt-1">
                Invalid {format} format. Try: {placeholders[format]}
              </p>
            )}
          </div>

          {valid && (
            <div
              className="w-full h-40 rounded-2xl border border-white/10 flex items-end p-4"
              style={{ backgroundColor: hex }}
            >
              <span className={`font-mono text-sm px-2 py-1 rounded ${isLightColor(hex) ? 'bg-black/20 text-black' : 'bg-white/20 text-white'}`}>
                {hex.toUpperCase()} — {name}
              </span>
            </div>
          )}
        </div>

        <div>
          {valid ? (
            <div className="space-y-3">
              {outputs.map(o => (
                <div key={o.label} className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white/40 block mb-1">{o.label}</span>
                      <span className="font-mono text-sm text-white/80">{o.value}</span>
                    </div>
                    <CopyButton text={o.value} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-white/20">
              Enter a valid color value to convert
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
