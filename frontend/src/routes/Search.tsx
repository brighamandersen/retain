import { useOutletContext, useSearchParams } from 'react-router-dom';
import { OutletContext } from '../types';
import NoteViewList from '../NoteViewList';

function Search() {
  const { notes, openModal } = useOutletContext<OutletContext>();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const matchingNotes = notes.filter(
    (note) =>
      (note?.title ?? '').toLowerCase().includes(query.toLowerCase()) ||
      (note?.content ?? '').toLowerCase().includes(query.toLowerCase())
  );

  const matchingUnarchivedNotes = matchingNotes.filter(
    (note) => !note.isArchived && !note.isTrashed
  );
  const matchingArchivedNotes = matchingNotes.filter(
    (note) => note.isArchived && !note.isTrashed
  );

  if (query && matchingNotes.length === 0) {
    return <div className='no-matching-results-text'>No matching results.</div>;
  }

  return (
    <div>
      <NoteViewList notes={matchingUnarchivedNotes} openModal={openModal} />
      {matchingArchivedNotes?.length > 0 && (
        <div className='note-list-header'>Archive</div>
      )}
      <NoteViewList notes={matchingArchivedNotes} openModal={openModal} />
    </div>
  );
}

export default Search;
