interface NoteToolbarProps {
  onSaveClick?(): void;
  onDeleteClick?(): void;
  onCloseClick?(): void;
}

function NoteToolbar(props: NoteToolbarProps) {
  const { onSaveClick, onDeleteClick, onCloseClick } = props;

  return (
    <div className='note-toolbar'>
      {onSaveClick && (
        <button
          type='button'
          className='note-toolbar-button'
          onClick={onSaveClick}
        >
          Save
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
