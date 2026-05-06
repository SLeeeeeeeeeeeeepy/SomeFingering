const TrumpetFingeringDiagram = ({ fingering }) => {
  // fingering - array of 3 elements (0: open, 1: closed)
  return (
    <div className="trumpet-diagram">
      <svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        {/* Trumpet Body Outline (Simplified) */}
        <path d="M 50 120 L 350 120" stroke="var(--border-color)" strokeWidth="8" strokeLinecap="round" opacity="0.3" />
        
        {/* Valves block */}
        <rect x="100" y="80" width="200" height="100" rx="10" fill="var(--panel-bg)" stroke="var(--border-color)" strokeWidth="3" />

        {/* 3 Valves */}
        {fingering.map((state, index) => {
          const x = 140 + index * 60;
          const y = 80;
          const isClosed = state === 1;

          return (
            <g key={index}>
              {/* Valve Casing */}
              <rect x={x - 15} y={y} width="30" height="100" fill="none" stroke="var(--border-color)" strokeWidth="2" />
              
              {/* Valve Button/Piston */}
              <rect 
                x={x - 12} 
                y={isClosed ? y + 20 : y - 15} 
                width="24" 
                height={isClosed ? 80 : 115} 
                rx="4" 
                fill={isClosed ? "var(--accent-color)" : "var(--panel-bg)"} 
                stroke={isClosed ? "var(--accent-hover)" : "var(--border-color)"}
                strokeWidth="2"
                style={{ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
              
              {/* Top Finger Piece */}
              <circle 
                cx={x} 
                cy={isClosed ? y + 20 : y - 15} 
                r="12" 
                fill={isClosed ? "var(--accent-color)" : "var(--panel-bg)"} 
                stroke={isClosed ? "var(--accent-hover)" : "var(--border-color)"}
                strokeWidth="2"
                style={{ transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' }}
              />
            </g>
          );
        })}
        
        {/* Leadpipe and Bell (Decorative) */}
        <path d="M 300 130 Q 380 130 380 180" fill="none" stroke="var(--border-color)" strokeWidth="4" opacity="0.5" />
        <path d="M 100 130 Q 20 130 20 80" fill="none" stroke="var(--border-color)" strokeWidth="4" opacity="0.5" />
      </svg>
    </div>
  );
};

export default TrumpetFingeringDiagram;
