import { Fragment, useEffect, useState } from 'react';
import styles from './App.module.css';
import { Note } from './types';
import NoteModal from './NoteModal';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from './constants';
import { Link, Outlet } from 'react-router-dom';
import AutoResizingTextarea from './components/AutoResizingTextarea';
import Navbar from './components/Navbar';
import NoNotesEmptyState from './components/NoNotesEmptyState';
import NoteToolbar from './components/NoteToolbar';
import NoteViewCard from './components/NoteViewCard';
import Toast from './components/Toast';

function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>({ title: '', content: '' });
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [searchText, setSearchText] = useState('');

  // Create note
  const createNote = async (noteToCreate: Note) => {
    const tempId = uuidv4(); // Will be replaced with refetch
    setNotes([
      ...notes,
      { id: tempId, title: noteToCreate.title, content: noteToCreate.content }
    ]); // Optimistic update

    try {
      await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: noteToCreate.title,
          content: noteToCreate.content
        })
      });
      fetchNotes(); // Refetch to ensure consistency
    } catch (error) {
      console.error(error);
    }
  };

  // Get notes
  const fetchNotes = async () => {
    try {
      setIsFetchingNotes(true);

      const response = await fetch(`${API_BASE_URL}/notes`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingNotes(false);
    }
  };

  const saveNoteEdits = async (noteDraft: Note) => {
    // Local optimistic update
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteDraft.id ? { ...note, ...noteDraft } : note
      )
    );

    await fetch(`${API_BASE_URL}/notes/${noteDraft.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: noteDraft.title,
        content: noteDraft.content
      })
    });
    fetchNotes(); // Refetch to ensure consistency
  };

  const deleteNote = async (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId)); // Optimistic update

    try {
      await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'DELETE'
      });
      fetchNotes(); // Refetch to ensure consistency
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  // Modal
  const [noteOpenId, setNoteOpenId] = useState<string | null>();
  const noteOpen = notes.find((note) => note.id === noteOpenId) as Note;
  const isModalOpen = Boolean(noteOpenId);
  const closeModal = () => setNoteOpenId(null);

  // Filtering
  const filteredNotes = notes.filter(
    (note) =>
      (note?.title ?? '').toLowerCase().includes(searchText.toLowerCase()) ||
      (note?.content ?? '').toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Fragment>
      <Navbar
        isFetchingNotes={isFetchingNotes}
        fetchNotes={fetchNotes}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <main>
        <aside className='sidebar-container'>
          <div className='sidebar'>
            <Link
              to='/'
              aria-label='Notes'
              className='sidebar-svg'
              title='Notes'
            >
              <svg className='sidebar-svg' viewBox='0 0 24 24'>
                <path d='M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z'></path>
              </svg>
            </Link>
            <Link
              to='/archive'
              aria-label='Archive'
              className='sidebar-svg'
              title='Archive'
            >
              <svg className='sidebar-svg' viewBox='0 0 24 24'>
                <path d='M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z'></path>
              </svg>
            </Link>
          </div>
        </aside>
        <div className='main-content'>
          <Outlet />
          {!searchText && (
            <div className={styles.noteCreateCard}>
              <input
                type='text'
                className={styles.noteCreateCardTitle}
                value={newNote.title}
                onChange={(e) =>
                  setNewNote((prevNewNote) => ({
                    ...prevNewNote,
                    title: e.target.value
                  }))
                }
                placeholder='Title'
              />
              <AutoResizingTextarea
                className={styles.noteCreateCardContent}
                value={newNote.content}
                onChange={(e) =>
                  setNewNote((prevNewNote) => ({
                    ...prevNewNote,
                    content: e.target.value
                  }))
                }
                placeholder='Take a note...'
              />
              <NoteToolbar
                onSaveClick={() => {
                  createNote({
                    title: newNote.title,
                    content: newNote.content
                  });
                  setNewNote({ title: '', content: '' });
                }}
              />
            </div>
          )}
          {searchText && filteredNotes.length === 0 ? (
            <div className='no-matching-results-text'>No matching results.</div>
          ) : notes.length === 0 ? (
            <NoNotesEmptyState />
          ) : (
            filteredNotes.map((note) => (
              <NoteViewCard
                key={note.id}
                isOpen={note.id === noteOpenId}
                note={note}
                onClick={() => setNoteOpenId(note.id)}
              />
            ))
          )}
        </div>
      </main>
      <NoteModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        deleteNote={deleteNote}
        originalNote={noteOpen}
        saveNoteEdits={saveNoteEdits}
      />
      <Toast />
    </Fragment>
  );
}

export default Home;
