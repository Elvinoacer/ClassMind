import Image from "next/image";
import React, { useState } from "react";
import imageEmpty from "../../public/images/empty.avif";

function EmptySelection({
  name,
  onPress,
  children,
}: {
  name: string;
  children?: React.ReactNode;
  onPress?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  function setLoadingExp() {
    setIsLoading(true);
    if (onPress) {
      onPress();
    }
  }

  return (
    <>
      <div className=" h-[400px] w-full relative">
        <Image
          src={imageEmpty}
          alt="albert einstein thinking"
          className="rounded-2xl absolute z-10 opacity-35 "
          fill
        />
        {children}
        <div className="text-blue-950 opacity-[1] flex flex-col items-center justify-center gap-8 absolute md:translate-x-[50%]  z-[11] ">
          <div className="mt-5 font-bold text-[40px]">Oops !</div>
          <div className="text-2xl z-[8]">
            Looks like we don&apos;t have any registered {name} yet, <br />
            Would you like to add?
          </div>
          <button
            disabled={isLoading}
            onClick={setLoadingExp}
            className="w-[200px] py-3 rounded-full flex items-center justify-center text-white uppercase cursor-pointer font-bold bg-blue-700  active:scale-75 transition-all"
          >
            {isLoading ? "One moment..." : "Add Now"}
          </button>
        </div>
      </div>
    </>
  );
}

export default EmptySelection;
