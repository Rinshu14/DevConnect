import "./ChatMessage.css"
import { themes } from "../Utils/ApplicationConstants"

type ChatMessagePropsType = {

  message: string,
  time: string,
  align: string,
  theme: string,

}

const ChatMessage = ({ message, time, align, theme }: ChatMessagePropsType) => {

  return (
    <div className={`chat ${align} `}>
      <div className={`chat-bubble ${(theme == themes.light.toString()) ? "chat-bubble-light" : "chat-bubble-dark"} py-1 min-h-[2.2rem] break-words`}>{message}</div>
      <div className="chat-footer opacity-50 p-0">{time}</div>
    </div >

    // <div className={`min-w-[7rem] max-w-[14rem] px-4 py-2 text-base rounded-lg shadow-md bg-gray-800 relative break-words w-fit my-1 ${(align == "right") ? "ml-auto" : ""}`}>
    //   <span className="break-words block"> {message} </span>
    //   <div className=" absolute flex justify-end items-center text-xs text-opacity-80 bottom-[4px] right-1 ">
    //     <span className="inline-block text-[0.6rem] leading-[0.1rem]">{time}</span>
    //   </div>
    // </div>

  )
}

export default ChatMessage