import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, RefreshCw, Loader2 } from 'lucide-react';
import { getRandomCatUrls } from '../data/content';

/** Fetches image URLs and converts to stable blob URLs so the same image is always shown until reload */
async function urlsToBlobUrls(urls: string[]): Promise<string[]> {
  const results = await Promise.all(
    urls.map(async (url) => {
      const res = await fetch(url, { mode: 'cors' });
      const blob = await res.blob();
      return URL.createObjectURL(blob);
    })
  );
  return results;
}

interface CatCardsWithStateProps {
  initialImages: string[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const CatCardsWithState: React.FC<CatCardsWithStateProps> = ({ initialImages, isOpen, onOpen, onClose }) => {
  const [sourceUrls, setSourceUrls] = useState(initialImages);
  const [displayUrls, setDisplayUrls] = useState<string[]>([]);
  const [isPreloading, setIsPreloading] = useState(true);
  const blobUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- loading state for async fetch
    setIsPreloading(true);
    const run = () => urlsToBlobUrls(sourceUrls)
      .then((blobUrls) => {
        if (cancelled) return;
        blobUrlsRef.current.forEach(URL.revokeObjectURL);
        blobUrlsRef.current = blobUrls;
        setDisplayUrls(blobUrls);
        setIsPreloading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setDisplayUrls(sourceUrls);
        setIsPreloading(false);
      });
    const id = setTimeout(run, 150);
    return () => {
      cancelled = true;
      clearTimeout(id);
      blobUrlsRef.current.forEach(URL.revokeObjectURL);
      blobUrlsRef.current = [];
    };
  }, [sourceUrls]);
  const handleReload = () => setSourceUrls(getRandomCatUrls());

  if (isPreloading || displayUrls.length === 0) return null;

  return (
    <CatCards
      images={displayUrls}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      onReload={handleReload}
    />
  );
};

interface CatCardsProps {
  images: string[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onReload?: () => void;
}

export const CatCards: React.FC<CatCardsProps> = ({ images, isOpen, onOpen, onClose, onReload }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => ({ ...prev, [src]: true }));
  };

  const handleReload = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoadedImages({});
    setCurrentIndex(0);
    onReload?.();
  };

  if (!images || images.length === 0) return null;

  const renderImageWithLoader = (src: string) => (
    <div className="relative w-full h-full">
      {!loadedImages[src] && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-200/90">
          <Loader2 className="w-12 h-12 text-zinc-500 animate-spin" strokeWidth={2} />
        </div>
      )}
      <img 
        src={src} 
        alt=""
        className={`w-full h-full object-cover pointer-events-none transition-opacity duration-300 ${loadedImages[src] ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => handleImageLoad(src)}
      />
    </div>
  );

  const stackImages = images.slice(0, 3);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      {/* Closed State (Stack) */}
      {!isOpen && (
        <motion.div 
          className="absolute -top-10 right-8 md:top-1/4 md:-right-12 w-32 h-40 md:w-40 md:h-48 cursor-pointer z-[-1] opacity-50 hover:opacity-100 transition-opacity duration-300"
          onClick={onOpen}
        >
          {stackImages.map((src, index) => {
            const isLast = index === stackImages.length - 1;
            return (
              <motion.div
                key={index}
                className="absolute top-0 left-0 w-full h-full rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-gray-200"
                style={{
                  rotate: (index - 1) * 8,
                  zIndex: index,
                }}
                whileHover={isLast ? { y: -15, rotate: (index - 1) * 8 + 5 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {renderImageWithLoader(src)}
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Open State (Carousel) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute inset-0 md:inset-[-60px] z-50 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md rounded-[32px] md:rounded-[50px] py-8 pt-[64px] md:py-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-4 right-4 md:top-8 md:right-8 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors z-50"
            >
              <X size={24} />
            </button>

            {onReload && (
              <button 
                onClick={handleReload}
                className="absolute top-4 left-4 md:top-8 md:left-8 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors z-50"
                title="Новая подборка котиков"
              >
                <RefreshCw size={24} />
              </button>
            )}
            
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Desktop Nav - Left */}
              <button 
                onClick={handlePrev}
                className="hidden md:flex absolute left-4 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors z-50"
              >
                <ChevronLeft size={32} />
              </button>

              <div className="relative w-[75vw] h-[35vh] max-h-[400px] max-w-[300px] md:w-80 md:h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    className="absolute inset-0 rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gray-200"
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    {renderImageWithLoader(images[currentIndex])}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Desktop Nav - Right */}
              <button 
                onClick={handleNext}
                className="hidden md:flex absolute right-4 p-3 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors z-50"
              >
                <ChevronRight size={32} />
              </button>
            </div>

            {/* Mobile Nav - Bottom */}
            <div className="md:hidden flex gap-12 mt-6 z-50">
              <button 
                onClick={handlePrev}
                className="p-3 bg-white/20 active:bg-white/40 rounded-full text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button 
                onClick={handleNext}
                className="p-3 bg-white/20 active:bg-white/40 rounded-full text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>
            </div>
            
            {/* Pagination dots */}
            <div className="flex md:absolute md:bottom-8 gap-2 z-50 mt-6 md:mt-0">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
                />
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
