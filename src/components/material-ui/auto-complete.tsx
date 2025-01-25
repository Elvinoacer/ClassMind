"use client";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function ComboBox({
  options,
  inputLabel,
  handleSearchValue,
}: {
  inputLabel?: string;
  handleSearchValue: (value: string | number) => void;
  options?: [{ label: string; value: string | number }];
}) {
  return (
    <Autocomplete
      disablePortal
      className="bg-blue-500 rounded-lg text-white"
      options={options ?? []}
      sx={{ width: 300 }}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.value}
          onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            if (props.onClick) {
              props.onClick(e);
            }
            handleSearchValue(option.value);
          }}
        >
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={inputLabel || "Movies"} />
      )}
    />
  );
}
