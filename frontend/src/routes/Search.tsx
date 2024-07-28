import { useOutletContext, useSearchParams } from 'react-router-dom';
import { OutletContext } from '../types';
import NoteViewCard from '../NoteViewCard';

function Search() {
  const { notes, openModal } = useOutletContext<OutletContext>();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const matchingNotes = notes.filter(
    (note) =>
      (note?.title ?? '').toLowerCase().includes(query.toLowerCase()) ||
      (note?.content ?? '').toLowerCase().includes(query.toLowerCase())
  );

  const matchingUnarchivedNotes = notes.filter((note) => !note.isArchived);
  const matchingArchivedNotes = notes.filter((note) => note.isArchived);

  if (query && matchingNotes.length === 0) {
    return <div className='no-matching-results-text'>No matching results.</div>;
  }

  return (
    <div>
      {matchingUnarchivedNotes.map((note) => (
        <NoteViewCard
          key={note.id}
          note={note}
          onClick={() => openModal(note.id)}
        />
      ))}
      <div className='note-list-header'>Archive</div>
      {matchingArchivedNotes.map((note) => (
        <NoteViewCard
          key={note.id}
          note={note}
          onClick={() => openModal(note.id)}
        />
      ))}
    </div>
  );
}

export default Search;
