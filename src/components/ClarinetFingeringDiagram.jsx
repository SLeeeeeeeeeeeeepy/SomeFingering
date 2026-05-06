const ClarinetFingeringDiagram = ({ fingering }) => {
  // fingering - array of 10 elements (0: open, 1: closed)
  // Order: T RK L1 L2 L3 R1 R2 R3 LP RP
  return (
    <div className="clarinet-diagram">
      <svg viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
        {/* Clarinet body (dark wood/plastic) */}
        <rect x="40" y="45" width="680" height="30" rx="15" fill="#111" stroke="#333" strokeWidth="2" />
        
        {/* Mouthpiece */}
        <path d="M40 45 L10 50 L10 70 L40 75 Z" fill="#222" />
        <rect x="35" y="43" width="10" height="34" rx="2" fill="silver" />

        {/* Bell */}
        <path d="M710 45 L760 30 L760 90 L710 75 Z" fill="#111" />
        <rect x="705" y="43" width="8" height="34" rx="2" fill="silver" />

        {/* Separator rings */}
        <rect x="420" y="43" width="6" height="34" rx="2" fill="silver" />
        <rect x="180" y="43" width="6" height="34" rx="2" fill="silver" />

        {/* Holes and Keys */}
        {fingering.map((state, index) => {
          // Positions: T(0), RK(1), L1(2), L2(3), L3(4), R1(5), R2(6), R3(7), LP(8), RP(9)
          const positions = [
            { cx: 200, cy: 30, label: 'T', isTop: true },
            { cx: 160, cy: 30, label: 'RK', isTop: true, isKey: true },
            { cx: 250, cy: 60, label: 'L1' },
            { cx: 300, cy: 60, label: 'L2' },
            { cx: 350, cy: 60, label: 'L3' },
            { cx: 460, cy: 60, label: 'R1' },
            { cx: 510, cy: 60, label: 'R2' },
            { cx: 560, cy: 60, label: 'R3' },
            { cx: 390, cy: 85, label: 'LP', isKey: true },
            { cx: 600, cy: 85, label: 'RP', isKey: true }
          ];
          
          const pos = positions[index];
          const isClosed = state === 1;

          return (
            <g key={index}>
              {/* Hole base or key mechanism */}
              {!pos.isKey && <circle cx={pos.cx} cy={pos.cy} r="14" fill="#333" />}
              {pos.isKey && <rect x={pos.cx - 10} y={pos.cy - 5} width="20" height="10" rx="3" fill="#333" />}
              
              {/* Key/Hole cover */}
              {pos.isKey ? (
                // Shape for keys like pinky/register
                <rect 
                  x={pos.cx - 12} y={pos.cy - 6} 
                  width="24" height="12" rx="4"
                  fill={isClosed ? "var(--accent-color)" : "#e0e0e0"} 
                  stroke={isClosed ? "var(--accent-hover)" : "#999"}
                  strokeWidth="2"
                  style={{
                    transition: 'all 0.15s ease',
                    transformOrigin: `${pos.cx}px ${pos.cy}px`,
                    transform: isClosed ? 'scale(1)' : 'scale(0.95)'
                  }}
                />
              ) : (
                // Shape for normal holes
                <circle 
                  cx={pos.cx} cy={pos.cy} r="13" 
                  fill={isClosed ? "var(--accent-color)" : "#fff"} 
                  stroke={isClosed ? "var(--accent-hover)" : "#999"}
                  strokeWidth="2"
                  style={{
                    transition: 'all 0.15s ease',
                    transformOrigin: `${pos.cx}px ${pos.cy}px`,
                    transform: isClosed ? 'scale(1)' : 'scale(0.9) translateY(-1px)'
                  }}
                />
              )}
              
              {/* Labels for clarity */}
              <text 
                x={pos.cx} 
                y={pos.isTop ? pos.cy - 18 : pos.cy + 25} 
                textAnchor="middle" 
                fontSize="10" 
                fill="var(--text-muted)"
                fontWeight="600"
              >
                {pos.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ClarinetFingeringDiagram;
