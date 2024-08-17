import { SavedNote } from '../types';
import { getNoteCardDynamicStyles } from '../utils';

interface NoteViewListProps {
  notes: SavedNote[];
  openModal: (noteId: string) => void;
}

function NoteViewList(props: NoteViewListProps) {
  const { notes, openModal } = props;

  return notes.map((note) => (
    <div
      key={note.id}
      className='note-view-card'
      onClick={() => openModal(note.id!)}
      style={getNoteCardDynamicStyles(note)}
    >
      <div className='note-view-card-title'>{note.title}</div>
      <div className='note-view-card-content'>{note.content}</div>
    </div>
  ));
}

export default NoteViewList;
