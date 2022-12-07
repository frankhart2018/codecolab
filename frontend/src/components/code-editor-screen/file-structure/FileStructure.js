import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import * as Icon from "react-feather";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Typography,
} from "@mui/material";

import "./FileStructure.css";
import {
  createDirInProjectThunk,
  createFileInProjectThunk,
  getProjectByIdThunk,
} from "../../../services/project-thunk";
import { updateFileMap } from "../../../reducers/project-reducer";
import FileStructureMenu from "./FileStructureMenu";

const generateFileStructure = (
  root,
  path,
  dispatch,
  idx,
  setCurrentPath,
  setCurrentType,
  level = 1
) => {
  if (root.type === "file") {
    return (
      <ListItemButton
        sx={{ pl: 4 * level }}
        onContextMenu={() => {
          setCurrentPath(path);
          setCurrentType("file");
        }}
      >
        <ListItemIcon>
          <InsertDriveFileIcon className="text-gray" />
        </ListItemIcon>
        <ListItemText
          className="text-gray"
          disableTypography
          primary={<Typography noWrap>{root.name}</Typography>}
        />
      </ListItemButton>
    );
  } else if (root.type === "dir" && root.children.length === 0) {
    return (
      <ListItemButton
        sx={{ pl: 4 * level }}
        onContextMenu={() => {
          setCurrentPath(path);
          setCurrentType("dir");
        }}
      >
        <ListItemIcon>
          <FolderIcon className="text-gray" />
        </ListItemIcon>
        <ListItemText primary={root.name} className="text-gray" />
      </ListItemButton>
    );
  }

  return (
    <>
      <ListItemButton
        onClick={() => {
          dispatch(updateFileMap({ path, idx }));
        }}
        onContextMenu={() => {
          setCurrentPath(path);
          setCurrentType("dir");
        }}
        sx={{ pl: 4 * level }}
      >
        <ListItemIcon>
          <FolderIcon className="text-gray" />
        </ListItemIcon>
        <ListItemText primary={root.name} className="text-gray" />
        {root.openState ? (
          <ExpandLess className="text-gray" />
        ) : (
          <ExpandMore className="text-gray" />
        )}
      </ListItemButton>
      <Collapse in={root.openState} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {root.children.length > 0 &&
            root.children.map((child) =>
              generateFileStructure(
                child,
                path + "/" + child.name,
                dispatch,
                idx,
                setCurrentPath,
                setCurrentType,
                level + 1
              )
            )}
        </List>
      </Collapse>
    </>
  );
};

export default function FileStructure() {
  const { fileMap, fileMapLoading } = useSelector((state) => state.project);
  const [currentPath, setCurrentPath] = useState("");
  const [currentType, setCurrentType] = useState("");
  const [openNewDirDialog, setOpenNewDirDialog] = useState(false);
  const [newDirName, setNewDirName] = useState("");
  const [openNewFileDialog, setOpenNewFileDialog] = useState(false);
  const [newFileName, setNewFileName] = useState("");

  const { pathname } = useLocation();
  const path_split = pathname.split("/");
  const project_id = path_split[path_split.length - 1];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectByIdThunk(project_id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentPath = () => {
    return currentPath;
  };

  const getCurrentType = () => {
    return currentType;
  };

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
        project_id: project_id,
        path: currentPath,
        dir_name: newDirName,
      })
    );
    setOpenNewDirDialog(false);
    setNewDirName("");
  };

  const handleNewFileCreateBtnClicked = () => {
    dispatch(
      createFileInProjectThunk({
        project_id: project_id,
        path: currentPath,
        file_name: newFileName,
      })
    );
    setOpenNewFileDialog(false);
    setNewFileName("");
  };

  return (
    <>
      <Box
        sx={{ height: "100vh", width: "25%" }}
        className="background-grayish"
      >
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          className="background-grayish"
          subheader={
            <Typography
              variant="body1"
              align="center"
              className="text-gray"
              sx={{ fontWeight: "bold" }}
            >
              Project files
            </Typography>
          }
        >
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={handleOpenNewFileDialogOpen}
          >
            <Icon.File size={20} className="menu__icon" />
            New File
          </Button>
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={handleOpenNewDirDialogOpen}
          >
            <Icon.Folder size={20} className="menu__icon" />
            New Directory
          </Button>
          {fileMapLoading && "Loading..."}
          {!fileMapLoading &&
            fileMap !== null &&
            fileMap.map((root, i) => {
              let path = root.name;
              return generateFileStructure(
                root,
                path,
                dispatch,
                i,
                setCurrentPath,
                setCurrentType
              );
            })}
        </List>

        <FileStructureMenu
          projectId={project_id}
          getCurrentPath={getCurrentPath}
          getCurrentType={getCurrentType}
        />
      </Box>

      <Dialog open={openNewFileDialog} onClose={handleOpenNewFileDialogClose}>
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
}
