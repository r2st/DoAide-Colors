import { isLightColor } from '../utils/color';
import CopyButton from './CopyButton';

export default function ColorSwatch({ color, size = 'md', showHex = true, onClick }) {
  const light = isLightColor(color);
  const sizes = {
    sm: 'w-12 h-12 rounded-lg',
    md: 'w-20 h-20 rounded-xl',
    lg: 'w-full h-24 rounded-xl',
    xl: 'w-full h-32 rounded-xl',
  };

  return (
    <div
      className={`${sizes[size]} flex flex-col items-center justify-center gap-1 transition-transform hover:scale-105 ${onClick ? 'cursor-pointer' : ''}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {showHex && (
        <CopyButton
          text={color}
          className={`text-xs font-mono ${light ? 'text-black/70 hover:text-black' : 'text-white/70 hover:text-white'}`}
        />
      )}
      {showHex && (
        <span className={`text-xs font-mono ${light ? 'text-black/60' : 'text-white/60'}`}>
          {color.toUpperCase()}
        </span>
      )}
    </div>
  );
}
