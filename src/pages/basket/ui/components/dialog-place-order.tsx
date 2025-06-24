import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Properties = {
  openDialog: boolean;
  handleClose: () => void;
};

export function DialogPlaceOrder(properties: Properties): React.ReactElement {
  const { openDialog, handleClose } = properties;

  return (
    <React.Fragment>
      <Dialog
        closeAfterTransition={false}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Thank you for your order"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            A manager will contact you shortly
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Thank you, I'll be waiting.
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
