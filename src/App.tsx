import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PlayerUI } from './components/PlayerUI';
import { girlsData } from './data/content';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const PlayerRoute = ({ onBackgroundReady }: { onBackgroundReady: () => void }) => {
  const { name } = useParams<{ name: string }>();
  
  const currentIndex = girlsData.findIndex(g => g.slug === name);
  
  // If not found, redirect to the first girl
  if (currentIndex === -1) {
    return <Navigate to={`/${girlsData[0].slug}`} replace />;
  }

  const girl = girlsData[currentIndex];
  const prevIndex = currentIndex === 0 ? girlsData.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === girlsData.length - 1 ? 0 : currentIndex + 1;

  return (
    <PlayerUI 
      girl={girl} 
      prevGirlSlug={girlsData[prevIndex].slug} 
      nextGirlSlug={girlsData[nextIndex].slug} 
      onBackgroundReady={onBackgroundReady}
    />
  );
};

export function App() {
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);

  useEffect(() => {
    // Страховочный таймаут: скрыть прелоадер через 8 секунд в любом случае
    const timer = setTimeout(() => {
      setIsGlobalLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleBackgroundReady = useCallback(() => {
    setIsGlobalLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isGlobalLoading && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[9999] bg-zinc-950 flex flex-col items-center justify-center text-white"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Loader2 className="w-12 h-12 animate-spin mb-4 text-white/80" />
            <p className="text-lg tracking-widest font-light text-white/80 animate-pulse">
              Загрузка весны...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/:name" element={<PlayerRoute onBackgroundReady={handleBackgroundReady} />} />
            <Route path="/" element={<Navigate to={`/${girlsData[0].slug}`} replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
