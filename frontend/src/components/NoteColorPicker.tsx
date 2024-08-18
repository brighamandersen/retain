import React from 'react';
import { NOTE_COLOR_PALETTE } from '../constants';

interface NoteColorPickerProps {
  activeHexColor?: string;
  onColorOptionClick: (hexColor: string) => void;
  closeColorPicker: () => void;
}

function NoteColorPicker(props: NoteColorPickerProps) {
  const {
    activeHexColor = NOTE_COLOR_PALETTE.default,
    closeColorPicker,
    onColorOptionClick
  } = props;

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleBlur = (event: React.FocusEvent<HTMLFormElement>) => {
    const isFocusStillWithinForm =
      !formRef.current || formRef.current.contains(event.relatedTarget as Node);
    if (isFocusStillWithinForm) return;

    closeColorPicker();
  };

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
    <form className='note-color-picker' onBlur={handleBlur}>
      {Object.values(NOTE_COLOR_PALETTE).map((paletteColor) => (
        <div
          className={getColorOptionClassName(paletteColor)}
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
    </form>
  );
}

export default NoteColorPicker;
