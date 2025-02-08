const express = require("express");
const http = require("http");
const db = require("./Config/Database");
const app = express();
const cors = require("cors")
require('dotenv').config();
const cookieParser = require("cookie-parser")
const ProfileRouter = require("./Routers/ProfileRouter")
const AuthRouter = require("./Routers/AuthRouter")
const RequestRouter = require("./Routers/RequestRouter")
const UserRouter = require("./Routers/UserRouter")
const FeedRouter = require("./Routers/FeedRouter")
const ChatRouter = require("./Routers/ChatRouter")
const InitializeSocket = require("./Utils/Socket")


app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(AuthRouter)
app.use("/profile", ProfileRouter)
app.use("/request", RequestRouter)
app.use("/user", UserRouter)
app.use(FeedRouter)
app.use("/chat",ChatRouter);

const port = process.env.PORT
const server = http.createServer(app);
InitializeSocket(server);



db().then(() => {
   
    server.listen(port, () => {
        console.log("server started");
    });
}).catch((err) => {
    console.log("databse can not be connected")
    console.log(err)
})




