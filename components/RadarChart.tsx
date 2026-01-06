import React, { useState, useMemo } from 'react';
import { Skill } from '../types';

interface RadarChartProps {
  skills: Skill[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ skills }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const size = 400;
  const center = size / 2;
  const radius = size * 0.35;
  const totalAxes = skills.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  const points = useMemo(() => {
    return skills.map((skill, i) => {
      const angle = i * angleStep - Math.PI / 2;
      const factor = skill.level / 100;
      const x = center + radius * factor * Math.cos(angle);
      const y = center + radius * factor * Math.sin(angle);
      return { x, y, skill, angle };
    });
  }, [skills, radius, center, angleStep]);

  const polygonPath = useMemo(() => {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  }, [points]);

  return (
    <div className="relative w-full max-w-[500px] mx-auto flex items-center justify-center aspect-square">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      >
        {/* Background Grid Lines (Hexagons/Polygons) */}
        {[0.2, 0.4, 0.6, 0.8, 1.0].map((tick) => (
          <polygon
            key={tick}
            points={Array.from({ length: totalAxes })
              .map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const x = center + radius * tick * Math.cos(angle);
                const y = center + radius * tick * Math.sin(angle);
                return `${x},${y}`;
              })
              .join(' ')}
            fill="none"
            stroke="rgba(6, 182, 212, 0.1)"
            strokeWidth="1"
          />
        ))}

        {/* Radial Axis Lines */}
        {points.map((p, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x2 = center + radius * Math.cos(angle);
          const y2 = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="rgba(6, 182, 212, 0.15)"
              strokeWidth="1"
            />
          );
        })}

        {/* Main Skill Polygon */}
        <path
          d={polygonPath}
          fill="rgba(6, 182, 212, 0.2)"
          stroke="#06b6d4"
          strokeWidth="3"
          strokeLinejoin="round"
          className="transition-all duration-500 ease-out"
        />

        {/* Data Points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={hoveredIndex === i ? 6 : 4}
            fill={hoveredIndex === i ? "#06b6d4" : "#020617"}
            stroke="#06b6d4"
            strokeWidth="2"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="cursor-pointer transition-all duration-300"
          />
        ))}

        {/* Labels */}
        {points.map((p, i) => {
          const labelRadius = radius + 35;
          const lx = center + labelRadius * Math.cos(p.angle);
          const ly = center + labelRadius * Math.sin(p.angle);
          const anchor = Math.abs(lx - center) < 10 ? 'middle' : lx > center ? 'start' : 'end';

          return (
            <g key={i} className="pointer-events-none">
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                className={`text-[10px] font-black uppercase tracking-tighter fill-slate-500 transition-colors duration-300 ${hoveredIndex === i ? 'fill-cyan-400' : ''}`}
              >
                {p.skill.name.split(' ').map((word, idx) => (
                    <tspan key={idx} x={lx} dy={idx === 0 ? 0 : 12}>{word}</tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Interactive Tooltip / Detail Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`transition-all duration-300 transform ${hoveredIndex !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          {hoveredIndex !== null && (
            <div className="bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 p-4 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.2)] text-center min-w-[160px]">
              <div className="text-[8px] font-black text-cyan-500 uppercase tracking-widest mb-1">
                {skills[hoveredIndex].category}
              </div>
              <div className="text-sm font-black text-white mb-2">
                {skills[hoveredIndex].name}
              </div>
              <div className="text-2xl font-black text-cyan-400">
                {skills[hoveredIndex].level}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
