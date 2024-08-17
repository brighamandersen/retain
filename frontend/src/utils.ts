import { SavedNote, UnsavedNote } from './types';

export function generateRandomLightHexColor() {
  const upperBound = 255;
  const lowerBound = 170;
  const rangeSize = upperBound - lowerBound + 1; // Plus 1 to include upper bound

  // Generate random values for red, green, and blue between lowerBound and upperBound
  const r = Math.floor(Math.random() * rangeSize + lowerBound)
    .toString(16)
    .padStart(2, '0');
  const g = Math.floor(Math.random() * rangeSize + lowerBound)
    .toString(16)
    .padStart(2, '0');
  const b = Math.floor(Math.random() * rangeSize + lowerBound)
    .toString(16)
    .padStart(2, '0');

  return `#${r}${g}${b}`;
}

export function getNoteCardDynamicStyles(note?: UnsavedNote | SavedNote) {
  if (!note || !note?.color) return {};

  return {
    backgroundColor: note.color,
    border: `1px solid ${note.color}`
  };
}
