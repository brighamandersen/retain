import React, { useState } from 'react';
import { Note } from './types';
import { BLANK_NOTE } from './constants';
import AutoResizingTextarea from './AutoResizingTextarea';
import NoteToolbar from './NoteToolbar';
import { useOutletContext } from 'react-router-dom';

function NoteCreateCard() {
  const { createNote } = useOutletContext();

  const [newNote, setNewNote] = useState<Note>(BLANK_NOTE);

  const createNoteFormRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    createNote({
      title: newNote.title,
      content: newNote.content,
      isArchived: false
    });
    setNewNote(BLANK_NOTE);
  };

  const handleBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    if (
      createNoteFormRef.current &&
      !createNoteFormRef.current.contains(event.relatedTarget as Node)
    ) {
      if (newNote.title || newNote.content) {
        handleSubmit();
      }
    }
  };

  return (
    <form
      className='note-create-card-container'
      ref={createNoteFormRef}
      onBlur={handleBlur}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
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
      <NoteToolbar />
    </form>
  );
}

export default NoteCreateCard;
