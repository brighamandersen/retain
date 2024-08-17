import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContext, UnsavedNote } from '../types';
import { BLANK_NOTE } from '../constants';
import AutoResizingTextarea from './AutoResizingTextarea';
import NoteToolbar from './NoteToolbar';
import { getNoteCardDynamicStyles } from '../utils';

function NoteCreateCard() {
  const { createNote, setToastMessage } = useOutletContext<OutletContext>();

  const [newNote, setNewNote] = useState<UnsavedNote>(BLANK_NOTE);

  const formRef = React.useRef<HTMLFormElement>(null);
  const firstInputRef = React.useRef<HTMLInputElement>(null);

  const canBeSaved = newNote.title || newNote.content;

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  const handleSaveNewNote = () => {
    createNote(newNote);
    setToastMessage('Note created');
    setNewNote(BLANK_NOTE);
  };

  const handleBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    const isFocusStillWithinForm =
      !formRef.current || formRef.current.contains(event.relatedTarget as Node);
    if (isFocusStillWithinForm || !canBeSaved) return;

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
      style={getNoteCardDynamicStyles(newNote)}
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
          buttons={[
            {
              label: 'Save',
              // onClick not needed, handled by form submit
              type: 'submit'
            },
            {
              label: 'Pin',
              onClick: () => {
                createNote({
                  ...newNote,
                  isPinned: !newNote.isPinned
                });
                setToastMessage('Note pinned');
                setNewNote(BLANK_NOTE);
              }
            },
            {
              label: 'Colorize',
              onClick: () => {
                const hexNumber = Math.floor(Math.random() * 0xffffff)
                  .toString(16)
                  .padStart(6, '0');
                const hex = `#${hexNumber}`;

                setNewNote((prevNewNote) => ({
                  ...prevNewNote,
                  color: hex
                }));
              }
            },
            {
              label: 'Archive',
              onClick: () => {
                createNote({
                  ...newNote,
                  isArchived: !newNote.isArchived
                });
                setToastMessage('Note archived');
                setNewNote(BLANK_NOTE);
              }
            }
          ]}
        />
      )}
    </form>
  );
}

export default NoteCreateCard;
