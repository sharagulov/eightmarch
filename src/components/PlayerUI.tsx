import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import type { GirlData } from '../data/content';
import { BackgroundVideo } from './BackgroundVideo';
import { PoemOverlay } from './PoemOverlay';
import { motion, AnimatePresence } from 'framer-motion';
import { CatCardsWithState } from './CatCards';

interface PlayerUIProps {
  girl: GirlData;
  prevGirlSlug?: string;
  nextGirlSlug?: string;
}

export const PlayerUI: React.FC<PlayerUIProps> = ({ girl }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isCatsOpen, setIsCatsOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  
  // Fake progress bar
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 0.1; // Slow progress
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);


  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setProgress(pos * 100);
  };

  const formatTime = (percent: number) => {
    // Let's pretend the "song" is 3:24 long (204 seconds)
    const totalSeconds = 204;
    const currentSeconds = Math.floor((percent / 100) * totalSeconds);
    const m = Math.floor(currentSeconds / 60);
    const s = Math.floor(currentSeconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={girl.slug}
        className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8 relative z-0"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.5 }}
      >
        <BackgroundVideo slug={girl.slug} />
        
        {/* Main Player Container (Glassmorphism for all screens) */}
        <div className="relative w-full max-w-md flex justify-center z-0">
          <motion.div 
            className="w-full flex flex-col justify-center bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl"
            animate={{
              scale: isCatsOpen ? 0.85 : 1,
              opacity: isCatsOpen ? 0.5 : 1,
              zIndex: isCatsOpen ? 0 : 10,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={() => isCatsOpen && setIsCatsOpen(false)}
            style={{ cursor: isCatsOpen ? 'pointer' : 'default' }}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6 md:mb-8 text-xs md:text-sm text-gray-300 font-medium tracking-widest">
              <span>С 8 МАРТА!</span>
              <span>{girl.name.toUpperCase()}</span>
            </div>

            <div className="flex-1 flex flex-col justify-center mb-4 md:mb-6">
              {/* Poem */}
              <div className="min-h-[160px] md:min-h-[200px] flex items-center justify-center">
                <PoemOverlay poem={girl.poem} />
              </div>
            </div>

            {/* Track Info */}
            <div className="w-full mb-6 text-left z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-1" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>{girl.name}</h2>
              <p className="text-gray-300 md:text-gray-400 font-medium text-base md:text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.35)' }}>Поздравление с весной</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full mb-8 z-10 group cursor-pointer" onClick={handleProgressClick} ref={progressRef}>
              <div className="h-1.5 md:h-1 w-full bg-white/20 rounded-full overflow-hidden relative transition-all group-hover:h-2">
                <div 
                  className="absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-300 md:text-gray-400 mt-2 font-medium font-mono">
                <span>{formatTime(progress)}</span>
                <span>3:24</span>
              </div>
            </div>

            {/* Controls */}
            <div className="w-full flex items-center justify-between px-2 md:px-0 z-10">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Shuffle size={20} strokeWidth={2.5} />
              </button>
              
              <div className="flex items-center gap-6 md:gap-8">
                <button 
                  className="text-white hover:text-gray-300 transition-colors cursor-default"
                >
                  <SkipBack size={32} fill="currentColor" />
                </button>
                
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 md:w-14 md:h-14 flex items-center justify-center bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  {isPlaying ? (
                    <Pause size={28} fill="currentColor" className="ml-0" />
                  ) : (
                    <Play size={28} fill="currentColor" className="ml-1" />
                  )}
                </button>
                
                <button 
                  className="text-white hover:text-gray-300 transition-colors cursor-default"
                >
                  <SkipForward size={32} fill="currentColor" />
                </button>
              </div>

              <button className="text-gray-400 hover:text-white transition-colors">
                <Repeat size={20} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>

          <CatCardsWithState 
            key={girl.slug}
            initialImages={girl.catImages}
            isOpen={isCatsOpen} 
            onOpen={() => setIsCatsOpen(true)} 
            onClose={() => setIsCatsOpen(false)}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
