import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Volume2, Moon, Sun } from 'lucide-react';
import TrumpetFingeringDiagram from './TrumpetFingeringDiagram';
import PianoKeyboard from './PianoKeyboard';
import OctaveSelector from './OctaveSelector';
import { NOTES, OCTAVES, getFingering } from '../data/trumpetData';
import { useAudio } from '../hooks/useAudio';

const KEY_BINDINGS = {
  '1': 'C', '2': 'C#', '3': 'D', '4': 'D#', '5': 'E', '6': 'F',
  '7': 'F#', '8': 'G', '9': 'G#', '0': 'A', '-': 'A#', '=': 'B', '+': 'B'
};

const TrumpetPage = ({ theme, onThemeToggle }) => {
  const [activeNote, setActiveNote] = useState('C');
  const [activeOctave, setActiveOctave] = useState(OCTAVES[0]); // Middle
  const [volume, setVolume] = useState(13);
  const { playNote, changeVolume } = useAudio();

  const handleNoteSelect = useCallback((note) => {
    setActiveNote(note);
    playNote(`${note}${activeOctave.value}`);
  }, [activeOctave, playNote]);

  useEffect(() => {
    changeVolume(volume);
  }, [volume, changeVolume]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      const key = e.key.toLowerCase();
      const mappedNote = KEY_BINDINGS[key];
      if (mappedNote) {
        handleNoteSelect(mappedNote);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNoteSelect]);

  const currentFingering = getFingering(activeNote, activeOctave.id);

  return (
    <div className="instrument-page">
      <header className="page-header">
        <div className="page-header-left">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} /> Назад
          </Link>
          <h1>Trumpet Bb</h1>
        </div>
        <button className="theme-toggle-btn" onClick={onThemeToggle} title="Switch theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      <main className="instrument-workspace">
        <div className="visualization-section">
          <div className="active-note-display">
            <span className="note-name">{activeNote}</span>
            <span className="octave-number">{activeOctave.value}</span>
          </div>
          <TrumpetFingeringDiagram fingering={currentFingering} />
        </div>

        <div className="controls-section">
          <div className="settings-row">
            <div className="volume-control">
              <Volume2 size={20} className="volume-icon" />
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="volume-slider"
              />
            </div>

            <OctaveSelector
              octaves={OCTAVES}
              activeOctave={activeOctave}
              onChange={setActiveOctave}
            />
          </div>

          <PianoKeyboard
            notes={NOTES}
            activeNote={activeNote}
            onNotePlay={handleNoteSelect}
            keyBindings={KEY_BINDINGS}
          />
        </div>

        <div className="instrument-description">
          <h3>About Trumpet</h3>
          <p>
            The trumpet is a brass instrument commonly used in classical and jazz ensembles .
            The most common type is a B♭ trumpet . It has three valves that change the length of the tubing .
          </p>
        </div>
      </main>
    </div>
  );
};

export default TrumpetPage;
