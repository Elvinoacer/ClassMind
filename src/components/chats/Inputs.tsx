import { MessageType } from "@/types/prismatypes";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { SocketType } from ".";
import { send } from "./assets";
import { useAddChatMutation } from "@/rtk";

interface InputChatType {
  user: { name: string; id: string };
  picture?: string;
  socket: SocketType;
  setChat: Dispatch<SetStateAction<[] | MessageType[]>>;
  studentId?: string;
  institutionGroupId: string;
}

const Inputs = ({
  user,
  picture,
  studentId,
  socket,
  setChat,
  institutionGroupId,
}: InputChatType) => {
  const [input, setInput] = useState("");
  const [addChat] = useAddChatMutation();

  const sendMessage = () => {
    if (input) {
      const msg = {
        content: input,
        type: "text",
        user,
        picture: picture,
        studentId,
        groupId: institutionGroupId,
      };

      socket.emit("send_message", msg, institutionGroupId, () => {
        addChat(msg);
      });
      socket.emit("user_typing", {
        user: user.name,
        typing: false,
        room: institutionGroupId,
      });
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setChat((prev) => [...prev, msg]);
      setInput("");
    } else {
      return;
      // uploadInput.current.click();x
    }
  };

  const userTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    socket.emit("user_typing", {
      user: user.name,
      typing: e.target.value ? true : false,
      room: institutionGroupId,
    });
  };

  return (
    <div className="w-[90%] absolute bottom-0 text-xl grid grid-cols-5 gradient md:bg-none md:text-3xl md:flex md:justify-center md:relative">
      <input
        className="focus:outline-none rounded-2xl p-3 text-white placeholder-slate-200 col-span-4 gradient md:w-6/12 md:mr-3"
        type="text"
        placeholder="Enter your message"
        value={input}
        onChange={(e) => userTyping(e)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      {/* <input
        className="hidden"
        type="file"
        ref={uploadInput}
        onChange={(e) => handleImageUpload(e)}
      /> */}
      <button
        className="w-full py-2 px-3 bg-sky-400 text-white font-fold rounded-md text-xl gradient md:w-1/12 md:text-2xl"
        onClick={sendMessage}
      >
        <Image
          src={input ? send : send}
          className="w-6 md:w-12 mx-auto"
          alt="send"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
};

export default Inputs;
