import {createQuestionThunk, getQuestionsThunk, updateQuestionThunk} from "../services/search-thunks";
import {createSlice} from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "searchDetails",
    initialState: {
        currentSearchQuery: [],
        localSearch: []
    },
    extraReducers: {
        [getQuestionsThunk.fulfilled]:
            (state, {payload}) => {
                state.currentSearchQuery = payload
            },
        [updateQuestionThunk.fulfilled]:
            (state, {payload}) => {
                state.localSearch = payload
            },
        [createQuestionThunk.fulfilled]:
            (state, {payload}) => {
            if (payload.data.newSearch) {
                state.localSearch.push(payload.data.newSearch)
            }
            }
    }
})

export default searchSlice.reducer