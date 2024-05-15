import React, { memo, MouseEventHandler } from 'react';
import './Controls.css';

interface ControlsProps {
  start: MouseEventHandler<HTMLButtonElement>;
  reset: MouseEventHandler<HTMLButtonElement>;
  pause: MouseEventHandler<HTMLButtonElement>;
  status: string | undefined;
}

const Controls: React.FC<ControlsProps> = ({ start, reset, pause, status }) => (
  <div className="Controls">
    {!status && (
      <button onClick={start} className="start">
        Start Timer
      </button>
    )}

    {status === 'Finished' && (
      <button onClick={start} className="start">
        Restart Timer
      </button>
    )}

    {(status === 'Paused' || status === 'Running') && (
      <div>
        <button onClick={reset} className="reset">
          Reset
        </button>
        <button
          onClick={pause}
          className={status === 'Paused' ? 'resume' : 'pause'}
        >
          {status === 'Paused' ? 'Resume' : 'Pause'}
        </button>
      </div>
    )}
  </div>
);

export default memo(Controls);
