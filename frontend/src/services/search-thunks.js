import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./search-service";

export const getQuestionsThunk = createAsyncThunk(
    "search/query",
    async (query) => {
        const response = await service.getQuestions(query);
        return response;
    }
)

export const updateQuestionThunk = createAsyncThunk(
    "update/query",
    async (question) => {
        const response = await service.updateQuestions(question);
        return response
    }
)

export const createQuestionThunk = createAsyncThunk(
    "create/query",
    async(query) => {
        const response = await service.createQuestion(query)
        return response
    }
)