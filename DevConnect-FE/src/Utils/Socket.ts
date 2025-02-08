import { io, Socket } from "socket.io-client"

class SocketClass {


    private static instance: SocketClass | null = null;
    private socket: Socket | null = null;

    private constructor() {
        SocketClass.instance = this;
        if(location.hostname="localhost")this.socket = io("http://localhost:3000");
        else this.socket = io("/api/socket.io");
    }


    public static getInstance() {
        if (SocketClass.instance == null) {
            SocketClass.instance = new SocketClass();
        }
        return SocketClass.instance;
    }

    public getSocket(): Socket | null {

        if (SocketClass.instance == null) SocketClass.instance = new SocketClass();
        return SocketClass.instance.socket;

    }



    public dispose(): void {

        SocketClass.instance?.socket?.disconnect();
        SocketClass.instance = null;
        console.log("connection closed")
    }

}




export const socketInstance = SocketClass.getInstance();