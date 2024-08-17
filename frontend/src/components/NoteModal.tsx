import { SavedNote, UnsavedNote } from '../types';
import AutoResizingTextarea from './AutoResizingTextarea';
import dayjs from 'dayjs';
import { useState } from 'react';
import NoteToolbar, { ToolbarButton } from './NoteToolbar';
import {
  generateRandomLightHexColor,
  getNoteCardDynamicStyles
} from '../utils';

interface NoteModalProps {
  closeModal: () => void;
  originalNote: SavedNote;
  deleteNoteForever: (noteId: string) => void;
  setToastMessage: (message: string | null) => void;
  updateNote: (noteId: string, noteUpdates: UnsavedNote) => void;
}

function NoteModal(props: NoteModalProps) {
  const {
    closeModal,
    originalNote,
    deleteNoteForever,
    setToastMessage,
    updateNote
  } = props;

  const [noteDraft, setNoteDraft] = useState<UnsavedNote>(originalNote);

  const handleSaveChanges = () => {
    updateNote(originalNote.id, noteDraft);
    closeModal();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const wasOverlayClicked = e.target === e.currentTarget;
    if (!wasOverlayClicked) return;

    handleSaveChanges();
  };

  const toolbarButtons: ToolbarButton[] = [];
  if (!noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Save',
      // onClick not needed, handled by form submit
      type: 'submit'
    });
  }
  if (!noteDraft.isPinned && !noteDraft.isArchived && !noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Pin',
      onClick: () => {
        updateNote(originalNote.id, {
          ...noteDraft,
          isPinned: true
        });
        setToastMessage('Note pinned');
        closeModal();
      }
    });
  }
  if (noteDraft.isPinned && !noteDraft.isArchived && !noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Unpin',
      onClick: () => {
        updateNote(originalNote.id, {
          ...noteDraft,
          isPinned: false
        });
        setToastMessage('Note unpinned');
        closeModal();
      }
    });
  }
  if (!noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Colorize',
      onClick: () => {
        setNoteDraft((prevNoteDraft) => ({
          ...prevNoteDraft,
          color: generateRandomLightHexColor(),
          updateTimestamp: dayjs().unix()
        }));
      }
    });
  }
  if (!noteDraft.isArchived && !noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Archive',
      onClick: () => {
        updateNote(originalNote.id, {
          ...noteDraft,
          isArchived: true
        });
        setToastMessage('Note archived');
        closeModal();
      }
    });
  }
  if (noteDraft.isArchived && !noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Unarchive',
      onClick: () => {
        updateNote(originalNote.id, {
          ...noteDraft,
          isArchived: false
        });
        setToastMessage('Note unarchived');
        closeModal();
      }
    });
  }
  if (!noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Delete',
      onClick: () => {
        updateNote(originalNote.id, {
          ...noteDraft,
          isTrashed: true
        });
        setToastMessage('Note trashed');
        closeModal();
      }
    });
  }
  if (noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Restore',
      onClick: () => {
        updateNote(originalNote.id, {
          ...noteDraft,
          isTrashed: false
        });
        setToastMessage('Note restored');
        closeModal();
      }
    });
  }
  if (noteDraft.isTrashed) {
    toolbarButtons.push({
      label: 'Delete forever',
      onClick: () => {
        deleteNoteForever(originalNote.id);
        setToastMessage('Note deleted forever');
        closeModal();
      }
    });
  }

  return (
    <div className='note-modal-overlay' onClick={handleOverlayClick}>
      <form
        className='note-modal-card'
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveChanges();
        }}
        style={getNoteCardDynamicStyles(noteDraft)}
      >
        <input
          type='text'
          className='note-modal-edit-note-title'
          disabled={noteDraft.isTrashed}
          value={noteDraft?.title}
          onChange={(e) => {
            setNoteDraft((prevNoteDraft) => ({
              ...prevNoteDraft,
              title: e.target.value,
              updateTimestamp: dayjs().unix()
            }));
          }}
          placeholder='Title'
        />
        <AutoResizingTextarea
          className='note-modal-edit-note-content'
          disabled={noteDraft.isTrashed}
          value={noteDraft?.content}
          onChange={(e) => {
            setNoteDraft((prevNoteDraft) => ({
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
        <NoteToolbar buttons={toolbarButtons} />
      </form>
    </div>
  );
}

export default NoteModal;
