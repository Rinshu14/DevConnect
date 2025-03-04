import { loginRequest, logoutRequest, profileView, profileUpdate, signupRequest } from "../../Services/UserAsync"
import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"
import { User } from "../../Types/CommonTypes"


interface UserState {
    user: User
    loading: boolean
    error: string
    isLoggedIn: boolean

}

export const UserSlice = createSlice({
    name: "User",
    initialState: {} as UserState,
    reducers: {
        // setUser: (state: UserState, action: PayloadAction<{ name: string, lastName: string }>) => {
        //     console.log(action.payload)

        // },

    },
    extraReducers: (builder) => {
        builder.addCase(loginRequest.pending, (state) => {
            state.loading = true
            state.error = ""

        })
        builder.addCase(loginRequest.fulfilled, (state, action: PayloadAction<{ data: User, message: string }>) => {

            state.loading = false
            state.error = ""
            state.isLoggedIn = true
            state.user = action.payload.data
            return state
        })
        builder.addCase(loginRequest.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(signupRequest.pending, (state) => {
            state.loading = true
            state.error = ""

        })
        builder.addCase(signupRequest.fulfilled, (state, action: PayloadAction<{ data: User, message: string }>) => {

            state.loading = false
            state.error = ""
            state.isLoggedIn = true
            state.user = action.payload.data
            return state
        })
        builder.addCase(signupRequest.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.payload
        })
        builder.addCase(profileView.pending, (state) => {

            state.loading = true;
            state.error = ""

        })
        builder.addCase(profileView.fulfilled, (state, action: PayloadAction<{ data: User, message: string }>) => {
            state.loading = false
            state.isLoggedIn = true
            state.user = action.payload.data
        })
        builder.addCase(profileView.rejected, (state, action: any) => {
            state.loading = true;
            state.error = action.payload
        })
        builder.addCase(logoutRequest.fulfilled, (state) => {
            state.user = {} as User

            state.isLoggedIn = false
        })
        builder.addCase(logoutRequest.rejected, () => {

        })
       
        builder.addCase(profileUpdate.fulfilled, (state, action: PayloadAction<{ data: User, message: string }>) => {
            state.user = action.payload.data

        })
        builder.addCase(profileUpdate.rejected, ( action) => {
            console.log(action)
            console.log("in rejected")
        })
    },


})
//export const {  } = UserSlice.actions
export default UserSlice.reducer

