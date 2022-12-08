import { createSlice } from "@reduxjs/toolkit";
import { openFileInProjectThunk } from "../services/project-thunk";

let initialState = {
  fileContents: null,
  fileContentsLoading: false,
  noFileSelected: true,
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
      state.fileContents = action.payload;
    },
    [openFileInProjectThunk.rejected]: (state, action) => {
      state.fileContentsLoading = false;
      state.noFileSelected = true;
    },
  },
});

export default fileSlice.reducer;
