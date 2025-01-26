import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { getFeed } from "../../Services/FeedAsync"
import { reviewUser } from "../../Services/RequestsAsync";
// import { FeedUser } from "../../Types/User";
import { OtherUser } from "../../Types/CommonTypes";


interface Feed {
    //feed: FeedUser[]
    feed:OtherUser[]
    loading: boolean
    error: string
    hasMoreData:boolean
}

const initialState: Feed = {
    feed: [],
    loading: false,
    error: '',
    hasMoreData:true
    
};

let FeedSlice = createSlice({
    name: "Feed",
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder.addCase(getFeed.pending, (state) => {
            state.loading = true;
        })
        
        builder.addCase(getFeed.fulfilled, (state: Feed, action: PayloadAction<{ data: OtherUser[], message: string }>) => {
           
           
            state.feed = action.payload.data
        
            state.loading = false;
            state.error = ""
        state.hasMoreData=(action.payload.data.length>0)? true:false
        })
        // builder.addCase(reviewUser.pending, (_, action: any) => {
        //     console.log("in pending")
        // })
        builder.addCase(reviewUser.fulfilled, (state: any, action: PayloadAction<string>) => {
            state.feed = state.feed.filter((item: OtherUser) => item._id !== action.payload)
        })
        // builder.addCase(reviewUser.rejected, (state:any, action: any) => {
        //     console.log("in rejected")
        // })

    }



})

export const {  } = FeedSlice.actions

export default FeedSlice.reducer

