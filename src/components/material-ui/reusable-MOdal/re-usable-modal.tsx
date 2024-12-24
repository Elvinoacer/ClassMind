"use client";
import { addUnitData } from "@/actions/unit-form";
import { useAddUnitsMutation } from "@/rtk";
import { LoadingButton } from "@mui/lab";
import { Box, ButtonBase, Input, Modal, Typography } from "@mui/material";
import { revalidatePath } from "next/cache";

import { useRouter } from "next/navigation";
import React, { forwardRef, Ref, useImperativeHandle, useState } from "react";
import SubmitButton from "./submit-button";

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

export interface Rprops {
  openModal: () => void;
}

function ReusableModal(
  {
    institutionGroupId,
    studentId,
  }: { institutionGroupId: string; studentId: string },
  ref: Ref<Rprops>
) {
  const [unitname, setUnitName] = useState("");
  const [openModal, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const router = useRouter();

  const [addUnits] = useAddUnitsMutation();

  function onClose() {
    setOpen(false);
  }
  function onOpen() {
    setOpen(true);
  }

  // async function handleDataSubmitData(formData: FormData) {
  //   "use server";
  //   const unitName = formData.get("unitname");
  //   if (!unitName) {
  //     return;
  //   }
  //   const { data, error } = await addUnits([{ unitname, institutionGroupId }]);

  //   revalidatePath("/");
  // }

  async function handleDataSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await addUnits([{ unitname, institutionGroupId }]);

    if (error) {
      setError(JSON.stringify(error));
    }

    setLoading(false);
    setOpen(false);
    location.reload();
  }

  useImperativeHandle(ref, () => ({
    openModal: onOpen,
  }));

  return (
    <Modal
      open={openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form
          className="w-full flex flex-col items-center justify-center gap-5"
          // onSubmit={handleDataSubmit}
          action={addUnitData.bind(null, institutionGroupId)}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Unit
          </Typography>
          <Input
            required
            placeholder={"Unit name"}
            onChange={(e) => setUnitName(e.target.value)}
            value={unitname}
            name="unitname"
          />

          <span className="flex justify-around w-full">
            <ButtonBase type="button" disabled={loading} onClick={onClose}>
              Close
            </ButtonBase>
            <SubmitButton setModal={setOpen} />
          </span>
          <div className="text-red-500">{error}</div>
        </form>
      </Box>
    </Modal>
  );
}

export default forwardRef(ReusableModal);
