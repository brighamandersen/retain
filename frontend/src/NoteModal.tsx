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
  setToastMessage: (message: string | null) => void;
  updateNote: (noteId: string, noteUpdates: Partial<Note>) => void;
}

function NoteModal(props: NoteModalProps) {
  const {
    closeModal,
    deleteNote,
    isOpen,
    originalNote,
    setToastMessage,
    updateNote
  } = props;

  const [noteDraft, setNoteDraft] = useState<Note>(originalNote);

  useEffect(() => {
    setNoteDraft(originalNote);
  }, [originalNote]);

  if (!isOpen || !originalNote || !noteDraft) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close the modal if the overlay is clicked, not the modal itself
    if (e.target === e.currentTarget) {
      updateNote(originalNote.id!, noteDraft);
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
        <div className='note-modal-edit-note-timestamp-tag-container'>
          {noteDraft?.updateTimestamp && (
            <div className='note-modal-edit-note-timestamp-tag'>
              {`Edited ${dayjs
                .unix(noteDraft?.updateTimestamp)
                .format('MMM D h:mm A')}`}
            </div>
          )}
        </div>
        <NoteToolbar
          isArchived={noteDraft.isArchived}
          isPinned={noteDraft.isPinned}
          onArchiveUnarchiveClick={() => {
            updateNote(originalNote.id!, {
              isArchived: !originalNote.isArchived
            });
            closeModal();
          }}
          onDeleteClick={() => {
            deleteNote(originalNote.id!);
            closeModal();
            setToastMessage('Note trashed');
          }}
          onPinUnpinClick={() => {
            setNoteDraft((prevNoteDraft: Note) => ({
              ...prevNoteDraft,
              isPinned: !prevNoteDraft.isPinned
            }));
          }}
        />
      </form>
    </div>
  );
}

export default NoteModal;
