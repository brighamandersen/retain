import { Note } from './types';

interface NoteViewListProps {
  notes: Note[];
  openModal: (noteId: string) => void;
}

function NoteViewList(props: NoteViewListProps) {
  const { notes, openModal } = props;

  return notes.map((note: Note) => (
    <div
      key={note.id}
      className='note-view-card'
      onClick={() => openModal(note.id!)}
    >
      <div className='note-view-card-title'>{note.title}</div>
      <div className='note-view-card-content'>{note.content}</div>
    </div>
  ));
}

export default NoteViewList;
