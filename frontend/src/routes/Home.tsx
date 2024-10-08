import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../types';
import NoteCreateCard from '../components/NoteCreateCard';
import NoteViewList from '../components/NoteViewList';

function Home() {
  const { notes, openModal } = useOutletContext<OutletContext>();

  const unarchivedNotes = notes.filter(
    (note) => !note.isArchived && !note.isTrashed
  );
  const pinnedNotes = unarchivedNotes.filter(
    (note) => note.isPinned && !note.isTrashed
  );
  const unpinnedNotes = unarchivedNotes.filter(
    (note) => !note.isPinned && !note.isTrashed
  );

  return (
    <div>
      <NoteCreateCard />
      {unarchivedNotes.length === 0 && (
        <div className='no-notes-empty-state-container'>
          <svg viewBox='0 0 24 24' className='no-notes-empty-state-svg'>
            <path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z' />
          </svg>
          <div className='no-notes-empty-state-text'>
            Notes you add appear here
          </div>
        </div>
      )}
      {pinnedNotes.length > 0 && <div className='note-list-header'>Pinned</div>}
      <NoteViewList notes={pinnedNotes} openModal={openModal} />
      {unpinnedNotes.length > 0 && (
        <div className='note-list-header'>Others</div>
      )}
      <NoteViewList notes={unpinnedNotes} openModal={openModal} />
    </div>
  );
}

export default Home;
