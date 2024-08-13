export interface Note {
  id?: string; // Can be undefined for unsaved notes
  title?: string;
  content?: string;
  isArchived: boolean;
  isPinned: boolean;
  isTrashed: boolean;
  createTimestamp?: number; // Can be undefined for unsaved notes
  updateTimestamp?: number; // Can be undefined for unsaved notes
}

export interface OutletContext {
  createNote(noteToCreate: Note): void;
  deleteAllTrashedNotes(): void;
  notes: Note[];
  openModal(noteId?: string): void;
  setToastMessage(message: string | null): void;
}
