import styles from './NoteToolbar.module.css';

interface NoteToolbarProps {
  onSaveClick?(): void;
  onDeleteClick?(): void;
  onCloseClick?(): void;
}

function NoteToolbar(props: NoteToolbarProps) {
  const { onSaveClick, onDeleteClick, onCloseClick } = props;

  return (
    <div className={styles.toolbar}>
      {onSaveClick && (
        <button
          type='button'
          className={styles.transparentButton}
          onClick={onSaveClick}
        >
          Save
        </button>
      )}
      {onDeleteClick && (
        <button className={styles.transparentButton} onClick={onDeleteClick}>
          Delete
        </button>
      )}
      {onCloseClick && (
        <button
          type='button'
          className={styles.transparentButton}
          onClick={onCloseClick}
        >
          Close
        </button>
      )}
    </div>
  );
}

export default NoteToolbar;
