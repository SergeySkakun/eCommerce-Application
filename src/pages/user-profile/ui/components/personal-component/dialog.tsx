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

export const DialogWindow = ({
  type,
  name,
  // setState
}): React.ReactElement => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
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
              // const formData = new FormData(event.currentTarget);
              // const formJson = Object.fromEntries((formData as any).entries());
              // const data = formJson.data;
              // console.log(data);
              // setState(data);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>{`${name}`}</DialogTitle>
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
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Update</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
