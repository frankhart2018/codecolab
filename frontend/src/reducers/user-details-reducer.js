import { createSlice } from "@reduxjs/toolkit";
import { loginUserThunk } from "../services/thunks";

const initialState = {
    user: {},
    sent: false,
}

const userDetailsSlice = createSlice({
    name: "userDetails",
    initialState,
    extraReducers: {
        [loginUserThunk.fulfilled]:
            (state, { payload }) => {
                state.sent = false
                state.user = payload
            },
    },
    reducers: {
        loginUser(state, action) {
            state.sent = true
            console.log("action", action)
            state = action.payload
            console.log("state", state)
        },
    }
});

export const { loginUser } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;