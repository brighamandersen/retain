import { useEffect } from 'react';
import { FIVE_SECONDS_IN_MS } from '../constants';

interface ToastProps {
  toastMessage: string | null;
  setToastMessage: (toastMessage: string | null) => void;
}

function Toast(props: ToastProps) {
  const { toastMessage, setToastMessage } = props;

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, FIVE_SECONDS_IN_MS);

      return () => clearTimeout(timer);
    }
  }, [toastMessage, setToastMessage]);

  return (
    <div className={`toast-container ${!toastMessage ? 'invisible' : ''}`}>
      <div className='toast-text'>{toastMessage}</div>
      <button
        aria-label='Close'
        className='toast-close-button'
        onClick={() => setToastMessage(null)}
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
