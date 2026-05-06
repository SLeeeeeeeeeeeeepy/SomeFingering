const OctaveSelector = ({ octaves, activeOctave, onChange }) => {
  return (
    <div className="octave-selector">
      <span className="selector-label">Octave  :</span>
      <div className="selector-buttons">
        {octaves.map(octave => (
          <button
            key={octave.id}
            className={`octave-btn ${activeOctave.id === octave.id ? 'active' : ''}`}
            onClick={() => onChange(octave)}
          >
            {octave.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OctaveSelector;
