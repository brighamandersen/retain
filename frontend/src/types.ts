export interface Note {
  id?: string; // Can be undefined for unsaved notes
  title?: string;
  content?: string;
  createTimestamp?: number; // Can be undefined for unsaved notes
  updateTimestamp?: number; // Can be undefined for unsaved notes
  isArchived: boolean;
}

export interface OutletContext {
  createNote(noteToCreate: Note): void;
  notes: Note[];
  openModal(noteId?: string): void;
}
