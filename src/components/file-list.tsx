import { useAppSelector } from "@/hooks";
import { addFavoriteFile, addPDF } from "@/store/features/counterslice";
import { FileContent, FileType } from "@/types/prismatypes";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { MdDeleteSweep } from "react-icons/md";
import { useDispatch } from "react-redux";
import { RiProhibitedLine } from "react-icons/ri";
import { Toaster, toast } from "sonner";
import CircularColor from "./material-ui/circular-progress";
import { deleteFile } from "@/app/_actions/handleSubmitForm";
import { useFavFileMutation } from "@/rtk";

function formatFileSize(fileSize: string) {
  const file = fileSize.split(" ");
  const filesize = +file[0];
  const unit = file[1];
  return `${Math.round(filesize)} ${unit}`;
}
function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.substring(0, maxLength) + "...";
  }
}

function formatTimestamp(timestampString) {
  // Parse the timestamp string into a Date object
  const timestamp = new Date(timestampString);

  // Format the date using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "2-digit",
  });

  return formatter.format(timestamp);
}

export default function FileList({
  studentId,
  item,
  handleShowModal,
  uploader,
  favoriteFiles,
}: {
  item: FileContent;
  favoriteFiles: FileType[];
  studentId: string;
  handleShowModal?: (val: string) => void;
  uploader: string;
}) {
  console.log(item);
  const dispatch = useDispatch();

  const [favoriteFile] = useFavFileMutation();
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteFile() {
    try {
      setDeleting(true);
      await deleteFile(item);
      setDeleting(false);
      toast.success("File deleted successfully");
    } catch (error) {
      toast.error("An Error occured");
      setDeleting(false);
    }
  }

  return (
    <div className="flex items-center gap-3 mb-6">
      <li
        className=" flex flex-wrap hover:cursor-pointer"
        key={item.id}
        onClick={() => {
          if (handleShowModal) {
            handleShowModal(uploader);
          }
          dispatch(addPDF(item.url));
          console.log(item.url);
        }}
      >
        <p className="capitalize">{truncateText(item.filename, 20)}</p>

        <div className="extra-details">
          <p className="by-uploader  top-2 right-2 text-xs">
            {formatTimestamp(item.createdAt)}
          </p>
          <p className="by-uploader  bottom-2 right-2 text-xs">
            by
            {` ${uploader}`}
          </p>
        </div>
        <div>{formatFileSize(item.filesize)}</div>
      </li>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="">
          <IoMdStar
            className="cursor-pointer hover:scale-110"
            size={32}
            onClick={async () => {
              if (favoriteFiles.some((file) => file.id === item.id)) {
                const data = await favoriteFile({
                  action: "unFav",
                  fileId: item.id,
                  studentId: studentId,
                });
                console.log(data);
              } else {
                const data = await favoriteFile({
                  action: "Fav",
                  fileId: item.id,
                  studentId: studentId,
                });
                console.log(data);
              }
            }}
            color={
              favoriteFiles.some((file) => file.id === item.id)
                ? "purple"
                : "#3b82f6"
            }
          />
        </div>

        <div className="bg-gray-600 w-full h-[0.2px] "></div>
        {deleting && <CircularColor color="error" />}
        {item.studentId === studentId && !deleting && (
          <MdDeleteSweep
            onClick={handleDeleteFile}
            size={32}
            color="red"
            className="cursor-pointer hover:scale-110 active:scale-125"
          />
        )}

        {item.studentId !== studentId && (
          <RiProhibitedLine size={32} color="red" />
        )}
      </div>
      <Toaster richColors />
    </div>
  );
}
