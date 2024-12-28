import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      state.notes.push(action.payload);
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    toggleLike: (state, action) => {
      const note = state.notes.find((note) => note.id === action.payload);
      if (note) {
        note.isLiked = !note.isLiked;
      }
    },
    editNote: (state, action) => {
      const { id, title, description } = action.payload;
      const noteIndex = state.notes.findIndex((note) => note.id === id);
      if (noteIndex !== -1) {
        state.notes[noteIndex] = { ...state.notes[noteIndex], title, description };
      }
    },
  },
});

export const { addNote, deleteNote, toggleLike, editNote } = notesSlice.actions;
export default notesSlice.reducer;
