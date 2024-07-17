import { useState } from 'react';
import styles from './Toast.module.css';

function Toast() {
  const [isVisible, setIsVisible] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastText}>Toast</div>
      <button
        aria-label='Close'
        className={styles.toastCloseButton}
        onClick={handleClose}
        title='Close'
      >
        <svg viewBox='0 0 18 18' className={styles.toastCloseSvg}>
          <path d='m14.53 4.53l-1.06-1.06-4.47 4.47-4.47-4.47-1.06 1.06 4.47 4.47-4.47 4.47 1.06 1.06 4.47-4.47 4.47 4.47 1.06-1.06-4.47-4.47z' />
        </svg>
      </button>
    </div>
  );
}

export default Toast;
