"use client";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import top100Films from "./top100Films";

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
      onChange={(e) => {
        console.log(e);
      }}
      disablePortal
      className="bg-blue-500 rounded-lg text-white"
      options={options ?? top100Films}
      sx={{ width: 300 }}
      renderOption={(props, option) => (
        <li
          {...props}
          key={option.value}
          onClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
            props?.onClick(e);
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
