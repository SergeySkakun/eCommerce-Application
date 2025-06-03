/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { addChangeDeleteUserData } from "../../../api";
import type { Action } from "../../../api/types";
import { grey } from "@mui/material/colors";

export const DialogWindow = ({
  type,
  name,
  typeValue,
  action,
  stateUpdate,
}): React.ReactElement => {
  const [open, setOpen] = React.useState(false);

  // const [formData, setFormData] = React.useState({});

  // const handleSubmit = ():void => {
  //   onSubmit(formData);
  // };

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    stateUpdate(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Tooltip title={`Edit ${name}`}>
        <IconButton aria-label="edit" onClick={handleClickOpen}>
          <EditIcon sx={{ fontSize: "0.8rem", color: "white" }} />
        </IconButton>
      </Tooltip>
      <Dialog
        closeAfterTransition={false}
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();

              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const data = formJson.data;

              const body: Action = {
                action: `${action}`,
                [`${typeValue}`]: `${data}`,
              };
              void addChangeDeleteUserData(body);
              stateUpdate(true);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>{`Update ${name}`}</DialogTitle>
        <DialogContent>
          <TextField
            placeholder={`Type your new ${name}`}
            autoFocus
            required
            margin="dense"
            id="data"
            name="data"
            type={type}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: grey[900] }}>
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button fullWidth variant="outlined" color="success" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
