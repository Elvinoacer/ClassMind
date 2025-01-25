import { useAppSelector } from "@/hooks";
import { useAddCampusMutation, useAddStudentMutation } from "@/rtk";
import {
  addInstitution,
  navigateRegisterInstitution,
  openModal,
} from "@/store/features/counterslice";
import { FormTypesNav } from "@/types/prismatypes";
import { LoadingButton } from "@mui/lab";
import { ButtonBase, Input } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { redirect, useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch } from "react-redux";

const style = {
  position: "absolute",
  borderRadius: "20px",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.5px solid gray",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  // btnText,
  // groupId,
  campus,
  uniId,
}: {
  groupId?: string;
  btnText?: string;
  uniId?: string;

  handleCampChange?: (value: string) => void;

  campus?: string;
}) {
  const [addCampusData] = useAddCampusMutation();
  const [addStudent] = useAddStudentMutation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [campusname, setCampusName] = React.useState<string>("");
  const [studentName, setStudentName] = React.useState("");
  const [studentEmail, setStudentEmail] = React.useState("");
  const modalOpen = useAppSelector((state) => state.counter.openModal);

  const handleOpen = () => dispatch(openModal(true));
  const [loading, setLoading] = React.useState(false);

  // math
  // Chem
  // phyc
  // space
  // Electronics
  // data science

  async function onNext() {
    // write data
    setLoading(true);
    if (campus) {
      dispatch(navigateRegisterInstitution(FormTypesNav.course));
      const { data } = await addCampusData({ campusname, uniid: uniId });

      dispatch(addInstitution(data));

      redirect("/institution-register");
      return;
    }

    const { data } = await addStudent({
      // institutionGroupId: groupId,
      firstname: studentName,
      email: studentEmail,
    });

    if (data?.exist && data.student.InstitutionGroup?.id) {
      router.push(`/dashboard/${data.student.id}`);
    } else {
      localStorage.setItem("newstudent", JSON.stringify(data.student));
      router.push(`/institutions`);
    }
    dispatch(openModal(false));
  }

  function handleDataSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // const studentDetails = {
    //   email: studentEmail,
    //   firstname: studentName,
    // };

    // get the relevant selections

    // validate existence

    // Create the student to  database and connect

    // redirect to dashboard with student id
  }

  return (
    <div>
      {/* <Button className="" onClick={handleOpen}>
        {btnText}
      </Button> */}
      {!campus && (
        <button onClick={handleOpen} className="w-16">
          Get Started
        </button>
      )}

      <Modal
        open={modalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form
            className="w-full flex flex-col items-center justify-center gap-5"
            onSubmit={handleDataSubmit}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {campus ?? "Student details"}
            </Typography>
            <Input
              required
              placeholder={campus ?? "first name"}
              value={campus ? campusname : studentName}
              onChange={(e) => {
                if (campus) {
                  return setCampusName(e.target.value);
                }
                setStudentName(e.target.value);
              }}
            />
            {!!!campus && (
              <Input
                type="email"
                required
                value={studentEmail}
                placeholder="email"
                onChange={(e) => {
                  setStudentEmail(e.target.value);
                }}
              />
            )}
            <span className="flex justify-around w-full">
              <ButtonBase
                disabled={loading}
                onClick={() => dispatch(openModal(false))}
              >
                Close
              </ButtonBase>
              <LoadingButton
                className="border-[0.5px]"
                onClick={onNext}
                loading={loading}
              >
                {loading ? "Loading..." : "Continue"}
              </LoadingButton>
            </span>
            {/* <CircularColor /> */}
            {/* <p className="text-red-400">
              * Sorry!, the user email already exist
            </p> */}
          </form>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
