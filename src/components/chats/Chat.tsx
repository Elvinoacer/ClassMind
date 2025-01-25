import { useGetMessagesQuery } from "@/rtk";
import { Message, ServerMessage, Typing } from "./Messages";
import { useEffect, useRef } from "react";
import { MessageType } from "@/types/prismatypes";

const Chat = ({
  chat,
  user,
  typing,
  groupId,
  studentId,
}: {
  chat: MessageType[];
  user: { name: string; id: string };
  typing: MessageType["user"][];
  groupId: string;
  studentId: string;
}) => {
  const { data: dbChats } = useGetMessagesQuery(groupId);
  const allChats: MessageType[] = dbChats?.concat(chat);
  const scroller = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!scroller.current) return;

    scroller.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [chat]);

  return (
    <div className="h-full pb-12 md:p-4">
      <div className="w-full h-full max-h-screen rounded-md overflow-y-auto gradient pt-2 md:pt-6 ">
        {allChats?.map((message: MessageType, index: number) => {
          message = {
            ...message,
            own:
              message.user?.id === user.id || message.studentId === studentId,
          };
          return message.type === "server" ? (
            <ServerMessage key={index} {...message} />
          ) : (
            <Message key={index} {...message} />
          );
        })}
        {typing[0] && <Typing user={typing[0]} />}
        <div ref={scroller} className="pb-2 md:pb-6" />
      </div>
    </div>
  );
};

export default Chat;
