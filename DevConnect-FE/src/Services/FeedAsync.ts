import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"


export const getFeed = createAsyncThunk("feed/feed", async (_, thunkAPI) => {

    try {

        let res = await axios.get(`${import.meta.env.VITE_BASEAPIURL}${import.meta.env.VITE_FEEDURL}`, { withCredentials: true })
       // console.log(data.data)
        
        return res.data
    }
    catch (err) {
        return thunkAPI.rejectWithValue(err)
    }
})