import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk, signUpUserThunk } from "../services/thunks";

const initialState = {
    user: {},
    isLoggedIn: false,
    token: "",
}

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    extraReducers: {
        [loginUserThunk.fulfilled]:
            (state, { payload }) => {
                state.isLoggedIn = true
                state.token = payload.data
                console.log("state", state);
                console.log("payload", payload);
                console.log("initialState", initialState);
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