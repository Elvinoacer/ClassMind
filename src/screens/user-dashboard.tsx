import FavoritedByModal from "@/components/favorites/favoritedBy-modal";
import FileList from "@/components/file-list";
import { FavoriteFile, FileTypeR, Student } from "@/types/prismatypes";
// import { PieChart } from "@mui/x-charts/PieChart";
import { PieChart } from "react-minimal-pie-chart";

function calcPercentage(val: number, total: number) {
  const percentage = ((val / total) * 100).toFixed(1);
  return `${percentage}%`;
}

// function formatTimestamp(timestampString) {
//   // Parse the timestamp string into a Date object
//   const timestamp = new Date(timestampString);

//   // Format the date using Intl.DateTimeFormat
//   const formatter = new Intl.DateTimeFormat("en-US", {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//     year: "2-digit",
//   });

//   return formatter.format(timestamp);
// }

// function truncateText(text: string, maxLength: number) {
//   if (text.length <= maxLength) {
//     return text;
//   } else {
//     return text.substring(0, maxLength) + "...";
//   }
// }

function UserDashboard({
  studentId,
  availableStorage,
  userFavoritesFiles,
  studentFiles,
  handleShowModal,
  storage,
  freePlanAllocation,
}: {
  studentId: string;
  availableStorage: number;
  studentFiles: FileTypeR[];
  userFavoritesFiles: FavoriteFile[];
  handleShowModal?: (value: string) => void;
  storage: number | null;
  freePlanAllocation: number | null;
}) {
  console.log("Userfav files", userFavoritesFiles);

  const favoritedBys: { filename: string; favBys: Student[] }[] =
    studentFiles?.map((file) => ({
      filename: file.filename,
      favBys: file.favoritedBy,
    }));
  console.log("User favoritedBys", favoritedBys);

  return (
    <div className="w-full">
      <div className="storage-size">
        <div className="flex justify-center items-center flex-col">
          <PieChart
            lengthAngle={-180}
            reveal={100}
            animate
            data={[
              {
                title: "Remaining storage",

                value: availableStorage
                  ? availableStorage
                  : (freePlanAllocation ?? 1),
                color: "#3c91e6 ",
              },
              { title: "storage-used", value: storage ?? 0, color: "red" },
            ]}
          />

          <div className="pie-details">
            <div className="available">
              <div className="box bg-[#3c91e6]"></div>
              <span>
                Available Space: &nbsp;
                {availableStorage?.toFixed(2)}
                MB
              </span>
            </div>
            <div className="used">
              <div className="box usedSpace"></div>
              <span>Used Space:&nbsp;{storage?.toFixed(2) ?? 0}MB</span> ||
              {freePlanAllocation && storage && (
                <span>{calcPercentage(storage, freePlanAllocation)}</span>
              )}
            </div>
            <div className="mt-3 mb-5">
              <span className="font-bold ">
                Allocated Space:&nbsp;
                <span className="text-blue-500 ">{freePlanAllocation}</span>
                MB
              </span>
            </div>
            <div className="w-full">
              <button className="action-button animatedBlock">
                <div className="animatedText">Buy storage</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="storage-size">
        <div className="flex justify-center items-center flex-col mt-6">
          <PieChart
            lengthAngle={-180}
            reveal={100}
            animate
            data={[
              { title: "Remaining storage", value: 10, color: "#3c91e6 " },
              { title: "storage-used", value: 20, color: "red" },
            ]}
          />

          <div className="pie-details">
            <div>Available Tokens 20tkns</div>
            <div>Used tokens 203</div>
            <div>Allocated 5260</div>
            <div className="w-full">
              <button className="action-button">Buy Tokens</button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="w-full stats-box mt-4 mb-4">
          <h1 className="stats-title">Stats</h1>
          <div className="delivered-files">
            <span className="nowrap-class">
              Files delivered to community:
              <span className="number-files"> {studentFiles?.length}</span>
            </span>
          </div>
          <div className="total-favorites nowrap-class">
            {/* Fans Favorite: Position <span className="number-files">1</span>/34 */}
            <FavoritedByModal favoritedBys={favoritedBys} />
          </div>
        </div>
        <div className="mt-5">
          Your Favorite Files:
          <div className="todo h-full w-full">
            <ul className="todo-list mt-3">
              {userFavoritesFiles?.map((item) => {
                const uploader =
                  item?.studentId === studentId
                    ? "You"
                    : (item?.Student?.firstname ?? "unonymous");
                return (
                  <FileList
                    studentId={studentId}
                    favoriteFiles={userFavoritesFiles}
                    item={item}
                    uploader={uploader}
                    handleShowModal={handleShowModal}
                    key={item.id}
                  />
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
