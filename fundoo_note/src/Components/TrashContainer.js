import React, {useState,useEffect} from 'react'
import { Box } from '@mui/material';
import NoteCard from './NoteCard'; 
import '../Style/NotesContainer.css';
import { fetchtrashNotesApi } from '../Services/Api';


function TrashContainer() {
  const [trashList,setTrashList]=useState([])

  useEffect(()=>{
    async function fetchTrashedNotes() {
      try {
        const data = await fetchtrashNotesApi()
        setTrashList(data.data.filter(note => note.is_trash)); 
      } catch (error) {
        console.error('Error fetching trashed notes:', error.message);
      }
    }
    fetchTrashedNotes();
  }, []);
  
  const handleUpdateList = (updatedNote, action) => {
    if (action === "restore" || action === "delete") {
      setTrashList(trashList.filter(note => note.id !== updatedNote.id));
    }
  };

  return (
    <Box className="archive-box">
      {trashList.map(note => (
        <NoteCard key={note.id} note={note} updateList={handleUpdateList} container="trash" />
      ))}
    </Box>
  );
}

export default TrashContainer;