import { useState } from 'react';
import CopyButton from '../components/CopyButton';

const defaultLayer = { x: 5, y: 5, blur: 15, spread: 0, color: '#000000', opacity: 25, inset: false };

const presets = [
  { name: 'Subtle', layers: [{ x: 0, y: 1, blur: 3, spread: 0, color: '#000000', opacity: 10, inset: false }] },
  { name: 'Medium', layers: [{ x: 0, y: 4, blur: 14, spread: -3, color: '#000000', opacity: 20, inset: false }] },
  { name: 'Heavy', layers: [{ x: 0, y: 20, blur: 50, spread: -12, color: '#000000', opacity: 30, inset: false }] },
  { name: 'Glow', layers: [{ x: 0, y: 0, blur: 30, spread: 5, color: '#6366f1', opacity: 40, inset: false }] },
  { name: 'Hard', layers: [{ x: 8, y: 8, blur: 0, spread: 0, color: '#000000', opacity: 25, inset: false }] },
  {
    name: 'Layered',
    layers: [
      { x: 0, y: 1, blur: 2, spread: 0, color: '#000000', opacity: 5, inset: false },
      { x: 0, y: 4, blur: 8, spread: 0, color: '#000000', opacity: 8, inset: false },
      { x: 0, y: 16, blur: 32, spread: 0, color: '#000000', opacity: 12, inset: false },
    ],
  },
];

function hexToRgba(hex, opacity) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

export default function ShadowGenerator() {
  const [layers, setLayers] = useState([{ ...defaultLayer }]);

  const updateLayer = (index, field, value) => {
    setLayers(prev => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  };

  const addLayer = () => {
    if (layers.length >= 5) return;
    setLayers(prev => [...prev, { ...defaultLayer }]);
  };

  const removeLayer = (index) => {
    if (layers.length <= 1) return;
    setLayers(prev => prev.filter((_, i) => i !== index));
  };

  const loadPreset = (preset) => setLayers(preset.layers.map(l => ({ ...l })));

  const reset = () => setLayers([{ ...defaultLayer }]);

  const shadowCSS = layers
    .map(l => `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexToRgba(l.color, l.opacity)}`)
    .join(',\n    ');

  const fullCSS = `box-shadow: ${shadowCSS};`;

  const shadowStyle = layers
    .map(l => `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${hexToRgba(l.color, l.opacity)}`)
    .join(', ');

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">CSS Shadow Generator</h1>
        <p className="text-white/40">Create beautiful box shadows with live preview.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-gray-200 rounded-2xl h-72 flex items-center justify-center mb-6">
            <div
              className="w-48 h-48 bg-white rounded-xl"
              style={{ boxShadow: shadowStyle }}
            />
          </div>

          <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/50">CSS Code</span>
              <CopyButton text={fullCSS} label="Copy" />
            </div>
            <pre className="text-sm font-mono text-brand-gold/80 whitespace-pre-wrap">{fullCSS}</pre>
          </div>

          <div>
            <span className="text-sm font-medium text-white/50 block mb-3">Presets</span>
            <div className="flex flex-wrap gap-2">
              {presets.map(p => (
                <button key={p.name} onClick={() => loadPreset(p)} className="btn-secondary text-xs">
                  {p.name}
                </button>
              ))}
              <button onClick={reset} className="btn-secondary text-xs text-red-400 hover:text-red-300">
                Reset
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-white/50">Shadow Layers</span>
            <button onClick={addLayer} className="btn-secondary text-xs" disabled={layers.length >= 5}>
              + Add Layer
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {layers.map((layer, i) => (
              <div key={i} className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-white/60">Layer {i + 1}</span>
                  {layers.length > 1 && (
                    <button onClick={() => removeLayer(i)} className="text-white/30 hover:text-red-400 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-white/30">X Offset: {layer.x}px</label>
                    <input type="range" min="-50" max="50" value={layer.x} onChange={e => updateLayer(i, 'x', parseInt(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    <label className="text-xs text-white/30">Y Offset: {layer.y}px</label>
                    <input type="range" min="-50" max="50" value={layer.y} onChange={e => updateLayer(i, 'y', parseInt(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    <label className="text-xs text-white/30">Blur: {layer.blur}px</label>
                    <input type="range" min="0" max="100" value={layer.blur} onChange={e => updateLayer(i, 'blur', parseInt(e.target.value))} className="w-full" />
                  </div>
                  <div>
                    <label className="text-xs text-white/30">Spread: {layer.spread}px</label>
                    <input type="range" min="-50" max="50" value={layer.spread} onChange={e => updateLayer(i, 'spread', parseInt(e.target.value))} className="w-full" />
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-white/30">Color</label>
                    <input type="color" value={layer.color} onChange={e => updateLayer(i, 'color', e.target.value)} className="w-8 h-8 rounded" />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-white/30">Opacity: {layer.opacity}%</label>
                    <input type="range" min="0" max="100" value={layer.opacity} onChange={e => updateLayer(i, 'opacity', parseInt(e.target.value))} className="w-full" />
                  </div>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" checked={layer.inset} onChange={e => updateLayer(i, 'inset', e.target.checked)} className="rounded" />
                    <span className="text-xs text-white/40">Inset</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
