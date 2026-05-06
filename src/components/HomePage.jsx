import { Link } from 'react-router-dom';
import { Music, Wind } from 'lucide-react';

const INSTRUMENT_GROUPS = {
  woodwind: [
    {
      name: 'Flutes',
      instruments: [
        { id: 'flute', label: 'Flute C', path: '/flute', disabled: false, icon: Wind },
        { id: 'piccolo', label: 'Piccolo', disabled: true },
      ]
    },
    {
      name: 'Double Reeds',
      instruments: [
        { id: 'oboe', label: 'Oboe', disabled: true },
        { id: 'bassoon', label: 'Bassoon', disabled: true },
      ]
    },
    {
      name: 'Clarinets',
      instruments: [
        { id: 'clarinet', label: 'Bb Clarinet', path: '/clarinet', disabled: false, icon: Wind },
      ]
    }
  ],
  brass: [
    {
      name: 'High Brass',
      instruments: [
        { id: 'trumpet', label: 'Trumpet', disabled: true },
        { id: 'frenchhorn', label: 'French Horn', disabled: true },
      ]
    },
    {
      name: 'Low Brass',
      instruments: [
        { id: 'trombone', label: 'Trombone', disabled: true },
        { id: 'tuba', label: 'Tuba', disabled: true },
      ]
    }
  ]
};

import Header from './Header';

const HomePage = ({ activeCategory, onCategoryChange, theme, onThemeToggle }) => {
  const groups = INSTRUMENT_GROUPS[activeCategory] || [];

  return (
    <div className="home-page">
      <Header 
        activeCategory={activeCategory} 
        onCategoryChange={onCategoryChange}
        theme={theme}
        onThemeToggle={onThemeToggle}
      />
      
      <div className="instrument-sections">
        {groups.map(group => (
          <section key={group.name} className="instrument-group">
            <h2 className="group-title">{group.name}</h2>
            <div className="instruments-grid">
              {group.instruments.map(inst => {
                const Icon = inst.icon || Music;
                
                if (inst.disabled) {
                  return (
                    <div key={inst.id} className="instrument-card disabled">
                      <Icon size={24} className="card-icon" />
                      <h3>{inst.label}</h3>
                    </div>
                  );
                }

                return (
                  <Link key={inst.id} to={inst.path} className="instrument-card active">
                    <Icon size={24} className="card-icon" />
                    <h3>{inst.label}</h3>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
