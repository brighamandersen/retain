import { UnsavedNote } from './types';

export const API_BASE_URL = 'http://localhost:3000';

export const BLANK_NOTE: UnsavedNote = {
  title: '',
  content: '',
  isArchived: false,
  isPinned: false,
  isTrashed: false
};

export const FIVE_SECONDS_IN_MS = 5000;
