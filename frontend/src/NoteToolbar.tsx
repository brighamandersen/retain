interface NoteToolbarProps {
  isArchived: boolean;
  isPinned: boolean;
  onArchiveUnarchiveClick?(): void;
  onDeleteClick?(): void;
  onPinUnpinClick?(): void;
}

function NoteToolbar(props: NoteToolbarProps) {
  const {
    isArchived,
    isPinned,
    onArchiveUnarchiveClick,
    onDeleteClick,
    onPinUnpinClick
  } = props;

  return (
    <div className='note-toolbar'>
      <button
        className='note-toolbar-button'
        onClick={onArchiveUnarchiveClick}
        title={isArchived ? 'Unarchive' : 'Archive'}
        type='button'
      >
        {isArchived ? 'Unarchive' : 'Archive'}
      </button>
      <button
        className='note-toolbar-button'
        onClick={onPinUnpinClick}
        title={isPinned ? 'Unpin' : 'Pin'}
        type='button'
      >
        {isPinned ? 'Unpin' : 'Pin'}
      </button>
      {onDeleteClick && (
        <button
          className='note-toolbar-button'
          onClick={onDeleteClick}
          title='Delete'
          type='button'
        >
          Delete
        </button>
      )}
      <button
        className='note-toolbar-button'
        // onClick not needed, handled by form submit
        title='Save & Close'
        type='submit'
      >
        Save & Close
      </button>
    </div>
  );
}

export default NoteToolbar;
