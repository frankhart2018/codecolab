import { createSlice } from "@reduxjs/toolkit";

import { getPythonVersionThunk } from "../services/pyrunner-thunk";

const initialState = {
  pythonVersion: null,
  pythonVersionLoading: false,
};

const pythonRunner = createSlice({
  name: "pyrunner",
  initialState,
  extraReducers: {
    [getPythonVersionThunk.pending]: (state) => {
      state.pythonVersionLoading = true;
    },
    [getPythonVersionThunk.fulfilled]: (state, action) => {
      state.pythonVersion = action.payload;
      state.pythonVersionLoading = false;
    },
    [getPythonVersionThunk.rejected]: (state) => {
      state.pythonVersionLoading = true;
    },
  },
  reducers: {},
});

export default pythonRunner.reducer;
