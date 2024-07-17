import styles from './Toast.module.css';

function Toast() {
  return (
    <div className={styles.toastContainer}>
      <div className={styles.toastText}>Toast</div>
      <svg
        aria-label='Close'
        viewBox='0 0 18 18'
        className={styles.toastCloseSvgButton}
        role='button'
      >
        <path d='m14.53 4.53l-1.06-1.06-4.47 4.47-4.47-4.47-1.06 1.06 4.47 4.47-4.47 4.47 1.06 1.06 4.47-4.47 4.47 4.47 1.06-1.06-4.47-4.47z' />
      </svg>
    </div>
  );
}

export default Toast;
