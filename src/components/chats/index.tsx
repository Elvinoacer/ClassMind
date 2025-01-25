"use client";
import { ChatScreenProps, MessageType } from "@/types/prismatypes";
import Chat from "./Chat";
import Inputs from "./Inputs";
import SignUp from "./SignUp";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
const socket = io("https://elvin-socket.onrender.com");
export type SocketType = typeof socket;

export default function ChatScreen({
  studentname,
  institutionGroupId,
  courseCode,
  studentId,
  yearGroup,
  picture,
}: ChatScreenProps) {
  const [chat, setChat] = useState<MessageType[] | []>([]);
  const [typing, setTyping] = useState<MessageType["user"][] | []>([]);
  const [input, setInput] = useState(studentname);

  const user = useRef<{ name: string; id: string } | null>(null);

  useEffect(() => {
    socket.on("recieve_message", (msg) => {
      if (!user.current) return;
      // these messages can be stored in db here
      setChat((prev) => [...prev, msg]);
    });

    socket.on("user_typing", (data) => {
      if (!user.current) return;
      setTyping((prev) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (typing.includes(data.user) && data.typing === true) return prev;
        if (data.typing === false) {
          return prev.filter((u) => u !== data.user);
        } else {
          return [...prev, data.user];
        }
      });
    });

    function returnContent(newUser: string) {
      if (newUser === user?.current?.name) {
        return ` You joined ${courseCode}/${yearGroup?.slice(-2)} chat group`;
      } else {
        return `${newUser} Joined`;
      }
    }

    socket.on("user-connected", (newUser) => {
      if (!user.current) return;

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setChat((prev) => [
        ...prev,
        {
          content: returnContent(newUser),
          type: "server",
        },
      ]);
    });

    return () => {
      socket.off("recieve_message");
      socket.off("user_typing");
      socket.off("user-connected");
    };
  });
  return (
    <main className="h-screen max-h-[90%] max-w-[90%] mx-auto md:container md:p-20 md:pt-4">
      {user.current ? (
        <>
          <Chat
            studentId={studentId}
            user={user.current}
            chat={chat}
            typing={typing}
            groupId={institutionGroupId}
          />
          <Inputs
            studentId={studentId}
            setChat={setChat}
            user={user.current}
            picture={picture}
            institutionGroupId={institutionGroupId}
            socket={socket}
          />
        </>
      ) : (
        <SignUp
          user={user}
          socket={socket}
          institutionGroupId={institutionGroupId}
          input={input}
          setInput={setInput}
          courseCode={courseCode}
          yearGroup={yearGroup}
        />
      )}
    </main>
  );
}
