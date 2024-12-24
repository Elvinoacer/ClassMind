"use client";
import { useAppSelector } from "@/hooks";
import { useConnectStudentMutation } from "@/rtk";
import { setUniSelectionIndex } from "@/store/features/counterslice";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useDispatch } from "react-redux";
import SimpleBackdrop from "./backdrop-loading";

const steps = ["Select Campus", "Select Course", "Select Year Group"];

export default function HorizontalLinearStepper({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const [connectStudent] = useConnectStudentMutation();
  const noNextMove = useAppSelector((state) => state.counter.noNextAllow);
  const uniSelection = useAppSelector(
    (state) => state.counter.uniSelectionIndex
  );
  const groupId = useAppSelector((state) => state.counter.groupId);
  const dispatch = useDispatch();
  // const [groupId, setGroupId] = React.useState<string | null>(null);
  const [activeStep, setActiveStep] = React.useState(0);
  async function handleRedirect() {
    // router.push("/dashboard");
  }

  const handleNext = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (uniSelection.index !== 0) {
      dispatch(
        setUniSelectionIndex({ index: activeStep + 1, id: uniSelection.id })
      );
    } else dispatch(setUniSelectionIndex({ index: activeStep + 1, id: "" }));

    if (activeStep === steps.length - 1) {
      const studentStr = localStorage.getItem("newstudent");
      if (!studentStr) return alert("NO studet found");
      const student = JSON.parse(studentStr);
      const { data: groupf } = await connectStudent({ student, groupId });
      console.log(groupf);

      if (!groupf) return alert("group ERROR");

      router.push(`/dashboard/${student.id}`);

      // handleRedirect();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    dispatch(setUniSelectionIndex({ index: activeStep - 1, id: "" }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {children}

      {activeStep === steps.length && groupId ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            Congratulations on reaching this point, let&apos;s get you started
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <div>
              <SimpleBackdrop openModal={true} />
            </div>
          </Box>
        </>
      ) : (
        <>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <div className="border-[0.5px] border-gray-400 w-20 h-10  rounded-full flex items-center justify-center font-bold ml-3 cursor-pointer hover:scale-[1.02] active:bg-slate-400 transition-all">
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
            </div>

            <Box sx={{ flex: "1 1 auto" }} />

            {!noNextMove && (
              <>
                {activeStep !== steps.length - 1 && (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-700 text-white mr-5 mb-5 font-bold"
                    disabled={
                      !uniSelection.id ||
                      (steps.length - 1 === activeStep && !!groupId)
                    }
                  >
                    Next
                  </Button>
                )}
                {activeStep === steps.length - 1 && (
                  <Button
                    onClick={handleNext}
                    className="bg-blue-700 text-white mr-5 mb-5 font-bold"
                    disabled={!groupId}
                  >
                    Finish
                  </Button>
                )}
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
