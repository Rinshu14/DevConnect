import { Middleware } from "@reduxjs/toolkit";
//import { createListenerMiddleware } from "@reduxjs/toolkit";

export const logger: Middleware = (state) => (next) => (action) => {
    // console.log(action)
    // console.log(state.getState())

    // console.log("middleware")
   /// const listner = createListenerMiddleware()

    //console.log(listner)

    next(action)


}