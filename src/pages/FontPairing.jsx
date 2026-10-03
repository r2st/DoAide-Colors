import { useState, useEffect } from 'react';
import fontPairings from '../data/fontPairings';
import { copyToClipboard } from '../utils/clipboard';

const loadedFonts = new Set();

function loadGoogleFont(family, weight = '400') {
  const key = `${family}:${weight}`;
  if (loadedFonts.has(key)) return;
  loadedFonts.add(key);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@${weight}&display=swap`;
  document.head.appendChild(link);
}

export default function FontPairing() {
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [darkPreview, setDarkPreview] = useState(true);
  const [copiedIdx, setCopiedIdx] = useState(-1);

  useEffect(() => {
    fontPairings.forEach(p => {
      loadGoogleFont(p.heading, p.headingWeight);
      loadGoogleFont(p.body, p.bodyWeight);
    });
  }, []);

  const handleCopyImport = async (pairing, index) => {
    const css = `@import url('https://fonts.googleapis.com/css2?family=${pairing.heading.replace(/ /g, '+')}:wght@${pairing.headingWeight}&family=${pairing.body.replace(/ /g, '+')}:wght@${pairing.bodyWeight}&display=swap');`;
    await copyToClipboard(css);
    setCopiedIdx(index);
    setTimeout(() => setCopiedIdx(-1), 1500);
  };

  const handleCopyFamily = async (pairing) => {
    const css = `font-family: '${pairing.heading}', serif;\nfont-family: '${pairing.body}', sans-serif;`;
    await copyToClipboard(css);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-title">Font Pairing</h1>
        <p className="text-white/40">Beautiful Google Font pairings with live preview.</p>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <input
          type="text"
          value={previewText}
          onChange={e => setPreviewText(e.target.value)}
          placeholder="Custom preview text..."
          className="input-field flex-1 min-w-[200px] text-sm"
        />
        <button
          onClick={() => setDarkPreview(!darkPreview)}
          className="btn-secondary text-sm"
        >
          {darkPreview ? 'Light Preview' : 'Dark Preview'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fontPairings.map((pairing, i) => (
          <div key={i} className="bg-brand-card/50 rounded-xl border border-white/5 overflow-hidden">
            <div
              className={`p-6 ${darkPreview ? 'bg-gray-900' : 'bg-white'}`}
            >
              <h3
                className={`text-2xl mb-3 ${darkPreview ? 'text-white' : 'text-gray-900'}`}
                style={{ fontFamily: `'${pairing.heading}', serif`, fontWeight: pairing.headingWeight }}
              >
                {previewText || 'The quick brown fox'}
              </h3>
              <p
                className={`text-sm leading-relaxed ${darkPreview ? 'text-gray-300' : 'text-gray-600'}`}
                style={{ fontFamily: `'${pairing.body}', sans-serif`, fontWeight: pairing.bodyWeight }}
              >
                Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. Good font pairing creates visual hierarchy and enhances the reading experience.
              </p>
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="text-sm font-medium text-white/80">{pairing.heading}</span>
                  <span className="text-white/20 mx-1.5">+</span>
                  <span className="text-sm font-medium text-white/80">{pairing.body}</span>
                </div>
              </div>
              <p className="text-xs text-white/40 mb-3">{pairing.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleCopyImport(pairing, i)}
                  className="btn-secondary text-xs"
                >
                  {copiedIdx === i ? 'Copied!' : 'Copy @import'}
                </button>
                <button
                  onClick={() => handleCopyFamily(pairing)}
                  className="btn-secondary text-xs"
                >
                  Copy font-family
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
