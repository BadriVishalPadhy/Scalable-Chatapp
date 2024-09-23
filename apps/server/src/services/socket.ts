import { Server } from "socket.io";
import Redis from 'ioredis';
import { channel } from "diagnostics_channel";

const pub = new Redis({
  host: 'caching-bd6dd65-badrivishalpadhy-53e7.h.aivencloud.com',
  port: 15877,
  username:'default',
  password:'AVNS_3umARt7Uu4Z0kIEoxJ8'
});
const sub = new Redis({
  host: 'caching-bd6dd65-badrivishalpadhy-53e7.h.aivencloud.com',
  port: 15877,
  username:'default',
  password:'AVNS_3umARt7Uu4Z0kIEoxJ8'
})

class SocketService{
  static initListeners() {
    throw new Error("Method not implemented.");
  } 
  private _io:Server;

  constructor(){
    console.log("Init socket service . . . ");

    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin:"*",
      }
    });
    sub.subscribe("MESSAGES");
  }
   public initListeners() { 
    const io = this.io;
    console.log("Init Socket Listeners . . .")
    
    io.on("connect" , (socket) => {
      console.log(`New Socket got connected`,socket.id)
      socket.on("event:message",async({ message }: {message:string}) => {
        console.log("new message received",message);

        await pub.publish("MESSAGES",JSON.stringify({ message }));
      });
    });
    sub.on('message', (channel,message) => {
      if (channel === "MESSAGES") {
        io.emit("message",message)
      }
    })
   }
  get io(){
    return this._io;
  }
}
export default SocketService;

function async(arg0: { message: any; }, arg1: { message: any; }): (...args: any[]) => void {
  throw new Error("Function not implemented.");
}
