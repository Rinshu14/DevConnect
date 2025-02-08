const mongoose=require("mongoose")
const User=require("../Models/Users")

let messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Users'
    },
    message: {
        type: String,
        require: true,

    },

}, { timestamps: true })

let chatSchema = new mongoose.Schema({

    participants: {
        type: [{ type: mongoose.Schema.Types.ObjectId, require: true, ref: User }]

    },
    message: {
        type: [messageSchema],
        require: true
    }
})


// const Users = mongoose.model("Users", userSchema)

// module.exports = Users;

const Chat = mongoose.model("Chat", chatSchema)

module.exports = Chat