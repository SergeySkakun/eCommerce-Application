/* eslint-disable @typescript-eslint/no-misused-promises */
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
import { Alert, IconButton, Snackbar, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { addChangeDeleteUserData } from "../../../api";
import type { Action } from "../../../api/types";
import { grey } from "@mui/material/colors";
import dayjs from "dayjs";
import type { Customer } from "../../../../../shared";

export const DialogWindow = ({
  type,
  name,
  typeValue,
  action,
  stateUpdate,
}): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [valueError, setValueError] = React.useState("");
  const [isValidForm, setIsValidForm] = React.useState(false);
  const [answerFromApi, setAnswerFromApi] = React.useState<Customer | string>();
  const [openSnack, setOpenSnack] = React.useState(false);

  React.useEffect(() => {
    if (valueError) {
      setIsValidForm(false);
    } else {
      setIsValidForm(true);
    }
  }, [valueError]);

  const handleSnackClose = (): void => {
    setOpenSnack(false);
  };

  const nameHandler = (event: string): void => {
    try {
      if (event.length === 0) {
        setValueError(`${name} must contain at least one character`);
      } else {
        setValueError("");
      }
    } catch {
      setValueError("Missing city");
    }
  };

  const emailHandler = (event: string): void => {
    try {
      const regex =
        /^((([\dA-Za-z][\d.A-z-]+[\dA-Za-z])|([\dА-я][\d.А-я-]+[\dА-я]))@([A-Za-z-]+\.){1,2}[A-Za-z-]{2,})$/;
      if (regex.test(event)) {
        setValueError("");
      } else {
        setValueError("Incorrect Email");
      }
    } catch {
      setValueError("Missing city");
    }
  };

  const dateHandler = (event: string): void => {
    const dayjsDate = dayjs(event, "YYYY-MM-DD", true);
    const now = dayjs();
    const thirteenYearsAgo = now.subtract(13, "year");
    const hundredYearsAgo = now.subtract(100, "year");
    if (!dayjs(dayjsDate).isValid()) {
      setValueError("Invalid date");
    } else if (!dayjsDate || dayjsDate.isAfter(thirteenYearsAgo)) {
      setValueError("You must be over 13 years old");
    } else if (dayjsDate.isBefore(hundredYearsAgo)) {
      setValueError("You must be under 100 years old");
    } else {
      setValueError("");
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    setValue(event.target.value);
    switch (typeValue) {
      case "firstName":
      case "lastName": {
        nameHandler(event.target.value);
        break;
      }
      case "email": {
        emailHandler(event.target.value);
        break;
      }
      case "dateOfBirth": {
        dateHandler(event.target.value);
        break;
      }
    }
  };

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    stateUpdate(false);
    setOpen(false);
    setValue("");
    setValueError("");
  };

  return (
    <React.Fragment>
      <Snackbar
        open={openSnack}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={4000}
        sx={{ width: "max-content", pt: "2rem" }}
      >
        {answerFromApi ===
        "There is already an existing customer with the provided email." ? (
          <Alert
            onClose={handleSnackClose}
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            There is already an existing customer with the provided email.
          </Alert>
        ) : (
          <Alert
            onClose={handleSnackClose}
            severity="success"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Your {name} has been successfully updated
          </Alert>
        )}
      </Snackbar>
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
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const data = formJson.data;
              const body: Action = {
                action: `${action}`,
                [`${typeValue}`]: `${data}`,
              };
              await addChangeDeleteUserData(body).then((data) => {
                setAnswerFromApi(data);
              });
              if (answerFromApi == undefined) {
                setOpenSnack(true);
              } else {
                setOpenSnack(true);
                handleClose();
              }
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
            value={value}
            margin="dense"
            id="data"
            name="data"
            type={type}
            fullWidth
            variant="standard"
            onChange={handleChange}
            error={Boolean(valueError)}
            helperText={valueError}
          />
        </DialogContent>
        <DialogActions sx={{ bgcolor: grey[900] }}>
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="success"
            type="submit"
            disabled={!isValidForm}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
