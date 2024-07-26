import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Note } from '../types';
import NoteViewCard from '../NoteViewCard';

function Archive() {
  const { notes, openModal } = useOutletContext<{ notes: Note[] }>();
  const archivedNotes = notes.filter((note) => note.isArchived);

  return (
    <div>
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
