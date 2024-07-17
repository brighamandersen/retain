import LoadingSpinner from './LoadingSpinner';

interface SyncStatusButtonProps {
  isSyncing: boolean;
  performSync: () => void;
}

function SyncStatusButton(props: SyncStatusButtonProps) {
  const { isSyncing, performSync } = props;

  return (
    <button
      aria-label='Refresh'
      disabled={isSyncing}
      onClick={performSync}
      style={{
        border: 'none',
        backgroundColor: 'transparent',
        borderRadius: '50%',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '48px',
        width: '48px'
      }}
      title='Refresh'
    >
      {isSyncing ? (
        <LoadingSpinner />
      ) : (
        <svg
          viewBox='0 0 24 24'
          style={{
            width: '24px',
            height: '24px',
            fill: 'rgb(95, 99, 104)'
          }}
        >
          <path d='M13 9v2h7V4h-2v2.74C16.53 5.07 14.4 4 12 4c-2.21 0-4.21.9-5.66 2.34S4 9.79 4 12c0 4.42 3.58 8 8 8 2.21 0 4.21-.9 5.66-2.34l-1.42-1.42A5.98 5.98 0 0 1 12 18c-3.31 0-6-2.69-6-6 0-1.65.67-3.15 1.76-4.24A5.98 5.98 0 0 1 12 6a6.01 6.01 0 0 1 5.19 3H13z' />
        </svg>
      )}
    </button>
  );
}

export default SyncStatusButton;
