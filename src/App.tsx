import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { IntroPage } from './components/intro/IntroPage';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <AnimatePresence mode="wait">
        {!showDashboard ? (
          <IntroPage key="intro" onEnter={() => setShowDashboard(true)} />
        ) : (
          <Dashboard key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;