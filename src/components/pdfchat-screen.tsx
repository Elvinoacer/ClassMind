import Image from "next/image";
import React from "react";
import image from "../assets/img/insect-1.png";
import Link from "next/link";
// import glspiral from "../assets/img/galax-spiral.jpg";

function PdfChatScreen({ name }: { name: string }) {
  return (
    <div className="w-full relative">
      {/* <div className="flex items-center justify-center gap-2 "> */}
      <div className="w-full flex justify-center">
        {" "}
        <div className="w-[100px] h-[100px] border-[0.2px] border-x-cyan-500 rounded-full ">
          <Image alt="chat-image" src={image} />
        </div>
      </div>
      <p className="doc-chat-title block text-center ">Doc chat</p>
      {/* <div className="absolute w-100 h-100 -z-20">
          <Image src={glspiral} alt="galax-spiral" />
        </div> */}
      {/* </div> */}
      <p className="text-center mt-10">
        Greetings {name}, <br />
        My team and I are highly dedicated to bring to you this feature as soon
        as possible,
        <br />
        Thank you for your patience
      </p>
      <div className="w-full mt-4 ">
        <p className="text-center">Regards</p>
        <p className="text-center mt-1 italic">e.o</p>
        <p className="text-center">
          Elvin{" "}
          <Link
            href="tel:254792156094"
            className="ml-2 text-blue-500 underline italic"
          >
            +254792156094
          </Link>
        </p>
      </div>
    </div>
  );
}

export default PdfChatScreen;
