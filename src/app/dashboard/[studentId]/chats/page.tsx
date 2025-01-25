"use client";
import ChatScreen from "@/components/chats";
import { ChatScreenProps } from "@/types/prismatypes";
import { IoArrowBackCircleOutline } from "react-icons/io5";

import Link from "next/link";

function Chats() {
  const data: ChatScreenProps = JSON.parse(
    sessionStorage.getItem("ChatScreen") || ""
  );
  return (
    <div className="dark classbody">
      <div className="ml-3 mb-5 mt-5 relative">
        <Link
          href={`/dashboard/${data.studentId}`}
          className="bg-blue-500 px-10 py-2 text-white font-bold rounded-2xl "
        >
          <IoArrowBackCircleOutline className="absolute top-1 left-2" />
          Return to Dashboard
        </Link>
      </div>
      <ChatScreen {...data} />
    </div>
  );
}

export default Chats;
