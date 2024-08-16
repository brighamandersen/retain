interface Note {
  title?: string;
  content?: string;
  isArchived: boolean;
  isPinned: boolean;
  isTrashed: boolean;
}

export interface UnsavedNote extends Note {
  id?: string;
  createTimestamp?: number;
  updateTimestamp?: number;
}

export interface SavedNote extends Note {
  id: string;
  createTimestamp: number;
  updateTimestamp: number;
}

export interface OutletContext {
  createNote(noteToCreate: UnsavedNote): void;
  deleteAllTrashedNotes(): void;
  notes: Note[];
  openModal(noteId?: string): void;
  setToastMessage(message: string | null): void;
}
