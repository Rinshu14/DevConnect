
import axios from "axios"



export const fetchChat = async (targetUserId: string) => {
    let data = await axios.get(`${import.meta.env.VITE_BASEAPIURL}${import.meta.env.VITE_CHATURL}/${targetUserId}`, { withCredentials: true })
    return data.data.data
}