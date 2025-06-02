/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const DeleteAddress = ({ properties }): React.ReactElement => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="small"
        color="warning"
        onClick={handleClickOpen}
        sx={{ width: "100%" }}
      >
        Delete
      </Button>
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
              // const formJson = Object.fromEntries((formData).entries());
              // const data = formJson.data;
              // console.log(properties)
              // setState(data);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle
          variant="h5"
          sx={{
            bgcolor: grey[500],
            color: grey[900],
            textAlign: "center",
            pb: 2,
          }}
        >
          Delete address
        </DialogTitle>
        <DialogContent sx={{ bgcolor: grey[500], mb: 0 }}>
          <Typography
            variant="button"
            sx={{ color: grey[900], mb: 3, textAlign: "center" }}
          >
            Are you sure you want to delete the selected address?
          </Typography>
          <Typography
            variant="h5"
            sx={{ color: red[900], textAlign: "center", mt: 3 }}
          >{`${properties.country} ${properties.city} ${properties.streetName} ${properties.streetNumber} ${properties.postalCode}`}</Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: grey[500], mt: -0.1 }}>
          <Button variant="outlined" fullWidth onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" fullWidth type="submit" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
