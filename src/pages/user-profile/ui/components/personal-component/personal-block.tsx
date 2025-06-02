/* eslint-disable unicorn/no-null */
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { DialogWindow } from "./dialog";
import React from "react";
import { getUserInfoRequest } from "../../../api";
import { grey } from "@mui/material/colors";
import "./style.css";

export function PersonalBlock(): React.ReactElement {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isEditMode, setEditMode] = React.useState(false);

  void getUserInfoRequest().then((data) => {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setDateOfBirth(data.dateOfBirth);
    setEmail(data.email);
  });

  return (
    <Paper
      elevation={10}
      sx={{
        bgcolor: grey[600],
        width: "100%",
        maxWidth: "fit-content",
        padding: "2rem",
        boxSizing: "border-box",
        margin: "auto",
      }}
    >
      <div className="title-block">
        <Typography variant="body2">Personal Information</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditMode(!isEditMode);
          }}
          color={isEditMode ? "success" : "inherit"}
        >
          {" "}
          {isEditMode ? "Done" : "Edit"}{" "}
        </Button>
      </div>
      <hr
        style={{
          margin: "0.5rem 0",
          width: "100%",
          height: "0.1px",
        }}
      />
      <Grid
        container
        sx={{
          p: "1rem 0.5rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          color: grey[300],
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
                name="first name"
                setState={setFirstName}
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
                setState={setLastName}
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
                type="data"
                name="date of birth"
                setState={setDateOfBirth}
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
              <DialogWindow type="email" name="email" setState={setEmail} />
            ) : null}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: "flex",
          p: "1rem 0.5rem",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Grid>
    </Paper>
  );
}
