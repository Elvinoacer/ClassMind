"use client";
import { Input } from "@mui/material";
import { connection } from "next/server";
import React, { useEffect, useRef, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

let connectionId: string | undefined;
socket.on("connect", () => {
  console.log(`You are connected to the socket with ${socket.id}`);

  connectionId = socket.id;
});

function Page() {
  //   const [sender, setSender] = useState(0);

  const [messages, setMessages] = useState<
    { user: string | undefined; message: string }[]
  >([]);

  const [message, setMessage] = useState("");

  function handleSubmit() {
    socket.emit("send-message", { message, user: connectionId });
    setMessages((prev) => [...prev, { user: connectionId, message }]);
    setMessage("");
  }

  useEffect(() => {
    socket.on("receive-message", ({ message, user }) => {
      setMessages((prev) => [...prev, { user, message }]);
      console.log(message, `User : ${user}`, `connectionId:   ${connectionId}`);
    });
  }, []);

  return (
    <div className="w-full bg-blue-500 h-[100vh] flex items-center  justify-center">
      <div className="text-white">
        <div>Hello Elvin, back</div>
        <div>
          <div className="w-[300px] h-[500px] bg-slate-300  flex flex-col relative">
            {messages.map((chat, i) => (
              <Message message={chat.message} key={i} user={chat.user} />
            ))}
            <ChatIput
              onSubmit={handleSubmit}
              value={message}
              onChange={setMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

function Message({
  message,
  user,
}: {
  message: string;
  user: string | undefined;
}) {
  return (
    <div
      className={`flex ${user !== connectionId ? "self-start bg-slate-400 rounded-tl-lg" : "self-end bg-blue-500 mr-2 rounded-tr-lg"} w-[200px] items-center justify-center font-bold  border-blue-500 border-[0.5px] mt-4 ml-4 rounded-full px-4 py-1`}
    >
      {message}
    </div>
  );
}

function ChatIput({ onSubmit, value, onChange }) {
  return (
    <div className=" absolute bottom-3 right-10 flex justify-center items-center">
      <Input onChange={(e) => onChange(e.target.value)} value={value} />
      <button onClick={onSubmit} className="bg-blue-500 px-3 rounded-full">
        Send
      </button>
    </div>
  );
}
