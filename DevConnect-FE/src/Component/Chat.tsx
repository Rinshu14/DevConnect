import ChatMessage from './ChatMessage'
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import UseAppSelector from '../Hooks/UseAppSelector'
import InputBox from '../CustomComponents/InputBox'
import Button from '../CustomComponents/Button'
import { socketInstance } from '../Utils/Socket'
import { ChatMessageType } from "../Types/CommonTypes"
import { fetchChat } from "../Services/ChatAsync"
import { defaultUserImage, themes } from "../Utils/ApplicationConstants"
import "./ChatMessage.css"



const Chat = () => {

    let targetUserId = useParams().userId;
    let socketRef = useRef(socketInstance.getSocket());
    const messageRef = useRef<HTMLInputElement>(null)
    const lastDivRef = useRef<HTMLDivElement>(null)
    const [chatArr, setChatArr] = useState<ChatMessageType[]>([])
    const user = UseAppSelector((state) => state.User.user)
    let targetUserDetails = UseAppSelector((state) => state.Connections.find((user) => user._id == targetUserId))


    // console.log(targetUserDetails?.photoUrl)

    useEffect(() => {

        if (user._id == null || targetUserDetails == null) return;
        //first fetch existing chat
        (async () => {

            if (targetUserDetails?._id) {
                let data = await fetchChat(targetUserDetails?._id)
                // console.log(data)
                setChatArr([...data])
            }
        })()


        //join room
        socketRef.current?.emit("joinChat", { userId: user._id, targetUserId: targetUserDetails._id })

        socketRef.current?.on("messageReceived", (data) => {
            console.log("in mess")
            console.log(data)
            setChatArr((prev) => [...prev, data])
        })

        return () => {
            socketInstance.dispose();
        }

    }, [])


    useEffect(() => {
        if (lastDivRef) lastDivRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatArr])


    const handleSendClick = () => {
        socketRef.current?.emit("newMessage", { userId: user._id, targetUserId: targetUserDetails?._id, message: messageRef.current?.value })
        if (messageRef.current) messageRef.current.value = "";
    }

    return (
        <div className="card bg-base-300 w-[35rem] shadow-xl h-[28rem] m-auto p-2 px-4">
            <div className='h-10'>
                <h1 className="text-2xl font-bold">Let’s Chit-Chat</h1>
            </div>

            <div className='border-2 h-[24rem] border-gray-700 rounded-lg p-2  flex flex-col '>
                <div className='flex items-center'>
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt={`${user.firstName}`}
                                src={(targetUserDetails?.photoUrl) ? targetUserDetails?.photoUrl : defaultUserImage} />
                        </div>
                    </div>

                    <h1 className="inline text-xl font-bold ml-2">{targetUserDetails?.firstName}</h1>
                </div>
                <hr className={`my-2 ${(themes.light.toString() == user.theme) ? "hr-light" : "hr-dark"}`} />

                <div className='flex-1 overflow-y-scroll flex flex-col px-2'>
                    {chatArr.map((item) => {
                        let timeArr = item.time.split(",")
                        let time = (timeArr[0].trim() == new Date().toLocaleDateString("en-GB")) ? timeArr[1].trim() : item.time
                        return <ChatMessage key={item._id} message={item.message} time={time} align={(item.senderId == user._id) ? "chat-end" : "chat-start"} theme={user.theme} />
                    })}

                    <div ref={lastDivRef}></div>

                </div>


                <div className='w-full  flex gap-2'>
                    <InputBox type="text" placeholder="Type here" ref={messageRef} />
                    <Button text="Send" category={"primary"} onClick={handleSendClick} />
                </div>

            </div>


        </div>



    )
}

export default Chat