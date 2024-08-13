import { Note } from './types';
import AutoResizingTextarea from './AutoResizingTextarea';
import dayjs from 'dayjs';
import NoteToolbar from './NoteToolbar';
import { useEffect, useState } from 'react';
import { ToolbarButton } from './constants';

interface NoteModalProps {
  closeModal: () => void;
  isOpen: boolean;
  originalNote: Note;
  deleteNoteForever: (noteId: string) => void;
  setToastMessage: (message: string | null) => void;
  updateNote: (noteId: string, noteUpdates: Partial<Note>) => void;
}

function NoteModal(props: NoteModalProps) {
  const {
    closeModal,
    isOpen,
    originalNote,
    deleteNoteForever,
    setToastMessage,
    updateNote
  } = props;

  const [noteDraft, setNoteDraft] = useState<Note>(originalNote);

  useEffect(() => {
    setNoteDraft(originalNote);
  }, [originalNote]);

  if (!isOpen || !originalNote || !noteDraft) return null;

  const handleSaveChanges = () => {
    updateNote(originalNote.id!, noteDraft);
    closeModal();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close the modal if the overlay is clicked, not the modal itself
    if (e.target === e.currentTarget) {
      handleSaveChanges();
    }
  };

  const toolbarButtons: ToolbarButton[] = [
    {
      isVisible: !noteDraft.isTrashed,
      label: 'Save',
      // onClick not needed, handled by form submit
      type: 'submit'
    },
    {
      isVisible:
        !noteDraft.isPinned && !noteDraft.isArchived && !noteDraft.isTrashed,
      label: 'Pin',
      onClick: () => {
        updateNote(originalNote.id!, {
          ...noteDraft,
          isPinned: true
        });
        setToastMessage('Note pinned');
        closeModal();
      }
    },
    {
      isVisible:
        noteDraft.isPinned && !noteDraft.isArchived && !noteDraft.isTrashed,
      label: 'Unpin',
      onClick: () => {
        updateNote(originalNote.id!, {
          ...noteDraft,
          isPinned: false
        });
        setToastMessage('Note unpinned');
        closeModal();
      }
    },
    {
      isVisible: !noteDraft.isArchived && !noteDraft.isTrashed,
      label: 'Archive',
      onClick: () => {
        updateNote(originalNote.id!, {
          ...noteDraft,
          isArchived: true
        });
        setToastMessage('Note archived');
        closeModal();
      }
    },
    {
      isVisible: noteDraft.isArchived && !noteDraft.isTrashed,
      label: 'Unarchive',
      onClick: () => {
        updateNote(originalNote.id!, {
          ...noteDraft,
          isArchived: false
        });
        setToastMessage('Note unarchived');
        closeModal();
      }
    },
    {
      isVisible: !noteDraft.isTrashed,
      label: 'Delete',
      onClick: () => {
        updateNote(originalNote.id!, {
          ...noteDraft,
          isTrashed: true
        });
        setToastMessage('Note trashed');
        closeModal();
      }
    },
    {
      isVisible: noteDraft.isTrashed,
      label: 'Restore',
      onClick: () => {
        updateNote(originalNote.id!, {
          ...noteDraft,
          isTrashed: false
        });
        setToastMessage('Note restored');
        closeModal();
      }
    },
    {
      isVisible: noteDraft.isTrashed,
      label: 'Delete forever',
      onClick: () => {
        deleteNoteForever(originalNote.id!);
        setToastMessage('Note deleted forever');
        closeModal();
      }
    }
  ];
  const visibleToolbarButtons = toolbarButtons.filter(
    (button) => button.isVisible
  );

  return (
    <div className='note-modal-overlay' onClick={handleOverlayClick}>
      <form
        className='note-modal-card'
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveChanges();
        }}
      >
        <input
          type='text'
          className='note-modal-edit-note-title'
          disabled={noteDraft.isTrashed}
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
          disabled={noteDraft.isTrashed}
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
        <div className='note-toolbar'>
          {visibleToolbarButtons.map((button) => (
            <button
              key={button.label}
              className='note-toolbar-button'
              onClick={button.onClick}
              title={button.label}
              type={button.type || 'button'}
            >
              {button.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}

export default NoteModal;
