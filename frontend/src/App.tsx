import { Fragment, useEffect, useState } from 'react';
import { Note } from './types';
import NoteModal from './NoteModal';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL, BLANK_NOTE } from './constants';
import AutoResizingTextarea from './AutoResizingTextarea';
import Navbar from './Navbar';
import NoNotesEmptyState from './NoNotesEmptyState';
import NoteToolbar from './NoteToolbar';
import NoteViewCard from './NoteViewCard';
import Toast from './Toast';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>(BLANK_NOTE);
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);

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

  const archiveNote = async (noteId: string) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === noteId ? { ...note, isArchived: true } : note
      )
    );

    try {
      await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isArchived: true
        })
      });
      fetchNotes(); // Refetch to ensure consistency
    } catch (error) {
      console.error('Failed to archive note:', error);
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
              openModal
            }}
          />
          {/* {!searchText && (
            <div className='note-create-card-container'>
              <input
                type='text'
                className='note-create-card-title'
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
                className='note-create-card-content'
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
                    content: newNote.content,
                    isArchived: false
                  });
                  setNewNote(BLANK_NOTE);
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
          )} */}
        </div>
      </main>
      <NoteModal
        archiveNote={archiveNote}
        closeModal={closeModal}
        deleteNote={deleteNote}
        isOpen={isModalOpen}
        originalNote={noteOpen}
        saveNoteEdits={saveNoteEdits}
      />
      <Toast />
    </Fragment>
  );
}

export default App;
