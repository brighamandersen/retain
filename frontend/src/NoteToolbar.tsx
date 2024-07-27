interface NoteToolbarProps {
  isArchived?: boolean;
  onArchiveClick?(): void;
  onCloseClick?(): void;
  onDeleteClick?(): void;
  onUnarchiveClick?(): void;
}

function NoteToolbar(props: NoteToolbarProps) {
  const {
    isArchived,
    onArchiveClick,
    onCloseClick,
    onDeleteClick,
    onUnarchiveClick
  } = props;

  return (
    <div className='note-toolbar'>
      <button
        className='note-toolbar-button'
        title='Save'
        type='submit'
        // onClick not needed, handled by form submit
      >
        Save
      </button>
      {!isArchived && onArchiveClick && (
        <button
          className='note-toolbar-button'
          onClick={onArchiveClick}
          title='Archive'
        >
          Archive
        </button>
      )}
      {isArchived && onUnarchiveClick && (
        <button
          className='note-toolbar-button'
          onClick={onUnarchiveClick}
          title='Unarchive'
        >
          Unarchive
        </button>
      )}
      {onDeleteClick && (
        <button
          className='note-toolbar-button'
          onClick={onDeleteClick}
          title='Delete'
        >
          Delete
        </button>
      )}
      {onCloseClick && (
        <button
          className='note-toolbar-button'
          onClick={onCloseClick}
          title='Close'
        >
          Close
        </button>
      )}
    </div>
  );
}

export default NoteToolbar;
