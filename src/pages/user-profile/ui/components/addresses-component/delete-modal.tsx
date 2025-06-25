/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import type { Action } from "../../../api/types";
import { addChangeDeleteUserData } from "../../../api";

export const DeleteAddress = ({
  properties,
  stetUpdate,
}): React.ReactElement => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    stetUpdate(false);
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
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const body: Action = {
                action: "removeAddress",
                addressId: `${properties.id}`,
              };
              await addChangeDeleteUserData(body).then(() => {
                stetUpdate(true);
              });
              handleClose();
            },
          },
        }}
      >
        <DialogTitle bgcolor="#232323" sx={{ boxSizing: "border-box" }}>
          <Typography variant="h5" component={"span"}>
            Delete current address
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#232323" }}>
          <Typography
            variant="body1"
            sx={{ color: red[200], my: 3, textAlign: "center" }}
          >
            Are you sure you want to delete the selected address?
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: grey[100], textAlign: "center", mt: 3 }}
          >
            {`${properties.country} ${properties.city} ${properties.streetName} ${properties.streetNumber} ${properties.postalCode}`}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#232323" }}>
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
