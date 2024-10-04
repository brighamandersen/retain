import { UnsavedNote } from './types';

// export const API_BASE_URL = 'https://retain-api.brighamandersen.com';
export const API_BASE_URL = 'http://localhost:3001'; // Use this instead if testing local backend endpoints

export const BLANK_NOTE: UnsavedNote = {
  title: '',
  content: '',
  isArchived: false,
  isPinned: false,
  isTrashed: false
};

export const FIVE_SECONDS_IN_MS = 5000;

export const NOTE_COLOR_PALETTE = {
  default: '#ffffff',
  coral: '#faafa8',
  peach: '#f39f76',
  sand: '#fff8b8',
  mint: '#e2f6d3',
  sage: '#b4ddd3',
  fog: '#d4e4ed',
  storm: '#aeccdc',
  dusk: '#d3bfdb',
  blossom: '#f6e2dd',
  clay: '#e9e3d4',
  chalk: '#efeff1'
};
