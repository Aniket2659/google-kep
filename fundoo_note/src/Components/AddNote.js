import React, { useState } from 'react';
import '../Style/NoteInput.css';
import { TextField, IconButton, Button, Paper } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import BrushIcon from '@mui/icons-material/Brush';
import ImageIcon from '@mui/icons-material/Image';
import AlarmIcon from '@mui/icons-material/Alarm'; 
import PersonAddIcon from '@mui/icons-material/PersonAdd'; 
import ColorLensIcon from '@mui/icons-material/ColorLens'; 
import ArchiveIcon from '@mui/icons-material/Archive'; 
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { addNoteApi,updateTitleDescriptionApi } from "../Services/Api";



function AddNote({ updateList,noteDetails,updateAddList,noteColor }) {
  const [isExpanded, setIsExpanded] = useState(noteDetails ? true:false);
  const [note, setNote] = useState({ title: noteDetails ?noteDetails.title :"", description: noteDetails ?noteDetails.description :"" });


  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setIsExpanded(false);
    setNote({ title: '', description: '' , color: '#ffffff'});
  };

  const handleSubmit = async () => {
    if (note.title || note.description) {
      try {
        if (noteDetails) {
          await updateTitleDescriptionApi(
            noteDetails.id, 
            note.title, 
            note.description,

          );
          updateList({ ...noteDetails, ...note }, "update");
        } else {
          const data = await addNoteApi(note);
          updateAddList(data.data, "add");
        }
        handleClose();
      } catch (error) {
        console.error('Error adding/updating note:', error.message);
      }
    }
  };
  
  

  return (
    <>
      <Paper elevation={9} className="note-container" style={{ backgroundColor: noteColor || "#fff" }}>
        {!isExpanded ? (
          <div onClick={handleExpand} className="expandable-input">
            <div className="placeholder-text">Take a note...</div>
            <div className="icon-buttons">
              <IconButton className="icon-button">
                <CheckBoxIcon />
              </IconButton>
              <IconButton className="icon-button">
                <BrushIcon />
              </IconButton>
              <IconButton className="icon-button">
                <ImageIcon />
              </IconButton>
            </div>
          </div>
        ) : (
          <div>
            <TextField
              placeholder="Title"
              variant="standard"
              fullWidth
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className="title-input"
            />
            <TextField
              placeholder="Take a note..."
              variant="standard"
              multiline
              rows={2}
              fullWidth
              value={note.description}
              onChange={(e) => setNote({ ...note, description: e.target.value })}
              className="textarea-input"
            />
            <div className="action-buttons">
              <IconButton className="icon-button">
                <AlarmIcon /> 
              </IconButton>
              <IconButton className="icon-button">
                <PersonAddIcon /> 
              </IconButton>
              <IconButton className="icon-button" >
                <ColorLensIcon /> 
              </IconButton>
              <IconButton className="icon-button">
                <ImageIcon /> 
              </IconButton>
              <IconButton className="icon-button">
                <ArchiveIcon />
              </IconButton>
              <IconButton className="icon-button">
                <MoreVertIcon /> 
              </IconButton>
              <Button onClick={handleSubmit}>Close</Button>
            </div>
          </div>
        )}
      </Paper>
    </>
  );
}

export default AddNote;   