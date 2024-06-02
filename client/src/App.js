import React, { useState, useEffect } from 'react';
import { createNote, getNotes, updateNote, deleteNote } from './api';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteText, setEditNoteText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    const response = await getNotes();
    setNotes(response.data);
    setLoading(false);
  };

  const handleCreateNote = async () => {
    if (newNote) {
      await createNote({ text: newNote });
      setNewNote('');
      fetchNotes();
    }
  };

  const handleUpdateNote = async (id) => {
    if (editNoteText) {
      await updateNote(id, { text: editNoteText });
      setEditNoteId(null);
      setEditNoteText('');
      fetchNotes();
    }
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  return (
      <div className="App">
        <h1>Note Taking App</h1>
        <div className="note-input">
          <input
              type="text"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add a new note"
          />
          <button onClick={handleCreateNote}>Add Note</button>
        </div>

        {loading ? (
            <div className="loader"></div>
        ) : (
            <ul>
              {notes.map((note) => (
                  <li key={note.id}>
                    {editNoteId === note.id ? (
                        <input
                            type="text"
                            value={editNoteText}
                            onChange={(e) => setEditNoteText(e.target.value)}
                        />
                    ) : (
                        note.text
                    )}
                    <div className="note-actions">
                      {editNoteId === note.id ? (
                          <button onClick={() => handleUpdateNote(note.id)}>Save</button>
                      ) : (
                          <button onClick={() => setEditNoteId(note.id)}>Edit</button>
                      )}
                      <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
                    </div>
                  </li>
              ))}
            </ul>
        )}
      </div>
  );
}

export default App;
