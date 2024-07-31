import { Fragment, useEffect, useState } from 'react';
import { Note } from './types';
import NoteModal from './NoteModal';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from './constants';
import Navbar from './Navbar';
import Toast from './Toast';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Create note
  const createNote = async (noteToCreate: Note) => {
    const tempId = uuidv4(); // Will be replaced with refetch
    setNotes([...notes, { id: tempId, ...noteToCreate }]); // Optimistic update

    try {
      await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: noteToCreate.title,
          content: noteToCreate.content,
          isArchived: noteToCreate.isArchived,
          isPinned: noteToCreate.isPinned
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

  const updateNote = async (noteId: string, noteUpdates: Partial<Note>) => {
    // Local optimistic update
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, ...noteUpdates } : note
      )
    );

    await fetch(`${API_BASE_URL}/notes/${noteId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...noteUpdates
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
  const openModal = (noteId: string) => setNoteOpenId(noteId);
  const closeModal = () => setNoteOpenId(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Fragment>
      <Navbar isFetchingNotes={isFetchingNotes} fetchNotes={fetchNotes} />
      <main>
        <Sidebar />
        <div className='main-content'>
          <Outlet
            context={{
              createNote,
              notes,
              openModal,
              setToastMessage
            }}
          />
        </div>
      </main>
      <NoteModal
        closeModal={closeModal}
        deleteNote={deleteNote}
        isOpen={isModalOpen}
        originalNote={noteOpen}
        updateNote={updateNote}
      />
      <Toast toastMessage={toastMessage} setToastMessage={setToastMessage} />
    </Fragment>
  );
}

export default App;
