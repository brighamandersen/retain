interface NoteToolbarProps {
  onArchiveClick?(): void;
  onCloseClick?(): void;
  onDeleteClick?(): void;
  onSaveClick?(): void;
}

function NoteToolbar(props: NoteToolbarProps) {
  const { onArchiveClick, onCloseClick, onDeleteClick, onSaveClick } = props;

  return (
    <div className='note-toolbar'>
      {onSaveClick && (
        <button
          type='submit'
          className='note-toolbar-button'
          onClick={onSaveClick}
        >
          Save
        </button>
      )}
      {onArchiveClick && (
        <button className='note-toolbar-button' onClick={onArchiveClick}>
          Archive
        </button>
      )}
      {onDeleteClick && (
        <button className='note-toolbar-button' onClick={onDeleteClick}>
          Delete
        </button>
      )}
      {onCloseClick && (
        <button
          type='button'
          className='note-toolbar-button'
          onClick={onCloseClick}
        >
          Close
        </button>
      )}
    </div>
  );
}

export default NoteToolbar;
