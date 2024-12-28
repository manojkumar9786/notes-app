import React from 'react';

export default function Modal({
  note,
  setNote,
  handleAddNote,
  handleEditNote,
  setModalOpen,
  isEditMode,
}) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-full">
        <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit Note' : 'Add a New Note'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={note.title}
          onChange={(e) => setNote({ ...note, title: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <textarea
          placeholder="Description"
          value={note.description}
          onChange={(e) => setNote({ ...note, description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-between">
          <button
            onClick={() => {setModalOpen(false), setNote({ title: '', description: '' })}}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={isEditMode ? handleEditNote : handleAddNote}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {isEditMode ? 'Update' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}
