import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./service";

export const loginUserThunk = createAsyncThunk(
    '/user/loginUser', async (user) => {
        const response = await service.loginUser(user)
        return response
    })


export const signUpUserThunk = createAsyncThunk(
  "/user/registerUser",
  async (user) => {
    const response = await service.registerUser(user);
    return response;
  }
);

export const forgotPasswordThunk = createAsyncThunk(
  '/user/forgotPassword', async (email) => {
    const response = await service.forgotPasword(email)
    return response
  })


export const updatePasswordThunk = createAsyncThunk(
    '/user/updatePassword/', async (data) => {
        const response = await service.updatePassword(data)
        return response
    })

export const userDataThunk = createAsyncThunk (
    '/user/userData/', async (token) => {
        const response = await service.userData(token)
        console.log("user data thunk response", response)
        return response
    })

export const logoutUserThunk = createAsyncThunk (
    '/user/logoutUser', async () => {
        const response = await service.logoutUser()
        return response
    })

export const updateUserThunk = createAsyncThunk (
    'user/updateUser', async (user) => {
        const response = await service.updateUser(user)
        return response
    })

export const profileThunk = createAsyncThunk (
    'user/profile', async () => {
        const response = await service.profile()
        console.log("in profile thunk", response)
        return response
    }
)