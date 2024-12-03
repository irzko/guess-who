"use client";
import io from "socket.io-client";
import type { Socket } from "socket.io-client";
let socket: undefined | Socket;
import { useEffect, useState } from "react";

export default function Page() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [msgInput, setMsgInput]= useState<string>("");

  useEffect(() => {
    fetch("/api/socket");
    socket = io();

    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function receiveMessage(data: string) {
      setMessages((prev) => {
        return [...prev, data];
      });
    }
    
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", receiveMessage);
    
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket?.emit("message", msgInput);
    setMsgInput("");
  }

  

  

  return <>
  <p>{isConnected ? "Đã kết nối" : "Đã ngắt kết nối"}</p>
    <ul>
      {messages.map((message, index) => <li key={index}>{message}</li>)}
    </ul>
    <form onSubmit={handleSubmit} >
    <input onChange={(e) => setMsgInput(e.target.value)} value={msgInput} className="border py-2" placeholder="nhập tin nhắn"/>
      <button>Gửi</button>
    </form>
  </>;
}
