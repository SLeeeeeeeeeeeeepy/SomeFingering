import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import FlutePage from './components/FlutePage';
import Header from './components/Header';

import ClarinetPage from './components/ClarinetPage';
import TrumpetPage from './components/TrumpetPage';

function App() {
  const [theme, setTheme] = useState('light');
  const [activeCategory, setActiveCategory] = useState('woodwind');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Router>
      <div className="app">
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  activeCategory={activeCategory} 
                  onCategoryChange={setActiveCategory}
                  theme={theme}
                  onThemeToggle={toggleTheme}
                />
              } 
            />
            <Route path="/flute" element={<FlutePage theme={theme} onThemeToggle={toggleTheme} />} />
            <Route path="/clarinet" element={<ClarinetPage theme={theme} onThemeToggle={toggleTheme} />} />
            <Route path="/trumpet" element={<TrumpetPage theme={theme} onThemeToggle={toggleTheme} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
