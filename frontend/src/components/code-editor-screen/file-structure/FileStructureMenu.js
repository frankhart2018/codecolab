import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Icon from "react-feather";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

import useContextMenu from "../hooks/useContextMenu";
import "./FileStructureMenu.css";
import {
  createDirInProjectThunk,
  createFileInProjectThunk,
} from "../../../services/project-thunk";

const FileStructureMenu = ({ projectId, getCurrentPath }) => {
  const dispatch = useDispatch();
  const { anchorPoint, show } = useContextMenu();
  const [openNewDirDialog, setOpenNewDirDialog] = useState(false);
  const [newDirName, setNewDirName] = useState("");
  const [openNewFileDialog, setOpenNewFileDialog] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const handleOpenNewDirDialogOpen = () => {
    setOpenNewDirDialog(true);
  };

  const handleOpenNewFileDialogOpen = () => {
    setOpenNewFileDialog(true);
  };

  const handleOpenNewDirDialogClose = () => {
    setOpenNewDirDialog(false);
    setNewDirName("");
  };

  const handleOpenNewFileDialogClose = () => {
    setOpenNewFileDialog(false);
    setNewFileName("");
  };

  const handleNewDirCreateBtnClicked = () => {
    dispatch(
      createDirInProjectThunk({
        project_id: projectId,
        path: getCurrentPath(),
        dir_name: newDirName,
      })
    );
    setOpenNewDirDialog(false);
    setNewDirName("");
  };

  const handleNewFileCreateBtnClicked = () => {
    dispatch(
      createFileInProjectThunk({
        project_id: projectId,
        path: getCurrentPath(),
        file_name: newFileName,
      })
    );
    setOpenNewFileDialog(false);
    setNewFileName("");
  };

  if (show) {
    return (
      <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        <li className="menu__item" onClick={handleOpenNewDirDialogOpen}>
          <Icon.Folder size={20} className="menu__icon" />
          New Directory
        </li>
        <li className="menu__item" onClick={handleOpenNewFileDialogOpen}>
          <Icon.File size={20} className="menu__icon" />
          New File
        </li>
      </ul>
    );
  }

  return (
    <>
      <Dialog open={openNewFileDialog} onClose={handleOpenNewFileDialogOpen}>
        <DialogContent>
          <DialogContentText>Add new file</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="filename"
            label="File name"
            type="text"
            fullWidth
            variant="standard"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenNewFileDialogClose}>Cancel</Button>
          <Button onClick={handleNewFileCreateBtnClicked}>Create</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openNewDirDialog} onClose={handleOpenNewDirDialogClose}>
        <DialogContent>
          <DialogContentText>Add new directory</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="dirname"
            label="Directory name"
            type="text"
            fullWidth
            variant="standard"
            value={newDirName}
            onChange={(e) => setNewDirName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenNewDirDialogClose}>Cancel</Button>
          <Button onClick={handleNewDirCreateBtnClicked}>Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileStructureMenu;
