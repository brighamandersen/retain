import { Note } from './types';
import AutoResizingTextarea from './AutoResizingTextarea';
import dayjs from 'dayjs';
import NoteToolbar from './NoteToolbar';
import { useEffect, useState } from 'react';

interface NoteModalProps {
  closeModal: () => void;
  deleteNote(noteId: string): void;
  isOpen: boolean;
  originalNote: Note;
  updateNote: (noteId: string, noteUpdates: Partial<Note>) => void;
}

function NoteModal(props: NoteModalProps) {
  const { closeModal, deleteNote, isOpen, originalNote, updateNote } = props;

  const [noteDraft, setNoteDraft] = useState<Note>(originalNote);

  useEffect(() => {
    setNoteDraft(originalNote);
  }, [originalNote]);

  if (!isOpen || !originalNote) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close the modal if the overlay is clicked, not the modal itself
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className='note-modal-overlay' onClick={handleOverlayClick}>
      <form
        className='note-modal-card'
        onSubmit={(e) => {
          e.preventDefault();
          updateNote(originalNote.id!, noteDraft);
          closeModal();
        }}
      >
        <input
          type='text'
          className='note-modal-edit-note-title'
          value={noteDraft?.title}
          onChange={(e) => {
            setNoteDraft((prevNoteDraft: Note) => ({
              ...prevNoteDraft,
              title: e.target.value,
              updateTimestamp: dayjs().unix()
            }));
          }}
          placeholder='Title'
        />
        <AutoResizingTextarea
          className='note-modal-edit-note-content'
          value={noteDraft?.content}
          onChange={(e) => {
            setNoteDraft((prevNoteDraft: Note) => ({
              ...prevNoteDraft,
              content: e.target.value,
              updateTimestamp: dayjs().unix()
            }));
          }}
          placeholder='Note'
        />
        <div
          style={{
            padding: 5,
            paddingLeft: 10,
            paddingRight: 10,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          {noteDraft?.updateTimestamp && (
            <div
              style={{
                fontSize: 12,
                color: 'rgba(0, 0, 0, 0.8)',
                marginTop: 6,
                marginRight: 6
              }}
            >
              {`Edited ${dayjs
                .unix(noteDraft?.updateTimestamp)
                .format('MMM D h:mm A')}`}
            </div>
          )}
        </div>
        <NoteToolbar
          isArchived={originalNote.isArchived}
          onArchiveClick={() => {
            updateNote(originalNote.id!, { isArchived: true });
            closeModal();
          }}
          onCloseClick={closeModal}
          onDeleteClick={() => {
            deleteNote(originalNote.id!);
            closeModal();
          }}
          onUnarchiveClick={() => {
            updateNote(originalNote.id!, { isArchived: false });
            closeModal();
          }}
        />
      </form>
    </div>
  );
}

export default NoteModal;
