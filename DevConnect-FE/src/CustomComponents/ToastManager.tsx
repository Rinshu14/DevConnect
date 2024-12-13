import  { useState ,useEffect} from 'react'
import Toast from "./Toast"
import { BaseToastType } from '../Types/CommonTypes'


type toastMapvalue = {
    id: string
    toastValue:BaseToastType
}

let count = 0;
function genId() {
    count = (count + 1) % Number.MAX_SAFE_INTEGER
    return count.toString()
}


export const toastManager:{addToast:(data:BaseToastType)=>void }={addToast:()=>{}}

const ToastManager = () => {

    const [toasts, setToasts] = useState(new Map<string, toastMapvalue>())
    


    const addToast = ({ message, type }: BaseToastType) => {
        const toastId = genId()
        setToasts((prevToasts) => new Map(prevToasts).set(toastId, { id:toastId,toastValue: {message, type }}))
        setTimeout(() => removeToast(toastId), 5000)
    }

    
    const removeToast = (id: string) => {
        setToasts((prevToasts) => {
            let newMap = new Map(prevToasts)
            newMap.delete(id)
            return newMap
        })
        
    }
    
    useEffect(() => {
        toastManager.addToast = addToast; // Set the global addToast reference
      }, [addToast]);

    return ([...toasts.values()].map((value:toastMapvalue) => <Toast message={value.toastValue.message} type={value.toastValue.type} />))


}
export default ToastManager



