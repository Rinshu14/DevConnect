import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { genderEnum } from "../Types/Enums"


type loginRequest = {
    emailId: string,
    password: string
}
type signUpRequest = {
    emailId: string,
    password: string,
    firstName:string,
    age:number,
    gender:genderEnum

}
export const loginRequest = createAsyncThunk("users/loginStatus", async (data: loginRequest, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEAPIURL}${import.meta.env.VITE_LOGINURL}`,
            data,
            { withCredentials: true })
        return response.data
    }
    catch (err: any) {
        const errorMessage = err.response?.data || "Login failed";
        return thunkAPI.rejectWithValue(errorMessage);
    }
})
export const signupRequest = createAsyncThunk("users/signUp", async (data: signUpRequest, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEAPIURL}${import.meta.env.VITE_SIGNUPURL}`,
            data,
            { withCredentials: true })
            
        return response.data
    }
    catch (err: any) {
        const errorMessage = err.response?.data || "Login failed";
        return thunkAPI.rejectWithValue(errorMessage);
    }
})

export const profileView = createAsyncThunk("users/profileView", async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASEAPIURL}${import.meta.env.VITE_PROFILEVIEW}`, { withCredentials: true })
        return response.data
    }
    catch (err: any) {
        if (err.status == 401) return thunkAPI.rejectWithValue("user not logged in")
        const errorMessage = err.response?.data || "something Went wrong"
        return thunkAPI.rejectWithValue(errorMessage);
    }

})

export const profileUpdate = createAsyncThunk("users/profileUpdate", async (userData: FormData, thunkAPI) => {
    try {
        let response = await axios.patch(`${import.meta.env.VITE_BASEAPIURL}${import.meta.env.VITE_PROFILEUPDATE}`, userData, { withCredentials: true })
        return response.data
    }
    catch (err: any) {
        return thunkAPI.rejectWithValue({ data: null, message: err.message.toString() });
    }

})

export const logoutRequest = createAsyncThunk("users/logoutRequest", async (_, thunkAPI) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASEAPIURL}${import.meta.env.VITE_LOGOUTURL}`, {}, { withCredentials: true })
        return response.data
    }
    catch (err: any) {
        const errorMessage = err.response?.data || "something Went wrong"
        return thunkAPI.rejectWithValue(errorMessage);
    }
})




