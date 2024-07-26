import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Note } from '../types';
import NoteViewCard from '../NoteViewCard';

function Archive() {
  const { notes, openModal } = useOutletContext<{ notes: Note[] }>();
  const archivedNotes = notes.filter((note) => note.isArchived);

  return (
    <div>
      {archivedNotes.length === 0 && (
        <div className='no-notes-empty-state-container'>
          <svg viewBox='0 0 24 24' className='no-notes-empty-state-svg'>
            <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z' />
          </svg>
          <div className='no-notes-empty-state-text'>
            Your archived notes appear here
          </div>
        </div>
      )}
      {archivedNotes.map((note) => (
        <NoteViewCard
          key={note.id}
          note={note}
          isOpen={false}
          onClick={() => openModal(note.id)}
        />
      ))}
    </div>
  );
}

export default Archive;
