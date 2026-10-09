import { describe, it, expect } from 'vitest';
import {
  hexToRgb, rgbToHex, rgbToHsl, hslToRgb, rgbToCmyk, cmykToRgb,
  getRelativeLuminance, getContrastRatio, generatePalette, getColorName,
  randomHex, isLightColor,
} from './color';

describe('hexToRgb', () => {
  it('converts 6-digit hex', () => {
    expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    expect(hexToRgb('#000000')).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb('#ffffff')).toEqual({ r: 255, g: 255, b: 255 });
  });

  it('converts 3-digit hex', () => {
    expect(hexToRgb('#f00')).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('handles without hash', () => {
    expect(hexToRgb('6366f1')).toEqual({ r: 99, g: 102, b: 241 });
  });
});

describe('rgbToHex', () => {
  it('converts RGB to hex', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    expect(rgbToHex(0, 0, 0)).toBe('#000000');
    expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
  });
});

describe('rgbToHsl / hslToRgb roundtrip', () => {
  it('converts red', () => {
    const hsl = rgbToHsl(255, 0, 0);
    expect(hsl).toEqual({ h: 0, s: 100, l: 50 });
    const rgb = hslToRgb(0, 100, 50);
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
  });

  it('converts gray (achromatic)', () => {
    const hsl = rgbToHsl(128, 128, 128);
    expect(hsl.s).toBe(0);
    const rgb = hslToRgb(0, 0, 50);
    expect(rgb.r).toBe(rgb.g);
    expect(rgb.g).toBe(rgb.b);
  });

  it('roundtrips blue', () => {
    const hsl = rgbToHsl(0, 0, 255);
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    expect(rgb).toEqual({ r: 0, g: 0, b: 255 });
  });
});

describe('rgbToCmyk / cmykToRgb', () => {
  it('converts pure black', () => {
    expect(rgbToCmyk(0, 0, 0)).toEqual({ c: 0, m: 0, y: 0, k: 100 });
  });

  it('converts pure white', () => {
    expect(rgbToCmyk(255, 255, 255)).toEqual({ c: 0, m: 0, y: 0, k: 0 });
  });

  it('roundtrips red', () => {
    const cmyk = rgbToCmyk(255, 0, 0);
    const rgb = cmykToRgb(cmyk.c, cmyk.m, cmyk.y, cmyk.k);
    expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
  });
});

describe('getContrastRatio', () => {
  it('returns 21 for black on white', () => {
    const ratio = getContrastRatio('#000000', '#ffffff');
    expect(ratio).toBeCloseTo(21, 0);
  });

  it('returns 1 for same colors', () => {
    const ratio = getContrastRatio('#ff0000', '#ff0000');
    expect(ratio).toBeCloseTo(1, 1);
  });

  it('returns correct ratio for gray on white', () => {
    const ratio = getContrastRatio('#767676', '#ffffff');
    expect(ratio).toBeGreaterThanOrEqual(4.5);
  });
});

describe('getRelativeLuminance', () => {
  it('returns 0 for black', () => {
    expect(getRelativeLuminance(0, 0, 0)).toBe(0);
  });

  it('returns 1 for white', () => {
    expect(getRelativeLuminance(255, 255, 255)).toBeCloseTo(1, 4);
  });
});

describe('generatePalette', () => {
  it('returns 5 colors', () => {
    const palette = generatePalette('#6366f1', 'complementary');
    expect(palette).toHaveLength(5);
    palette.forEach(c => expect(c).toMatch(/^#[0-9a-f]{6}$/));
  });

  it('works for each harmony type', () => {
    const harmonies = ['complementary', 'analogous', 'triadic', 'split-complementary', 'tetradic'];
    harmonies.forEach(h => {
      const palette = generatePalette('#ff6600', h);
      expect(palette).toHaveLength(5);
    });
  });

  it('uses default harmony for unknown type', () => {
    const palette = generatePalette('#ff6600', 'unknown');
    expect(palette).toHaveLength(5);
  });
});

describe('getColorName', () => {
  it('returns exact name for known colors', () => {
    expect(getColorName('#ff0000')).toBe('Red');
    expect(getColorName('#000000')).toBe('Black');
    expect(getColorName('#ffffff')).toBe('White');
  });

  it('returns closest name for unknown colors', () => {
    const name = getColorName('#fe0101');
    expect(name).toBe('Red');
  });
});

describe('randomHex', () => {
  it('returns valid hex', () => {
    const hex = randomHex();
    expect(hex).toMatch(/^#[0-9a-f]{6}$/);
  });
});

describe('isLightColor', () => {
  it('white is light', () => {
    expect(isLightColor('#ffffff')).toBe(true);
  });

  it('black is not light', () => {
    expect(isLightColor('#000000')).toBe(false);
  });
});
