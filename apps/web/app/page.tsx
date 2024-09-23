'use client'

import { useSocket } from "../context/SocketProvider"
import { useState } from "react";

 
export default function Page() {
  const {sendMessage,messages} = useSocket();
  const [message,setMessage] = useState(" ")
  return (
    <div>
      <div>
        <h1>All Messages will appear here</h1>
      </div>
      <div>
        <input onChange={e => setMessage(e.target.value)} type="text" placeholder="Messages" />
        <button onClick={e => sendMessage(message)}>Send</button>
      </div>
      <div>
        {messages.map(e => <li>{e}</li>)}
      </div>
    </div>
  )
}