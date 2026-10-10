import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PaletteGenerator from './pages/PaletteGenerator';
import ColorPicker from './pages/ColorPicker';
import GradientGenerator from './pages/GradientGenerator';
import ContrastChecker from './pages/ContrastChecker';
import ImageExtractor from './pages/ImageExtractor';
import ColorConverter from './pages/ColorConverter';
import TailwindFinder from './pages/TailwindFinder';
import BrandColors from './pages/BrandColors';
import ShadowGenerator from './pages/ShadowGenerator';
import FontPairing from './pages/FontPairing';
import Blog from './pages/Blog';
import WcagContrastGuide from './pages/blog/WcagContrastGuide';
import ColorTheoryGuide from './pages/blog/ColorTheoryGuide';
import CssGradientsGuide from './pages/blog/CssGradientsGuide';
import ColorPsychologyMarketing from './pages/blog/ColorPsychologyMarketing';
import BestColorCombinations2026 from './pages/blog/BestColorCombinations2026';
import BrandColorPaletteGuide from './pages/blog/BrandColorPaletteGuide';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="palette" element={<PaletteGenerator />} />
        <Route path="picker" element={<ColorPicker />} />
        <Route path="gradient" element={<GradientGenerator />} />
        <Route path="contrast" element={<ContrastChecker />} />
        <Route path="extract" element={<ImageExtractor />} />
        <Route path="converter" element={<ColorConverter />} />
        <Route path="tailwind" element={<TailwindFinder />} />
        <Route path="brands" element={<BrandColors />} />
        <Route path="shadow" element={<ShadowGenerator />} />
        <Route path="fonts" element={<FontPairing />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/wcag-color-contrast-guide" element={<WcagContrastGuide />} />
        <Route path="blog/color-theory-for-ui-design" element={<ColorTheoryGuide />} />
        <Route path="blog/css-gradients-complete-guide" element={<CssGradientsGuide />} />
        <Route path="blog/color-psychology-marketing" element={<ColorPsychologyMarketing />} />
        <Route path="blog/best-color-combinations-2026" element={<BestColorCombinations2026 />} />
        <Route path="blog/brand-color-palette-guide" element={<BrandColorPaletteGuide />} />
      </Route>
    </Routes>
  );
}
