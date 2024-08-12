import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../types';
import NoteViewCard from '../NoteViewCard';

function Trash() {
  const { notes, openModal } = useOutletContext<OutletContext>();

  const trashedNotes = notes.filter((note) => note.isTrashed);

  return (
    <div>
      {trashedNotes.length === 0 && (
        <div className='no-notes-empty-state-container'>
          <svg viewBox='0 0 24 24' className='no-notes-empty-state-svg'>
            <path d='M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z' />
            <path d='M9 8h2v9H9zm4 0h2v9h-2z' />
          </svg>
          <div className='no-notes-empty-state-text'>No notes in trash</div>
        </div>
      )}
      {trashedNotes.map((note) => (
        <NoteViewCard
          key={note.id}
          note={note}
          onClick={() => openModal(note.id)}
        />
      ))}
    </div>
  );
}

export default Trash;
