import React, { useState } from "react";
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
// import { getPythonVersionThunk } from "../../../services/pyrunner-thunk";

const generateFileStructure = (root, level = 1) => {
  if (root.type === "file") {
    return (
      <ListItemButton sx={{ pl: 4 * level }}>
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
  } else if (root.type === "directory" && root.children.length === 0) {
    return (
      <ListItemButton sx={{ pl: 4 * level }}>
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
        onClick={() => root.openState[1](!root.openState[0])}
        sx={{ pl: 4 * level }}
      >
        <ListItemIcon>
          <FolderIcon className="text-gray" />
        </ListItemIcon>
        <ListItemText primary={root.name} className="text-gray" />
        {root.openState[0] ? (
          <ExpandLess className="text-gray" />
        ) : (
          <ExpandMore className="text-gray" />
        )}
      </ListItemButton>
      <Collapse in={root.openState[0]} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {root.children.map((child) =>
            generateFileStructure(child, level + 1)
          )}
        </List>
      </Collapse>
    </>
  );
};

export default function FileStructure() {
  const fileMap = [
    {
      name: "src",
      type: "directory",
      openState: useState(false),
      children: [
        {
          name: "App.css",
          type: "file",
        },
        {
          name: "App.js",
          type: "file",
        },
        {
          name: "file-structure",
          type: "directory",
          openState: useState(false),
          children: [
            {
              name: "FileStructure.css",
              type: "file",
            },
            {
              name: "FileStructure.js",
              type: "file",
            },
            {
              name: "inner-component",
              type: "directory",
              openState: useState(false),
              children: [
                {
                  name: "InnerComponentInnerComponentInnerComponent.css",
                  type: "file",
                },
                {
                  name: "InnerComponent.js",
                  type: "file",
                },
              ],
            },
          ],
        },
        {
          name: "index.css",
          type: "file",
        },
        {
          name: "index.js",
          type: "file",
        },
      ],
    },
    {
      name: "test",
      type: "directory",
      openState: useState(false),
      children: [
        {
          name: "App.test.js",
          type: "file",
        },
      ],
    },
  ];

  // console.log(getPythonVersionThunk());

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
        {fileMap.map((root) => generateFileStructure(root))}
      </List>
    </Box>
  );
}
