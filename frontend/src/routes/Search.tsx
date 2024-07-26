import React from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Note } from '../types';
import NoteViewCard from '../NoteViewCard';

function Search() {
  const { notes, openModal } = useOutletContext<{ notes: Note[] }>();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const matchingNotes = notes.filter(
    (note) =>
      (note?.title ?? '').toLowerCase().includes(query.toLowerCase()) ||
      (note?.content ?? '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {matchingNotes.map((note) => (
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

export default Search;
