import { ToolbarButton } from '../constants';

interface NoteToolbarProps {
  buttons: ToolbarButton[];
}

function NoteToolbar(props: NoteToolbarProps) {
  const { buttons } = props;

  return (
    <div className='note-toolbar'>
      {buttons.map((button) => (
        <button
          key={button.label}
          className='note-toolbar-button'
          onClick={button.onClick}
          title={button.label}
          type={button.type || 'button'}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}

export default NoteToolbar;
