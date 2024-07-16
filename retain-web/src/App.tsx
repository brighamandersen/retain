import { Fragment, useEffect, useState } from 'react';
import styles from './App.module.css';
import { Note } from './types';
import Navbar from './Navbar';
import NoteModal from './NoteModal';
import { v4 as uuidv4 } from 'uuid';
import { API_BASE_URL } from './constants';
import AutoResizingTextarea from './AutoResizingTextarea';
import NoteToolbar from './NoteToolbar';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<Note>({ title: '', content: '' });
  const [isFetchingNotes, setIsFetchingNotes] = useState(false);
  const [searchText, setSearchText] = useState('');

  // // Optimistically update locally
  // function createNoteLocal(noteDraft: Note) {
  //   if (!noteDraft.id) {
  //     // Inserting a temp id if it doesn't exist, which will be overwritten on refetch
  //     noteDraft.id = uuidv4();
  //   }

  //   setNotes([...notes, { ...noteDraft }]);
  // }

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
      (note.title ?? '').toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase())
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
        {!searchText && <div className={styles.sectionHeader}>Others</div>}
        {filteredNotes.length === 0 ? (
          <div className={styles.noNotesMessage}>No matching results.</div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              className={styles.noteViewCard}
              onClick={() => setNoteOpenId(note.id)}
              style={{
                opacity: note.id === noteOpenId ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }}
            >
              <div className={styles.noteViewCardTitle}>{note.title}</div>
              <div className={styles.noteViewCardContent}>{note.content}</div>
            </div>
          ))
        )}
      </main>
      <NoteModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        deleteNote={deleteNote}
        originalNote={noteOpen}
        saveNoteEdits={saveNoteEdits}
      />
    </Fragment>
  );
}

export default App;
