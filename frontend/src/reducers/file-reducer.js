import { createSlice } from "@reduxjs/toolkit";
import { openFileInProjectThunk } from "../services/project-thunk";

let initialState = {
  fileContents: null,
  fileContentsLoading: false,
  s3URI: null,
  noFileSelected: true,
  openFileMap: {},
  openFileStack: [],
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: {
    [openFileInProjectThunk.pending]: (state, action) => {
      state.fileContentsLoading = true;
      state.noFileSelected = false;
    },
    [openFileInProjectThunk.fulfilled]: (state, action) => {
      state.fileContentsLoading = false;
      state.noFileSelected = false;
      state.fileContents = action.payload.contents;
      state.s3URI = action.payload.s3URI;

      if (!state.openFileMap.hasOwnProperty(action.payload.path)) {
        state.openFileStack.push(action.payload.path);
      }
      state.openFileMap[action.payload.path] = 1;
    },
    [openFileInProjectThunk.rejected]: (state, action) => {
      state.fileContentsLoading = false;
      state.noFileSelected = true;
    },
  },
});

export default fileSlice.reducer;
