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
      </Route>
    </Routes>
  );
}
