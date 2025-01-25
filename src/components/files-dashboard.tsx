import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { FileType, Unit } from "@/types/prismatypes";
import FileList from "./file-list";
import UploadBtn from "./uploadBtn";

function FilesDashboard({
  studentId,
  availableStorage,
  groupId,
  handleShowModal,
  mystore,
}: {
  studentId?: string;

  availableStorage?: number;
  groupId: string;
  handleShowModal?: (value: string) => void;
  unit?: Unit;
  files?: FileType[];
  mystore?: boolean;
}) {
  const units = useAppSelector((state: RootState) => state.counter.DBUnits);
  const indexFileNav = useAppSelector(
    (state: RootState) => state.counter.indexFileNav
  );
  const unit = indexFileNav !== undefined && units ? units[indexFileNav] : null;
  // const [justUploadedFiles, setJustUploadedFiles] = useState<DBdataType[]>([]);
  const favoriteFiles = useAppSelector(
    (state: RootState) => state.counter.favoriteFiles
  );

  // useLayoutEffect(() => {
  //   if (unit) {
  //     // settings to undefined
  //     setFiles(unit.files);

  //   }
  // }, [unit]);

  return (
    <div className="todo h-full w-full">
      <div className="head flex flex-col">
        <h3>{mystore ? "Your Files" : unit?.unitname}</h3>
      </div>
      <div className="bg-gray-600 w-full h-[0.2px] "></div>
      <ul className="todo-list mt-3">
        {unit?.files &&
          // (justUploadedFiles.length !== 0
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          unit?.files.map((item) => {
            const uploader =
              item?.studentId === studentId
                ? "You"
                : (item.Student?.firstname ?? "unonymous");

            return (
              <FileList
                favoriteFiles={favoriteFiles}
                unitId={unit?.id}
                studentId={studentId ?? ""}
                item={item}
                groupId={groupId}
                uploader={uploader}
                handleShowModal={handleShowModal}
                key={item.id}
              />
            );
          })}

        {unit?.files &&
          Array.isArray(unit?.files) &&
          unit?.files?.length === 0 && <div>Oops, nothing here yet</div>}
      </ul>
      <div className="bg-[#3c91e6] mt-7 px-4 py-2 rounded-full font-semibold">
        <UploadBtn
          studentId={studentId}
          groupId={groupId}
          unitId={unit?.id}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          filesArr={unit?.files}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          availableStorage={availableStorage}
        />
      </div>
    </div>
  );
}

export default FilesDashboard;
