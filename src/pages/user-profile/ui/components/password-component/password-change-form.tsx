/* eslint-disable @typescript-eslint/no-misused-promises */
import { Alert, Avatar, Container, Paper, Snackbar } from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { passwordValidationSchema } from "./password-validation-schema";
import { useForm } from "react-hook-form";
import { PasswordInput } from "./password-input";
import { yupResolver } from "@hookform/resolvers/yup";
import { grey, red } from "@mui/material/colors";
import { changePassword, getUserInfoRequest } from "../../../api";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./style.css";

interface Passwords {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const PasswordChangeForm = (): React.ReactElement => {
  const [openSnack, setOpenSnack] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [answerFromApi, setAnswerFromApi] = React.useState("");

  const handleSnackClose = (): void => {
    setOpenSnack(false);
  };

  const { handleSubmit, control, reset } = useForm<Passwords>({
    mode: "onChange",
    resolver: yupResolver(passwordValidationSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: Passwords): Promise<void> => {
    const answerFromApi = await changePassword(
      data.currentPassword,
      data.confirmPassword,
    );

    setAnswerFromApi(answerFromApi);
    if (answerFromApi === "Password successfully changed") {
      setOpenSnack(true);
      handleClose();
      reset();
    } else {
      setOpenSnack(true);
    }
  };

  const handleClickOpen = (): void => {
    void getUserInfoRequest();
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    reset();
  };

  return (
    <div className="change-password">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Snackbar
          open={openSnack}
          onClose={handleSnackClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={4000}
          sx={{ width: "max-content", pt: "2rem" }}
        >
          {answerFromApi === "Password successfully changed" ? (
            <Alert
              onClose={handleSnackClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {answerFromApi}
            </Alert>
          ) : (
            <Alert
              onClose={handleSnackClose}
              severity="error"
              variant="filled"
              sx={{ width: "100%" }}
            >
              {answerFromApi}
            </Alert>
          )}
        </Snackbar>
        <Button
          fullWidth
          variant="outlined"
          color="error"
          onClick={handleClickOpen}
          sx={{
            width: "100%",
            maxWidth: "40rem",
            margin: "auto 0",
            fontSize: "1rem",
          }}
        >
          Change password
        </Button>
        <Dialog
          closeAfterTransition={false}
          fullWidth
          maxWidth="sm"
          open={open}
          onClose={handleClose}
          onSubmit={handleSubmit(onSubmit)}
          slotProps={{
            paper: {
              component: "form",
            },
          }}
        >
          <DialogContent sx={{ bgcolor: grey[900] }}>
            <Container
              maxWidth="md"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "inherit",
              }}
            >
              <Avatar sx={{ mt: 2, bgcolor: red[900] }} variant="rounded">
                <LockOpenIcon />
              </Avatar>
              <DialogTitle variant="button" sx={{ color: grey[200] }}>
                Change your password
              </DialogTitle>
              <Paper
                elevation={10}
                sx={{
                  mt: 2,
                  mb: 2,
                  p: 2,
                  bgcolor: grey[500],
                  background: "transparent",
                }}
              >
                <PasswordInput
                  name="currentPassword"
                  control={control}
                  label="Current password"
                  sx={{
                    mt: 1,
                    mb: 2,
                    boxSizing: "border-box",
                    input: { color: grey[400] },
                  }}
                />
                <PasswordInput
                  name="newPassword"
                  control={control}
                  label="New password"
                  sx={{
                    mt: 1,
                    mb: 2,
                    boxSizing: "border-box",
                    input: { color: grey[400] },
                  }}
                />
                <PasswordInput
                  name="confirmPassword"
                  control={control}
                  label="Confirm password"
                  sx={{
                    mt: 1,
                    mb: 2,
                    boxSizing: "border-box",
                    input: { color: grey[400] },
                  }}
                />
              </Paper>
            </Container>
          </DialogContent>
          <DialogActions sx={{ bgcolor: grey[900] }}>
            <Button variant="outlined" onClick={handleClose} fullWidth>
              Cancel
            </Button>
            <Button variant="outlined" color="success" type="submit" fullWidth>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};
