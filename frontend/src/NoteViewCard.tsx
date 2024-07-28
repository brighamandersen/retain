import { Note } from './types';

interface NoteViewCardProps {
  note: Note;
  onClick(): void;
}

function NoteViewCard(props: NoteViewCardProps) {
  const { note, onClick } = props;

  return (
    <div className='note-view-card' onClick={onClick}>
      <div className='note-view-card-title'>{note.title}</div>
      <div className='note-view-card-content'>{note.content}</div>
    </div>
  );
}

export default NoteViewCard;
