const Server = require("socket.io").Server
const Chat = require("../Models/Chat")
const Users = require("../Models/Users")


function InitializeSocket(httpServer) {

    const io = new Server(httpServer, { cors: { origin: "http://localhost:5173" } })

    io.on("connect", (socket) => {

        socket.on("joinChat", ({ userId, targetUserId }) => {
            socket.join([userId, targetUserId].sort().join("_"))
        })

        socket.on("newMessage", async ({ userId, targetUserId, message }) => {
          

            let roomId = [userId, targetUserId].sort().join("_")
            //saveMessage in database

            //find is any document exits for this userId and targetId combination
            let existingChat = await Chat.findOne({ participants: { $all: [userId, targetUserId], $size: 2 } })
            let data = null;

            //if yes than just push this new meassge into its message array
            if (existingChat) {
                existingChat.message.push({ senderId: userId, message: message })
                data = await existingChat.save();
            }

            else {
                //if no create new document
                let chatMessage = { participants: [userId, targetUserId], message: { senderId: userId, message: message } }
                const newChat = new Chat(chatMessage);
                data = await newChat.save();
            }

            //find the fisrtNmae of target userId
        
            let ans = null;
            if (data) {
                let lastMessage = data.message[data.message.length - 1]
                console.log(typeof new Date(lastMessage.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).toString())
                ans = {
                    senderId: userId,
                    message: lastMessage.message,
                    _id: lastMessage._id,
                    time: new Date(lastMessage.createdAt).toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).toString()
                }
            }

            //broadcast message to other user
            io.to(roomId).emit("messageReceived", ans)

        })

        socket.on("disconnect", () => {
            console.log("socket disconnect called")
        })
        
    })

}

module.exports = InitializeSocket