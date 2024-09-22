import { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import NoteModal from './components/NoteModal';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from './constants';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Sidebar from './components/Sidebar';
import { Outlet, useSearchParams } from 'react-router-dom';
import { SavedNote, UnsavedNote } from './types';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const createNote = async (noteToCreate: UnsavedNote) => {
    // Temporary, will be replaced with refetch
    const tempFields = {
      id: uuidv4(),
      createTimestamp: dayjs().unix(),
      updateTimestamp: dayjs().unix()
    };
    setNotes([
      {
        ...noteToCreate,
        ...tempFields
      },
      ...notes
    ]); // Optimistic update

    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...noteToCreate
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to create note:', response);
        return;
      }

      fetchNotes(); // Refetch to ensure consistency
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const fetchNotes = async () => {
    try {
      setIsFetchingNotes(true);

      const response = await fetch(`${API_BASE_URL}/notes`, {
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to fetch notes:', response);
        return;
      }

      const { data } = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Network error:', error);
    } finally {
      setIsFetchingNotes(false);
    }
  };

  const updateNote = async (noteId: string, noteUpdates: UnsavedNote) => {
    // Local optimistic update
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, ...noteUpdates } : note
      )
    );

    try {
      const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...noteUpdates
        }),
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to update note:', response);
        return;
      }

      fetchNotes(); // Refetch to ensure consistency
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const deleteNoteForever = async (noteId: string) => {
    // Local optimistic update
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

    try {
      const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to delete note:', response);
        return;
      }

      fetchNotes(); // Refetch to ensure consistency
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const deleteAllTrashedNotes = async () => {
    // Local optimistic update
    setNotes((prevNotes) => prevNotes.filter((note) => !note.isTrashed));

    try {
      const response = await fetch(`${API_BASE_URL}/notes/trashed`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        console.error('Failed to delete trashed notes:', response);
        return;
      }

      fetchNotes(); // Refetch to ensure consistency
      setToastMessage('Trash emptied');
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  // Modal
  const openNoteId = searchParams.get('noteId');
  const noteOpen = notes.find((note) => note.id === openNoteId);
  const isModalOpen = Boolean(noteOpen?.id);
  const openModal = (noteId: string) => {
    setSearchParams({ noteId });
  };
  const closeModal = () => {
    setSearchParams({});
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Fragment>
      <Navbar />
      <main>
        <Sidebar />
        <div className='main-content'>
          <Outlet
            context={{
              createNote,
              deleteAllTrashedNotes,
              notes,
              openModal,
              setToastMessage
            }}
          />
        </div>
      </main>
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          originalNote={noteOpen as SavedNote}
          deleteNoteForever={deleteNoteForever}
          setToastMessage={setToastMessage}
          updateNote={updateNote}
        />
      )}
      <Toast toastMessage={toastMessage} setToastMessage={setToastMessage} />
    </Fragment>
  );
}

export default App;
