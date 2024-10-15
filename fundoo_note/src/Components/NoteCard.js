import React, { useState } from "react";
import {
  Typography,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PaletteIcon from "@mui/icons-material/Palette";
import ImageIcon from "@mui/icons-material/Image";
import ArchiveIcon from "@mui/icons-material/Archive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  updateNoteApi,
  deleteNoteApi,
  changeNoteColorApi,
} from "../Services/Api";
import "../Style/NoteCard.scss";
import Modal from "@mui/material/Modal";
import AddNote from "./AddNote";

function NoteCard({ note, updateList, container }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [colorAnchorEl, setColorAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const openColorPalette = Boolean(colorAnchorEl);
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(note.title);
  const [newDescription, setNewDescription] = useState(note.description);
  const [openEditNote, setOpenEditNote] = useState(false);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorClick = (event) => {
    setColorAnchorEl(event.currentTarget);
  };

  const handleColorClose = () => {
    setColorAnchorEl(null);
  };

  const handleNoteIconsClick = async (
    action,
    color = "#ffffff",
    endpoint = ""
  ) => {
    try {
      if (action === "color") {
        await changeNoteColorApi(note.id, color);
        updateList({ ...note, color }, "color");
        setColorAnchorEl(null);
      } else if (action === "delete") {
        await deleteNoteApi(note.id);
        updateList(note, "delete");
      } else if (
        ["restore", "trash", "unarchive", "archive"].includes(action)
      ) {
        const updatedNote = await updateNoteApi(note.id, endpoint);
        updateList(updatedNote.data, action);
      }
    } catch (error) {
      console.error(`Error handling action ${action}:`, error);
    }
  };

  const handleEdit = (data) => {
    setOpenEditNote(false);
    updateList(data, "update");
  };

  return (

      <div className="note-card" style={{ backgroundColor: `${note.color}` }}>
        <div onClick={() => setOpenEditNote(true)}>
          {edit ? (
            <>
              <TextField
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                onKeyDown={handleEdit}
                fullWidth
                variant="outlined"
                margin="dense"
              />
              <TextField
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                onKeyDown={handleEdit}
                fullWidth
                variant="outlined"
                margin="dense"
              />
            </>
          ) : (
            <div className="note-card-content">
              <Typography variant="h6">{note.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {note.description}
              </Typography>
            </div>
          )}
        </div>

        <div className="note-actions">
          {container === "trash" ? (
            <>
              <IconButton
                aria-label="restore note"
                onClick={() =>
                  handleNoteIconsClick("restore", "", "toggle_trash")
                }
                className="icon-hidden"
              >
                <RestoreIcon />
              </IconButton>
              <IconButton
                aria-label="delete note"
                onClick={() => handleNoteIconsClick("delete", "", "")}
                className="icon-hidden"
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton aria-label="set reminder" className="icon-hidden">
                <NotificationsIcon />
              </IconButton>
              <IconButton aria-label="add collaborator" className="icon-hidden">
                <PersonAddIcon />
              </IconButton>
              <IconButton
                aria-label="change color"
                className="icon-hidden"
                onClick={handleColorClick}
              >
                <PaletteIcon />
              </IconButton>
              <IconButton aria-label="add image" className="icon-hidden">
                <ImageIcon />
              </IconButton>
              {container === "archive" ? (
                <IconButton
                  aria-label="unarchive note"
                  onClick={() =>
                    handleNoteIconsClick("unarchive", "", "toggle_archive")
                  }
                  className="icon-hidden"
                >
                  <UnarchiveIcon />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="archive note"
                  onClick={() =>
                    handleNoteIconsClick("archive", "", "toggle_archive")
                  }
                  className="icon-hidden"
                >
                  <ArchiveIcon />
                </IconButton>
              )}
              <IconButton
                aria-label="more options"
                className="icon-hidden"
                onClick={handleMoreClick}
              >
                <MoreVertIcon />
              </IconButton>
            </>
          )}

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={() => handleNoteIconsClick("trash", "", "toggle_trash")}
            >
              Delete
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={colorAnchorEl}
            open={openColorPalette}
            onClose={handleColorClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <div className="color-palate-cnt">
              <div
                className="col1"
                onClick={() => handleNoteIconsClick("color", "#FFFFFF", "")}
              ></div>
              <div
                className="col2"
                onClick={() => handleNoteIconsClick("color", "#FAAFA8", "")}
              ></div>
              <div
                className="col3"
                onClick={() => handleNoteIconsClick("color", "#F39F76", "")}
              ></div>
              <div
                className="col4"
                onClick={() => handleNoteIconsClick("color", "#FFF8B8", "")}
              ></div>
              <div
                className="col5"
                onClick={() => handleNoteIconsClick("color", "#E2F6D3", "")}
              ></div>
              <div
                className="col6"
                onClick={() => handleNoteIconsClick("color", "#B4DDD3", "")}
              ></div>
              <div
                className="col7"
                onClick={() => handleNoteIconsClick("color", "#D4E4ED", "")}
              ></div>
              <div
                className="col8"
                onClick={() => handleNoteIconsClick("color", "#AECCDC", "")}
              ></div>
              <div
                className="col9"
                onClick={() => handleNoteIconsClick("color", "#D3BFDB", "")}
              ></div>
              <div
                className="col10"
                onClick={() => handleNoteIconsClick("color", "#F6E2DD", "")}
              ></div>
              <div
                className="col11"
                onClick={() => handleNoteIconsClick("color", "#E9E3D4", "")}
              ></div>
              <div
                className="col12"
                onClick={() => handleNoteIconsClick("color", "#EFEFF1", "")}
              ></div>
            </div>
          </Menu>
          <Modal
            open={openEditNote}
            onClose={() => setOpenEditNote(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <AddNote
              noteDetails={note}
              updateList={handleEdit}
              noteColor={note.color}
            />
          </Modal>
        </div>
      </div>
  );
}

export default NoteCard;
