import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import AddNote from './AddNote';
import NoteCard from './NoteCard'; 
import '../Style/NotesContainer.css';
import { fetchNotesApi } from '../Services/Api';


function NotesContainer() {
  const [notelist, setNotelist] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await fetchNotesApi()
        setNotelist(data.data.filter(note => !note.is_archive && !note.is_trash));
      } catch (error) {
        console.error('Error fetching notes:', error.message);
      }
    }

    fetchNotes();
  }, []);

  function handleUpdateList(data, action) {
    if (action === "add") {
      setNotelist([data, ...notelist]);
    } else if (action === "archive" || action === "trash") {
      setNotelist(notelist.filter(note => note.id !== data.id));

    }else if(action === "color" || action === "update"){
      setNotelist(notelist.map((note)=>{
        if (note.id === data.id){
          return { ...note, ...data };
        }
        return note
      }))
    }
    

  }
  
  return (
    <Box>
      <AddNote updateAddList={handleUpdateList} />
      <Box className="notes-box">
        {notelist.map(note => (
          <NoteCard key={note.id} note={note} updateList={handleUpdateList} />
        ))}
      </Box>
    </Box>
  );
}

export default NotesContainer;