import { LoadingButton } from "@mui/lab";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({ setModal }: { setModal: (val: boolean) => void }) {
  const { pending, data } = useFormStatus();

  console.log("Hey LISTEN", pending, data);

  useEffect(() => {
    if (data) {
      setModal(false);
      location.reload();
    }
  }, [data, setModal]);
  return (
    <LoadingButton
      className="border-[0.5px]"
      disabled={pending}
      type="submit"
      loading={pending}
    >
      {pending ? "Loading" : "Continue"}
    </LoadingButton>
  );
}

export default SubmitButton;
