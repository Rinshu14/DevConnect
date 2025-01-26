import { createSlice } from "@reduxjs/toolkit"
//import { ConnectionType } from "../../Types/CommonTypes"
import { fetchConnections } from "../../Services/ConnectionAsync"
import { OtherUser} from "../../Types/CommonTypes"



const ConnectionsSlice = createSlice({
    name: "Connections",
    initialState: [] as OtherUser[],
    reducers: {},

    extraReducers: (builder) => {
        // builder.addCase(fetchConnections.pending, (state, action) => {
        //     console.log("in pending")
        // })
        builder.addCase(fetchConnections.fulfilled, (_, action) => {

            return action.payload

        })
        // builder.addCase(fetchConnections.rejected, (state, action) => {
        //     console.log("in rejected")
        // })
    }

})

export const { } = ConnectionsSlice.actions
export default ConnectionsSlice.reducer