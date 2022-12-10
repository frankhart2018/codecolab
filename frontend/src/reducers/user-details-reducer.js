import { createSlice } from "@reduxjs/toolkit";
import {loginUserThunk, logoutUserThunk, signUpUserThunk, updateUserThunk, userDataThunk} from "../services/thunks";

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
        if (payload.status === 201) {
          state.isLoggedIn = true
        }
      },
    [userDataThunk.fulfilled]:
      (state, action) => {
        state.currentUser = action.payload.user
      },
      [logoutUserThunk.fulfilled]:
          (state, action) => {
              state.isLoggedIn = false
              state.currentUser = null
              state.token = ""
              localStorage.setItem('token', state.token)
          },
      [updateUserThunk.fulfilled]:
          (state, action) => {
              state.currentUser = action.payload.user
          }


  }
});

export default userDetailsSlice.reducer;