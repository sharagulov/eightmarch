import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VANTA: any;
  }
}

interface BackgroundVideoProps {
  videoUrl?: string;
  forcePlay?: boolean;
  onReady?: () => void;
}

export const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ onReady }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && window.VANTA) {
      setVantaEffect(window.VANTA.FOG({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        highlightColor: 0xf0d7a5,
        midtoneColor: 0xffb4a8,
        lowlightColor: 0xffb3a3,
        baseColor: 0xffebeb,
        blurFactor: 0.6,
        zoom: 1,
        speed: 1.50
      }));
      onReady?.();
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect, onReady]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="absolute inset-0 w-full h-full -z-10"
    >
      <div ref={vantaRef} className="w-full h-full" />
      {/* Light gradient overlay (0.5x) */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/45 via-zinc-950/20 to-transparent pointer-events-none" />
    </motion.div>
  );
};
