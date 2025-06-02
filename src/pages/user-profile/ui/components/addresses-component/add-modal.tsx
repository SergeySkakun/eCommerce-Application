/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { FormInputText } from "./form-components/form-input-text";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputDropdown } from "./form-components/form-input-dropdown";
import type { ReactElement } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { countries } from "./form-components/countries-list";
import React, { useState } from "react";
import { AddressSchema } from "./form-components/addresses-schema";
import { FormInputCheckbox } from "./form-components/form-input-checkbox";
import { getUserInfoRequest } from "../../../api/user-information-request";

interface Address {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
}

export const AddNewAddress = (): ReactElement => {
  // const [isDefaultShippingAddress, setIsDefaultShippingAddress] =
  //   useState(false);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(false);

  const [addressesList, setAddressesList] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const { handleSubmit, control } = useForm<Address>({
    mode: "onChange",
    resolver: yupResolver(AddressSchema),
    defaultValues: {
      streetName: "",
      streetNumber: "",
      postalCode: "",
      city: "",
      country: "",
      defaultShippingAddress: false,
      defaultBillingAddress: false,
    },
  });
  const onSubmit = async (data: Address): Promise<void> => {
    const newAddress: Address = {
      streetName: data.streetName,
      streetNumber: data.streetNumber,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
      defaultShippingAddress: data.defaultShippingAddress,
      defaultBillingAddress: data.defaultBillingAddress,
    };

    await new Promise(function (resolve) {
      resolve(
        getUserInfoRequest().then((data) => {
          const arrayAddresses = data.addresses;
          arrayAddresses.push(newAddress);
          setAddressesList(arrayAddresses);
        }),
      );
    });

    handleClose();
  };

  return (
    <React.Fragment>
      <Button
        color="inherit"
        sx={{ mt: 2 }}
        fullWidth
        variant="contained"
        aria-label="add"
        onClick={handleClickOpen}
      >
        Add new address
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
        <DialogTitle bgcolor="#232323">Add new address</DialogTitle>
        <DialogContent sx={{ bgcolor: "#232323" }}>
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
            <Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <FormInputCheckbox
                  name="defaultShippingAddress"
                  control={control}
                  label="Set as default address"
                />
                <FormInputCheckbox
                  name="defaultBillingAddress"
                  control={control}
                  label="Set as default address for billing"
                />
                {/* <label className="default-address">
                <Checkbox
                  name="defaultShippingAddress"
                  onChange={(event) => {
                    setIsDefaultShippingAddress(event.target.checked);
                  }}
                />
                Set as default address
              </label> */}
              </Grid>
              {/* <Grid size={{ xs: 12, sm: 6 }}>
              <label className="default-billing-address">
                <Checkbox
                  name="defaultBillingAddress"
                  onChange={(event) => {
                    setIsDefaultBillingAddress(event.target.checked);
                  }}
                />
                Set as default billing address
              </label>
            </Grid> */}
            </Grid>
            {isDefaultBillingAddress ? <>{/* <AdditionalForm /> */}</> : null}
            {/* <div className="message-api">{messageApi}</div> */}
            {/* <Button
            type="submit"
            variant={"contained"}
            fullWidth
            sx={{ mt: 2, mb: 2, display: "block" }}
          >
            Submit
          </Button> */}
            {/* </form> */}
          </Paper>
        </DialogContent>
        <DialogActions sx={{ bgcolor: "#232323" }}>
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
