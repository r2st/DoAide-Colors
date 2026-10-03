import { useState } from 'react';
import { randomHex } from '../utils/color';
import CopyButton from '../components/CopyButton';

const presets = [
  { name: 'Sunset', stops: [{ color: '#f093fb', pos: 0 }, { color: '#f5576c', pos: 50 }, { color: '#fda085', pos: 100 }], type: 'linear', angle: 135 },
  { name: 'Ocean', stops: [{ color: '#667eea', pos: 0 }, { color: '#764ba2', pos: 100 }], type: 'linear', angle: 135 },
  { name: 'Mint', stops: [{ color: '#a8edea', pos: 0 }, { color: '#fed6e3', pos: 100 }], type: 'linear', angle: 135 },
  { name: 'Fire', stops: [{ color: '#f12711', pos: 0 }, { color: '#f5af19', pos: 100 }], type: 'linear', angle: 45 },
  { name: 'Northern', stops: [{ color: '#43e97b', pos: 0 }, { color: '#38f9d7', pos: 50 }, { color: '#667eea', pos: 100 }], type: 'linear', angle: 90 },
  { name: 'Berry', stops: [{ color: '#8E2DE2', pos: 0 }, { color: '#4A00E0', pos: 100 }], type: 'radial', angle: 0 },
];

export default function GradientGenerator() {
  const [type, setType] = useState('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState([
    { color: '#6366f1', pos: 0 },
    { color: '#ec4899', pos: 100 },
  ]);

  const updateStop = (index, field, value) => {
    setStops(prev => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)));
  };

  const addStop = () => {
    if (stops.length >= 5) return;
    const pos = Math.round(100 / stops.length);
    setStops(prev => [...prev, { color: randomHex(), pos }].sort((a, b) => a.pos - b.pos));
  };

  const removeStop = (index) => {
    if (stops.length <= 2) return;
    setStops(prev => prev.filter((_, i) => i !== index));
  };

  const randomGradient = () => {
    const count = 2 + Math.floor(Math.random() * 2);
    const newStops = Array.from({ length: count }, (_, i) => ({
      color: randomHex(),
      pos: Math.round((i / (count - 1)) * 100),
    }));
    setStops(newStops);
    setAngle(Math.floor(Math.random() * 360));
  };

  const loadPreset = (preset) => {
    setStops(preset.stops);
    setType(preset.type);
    setAngle(preset.angle);
  };

  const stopsCSS = stops
    .sort((a, b) => a.pos - b.pos)
    .map(s => `${s.color} ${s.pos}%`)
    .join(', ');

  let gradientCSS;
  if (type === 'linear') {
    gradientCSS = `linear-gradient(${angle}deg, ${stopsCSS})`;
  } else if (type === 'radial') {
    gradientCSS = `radial-gradient(circle, ${stopsCSS})`;
  } else {
    gradientCSS = `conic-gradient(from ${angle}deg, ${stopsCSS})`;
  }

  const fullCSS = `background: ${gradientCSS};`;

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Gradient Generator</h1>
        <p className="text-white/40">Create beautiful CSS gradients with live preview.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div
            className="w-full h-64 rounded-2xl border border-white/10 mb-6"
            style={{ background: gradientCSS }}
          />

          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/50">CSS Code</span>
              <CopyButton text={fullCSS} label="Copy" />
            </div>
            <pre className="text-sm font-mono text-brand-gold/80 whitespace-pre-wrap break-all">{fullCSS}</pre>
          </div>

          <div className="mb-6">
            <span className="text-sm font-medium text-white/50 block mb-3">Presets</span>
            <div className="grid grid-cols-3 gap-2">
              {presets.map(p => (
                <button
                  key={p.name}
                  onClick={() => loadPreset(p)}
                  className="rounded-xl overflow-hidden border border-white/5 hover:border-brand-gold/30 transition-colors"
                >
                  <div
                    className="h-12"
                    style={{
                      background: p.type === 'linear'
                        ? `linear-gradient(${p.angle}deg, ${p.stops.map(s => `${s.color} ${s.pos}%`).join(', ')})`
                        : p.type === 'radial'
                        ? `radial-gradient(circle, ${p.stops.map(s => `${s.color} ${s.pos}%`).join(', ')})`
                        : `conic-gradient(from ${p.angle}deg, ${p.stops.map(s => `${s.color} ${s.pos}%`).join(', ')})`,
                    }}
                  />
                  <div className="bg-brand-card/80 px-2 py-1 text-xs text-white/50 text-center">{p.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="text-sm font-medium text-white/50 block mb-3">Type</span>
            <div className="flex gap-2">
              {['linear', 'radial', 'conic'].map(t => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    type === t ? 'bg-brand-gold text-brand-darker' : 'bg-white/5 text-white/50 hover:bg-white/10'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {(type === 'linear' || type === 'conic') && (
            <div>
              <span className="text-sm font-medium text-white/50 block mb-2">Angle: {angle}°</span>
              <input
                type="range"
                min="0"
                max="360"
                value={angle}
                onChange={e => setAngle(parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-white/50">Color Stops</span>
              <div className="flex gap-2">
                <button onClick={addStop} className="btn-secondary text-xs" disabled={stops.length >= 5}>
                  + Add Stop
                </button>
                <button onClick={randomGradient} className="btn-secondary text-xs">
                  Random
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {stops.map((stop, i) => (
                <div key={i} className="flex items-center gap-3 bg-brand-card/30 rounded-xl p-3 border border-white/5">
                  <input
                    type="color"
                    value={stop.color}
                    onChange={e => updateStop(i, 'color', e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer flex-shrink-0"
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={e => {
                      const v = e.target.value;
                      if (/^#[0-9a-fA-F]{0,6}$/.test(v)) updateStop(i, 'color', v);
                    }}
                    className="input-field w-24 font-mono text-sm"
                  />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.pos}
                      onChange={e => updateStop(i, 'pos', parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-xs text-white/30">{stop.pos}%</span>
                  </div>
                  {stops.length > 2 && (
                    <button
                      onClick={() => removeStop(i)}
                      className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
