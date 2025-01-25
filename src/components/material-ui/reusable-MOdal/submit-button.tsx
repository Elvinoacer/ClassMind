import { LoadingButton } from "@mui/lab";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton({
  setModal,
  loading,
}: {
  loading: boolean;
  setModal: (val: boolean) => void;
}) {
  const { pending, data } = useFormStatus();

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
      loading={pending || loading}
    >
      {pending ? "Loading" : "Continue"}
    </LoadingButton>
  );
}

export default SubmitButton;
