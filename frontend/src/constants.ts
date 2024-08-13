import { Note } from './types';

export const API_BASE_URL = 'http://localhost:3000';

export const BLANK_NOTE: Note = {
  title: '',
  content: '',
  isArchived: false,
  isPinned: false,
  isTrashed: false
};

export const FIVE_SECONDS_IN_MS = 5000;

export interface ToolbarButton {
  isVisible?: boolean;
  label: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}
