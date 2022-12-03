import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, signUpUserThunk } from "../services/thunks";

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState: {
        currentUser: null,
        token: ""
    },
    extraReducers: {
        [loginUserThunk.fulfilled]:
            (state, { payload }) => {
                state.isLoggedIn = true
                state.token = payload.data
                state.currentUser = payload
                console.log("state", state);
                console.log("currentUser", state.currentUser);
            },
        [signUpUserThunk.fulfilled]:
            (state, { payload }) => {
                if (payload.status === 201) {
                    state.isLoggedIn = true
                }
            },

    }
});

export default userDetailsSlice.reducer;