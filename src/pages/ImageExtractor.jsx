import { useState, useRef } from 'react';
import { rgbToHex, isLightColor } from '../utils/color';
import { copyToClipboard } from '../utils/clipboard';
import CopyButton from '../components/CopyButton';

function extractColors(imageData, count = 6) {
  const pixels = imageData.data;
  const buckets = {};
  const step = Math.max(1, Math.floor(pixels.length / 4 / 10000));

  for (let i = 0; i < pixels.length; i += 4 * step) {
    const r = Math.round(pixels[i] / 32) * 32;
    const g = Math.round(pixels[i + 1] / 32) * 32;
    const b = Math.round(pixels[i + 2] / 32) * 32;
    const a = pixels[i + 3];
    if (a < 128) continue;
    const key = `${r},${g},${b}`;
    buckets[key] = (buckets[key] || 0) + 1;
  }

  const sorted = Object.entries(buckets)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count * 3);

  const colors = [];
  for (const [key] of sorted) {
    const [r, g, b] = key.split(',').map(Number);
    const hex = rgbToHex(
      Math.min(255, r),
      Math.min(255, g),
      Math.min(255, b)
    );
    const isDuplicate = colors.some(c => {
      const cr = parseInt(c.slice(1, 3), 16);
      const cg = parseInt(c.slice(3, 5), 16);
      const cb = parseInt(c.slice(5, 7), 16);
      return Math.abs(cr - r) + Math.abs(cg - g) + Math.abs(cb - b) < 60;
    });
    if (!isDuplicate) {
      colors.push(hex);
      if (colors.length >= count) break;
    }
  }

  return colors;
}

export default function ImageExtractor() {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedCSS, setCopiedCSS] = useState(false);
  const canvasRef = useRef(null);
  const inputRef = useRef(null);

  const processImage = (file) => {
    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setImage(file);
    setLoading(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      const maxSize = 300;
      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const extracted = extractColors(imageData);
      setColors(extracted);
      setLoading(false);
    };
    img.src = url;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) processImage(file);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) processImage(file);
  };

  const cssVars = colors.map((c, i) => `  --extracted-${i + 1}: ${c};`).join('\n');
  const cssCode = `:root {\n${cssVars}\n}`;

  const handleCopyCSS = async () => {
    await copyToClipboard(cssCode);
    setCopiedCSS(true);
    setTimeout(() => setCopiedCSS(false), 1500);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Image Color Extractor</h1>
        <p className="text-white/40">Upload an image and extract its dominant color palette.</p>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div
            className={`border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
              image ? 'border-brand-gold/30' : 'border-white/10 hover:border-white/20'
            }`}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="max-h-80 mx-auto object-contain rounded-lg"
              />
            ) : (
              <div className="py-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto text-white/20 mb-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                </svg>
                <p className="text-white/40 mb-2">Drag and drop an image here</p>
                <p className="text-white/20 text-sm mb-4">PNG, JPG, WebP, or GIF</p>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="btn-primary"
                >
                  Choose File
                </button>
              </div>
            )}
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
          </div>

          {image && (
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => processImage(image)}
                className="btn-secondary"
              >
                Extract Again
              </button>
              <button
                onClick={() => { setImage(null); setImageUrl(''); setColors([]); }}
                className="btn-secondary"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        <div>
          {loading && (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
            </div>
          )}

          {!loading && colors.length > 0 && (
            <>
              <div className="flex flex-wrap gap-3 mb-6">
                {colors.map((color, i) => {
                  const light = isLightColor(color);
                  return (
                    <div
                      key={i}
                      className="w-20 h-20 rounded-xl flex items-center justify-center border border-white/10"
                      style={{ backgroundColor: color }}
                    >
                      <CopyButton
                        text={color}
                        className={`text-xs font-mono ${light ? 'text-black/60 hover:text-black' : 'text-white/60 hover:text-white'}`}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl overflow-hidden mb-6">
                <div className="flex h-16">
                  {colors.map((color, i) => (
                    <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>

              <div className="bg-brand-card/50 rounded-xl p-4 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-white/50">CSS Variables</span>
                  <button onClick={handleCopyCSS} className="text-sm text-white/50 hover:text-white/80 transition-colors">
                    {copiedCSS ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="text-sm font-mono text-brand-gold/80 overflow-x-auto">{cssCode}</pre>
              </div>
            </>
          )}

          {!loading && colors.length === 0 && !image && (
            <div className="flex items-center justify-center h-48 text-white/20">
              Upload an image to extract colors
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
