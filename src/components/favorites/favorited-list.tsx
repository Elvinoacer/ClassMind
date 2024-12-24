import { Student } from "@/types/prismatypes";
import Image from "next/image";
import React from "react";
import image1 from "@/assets/img/star-trophy.png";

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

function FavoritedList({
  favoritedBys,
}: {
  favoritedBys: { filename: string; favBys: Student[] }[];
}) {
  console.log("FavoriteBys: +++++ " + favoritedBys);
  return (
    <ul className="">
      {favoritedBys &&
        favoritedBys?.map((favBy) => (
          <div key={favBy?.filename} className="mb-12">
            <li className="file-name-FAV text-blue-500">
              {truncateText(favBy.filename, 25)}
            </li>

            {favBy?.favBys?.map((fav) => (
              <li className="pr-6" key={fav.id}>
                <span>{fav?.firstname}</span>
                <div className="profile-pic-box">
                  <Image width={100} src={image1} alt="" className="img-FAV" />
                  {/* TODO GET USER IMAGES */}
                  {/* <span className="text-blue-800">E</span> */}
                </div>
              </li>
            ))}
            <div className="line"></div>
          </div>
        ))}
    </ul>
  );
}

export default FavoritedList;
