import { NOTE_COLOR_PALETTE } from '../constants';

interface NoteColorPickerProps {
  activeHexColor?: string;
  onColorOptionClick: (hexColor: string) => void;
}

function NoteColorPicker(props: NoteColorPickerProps) {
  const { activeHexColor = NOTE_COLOR_PALETTE.default, onColorOptionClick } =
    props;

  function getColorOptionClassName(paletteColor: string) {
    let className = 'color-option';
    if (activeHexColor === paletteColor) {
      className += ' active';
    }
    if (paletteColor === NOTE_COLOR_PALETTE.default) {
      className += ' color-default';
    }
    return className;
  }

  return (
    <div className='note-color-picker-container'>
      <div className='note-color-picker'>
        {Object.values(NOTE_COLOR_PALETTE).map((paletteColor) => (
          <div
            className={getColorOptionClassName(paletteColor)}
            key={paletteColor}
            style={{ backgroundColor: paletteColor }}
            onClick={() => onColorOptionClick(paletteColor)}
          >
            {activeHexColor === paletteColor && (
              <svg
                viewBox='0 0 24 24'
                focusable='false'
                className='color-option-active-check-icon'
              >
                <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z'></path>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteColorPicker;
