import { createSlice } from "@reduxjs/toolkit";
import { runCodeThunk } from "../services/run-thunk";

let initialState = {
  output: null,
  outputLoading: false,
};

const runSlice = createSlice({
  name: "run",
  initialState,
  reducers: {},
  extraReducers: {
    [runCodeThunk.pending]: (state, action) => {
      state.outputLoading = true;
    },
    [runCodeThunk.fulfilled]: (state, action) => {
      state.outputLoading = false;
      state.output = action.payload.output;
    },
    [runCodeThunk.rejected]: (state, action) => {
      state.outputLoading = false;
    },
  },
});

export default runSlice.reducer;
