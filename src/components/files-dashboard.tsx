import { DBdataType, FileType, Unit } from "@/types/prismatypes";
import { useCallback, useLayoutEffect, useState } from "react";
import FileList from "./file-list";
import UploadBtn from "./uploadBtn";

function FilesDashboard({
  studentId,
  favoriteFiles,
  availableStorage,
  groupId,
  handleShowModal,
  unit,
  files,
  mystore,
}: {
  studentId?: string;
  favoriteFiles: FileType[];
  availableStorage?: number;
  groupId: string;
  handleShowModal?: (value: string) => void;
  unit?: Unit;
  files?: FileType[];
  mystore?: boolean;
}) {
  const [filesArr, setFiles] = useState<FileType[] | undefined | DBdataType>(
    files ?? []
  );

  // const [justUploadedFiles, setJustUploadedFiles] = useState<DBdataType[]>([]);

  // console.log("justUploadedFiles", justUploadedFiles);

  const addJustUploadedFile = useCallback(
    (val: DBdataType) => {
      if (filesArr !== undefined) {
        setFiles((prev) => [...prev, val]);
      }
    },
    [filesArr]
  );

  useLayoutEffect(() => {
    if (unit) {
      // settings to undefined
      setFiles(unit.files);

      console.log("These are your files", unit.files);
    }
  }, [unit]);

  return (
    <div className="todo h-full w-full">
      <div className="head flex flex-col">
        <h3>{mystore ? "Your Files" : unit?.unitname}</h3>
      </div>
      <div className="bg-gray-600 w-full h-[0.2px] "></div>
      <ul className="todo-list mt-3">
        {filesArr &&
          // (justUploadedFiles.length !== 0
          filesArr.map((item) => {
            const uploader =
              item?.studentId === studentId
                ? "You"
                : (item.Student?.firstname ?? "unonymous");

            return (
              <FileList
                favoriteFiles={favoriteFiles}
                studentId={studentId ?? ""}
                item={item}
                uploader={uploader}
                handleShowModal={handleShowModal}
                key={item.id}
              />
            );
          })}
        {filesArr && filesArr.length === 0 && <div>Oops, nothing here yet</div>}
      </ul>
      <div className="bg-[#3c91e6] mt-7 px-4 py-2 rounded-full font-semibold">
        <UploadBtn
          addJustUploadedFile={addJustUploadedFile}
          studentId={studentId}
          groupId={groupId}
          unitId={unit?.id}
          filesArr={filesArr}
          availableStorage={availableStorage}
        />
      </div>
    </div>
  );
}

export default FilesDashboard;
