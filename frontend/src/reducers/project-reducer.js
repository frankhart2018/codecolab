import { createSlice } from "@reduxjs/toolkit";

import {
  getProjectByIdThunk,
  createDirInProjectThunk,
  createFileInProjectThunk,
} from "../services/project-thunk";

let initialState = {
  fileMap: null,
  fileMapLoading: false,
};

const setOpenState = (root, currentRoot) => {
  if (root.type === "dir") {
    root.openState =
      currentRoot !== null && currentRoot.hasOwnProperty("openState")
        ? currentRoot.openState
        : false;
    root.children.forEach((child, i) => {
      if (child.type === "dir") {
        let curRoot =
          currentRoot !== null &&
          currentRoot.hasOwnProperty("children") &&
          i < currentRoot.children.length
            ? currentRoot.children[i]
            : {};
        setOpenState(child, curRoot);
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
        setOpenState(child, {});
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
      const currentMap = JSON.parse(JSON.stringify(state.fileMap));
      state.fileMap = action.payload.file_structure.children.map((child, i) => {
        setOpenState(child, currentMap[i]);
        return child;
      });
    },
    [createFileInProjectThunk.rejected]: (state, action) => {
      state.fileMapLoading = true;
    },
  },
});

export const { updateFileMap } = projectSlice.actions;
export default projectSlice.reducer;
