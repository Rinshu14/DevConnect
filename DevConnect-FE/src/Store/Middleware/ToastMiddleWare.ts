import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toastManager } from "../../CustomComponents/ToastManager";
import { ToastType } from "../../Types/Enums";


export const listnerMiddleware = createListenerMiddleware();

listnerMiddleware.startListening({
    matcher: (action) => {
      // console.log(action.type)
        return (action.type == 'users/profileUpdate/fulfilled' || action.type == 'connectionRequest/AcceptRequest/fulfilled')
    },
    effect: async (action, listenApi) => {
        //console.log(action.type)
        toastManager.addToast({ message: action.payload.message, type:ToastType.success  });
    }
})


listnerMiddleware.startListening({
    matcher: (action) => {

        return (action.type.endsWith('/rejected')  && action.type != 'users/profileView/rejected')
    }, // Match all rejected async actions
    effect: (action) => {
        console.log("in effect rejected")
        console.log(action.payload)
        // console.log(listenApi)
        toastManager.addToast({ message: action.payload.message, type: ToastType.error });

    },
});





