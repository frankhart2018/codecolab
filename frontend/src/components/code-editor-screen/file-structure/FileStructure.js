import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Box, Typography } from "@mui/material";

import "./FileStructure.css";
import { getProjectByIdThunk } from "../../../services/project-thunk";
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

  return (
    <Box sx={{ height: "100vh", width: "25%" }} className="background-grayish">
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
  );
}
