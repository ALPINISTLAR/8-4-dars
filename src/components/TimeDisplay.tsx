import React from 'react';
import { formatTime } from '../helpers';
import './TimeDisplay.css';

interface TimeDisplayProps {
  time: number;
  status: string | undefined;
  progress: number;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, status, progress }) => {
  document.title = `(${formatTime(time)}) Pomodoro`;

  const radius: number = 150;
  const stroke: number = 5;
  const normalizedRadius: number = radius - stroke * 2;
  const circumference: number = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset: number = circumference - (progress / 100) * circumference;

  return (
    <div className="TimeDisplay">
      <svg width="100%" viewBox={`0 0 ${radius * 2} ${radius * 2}`}>
        <circle
          stroke="#2563eb33"
          fill="rgb(37, 99, 235, 0.05)"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#2563eb"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div>
        <h1>{formatTime(time)}</h1>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default TimeDisplay;
