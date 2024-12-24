import React, { ChangeEvent } from "react";

function InputForFileImage({
  label,
  name,
  onChange,
}: {
  label: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <input
        type="file"
        id="fileInput"
        name={name}
        onChange={onChange}
        accept="image/*"
      />
      <label htmlFor="fileInput" className="upload-btn">
        {label}
      </label>
    </>
  );
}

export default InputForFileImage;
