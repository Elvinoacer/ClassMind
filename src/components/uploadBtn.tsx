import { useAddDBFileMutation, useAddFileMutation } from "@/rtk";
import { addPDF } from "@/store/features/counterslice";
import { DBdataType, FileType } from "@/types/prismatypes";
import { Button } from "@mui/material";
import React, { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

function UploadBtn({
  studentId,
  availableStorage,
  addJustUploadedFile,
  filesArr,
  unitId,
  groupId,
}: {
  unitId?: string;
  groupId: string;
  filesArr: FileType[];
  availableStorage: number;
  studentId?: string;
  addJustUploadedFile: (val: DBdataType) => void;
}) {
  const inputREf = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const [addFile] = useAddFileMutation();
  const [addDbFile] = useAddDBFileMutation();
  function addPdfHandlerChange(e: React.ChangeEvent<HTMLInputElement>) {
    // const files = e.target.files;

    const files = Array.from(e.target.files);
    // Now you have an array of File objects named 'files'
    // console.log(files);
    // Example: Process each file (e.g., display file names)
    // files.forEach((file) => {
    //   console.log(file);
    // });

    // console.log(files);
    // return;
    try {
      if (!files) return;
      // const file = files[0];
      files.forEach((file) => {
        dispatch(addPDF(URL.createObjectURL(file)));
        console.log(file);
        const filename = file.name.split(".")[0];
        if (availableStorage < 1) {
          toast.warning("Not enough storage available");
          return;
        }
        if (filesArr.some((fil) => fil.filename === filename)) {
          toast.warning(
            `This file exists, Please change the name for a new file`
          );
          return;
        }

        // const extension = fileString.pop();
        const fileSize = file.size / 1000;
        const filesize =
          fileSize < 1024 ? `${fileSize} KB` : `${fileSize / 1000} MB`;
        const filesizeStr = `${filename}  ${filesize}`;
        console.log(`File size: ${filesizeStr}`);

        console.log(`THIS IS THE FILE  ${file}`);

        async function addFileToDb() {
          const formData = new FormData();
          formData.append("file", file);

          const { data: awsData } = await addFile(formData);
          console.log(`awsData : ${awsData}`);

          const fileSizeArr = filesize.split(" ");
          const fileSize = +fileSizeArr[0];
          let fileSizeStorage;
          if (fileSizeArr[1] === "KB") {
            fileSizeStorage = fileSize / 1024;
          } else {
            fileSizeStorage = fileSize;
          }
          console.log("fileSizeStorage", fileSizeStorage);

          const { data: DBdata } = await addDbFile({
            filename,
            filesize,
            unitId,
            groupId,
            fileSizeStorage,
            studentId,
            url: awsData.url,
          });

          console.log(`DBDATA ${JSON.stringify(DBdata)}`);
          toast.success(`File uploaded successfully`);
          addJustUploadedFile(DBdata);
        }
        addFileToDb();
        console.log(URL.createObjectURL(file));
      });
    } catch (error) {
      consle.log(error);
      toast.error("An error occurred");
    }
  }

  function handleOnClickInput() {
    inputREf.current?.click();
  }
  return (
    <>
      <input
        type="file"
        accept=".pdf"
        hidden
        multiple
        ref={inputREf}
        onChange={addPdfHandlerChange}
      />

      <div className="w-full flex items-center justify-center">
        <div>
          <Button variant="text" className="gap-2" onClick={handleOnClickInput}>
            <FiUploadCloud color="white" />
            <span className="text-white font-bold">Upload</span>
          </Button>
        </div>
      </div>
    </>
  );
}

export default UploadBtn;
