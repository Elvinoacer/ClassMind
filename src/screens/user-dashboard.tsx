import FavoritedByModal from "@/components/favorites/favoritedBy-modal";
import FileList from "@/components/file-list";
import { useAppSelector } from "@/hooks";
import { RootState } from "@/store/store";
import { FavoriteFile, FileTypeR, Student } from "@/types/prismatypes";
import { useEffect, useState } from "react";

import { PieChart } from "react-minimal-pie-chart";
import { toast, Toaster } from "sonner";

function calcPercentage(val: number, total: number) {
  const percentage = ((val / total) * 100).toFixed(1);
  return `${percentage}%`;
}

function UserDashboard({
  studentId,
  availableStorage,
  // userFavoritesFiles,
  studentFiles,
  handleShowModal,
  storage,
  freePlanAllocation,
  groupId,
}: {
  studentId: string;
  groupId?: string;
  availableStorage: number;
  studentFiles: FileTypeR[];
  userFavoritesFiles: FavoriteFile[];
  handleShowModal?: (value: string) => void;
  storage: number | null;
  freePlanAllocation: number | null;
}) {
  const [isMobile, setIsMobile] = useState(false);

  const favoritedBys: { filename: string; favBys: Student[] }[] =
    studentFiles?.map((file) => ({
      filename: file.filename,
      favBys: file.favoritedBy,
    }));

  const userFavoritesFiles = useAppSelector(
    (state: RootState) => state.counter.favoriteFiles
  );

  useEffect(() => {
    const handleResize = () => {
      const isMobileDevice = window.innerWidth <= 900; // Adjust breakpoint as needed
      if (isMobileDevice) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        className={`flex  ${isMobile ? "flex-wrap" : ""} items-center justify-between`}
      >
        <div className="storage-size">
          <div className="flex justify-center items-center flex-col">
            <PieChart
              lengthAngle={-180}
              // reveal={100}

              startAngle={0}
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
                <span className="wrapper-span">
                  Available Space: &nbsp;
                  {availableStorage?.toFixed(2)}
                  MB
                </span>
              </div>
              <div className="used">
                <div className="box usedSpace"></div>
                <span className="wrapper-span">
                  Used Space:&nbsp;{storage?.toFixed(2) ?? 0}MB
                </span>
                ||
                {freePlanAllocation && storage && (
                  <span>{calcPercentage(storage, freePlanAllocation)}</span>
                )}
              </div>
              <div className="mt-3 mb-5">
                <span className="font-bold allocation-space">
                  Allocated Space:&nbsp;
                  <span className="text-blue-500 ">{freePlanAllocation}</span>
                  MB
                </span>
              </div>
              <div className="w-full">
                <button
                  onClick={() => {
                    toast.info(
                      "Thank you for your prompt, please note this application is still in test mode"
                    );
                  }}
                  className="action-button animatedBlock"
                >
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
                { title: "Remaining Tokens", value: 10, color: "#3c91e6 " },
                { title: "Tokens Used", value: 20, color: "red" },
              ]}
            />
            {/* <span className="text-white">Currently hibernated</span> */}

            <div className="pie-details">
              <div>Available Tokens 0</div>
              <div>Used tokens 0</div>
              <div>Allocated 0</div>
              <div className="w-full">
                <button
                  onClick={() =>
                    toast.info(
                      `Thank you for your prompt,this service is still under development`
                    )
                  }
                  className="action-button"
                >
                  Buy Tokens
                </button>
              </div>
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
            <FavoritedByModal
              studentId={studentId}
              favoritedBys={favoritedBys}
            />
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
                    groupId={groupId || ""}
                    uploader={uploader}
                    handleShowModal={handleShowModal}
                    key={item.id}
                  />
                );
              })}

              {userFavoritesFiles.length === 0 && (
                <div
                  style={{ color: "#7e22ce" }}
                  className="text-border text-xl text-purple-700"
                >
                  Oops!, nothing here yet
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
}

export default UserDashboard;
