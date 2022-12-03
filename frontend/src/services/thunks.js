import { createAsyncThunk }
    from "@reduxjs/toolkit"
import * as service
    from "./service"

export const loginUserThunk = createAsyncThunk(
    '/user/loginUser', async (user) => {
        const response = await service.loginUser(user)
        console.log("response in thunk", response)
        return response
    })

export const signUpUserThunk = createAsyncThunk(
    '/user/registerUser', async (user) => {
        const response = await service.registerUser(user)
        return response
    })

export const forgotPasswordThunk = createAsyncThunk(
    '/user/forgotPassword', async (email) => {
        const response = await service.forgotPasword(email)
        return response
    })
