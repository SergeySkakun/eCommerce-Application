/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { FormInputText } from "./form-components/form-input-text";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputDropdown } from "./form-components/form-input-dropdown";
import type { ReactElement } from "react";
import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { countries } from "./form-components/countries-list";
import React, { useState } from "react";
import { AddressSchema } from "./form-components/addresses-schema";
import type { Action } from "../../../api/types";
import { addChangeDeleteUserData } from "../../../api";
import { grey } from "@mui/material/colors";

interface Address {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
}

export const UpdateAddress = ({ properties, stetUpdate }): ReactElement => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    stetUpdate(false);
    setOpen(false);
  };

  const { handleSubmit, control } = useForm<Address>({
    mode: "onChange",
    resolver: yupResolver(AddressSchema),
    defaultValues: {
      streetName: properties.streetName ?? "",
      streetNumber: properties.streetNumber ?? "",
      postalCode: properties.postalCode ?? "",
      city: properties.city ?? "",
      country: properties.country ?? "",
    },
  });
  const onSubmit = (data: Address): void => {
    const body: Action = {
      action: "changeAddress",
      addressId: properties.id,
      address: {
        streetName: data.streetName,
        streetNumber: data.streetNumber,
        postalCode: data.postalCode,
        city: data.city,
        country: data.country,
      },
    };
    void addChangeDeleteUserData(body);
    stetUpdate(true);
    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleClickOpen}
        sx={{ width: "100%" }}
      >
        Update
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
        <DialogTitle sx={{ boxSizing: "border-box", bgcolor: grey[900] }}>
          <Typography variant="h5" component={"span"}>
            Update current address
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: grey[900] }}>
          <Paper
            elevation={10}
            sx={{ mt: 8, p: 2, bgcolor: "#656565", color: "#ffffff" }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInputDropdown
                  name="country"
                  control={control}
                  label="Country"
                  sx={{ mb: 2 }}
                  options={countries}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInputText
                  name="city"
                  control={control}
                  label="City"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInputText
                  name="streetName"
                  control={control}
                  label="Street name"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInputText
                  name="streetNumber"
                  control={control}
                  label="Street number"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInputText
                  name="postalCode"
                  control={control}
                  label="Postal code"
                  sx={{ mb: 2 }}
                />
              </Grid>
            </Grid>
          </Paper>
        </DialogContent>
        <DialogActions sx={{ bgcolor: grey[900] }}>
          <Button fullWidth variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button fullWidth variant="outlined" color="success" type="submit">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
