export interface Note {
  id?: string; // Can be undefined for unsaved notes
  title?: string;
  content?: string;
  createTimestamp?: number; // Can be undefined for unsaved notes
  updateTimestamp?: number; // Can be undefined for unsaved notes
}
