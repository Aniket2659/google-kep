import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import NoteCard from './NoteCard'; 
import '../Style/NotesContainer.css';
import '../Style/ArchiveContainer.css';
import { fetchArchiveNotesApi } from '../Services/Api';

function ArchiveContainer() {
  const [archiveList, setArchiveList] = useState([]);

  useEffect(() => {
    async function getArchivedNotes() {
      try {
        const data = await fetchArchiveNotesApi()
        setArchiveList(data.data.filter(note => note.is_archive)); 
      } 
      catch (error) {
        console.error('Error fetching archived notes:', error.message);
      }
    }
    getArchivedNotes();
  }, []);

  const handleUpdateList = (updatedNote, action) => {
    if (action === "unarchive") {
      setArchiveList(archiveList.filter(note => note.id !== updatedNote.id));
    }
  };
  
  return (
    <Box className="archive-box">
      {archiveList.map(note => (
        <NoteCard key={note.id} note={note} updateList={handleUpdateList}  container="archive"/>
      ))}
    </Box>
  );
}

export default ArchiveContainer;