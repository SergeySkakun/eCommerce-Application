import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DialogWindow } from "./dialog";
import React from "react";
import { getUserInfoRequest } from "../../../api";
import "./style.css";

export function PersonalBlock(): React.ReactElement {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isEditMode, setEditMode] = React.useState(false);
  const [stateUpdate, setStateUpdate] = React.useState(false);

  React.useEffect(() => {
    if (stateUpdate) {
      void getUserInfoRequest().then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDateOfBirth(data.dateOfBirth);
        setEmail(data.email);
      });
    }
  });

  void getUserInfoRequest().then((data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setDateOfBirth(data.dateOfBirth);
    setEmail(data.email);
  });

  return (
    <Container
      sx={{
        height: "auto-fit",
        width: "auto",
        minHeight: "100%",
        maxWidth: "40rem",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          width: "auto",
          maxWidth: "40rem",
          margin: "auto",
        }}
      >
        <Paper
          elevation={10}
          sx={{
            width: "100%",
            padding: "2rem",
            boxSizing: "border-box",
            margin: "auto",
            backgroundColor: "var(--dark-gray)",
          }}
        >
          <div className="title-block">
            <Typography gutterBottom variant="h5">
              Personal Information
            </Typography>
          </div>
          <hr
            style={{
              margin: "0.5rem 0",
              width: "100%",
              height: "1px",
              color: "#ffffff",
            }}
          />
          <Grid
            container
            sx={{
              p: "1rem 0.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: "2",
                width: "100%",
              }}
            >
              <span className="input-label">First Name</span>
              <Grid
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="standard"
                  value={firstName}
                  slotProps={{
                    input: {
                      readOnly: true,
                      disableUnderline: true,
                    },
                    htmlInput: {
                      style: {
                        width: "100%",
                        fontSize: "1.2rem",
                        fontWeight: "200",
                        fontStyle: "200",
                        lineHeight: 1.5,
                        fontFamily: "monospace",
                      },
                    },
                  }}
                />
                {isEditMode ? (
                  <DialogWindow
                    type="text"
                    name="first name"
                    typeValue="firstName"
                    action="setFirstName"
                    stateUpdate={setStateUpdate}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: "2",
                width: "100%",
              }}
            >
              <span className="input-label">Last Name</span>
              <Grid
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  variant="standard"
                  value={lastName}
                  slotProps={{
                    input: {
                      readOnly: true,
                      disableUnderline: true,
                    },
                    htmlInput: {
                      style: {
                        width: "100px",
                        fontSize: "1.2rem",
                        fontWeight: "200",
                        fontStyle: "200",
                        lineHeight: 1.5,
                        fontFamily: "monospace",
                      },
                    },
                  }}
                />
                {isEditMode ? (
                  <DialogWindow
                    type="text"
                    name="last name"
                    typeValue="lastName"
                    action="setLastName"
                    stateUpdate={setStateUpdate}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: "2",
                width: "100%",
              }}
            >
              <span className="input-label">Date of Birth</span>
              <Grid
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  type="date"
                  variant="standard"
                  value={dateOfBirth}
                  slotProps={{
                    input: {
                      readOnly: true,
                      disableUnderline: true,
                    },
                    htmlInput: {
                      style: {
                        fontSize: "1.2rem",
                        fontWeight: "200",
                        fontStyle: "200",
                        lineHeight: 1.5,
                        fontFamily: "monospace",
                      },
                    },
                  }}
                />
                {isEditMode ? (
                  <DialogWindow
                    type="date"
                    name="date of birth"
                    typeValue="dateOfBirth"
                    action="setDateOfBirth"
                    stateUpdate={setStateUpdate}
                  />
                ) : null}
              </Grid>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: "2",
                width: "100%",
              }}
            >
              <span className="input-label">Email</span>
              <Grid
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  type="email"
                  variant="standard"
                  value={email}
                  slotProps={{
                    input: {
                      readOnly: true,
                      disableUnderline: true,
                    },
                    htmlInput: {
                      style: {
                        fontSize: "1.2rem",
                        fontWeight: "200",
                        fontStyle: "200",
                        lineHeight: 1.5,
                        fontFamily: "monospace",
                      },
                    },
                  }}
                />{" "}
                {isEditMode ? (
                  <DialogWindow
                    type="email"
                    name="email"
                    typeValue="email"
                    action="changeEmail"
                    stateUpdate={setStateUpdate}
                  />
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Grid
        sx={{
          width: "100%",
          margin: "auto",
          maxWidth: "40rem",
          mt: 2,
        }}
      >
        <Button
          aria-label="add"
          variant="outlined"
          fullWidth
          sx={{
            maxWidth: "40rem",
            mb: "1rem",
          }}
          onClick={() => {
            setEditMode(!isEditMode);
          }}
          color={isEditMode ? "success" : "primary"}
        >
          {isEditMode ? "Done" : "Edit mode"}
        </Button>
      </Grid>
    </Container>
    // </ThemeProvider>
  );
}
