import { createSlice } from "@reduxjs/toolkit";
import { createProjectThunk, loginUserThunk, signUpUserThunk, userDataThunk } from "../services/thunks";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    currentUser: null,
    token: "",
    isLoggedIn: false
  },
  extraReducers: {
    [loginUserThunk.fulfilled]:
      (state, { payload }) => {
        state.isLoggedIn = true
        state.token = payload.data
        console.log("state", state);
        localStorage.setItem('token', state.token);
      },

    [signUpUserThunk.fulfilled]:
      (state, { payload }) => {

        state.isLoggedIn = true;
        state.token = payload.data;
        localStorage.setItem('token', state.token);

      },
    [userDataThunk.fulfilled]:
      (state, action) => {
        state.currentUser = action.payload.user
      }


  }
});

export default userDetailsSlice.reducer;