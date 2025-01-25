import { Student } from "@/types/prismatypes";
import Image from "next/image";

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

function FavoritedList({
  favoritedBys,
  studentId,
}: {
  studentId: string;
  favoritedBys: { filename: string; favBys: Student[] }[];
}) {
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
                <span>{fav?.id === studentId ? "You" : fav?.firstname}</span>
                <div className="profile-pic-box">
                  {fav?.picture && (
                    <Image
                      width={100}
                      height={100}
                      src={fav?.picture}
                      alt=""
                      className="img-FAV"
                    />
                  )}
                  {/* TODO GET USER IMAGES */}
                  {!fav?.picture && (
                    <span className="text-blue-800">
                      {fav?.firstname.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </li>
            ))}
            {favBy?.favBys?.length === 0 && <div>Oops!, none yet!</div>}
            <div className="line"></div>
          </div>
        ))}
    </ul>
  );
}

export default FavoritedList;
