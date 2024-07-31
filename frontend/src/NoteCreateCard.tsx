import React, { useState } from 'react';
import { Note, OutletContext } from './types';
import { BLANK_NOTE } from './constants';
import AutoResizingTextarea from './AutoResizingTextarea';
import NoteToolbar from './NoteToolbar';
import { useOutletContext } from 'react-router-dom';

function NoteCreateCard() {
  const { createNote, setToastMessage } = useOutletContext<OutletContext>();

  const [newNote, setNewNote] = useState<Note>(BLANK_NOTE);

  const formRef = React.useRef<HTMLFormElement>(null);
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (noteToCreate: Note) => {
    createNote(noteToCreate);
    setToastMessage('Note created');
    setNewNote(BLANK_NOTE);
  };

  const handleBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    if (
      formRef.current &&
      !formRef.current.contains(event.relatedTarget as Node)
    ) {
      if (newNote.title || newNote.content) {
        handleSubmit(newNote);
      }
    }
  };

  return (
    <form
      className='note-create-card-container'
      ref={formRef}
      onBlur={handleBlur}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(newNote);
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
      <NoteToolbar
        isArchived={newNote.isArchived}
        isPinned={newNote.isPinned}
        onArchiveUnarchiveClick={() =>
          handleSubmit({
            ...newNote,
            isArchived: !newNote.isArchived
          })
        }
        onPinUnpinClick={() =>
          setNewNote((prevNewNote) => ({
            ...prevNewNote,
            isPinned: !prevNewNote.isPinned
          }))
        }
      />
    </form>
  );
}

export default NoteCreateCard;
