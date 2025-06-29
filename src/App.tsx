import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { IntroPage } from './components/intro/IntroPage';
import { Dashboard } from './components/dashboard/Dashboard';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [showDashboard, setShowDashboard] = useState(false);

  // If user is authenticated, show dashboard directly
  if (isAuthenticated) {
    return <Dashboard />;
  }

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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;