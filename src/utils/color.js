export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

export function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
}

export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

export function rgbToCmyk(r, g, b) {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };
  const c1 = 1 - r / 255, m1 = 1 - g / 255, y1 = 1 - b / 255;
  const k = Math.min(c1, m1, y1);
  return {
    c: Math.round((c1 - k) / (1 - k) * 100),
    m: Math.round((m1 - k) / (1 - k) * 100),
    y: Math.round((y1 - k) / (1 - k) * 100),
    k: Math.round(k * 100),
  };
}

export function cmykToRgb(c, m, y, k) {
  c /= 100; m /= 100; y /= 100; k /= 100;
  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k)),
  };
}

export function getRelativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function getContrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function generatePalette(baseHex, harmony) {
  const rgb = hexToRgb(baseHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const colors = [];
  const h = hsl.h;

  switch (harmony) {
    case 'complementary':
      colors.push(hsl, { h: (h + 180) % 360, s: hsl.s, l: hsl.l });
      colors.push({ h, s: hsl.s, l: Math.min(hsl.l + 20, 90) });
      colors.push({ h: (h + 180) % 360, s: hsl.s, l: Math.min(hsl.l + 20, 90) });
      colors.push({ h, s: Math.max(hsl.s - 20, 10), l: Math.max(hsl.l - 15, 10) });
      break;
    case 'analogous':
      colors.push(
        { h: (h - 30 + 360) % 360, s: hsl.s, l: hsl.l },
        { h: (h - 15 + 360) % 360, s: hsl.s, l: hsl.l },
        hsl,
        { h: (h + 15) % 360, s: hsl.s, l: hsl.l },
        { h: (h + 30) % 360, s: hsl.s, l: hsl.l }
      );
      break;
    case 'triadic':
      colors.push(hsl);
      colors.push({ h: (h + 120) % 360, s: hsl.s, l: hsl.l });
      colors.push({ h: (h + 240) % 360, s: hsl.s, l: hsl.l });
      colors.push({ h, s: hsl.s, l: Math.min(hsl.l + 25, 90) });
      colors.push({ h: (h + 120) % 360, s: hsl.s, l: Math.max(hsl.l - 15, 10) });
      break;
    case 'split-complementary':
      colors.push(hsl);
      colors.push({ h: (h + 150) % 360, s: hsl.s, l: hsl.l });
      colors.push({ h: (h + 210) % 360, s: hsl.s, l: hsl.l });
      colors.push({ h, s: hsl.s, l: Math.min(hsl.l + 20, 90) });
      colors.push({ h: (h + 180) % 360, s: Math.max(hsl.s - 15, 10), l: hsl.l });
      break;
    case 'tetradic':
      colors.push(hsl);
      colors.push({ h: (h + 90) % 360, s: hsl.s, l: hsl.l });
      colors.push({ h: (h + 180) % 360, s: hsl.s, l: hsl.l });
      colors.push({ h: (h + 270) % 360, s: hsl.s, l: hsl.l });
      colors.push({ h, s: hsl.s, l: Math.min(hsl.l + 20, 90) });
      break;
    default:
      for (let i = 0; i < 5; i++) {
        colors.push({ h: (h + i * 72) % 360, s: hsl.s, l: hsl.l });
      }
  }

  return colors.slice(0, 5).map(c => {
    const { r, g, b } = hslToRgb(c.h, c.s, c.l);
    return rgbToHex(r, g, b);
  });
}

export function getColorName(hex) {
  const names = {
    '#ff0000': 'Red', '#ff4500': 'OrangeRed', '#ff6347': 'Tomato', '#ff7f50': 'Coral',
    '#ffa500': 'Orange', '#ffd700': 'Gold', '#ffff00': 'Yellow', '#9acd32': 'YellowGreen',
    '#00ff00': 'Lime', '#32cd32': 'LimeGreen', '#008000': 'Green', '#006400': 'DarkGreen',
    '#00ffff': 'Cyan', '#008b8b': 'DarkCyan', '#0000ff': 'Blue', '#0000cd': 'MediumBlue',
    '#000080': 'Navy', '#4b0082': 'Indigo', '#800080': 'Purple', '#ff00ff': 'Magenta',
    '#ff69b4': 'HotPink', '#ffc0cb': 'Pink', '#ffffff': 'White', '#000000': 'Black',
    '#808080': 'Gray', '#c0c0c0': 'Silver', '#a52a2a': 'Brown', '#8b4513': 'SaddleBrown',
  };
  const rgb = hexToRgb(hex);
  let closest = '', minDist = Infinity;
  for (const [h, name] of Object.entries(names)) {
    const c = hexToRgb(h);
    const dist = Math.sqrt((rgb.r - c.r) ** 2 + (rgb.g - c.g) ** 2 + (rgb.b - c.b) ** 2);
    if (dist < minDist) { minDist = dist; closest = name; }
  }
  return closest;
}

export function randomHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export function isLightColor(hex) {
  const { r, g, b } = hexToRgb(hex);
  return getRelativeLuminance(r, g, b) > 0.5;
}
