/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import type { Action } from "../../../api/types";
import { addChangeDeleteUserData } from "../../../api";

export const SetDefaultShipping = ({
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
        disabled={!!properties.isDefaultShipping}
        variant="contained"
        size="small"
        color="success"
        onClick={handleClickOpen}
        sx={{ width: "100%" }}
      >
        Shipping
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
              const body: Action = {
                action: "setDefaultShippingAddress",
                addressId: `${properties.id}`,
              };
              void addChangeDeleteUserData(body);
              stetUpdate(true);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle sx={{ boxSizing: "border-box", bgcolor: grey[900] }}>
          <Typography variant="h5" component={"span"}>
            Default shipping address
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: grey[900] }}>
          <Typography
            variant="body1"
            sx={{ color: grey[100], my: 3, textAlign: "center" }}
          >
            Select the following address as the new default shipping address
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: grey[100], textAlign: "center", mt: 3 }}
          >
            {`${properties.country} ${properties.city} ${properties.streetName} ${properties.streetNumber} ${properties.postalCode}`}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ bgcolor: grey[900] }}>
          <Button variant="outlined" fullWidth onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outlined" fullWidth type="submit" color="success">
            Select
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
