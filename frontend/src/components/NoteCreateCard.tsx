import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { OutletContext, UnsavedNote } from '../types';
import { BLANK_NOTE } from '../constants';
import AutoResizingTextarea from './AutoResizingTextarea';
import NoteToolbar from './NoteToolbar';
import { getNoteCardDynamicStyles } from '../utils';
import dayjs from 'dayjs';
import NoteColorPicker from './NoteColorPicker';

function NoteCreateCard() {
  const { createNote, setToastMessage } = useOutletContext<OutletContext>();

  const [newNote, setNewNote] = useState<UnsavedNote>(BLANK_NOTE);

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const canBeSaved = newNote.title || newNote.content;

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
      }}
      style={getNoteCardDynamicStyles(newNote)}
    >
      <input
        className='note-create-card-title'
        onChange={(e) =>
          setNewNote((prevNewNote) => ({
            ...prevNewNote,
            title: e.target.value
          }))
        }
        placeholder='Title'
        type='text'
        value={newNote.title}
      />
      <AutoResizingTextarea
        className='note-create-card-content'
        onChange={(e) =>
          setNewNote((prevNewNote) => ({
            ...prevNewNote,
            content: e.target.value
          }))
        }
        placeholder='Take a note...'
        value={newNote.content}
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
              label: 'Change color',
              onClick: () => {
                setIsColorPickerOpen(
                  (prevIsColorPickerOpen) => !prevIsColorPickerOpen
                );
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
      {isColorPickerOpen && canBeSaved && (
        <NoteColorPicker
          activeHexColor={newNote.color}
          onColorOptionClick={(hexColor: string) => {
            setNewNote((prevNewNote) => ({
              ...prevNewNote,
              color: hexColor,
              updateTimestamp: dayjs().unix()
            }));
          }}
        />
      )}
    </form>
  );
}

export default NoteCreateCard;
