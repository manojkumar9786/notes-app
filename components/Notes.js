import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, toggleLike, editNote } from '../store/slices/notesSlice';
import Modal from './Modal';

export default function Notes() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const [isModalOpen, setModalOpen] = useState(false);
  const [note, setNote] = useState({ id: null, title: '', description: '' });
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: note.title,
      description: note.description,
      isLiked: false,
    };
    dispatch(addNote(newNote));
    setModalOpen(false);
    setNote({ title: '', description: '' });
  };

  const handleEditNote = () => {
    dispatch(editNote(note));
    setModalOpen(false);
    setNote({ title: '', description: '' });
    setIsEditMode(false);
  };

  const handleOpenEditModal = (note) => {
    setNote(note);
    setIsEditMode(true);
    setModalOpen(true);
  };

  return (
    <div className="min-h-full bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p>{note.description}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => dispatch(toggleLike(note.id))}
                  className={`text-sm ${
                    note.isLiked ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  {note.isLiked ? 'Unlike' : 'Like'}
                </button>
                <button
                  onClick={() => dispatch(deleteNote(note.id))}
                  className="text-sm text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleOpenEditModal(note)}
                  className="text-sm text-blue-500"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {setModalOpen(true), setIsEditMode(false)}}
          className="fixed bottom-8 right-8 bg-blue-500 text-white p-4 rounded-full shadow-lg transition-all hover:scale-110 animate-pulse"
        >
          + Add Note
        </button>
      </div>

      {isModalOpen && (
        <Modal
          note={note}
          setNote={setNote}
          handleAddNote={handleAddNote}
          handleEditNote={handleEditNote}
          setModalOpen={setModalOpen}
          isEditMode={isEditMode}
        />
      )}
    </div>
  );
}
