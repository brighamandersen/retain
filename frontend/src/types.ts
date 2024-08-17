interface Note {
  color?: string;
  content?: string;
  isArchived: boolean;
  isPinned: boolean;
  isTrashed: boolean;
  title?: string;
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
  notes: SavedNote[];
  openModal(noteId?: string): void;
  setToastMessage(message: string | null): void;
}
