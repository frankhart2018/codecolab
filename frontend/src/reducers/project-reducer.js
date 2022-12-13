import { createSlice } from "@reduxjs/toolkit";

import {
  getProjectByIdThunk,
  createDirInProjectThunk,
  createFileInProjectThunk,
  deleteInProjectThunk,
  renameInProjectThunk,
  isProjectStarredThunk,
  starProjectThunk,
  unstarProjectThunk,
  openFileInProjectThunk,
  hasWritePermissionThunk,
} from "../services/project-thunk";

let initialState = {
  fileMap: null,
  fileMapLoading: false,
  isProjectStarred: false,
  currentlyOpenedFilePath: null,
  hasWritePermission: false,
};

const setOpenState = (root) => {
  if (root.type === "dir") {
    root.openState = false;
    root.children.forEach((child, i) => {
      if (child.type === "dir") {
        setOpenState(child);
      }
    });
  }
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    updateFileMap(state, action) {
      const { path, idx } = action.payload;
      let fixedRoot = JSON.parse(JSON.stringify(state.fileMap));
      let root = fixedRoot[idx];
      let pathArray = path.split("/");

      if (pathArray.length === 1 && root.name === pathArray[0]) {
        root.openState = !root.openState;
      } else {
        pathArray = pathArray.slice(1);
        for (let path of pathArray) {
          if (path === "") {
            continue;
          }

          if (root.children) {
            root = root.children.find((child) => child.name === path);
          }
        }

        if (root.type === "dir") {
          root.openState = !root.openState;
        }
      }

      state.fileMap = JSON.parse(JSON.stringify(fixedRoot));
    },
    closeFileInProject(state, action) {
      state.currentlyOpenedFilePath = null;
    },
  },
  extraReducers: {
    [getProjectByIdThunk.pending]: (state, action) => {
      state.fileMapLoading = true;
    },
    [getProjectByIdThunk.fulfilled]: (state, action) => {
      state.fileMapLoading = false;
      state.fileMap = action.payload.file_structure.children.map((child) => {
        setOpenState(child, null);
        return child;
      });
    },
    [getProjectByIdThunk.rejected]: (state, action) => {
      state.fileMapLoading = true;
    },
    [createDirInProjectThunk.pending]: (state, action) => {
      state.fileMapLoading = true;
    },
    [createDirInProjectThunk.fulfilled]: (state, action) => {
      state.fileMapLoading = false;
      state.fileMap = action.payload.file_structure.children.map((child) => {
        setOpenState(child);
        return child;
      });
    },
    [createDirInProjectThunk.rejected]: (state, action) => {
      state.fileMapLoading = true;
    },
    [createFileInProjectThunk.pending]: (state, action) => {
      state.fileMapLoading = true;
    },
    [createFileInProjectThunk.fulfilled]: (state, action) => {
      state.fileMapLoading = false;
      state.fileMap = action.payload.file_structure.children.map((child) => {
        setOpenState(child);
        return child;
      });
    },
    [createFileInProjectThunk.rejected]: (state, action) => {
      state.fileMapLoading = true;
    },
    [deleteInProjectThunk.pending]: (state, action) => {
      state.fileMapLoading = true;
    },
    [deleteInProjectThunk.fulfilled]: (state, action) => {
      state.fileMapLoading = false;
      state.fileMap = action.payload.file_structure.children.map((child) => {
        setOpenState(child);
        return child;
      });
    },
    [deleteInProjectThunk.rejected]: (state, action) => {
      state.fileMapLoading = true;
    },
    [renameInProjectThunk.pending]: (state, action) => {
      state.fileMapLoading = true;
    },
    [renameInProjectThunk.fulfilled]: (state, action) => {
      state.fileMapLoading = false;
      state.fileMap = action.payload.file_structure.children.map((child) => {
        setOpenState(child);
        return child;
      });
    },
    [isProjectStarredThunk.fulfilled]: (state, action) => {
      state.isProjectStarred = action.payload.res;
    },
    [starProjectThunk.fulfilled]: (state, action) => {
      state.isProjectStarred = true;
    },
    [unstarProjectThunk.fulfilled]: (state, action) => {
      state.isProjectStarred = false;
    },
    [openFileInProjectThunk.fulfilled]: (state, action) => {
      state.currentlyOpenedFilePath = action.payload.path;
    },
    [hasWritePermissionThunk.fulfilled]: (state, action) => {
      state.hasWritePermission = action.payload.res;
    },
  },
});

export const { updateFileMap, closeFileInProject } = projectSlice.actions;
export default projectSlice.reducer;
