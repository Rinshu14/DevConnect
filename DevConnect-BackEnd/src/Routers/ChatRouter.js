const express = require("express")
const router = express.Router()
const UserAuth = require("../Middlewares/auth")
const { APIError } = require("../Utils/APIError")
const { APIResponse } = require("../Utils/APIResponse")
const Chat = require("../Models/Chat")

router.get("/getMessages/:targetUserId", UserAuth, async (req, res) => {

    let targetUserId = req.params.targetUserId;
    let userId = req.User._id;

    let existingChat = await Chat.findOne({ participants: { $all: [userId, targetUserId], $size: 2 } })
    //.populate("message.senderId", "firstName")

    if (existingChat) {
        let responseArr = [];
        existingChat.message.map((item) => {

            let time = new Date(item.createdAt).
                toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });

            //console.log(new Date(time))
            let obj = {
                senderId: item.senderId,
                message: item.message,
                time: time,
                _id: item._id
            }

            responseArr.push(obj);
        })


        res.send(new APIResponse(200, responseArr, "Successful"))
    }
    else {
        res.send(new APIResponse(200, [], "successful"))

    }

})

module.exports = router
