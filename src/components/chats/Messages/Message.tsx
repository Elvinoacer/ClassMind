import { MessageType } from "@/types/prismatypes";
import Image from "next/image";

const Message = ({ content, type, own, user, picture }: MessageType) => {
  return (
    <p className={`message px-1 md:px-6 py-1 flex ${own && "justify-end "}`}>
      {!own && (
        <span
          className={`tooltip logo text-2xl bg-blue-600 text-white rounded-full ${picture ? "" : "py-2"} text-center ${picture ? "" : "px-4"} mr-2 flex items-center ${type === "text" ? "my-auto" : "max-h-12"}`}
        >
          <span className="tooltiptext">{user.name}</span>

          {!picture && user.name.charAt(0).toUpperCase()}
          {picture && (
            <Image
              width={20}
              height={20}
              className="rounded-full"
              src={picture}
              alt="sender picture"
            />
          )}
        </span>
      )}

      <span
        className={`text-xl md:text-3xl py-2 rounded-2xl text-wrap
            ${type === "text" ? "px-6" : "px-2"}
            ${own ? "bg-sky-400 text-white" : " bg-[#0c0c1e65]"}
            `}
      >
        {type === "text" ? (
          content
        ) : (
          <Image fill src={content} className="rounded-md" alt="image" />
        )}
      </span>
    </p>
  );
};

export default Message;
