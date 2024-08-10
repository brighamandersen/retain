import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Note, OutletContext } from './types';
import { BLANK_NOTE } from './constants';
import AutoResizingTextarea from './AutoResizingTextarea';
import NoteToolbar from './NoteToolbar';

function NoteCreateCard() {
  const { createNote, setToastMessage } = useOutletContext<OutletContext>();

  const [newNote, setNewNote] = useState<Note>(BLANK_NOTE);

  const formRef = React.useRef<HTMLFormElement>(null);
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  const canBeSaved = newNote.title || newNote.content;

  const handleSaveNewNote = () => {
    createNote(newNote);
    setToastMessage('Note created');
    setNewNote(BLANK_NOTE);
  };

  const handleBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    const isFocusStillWithinForm =
      !formRef.current || formRef.current.contains(event.relatedTarget as Node);
    if (isFocusStillWithinForm || !canBeSaved) {
      return;
    }

    handleSaveNewNote();
  };

  return (
    <form
      className='note-create-card-container'
      ref={formRef}
      onBlur={handleBlur}
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveNewNote();
        firstInputRef.current?.focus(); // Bring focus back to top of form
      }}
    >
      <input
        ref={firstInputRef}
        type='text'
        className='note-create-card-title'
        value={newNote.title}
        onChange={(e) =>
          setNewNote((prevNewNote) => ({
            ...prevNewNote,
            title: e.target.value
          }))
        }
        placeholder='Title'
      />
      <AutoResizingTextarea
        className='note-create-card-content'
        value={newNote.content}
        onChange={(e) =>
          setNewNote((prevNewNote) => ({
            ...prevNewNote,
            content: e.target.value
          }))
        }
        placeholder='Take a note...'
      />
      {canBeSaved && (
        <NoteToolbar
          isArchived={newNote.isArchived}
          isPinned={newNote.isPinned}
          onArchiveUnarchiveClick={() => {
            const isArchivedNow = !newNote.isArchived;
            createNote({ ...newNote, isArchived: isArchivedNow });
            setToastMessage(isArchivedNow ? 'Note archived' : 'Note created');
            setNewNote(BLANK_NOTE);
          }}
          onPinUnpinClick={() => {
            const isPinnedNow = !newNote.isPinned;
            createNote({
              ...newNote,
              isPinned: isPinnedNow,
              ...(isPinnedNow && { isArchived: false })
            });
            setToastMessage(isPinnedNow ? 'Note pinned' : 'Note unpinned');
            setNewNote(BLANK_NOTE);
          }}
        />
      )}
    </form>
  );
}

export default NoteCreateCard;
