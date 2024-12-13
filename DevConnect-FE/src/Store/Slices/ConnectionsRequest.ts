import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ConnectionRequestType } from "../../Types/CommonTypes"
import { fetchConnectionRequest, reviewConnectionRequest } from "../../Services/ConnectionAsync"

const ConnectionRequest = createSlice({
    name: "ConnectionRequest",
    initialState: [] as ConnectionRequestType[],
    reducers: {},



    























    
    
    extraReducers: (builder) => {
        builder.addCase(fetchConnectionRequest.pending, (state, action) => {
            console.log("in pending")
        })
        builder.addCase(fetchConnectionRequest.fulfilled, (state, action: PayloadAction<ConnectionRequestType[]>) => {


            return action.payload
        })
        builder.addCase(fetchConnectionRequest.rejected, (state, action) => {
            console.log("in rejected ")
        })
        builder.addCase(reviewConnectionRequest.pending, (state, action) => {
            console.log("pending ")
        })
        builder.addCase(reviewConnectionRequest.fulfilled, (state, action ) => {
      
            return state.filter((item) => item._id !== action.payload.data._id)
    
        })
        builder.addCase(reviewConnectionRequest.rejected, (state, action) => {
            console.log("in rejected ")
        })
    }


})

export const { } = ConnectionRequest.actions
export default ConnectionRequest.reducer