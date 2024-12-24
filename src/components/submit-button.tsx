"use client";
import { useFormStatus } from "react-dom";

function SubmitButton({
  submit,
  loading,
}: {
  submit?: () => void;
  loading?: boolean;
}) {
  const { pending } = useFormStatus();
  return (
    <div className="col">
      <input
        type="submit"
        onClick={() => {
          if (submit) {
            submit();
          }
        }}
        value={`${pending || loading ? "Submitting..." : "Continue"}`}
        disabled={pending || loading}
      />
    </div>
  );
}

export default SubmitButton;
