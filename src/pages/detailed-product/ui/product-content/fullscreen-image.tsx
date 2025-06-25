import React from "react";
import { Slider } from ".";
import { IconButton, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Images } from "../../../../shared";

export function FullScreenImage({
  productImages,
}: {
  productImages: Images[];
}): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Slider handleOpen={handleOpen} productImages={productImages} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <div className="box-modal">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 28,
              top: 13,
              color: theme.palette.grey[500],
              zIndex: 10,
            })}
          >
            <CloseIcon />
          </IconButton>
          <Slider handleOpen={handleOpen} productImages={productImages} />
        </div>
      </Modal>
    </React.Fragment>
  );
}
