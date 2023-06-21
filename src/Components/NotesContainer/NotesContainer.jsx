import React from 'react';
import MyNotesCards from 'Components/NotesContainer/MyNotesCards.js';

const NotesContainer = ({
  customerNotes,
  priorities,
  loadNotes,
  MyCreateNote,
  editNote,
  user,
  maxShowCount
}) => {
  const addNewNote = ({ text, priority, endDate }) => {
    const data = {
      text: text.trim(),
      priority,
      status: 'open',
      endDate
    };
    MyCreateNote(text, user, data);
  };

  const handleEdit = ({ note, text, priority, status, id }) => {
    editNote(text || note.text, user, {
      text: text || note.text,
      priority: priority || note.priority,
      status: status || note.status,
      id
    });
  };
  return (
    <>
      <MyNotesCards
        notesData={customerNotes || []}
        priorities={priorities}
        addNewNote={addNewNote}
        handleEdit={handleEdit}
        maxShowCount={maxShowCount || 3}
        loadNotes={loadNotes}
        user={user}
      />
      
    </>
  );
};

export default NotesContainer;
