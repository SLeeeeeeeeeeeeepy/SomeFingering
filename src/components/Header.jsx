import { Moon, Sun } from 'lucide-react';

const CATEGORIES = [
  { id: 'woodwind', label: 'Woodwind' },
  { id: 'brass', label: 'Brass' }
];

const Header = ({ activeCategory, onCategoryChange, theme, onThemeToggle }) => {
  return (
    <header className="main-header">
      <div className="header-top">
        <div className="header-title-area">
          <h1 className="main-title">Explore Fingerings</h1>
          <p className="main-subtitle">Learn the fingerings of musical instruments</p>
        </div>
        
        <button className="theme-toggle-btn" onClick={onThemeToggle} title="Switch theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
      
      <nav className="category-nav">
        {CATEGORIES.map(cat => (
          <button 
            key={cat.id}
            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </nav>
    </header>
  );
};

export default Header;
