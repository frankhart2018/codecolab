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
import { createDirInProjectThunk } from "../../../services/project-thunk";

const FileStructureMenu = ({ projectId, getCurrentPath }) => {
  const dispatch = useDispatch();
  const { anchorPoint, show } = useContextMenu();
  const [openNewDirDialog, setOpenNewDirDialog] = useState(false);
  const [newDirName, setNewDirName] = useState("");

  const handleOpenNewDirDialogOpen = () => {
    setOpenNewDirDialog(true);
  };

  const handleOpenNewDirDialogClose = () => {
    setOpenNewDirDialog(false);
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

  if (show) {
    return (
      <ul className="menu" style={{ top: anchorPoint.y, left: anchorPoint.x }}>
        <li className="menu__item" onClick={handleOpenNewDirDialogOpen}>
          <Icon.Folder size={20} className="menu__icon" />
          New Directory
        </li>
        <li className="menu__item">
          <Icon.File size={20} className="menu__icon" />
          New File
        </li>
      </ul>
    );
  }

  return (
    <>
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
