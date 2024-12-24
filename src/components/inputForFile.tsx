import React, { ChangeEvent } from "react";

function InputForFileLogo({
  label,
  disabled,
  name,
  onChange,
  className,
}: {
  label: string;
  disabled?: boolean;
  name: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <>
      <input
        accept="image/*"
        type="file"
        id="fileInput"
        onChange={onChange}
        disabled={disabled}
        className={className}
        name={name}
      />
      <label htmlFor="fileInput" className="upload-btn">
        {label}
      </label>
    </>
  );
}

export default InputForFileLogo;
