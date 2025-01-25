import { deleteFile } from "@/app/_actions/handleSubmitForm";
import { useFavFileMutation } from "@/rtk";
import {
  addFavFile,
  addPDF,
  removeDBFile,
  removeFavFile,
} from "@/store/features/counterslice";
import { FileTypeDB } from "@/types/prismatypes";
import { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { MdDeleteSweep } from "react-icons/md";
import { RiProhibitedLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Toaster, toast } from "sonner";
import CircularColor from "./material-ui/circular-progress";

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

function formatTimestamp(timestampString: string) {
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
  groupId,
  handleShowModal,
  uploader,
  favoriteFiles,
}: {
  item: FileTypeDB;
  unitId?: string;
  groupId: string;
  favoriteFiles: FileTypeDB[];
  studentId: string;
  handleShowModal?: (val: string) => void;
  uploader: string;
}) {
  const dispatch = useDispatch();
  const [favoriteFile] = useFavFileMutation();
  const [deleting, setDeleting] = useState(false);

  async function handleDeleteFile() {
    setDeleting(true);
    try {
      await deleteFile({ ...item, groupId });
      dispatch(removeDBFile({ fileId: item.id || "", unitId: item.unitId }));
      dispatch(removeFavFile(item.id || ""));
      setDeleting(false);
      toast.success("File deleted successfully");
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("An Error occured");
    }
    setDeleting(false);
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
                dispatch(removeFavFile(item.id || ""));
                await favoriteFile({
                  action: "unFav",
                  fileId: item.id || "",
                  studentId: studentId,
                });
              } else {
                dispatch(addFavFile(item));
                await favoriteFile({
                  action: "Fav",
                  fileId: item.id || "",
                  studentId: studentId,
                });
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
