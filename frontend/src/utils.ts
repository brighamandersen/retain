import { SavedNote, UnsavedNote } from './types';

export function getNoteCardDynamicStyles(note?: UnsavedNote | SavedNote) {
  if (!note || !note?.color) return {};

  return {
    backgroundColor: note.color
  };
}
