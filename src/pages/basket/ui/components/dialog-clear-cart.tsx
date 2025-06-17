import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Properties = {
  clearCart: () => Promise<void>;
  openDialog: boolean;
  handleClose: () => void;
};

export function DialogClearCart(properties: Properties): React.ReactElement {
  const { clearCart, openDialog, handleClose } = properties;

  const clickButtonAgree = (): void => {
    void clearCart();
    handleClose();
  };

  return (
    <React.Fragment>
      <Dialog
        closeAfterTransition={false}
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"CLEAR CART"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to empty the basket?<br></br>All selected
            items will be removed from it.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={() => clickButtonAgree()} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
