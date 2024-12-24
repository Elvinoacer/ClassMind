import { setIndexFileNav } from "@/store/features/counterslice";
import { Unit } from "@/types/prismatypes";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import ReUsableModal, {
  Rprops,
} from "./material-ui/reusable-MOdal/re-usable-modal";
import { useAppSelector } from "@/hooks";

function CustomDashboard({
  units,
  institutionGroupId,
  studentId,
}: {
  studentId: string;
  institutionGroupId: string;
  units: Unit[] | React.ReactElement;
}) {
  const dispatch = useDispatch();
  const obtainedUnits = useAppSelector((state) => state.counter.Units);
  const indexFileNav = useAppSelector((state) => state.counter.indexFileNav);

  const unitRef = useRef<Rprops | null>(null);

  return (
    <div className="todo">
      <div className="head">
        <h3>UNITS</h3>
        {/* <i className="bx bx-plus"></i>
        <i className="bx bx-filter"></i> */}
      </div>
      <ul className="todo-list">
        {Array.isArray(units) ? (
          units.map((item, index) => {
            console.log(index);
            return (
              <li
                className="hover:cursor-pointer relative"
                key={index.toString()}
                onClick={() => {
                  dispatch(setIndexFileNav(index));

                  console.log("NAVIGATING TO FILE NUMBER", index);
                }}
              >
                <p>{item.unitname ?? "doesnt exist"}</p>

                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
            );
          })
        ) : (
          <>{units}</>
        )}
      </ul>

      <div className="hover:cursor-pointer w-full flex items-center justify-center py-3 border-[0.5px] border-blue-400 mt-40 rounded-full hover:bg-blue-400 transition-all hover:text-blue-950 font-bold">
        <p onClick={() => unitRef.current?.openModal()}>Add Unit</p>
      </div>
      <ReUsableModal
        institutionGroupId={institutionGroupId}
        studentId={studentId}
        ref={unitRef}
      />
    </div>
  );
}

export default CustomDashboard;
