import React from 'react';
import { useOutletContext } from 'react-router-dom';
import NoteViewCard from '../NoteViewCard';
import { Note } from '../types';
import NoteCreateCard from '../NoteCreateCard';

function Home() {
  const { notes, openModal } = useOutletContext<{ notes: Note[] }>();

  return (
    <div>
      <NoteCreateCard />
      {notes.map((note) => (
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

export default Home;
