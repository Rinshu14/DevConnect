import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toastManager } from "../../CustomComponents/ToastManager";
import { ToastType } from "../../Types/Enums";


export const listnerMiddleware = createListenerMiddleware();

listnerMiddleware.startListening({
    matcher: (action) => {

        return (action.type == 'users/profileUpdate/fulfilled' || action.type == 'connectionRequest/AcceptRequest/fulfilled')
    },
    effect: async (action, _) => {

        toastManager.addToast({ message: action.payload.message, type: ToastType.success });
    }
})


listnerMiddleware.startListening({
    matcher: (action) => {

        return (action.type.endsWith('/rejected') && action.type != 'users/profileView/rejected')
    },
    effect: (action) => {


        toastManager.addToast({ message: action.payload.message, type: ToastType.error });

    },
});





