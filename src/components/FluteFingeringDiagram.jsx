const FluteFingeringDiagram = ({ fingering }) => {
  // fingering - array of 8 elements (0: open, 1: closed)
  return (
    <div className="flute-diagram">
      <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
        {/* Simple minimal body */}
        <rect x="40" y="40" width="720" height="40" rx="20" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="2" />
        
        {/* Lip Plate */}
        <ellipse cx="120" cy="60" rx="25" ry="12" fill="var(--bg-color)" stroke="var(--border-color)" strokeWidth="2" />
        <ellipse cx="120" cy="60" rx="10" ry="5" fill="var(--key-black)" />

        {/* Separator rings */}
        <rect x="430" y="38" width="4" height="44" rx="2" fill="var(--border-color)" />

        {/* Holes mapping */}
        {fingering.map((state, index) => {
          // 8 holes: 4 left, 4 right
          const xPositions = [220, 280, 340, 400,  480, 540, 600, 660];
          const cx = xPositions[index];
          const cy = 60;
          const isClosed = state === 1;

          return (
            <g key={index}>
              {/* Hole body */}
              <circle cx={cx} cy={cy} r="16" fill="var(--key-black)" />
              {/* Key cover - flat simple colors */}
              <circle 
                cx={cx} cy={cy} r="15" 
                fill={isClosed ? "var(--accent-color)" : "var(--panel-bg)"} 
                stroke={isClosed ? "var(--accent-hover)" : "var(--border-color)"}
                strokeWidth="2"
                style={{
                  transition: 'all 0.15s ease',
                  transformOrigin: `${cx}px ${cy}px`,
                  transform: isClosed ? 'scale(1)' : 'scale(0.9) translateY(-2px)'
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FluteFingeringDiagram;
