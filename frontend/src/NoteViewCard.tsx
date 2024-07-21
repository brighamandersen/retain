import { Note } from './types';

interface NoteViewCardProps {
  isOpen: boolean;
  note: Note;
  onClick(): void;
}

function NoteViewCard(props: NoteViewCardProps) {
  const { isOpen, note, onClick } = props;

  return (
    <div
      className='note-view-card'
      onClick={onClick}
      style={{
        opacity: isOpen ? 0 : 1,
        transition: 'opacity 0.3s ease-in-out'
      }}
    >
      <div className='note-view-card-title'>{note.title}</div>
      <div className='note-view-card-content'>{note.content}</div>
    </div>
  );
}

export default NoteViewCard;
