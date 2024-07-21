import { useState } from 'react';

function Toast() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className='toast-container'>
      <div className='toast-text'>Toast</div>
      <button
        aria-label='Close'
        className='toast-close-button'
        onClick={handleClose}
        title='Close'
      >
        <svg viewBox='0 0 18 18' className='toast-close-svg'>
          <path d='m14.53 4.53l-1.06-1.06-4.47 4.47-4.47-4.47-1.06 1.06 4.47 4.47-4.47 4.47 1.06 1.06 4.47-4.47 4.47 4.47 1.06-1.06-4.47-4.47z' />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
