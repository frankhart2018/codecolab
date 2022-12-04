import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, signUpUserThunk, userDataThunk } from "../services/thunks";

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
                // state.currentUser = payload
                console.log("state", state);
                // console.log("currentUser", state.currentUser);
            },
        [signUpUserThunk.fulfilled]:
            (state, { payload }) => {
                if (payload.status === 201) {
                    state.isLoggedIn = true
                }
            },
        [userDataThunk.fulfilled]:
            (state, { payload }) => {
                console.log("payload", payload)
                state.currentUser = payload.user
            }


    }
});

export default userDetailsSlice.reducer;