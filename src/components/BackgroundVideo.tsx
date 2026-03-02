import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';
import { backgroundPalettes } from '../data/content';

const defaultPalette = backgroundPalettes.masha;

export const BackgroundVideo: React.FC<{ slug?: string }> = ({ slug = 'masha' }) => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<{ destroy: () => void } | null>(null);
  const palette = backgroundPalettes[slug] ?? defaultPalette;

  useEffect(() => {
    if (vantaRef.current) {
      effectRef.current?.destroy();
      effectRef.current = FOG({
        THREE,
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: palette.highlight,
        midtoneColor: palette.midtone,
        lowlightColor: palette.lowlight,
        baseColor: palette.base,
        blurFactor: 0.5,
        zoom: 1,
        speed: 0.8
      });
    }
    return () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, [slug, palette.highlight, palette.midtone, palette.lowlight, palette.base]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 w-full h-full -z-10"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.gradient}`} />
      <div ref={vantaRef} className="absolute inset-0 w-full h-full" />
      {/* Light gradient overlay (0.5x) */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-zinc-950/20 to-transparent pointer-events-none" />
    </motion.div>
  );
};
