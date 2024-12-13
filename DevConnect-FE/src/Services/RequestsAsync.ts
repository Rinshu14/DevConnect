import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


type data = {
    status: string
    userId: string
}

export const reviewUser = createAsyncThunk("feed/reviewUser", async (data: data, thunkAPI) => {
    try {
        
        let res = await axios.post(`${import.meta.env.VITE_BASEAPIURL}${import.meta.env.VITE_REQUESTSEND}${data.status}/${data.userId}`, {}, { withCredentials: true })
       
   
        return res.data.data.toUserId
    }
    catch (err) {
        thunkAPI.rejectWithValue("something went wrong")
    }
},)