import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PlayerUI } from './components/PlayerUI';
import { girlsData } from './data/content';

const PlayerRoute = () => {
  const { name } = useParams<{ name: string }>();
  
  const currentIndex = girlsData.findIndex(g => g.slug === name);
  
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
    />
  );
};

export function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/:name" element={<PlayerRoute />} />
          <Route path="/" element={<Navigate to={`/${girlsData[0].slug}`} replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
