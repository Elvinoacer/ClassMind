import Image from "next/image";
import Link from "next/link";
import React from "react";

const imagesForStartScreen = [
  "https://images.unsplash.com/photo-1737562963380-3a7e45c0bf31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNnx8fGVufDB8fHx8fA%3D%3D",
  "https://media.istockphoto.com/id/1533529011/photo/beauty-shot-of-beautiful-black-woman-in-monochromatic-pink-stock-photo-copy-space.webp?a=1&b=1&s=612x612&w=0&k=20&c=5ugt1FxcTgjJZMZy-h6ZmEWBbkR9SS-zjGlDhWwOmSk=",
  "https://media.istockphoto.com/id/1496615445/photo/portrait-of-beautiful-happy-woman-smiling-during-sunset-outdoor.webp?a=1&b=1&s=612x612&w=0&k=20&c=7VpfGJZB6Vv3phNfCzkQR9_ulHrQ2N7x6CRH0NyZMC4=",
  "https://media.istockphoto.com/id/1759448630/photo/happy-caucasian-young-student-female-looking-at-camera-enjoying-with-a-perfect-white-teeth.webp?a=1&b=1&s=612x612&w=0&k=20&c=31oi_Wjs1G80TxpsOnQKGKeqbQBUWff6-ODuwQwiQ3Q=",
];

function ImageList({ studentId }: { studentId: string }) {
  return (
    <div className="w-full h-full bg-blue-400 flex  items-center justify-center rounded-lg ">
      <div className="flex items-center justify-center flex-wrap ">
        <div className="flex h-[50px] overflow-hidden">
          <Image
            src={imagesForStartScreen[3]}
            width={50}
            className="rounded-full "
            height={50}
            alt="a person"
          />
          <Image
            src={imagesForStartScreen[2]}
            width={50}
            className="rounded-full -ml-8 shadow"
            height={50}
            alt="a person"
          />
          <Image
            src={imagesForStartScreen[1]}
            width={50}
            className="rounded-full -ml-8 shadow"
            height={50}
            alt="a person"
          />
          <Image
            src={imagesForStartScreen[0]}
            width={50}
            className="rounded-full -ml-8 shadow"
            height={50}
            alt="a person"
          />
        </div>
        <div className="text-white font-bold ml-3 text-sm mt-3">
          <p>Over 2000 communities</p>
          Click &nbsp;
          <Link
            className="text-[#161a20] underline"
            href={`/dashboard/${studentId}/chats`}
          >
            &nbsp; Here
          </Link>{" "}
          to get started!
        </div>
      </div>
    </div>
  );
}

export default ImageList;
