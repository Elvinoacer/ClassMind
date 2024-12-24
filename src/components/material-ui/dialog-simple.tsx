"use client";
import {
  setUploadOption,
  uploadOptionType,
} from "@/store/features/counterslice";
import PersonIcon from "@mui/icons-material/Person";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { blue } from "@mui/material/colors";
import * as React from "react";
import { FiUploadCloud } from "react-icons/fi";
import { useDispatch } from "react-redux";

const options: uploadOptionType[] = ["class-store", "my-store"];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue?: uploadOptionType;
  onClose?: (value: uploadOptionType) => void;
}

export function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: uploadOptionType) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
        <span className="font-bold">Upload to:</span>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        {options.map((option) => (
          <ListItem disableGutters key={option}>
            <ListItemButton onClick={() => handleListItemClick(option)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={option} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo({
  handleSelectedVal,
}: {
  handleSelectedVal?: () => void;
}) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(options[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: uploadOptionType) => {
    console.log("UPLOAD OPTIONS", value);
    setSelectedValue(value);
    setOpen(false);

    console.log(value);

    if (handleSelectedVal) {
      handleSelectedVal();
    }

    dispatch(setUploadOption(value));
    console.log(value);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div>
        <Button variant="text" className="gap-2" onClick={handleClickOpen}>
          <FiUploadCloud color="white" />
          <span className="text-white font-bold">Upload</span>
        </Button>
        {/* <SimpleDialog
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        /> */}
      </div>
    </div>
  );
}
