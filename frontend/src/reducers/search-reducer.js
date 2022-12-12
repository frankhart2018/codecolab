import {getAnswersThunk, getQuestionsThunk, updateQuestionThunk} from "../services/search-thunks";
import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchDetails",
    initialState: {
        currentSearch: [],
        localSearch: []
    },
    extraReducers: {
        [getQuestionsThunk.fulfilled]:
            (state, {payload}) => {
                state.currentSearch = payload.items
            },
        [updateQuestionThunk.fulfilled]:
            (state, {payload}) => {
                state.localSearch = payload
            }
    }
})

export default searchSlice.reducer