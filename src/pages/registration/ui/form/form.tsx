/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable unicorn/no-null */
/* eslint-disable @typescript-eslint/no-misused-promises */
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { FormInputText } from "./form-components/form-input-text";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputDropdown } from "./form-components/form-input-dropdown";
import type { ReactElement } from "react";
import { FormInputPassword } from "./form-components/form-input-password";
import { Checkbox, Container, Grid } from "@mui/material";
import { countries } from "./form-components/countries-list";
import {
  type BodySignUp,
  sendingSignInOrSignUpRequest,
} from "../../../../shared/api";
import { ValidationSchema } from "./validation/validation-schema";
import {
  DatePicker,
  type DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import dayjs from "dayjs";
import { AdditionalForm } from "../additional-form/form";
import { Link } from "react-router-dom";
import "./form.style.css";
import { RegistrationSuccessMessage } from "./index";
import { useAuth } from "../../../../shared";
import { FormInputCheckbox } from "./form-components/form-input-checkbox";

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  dateOfBirth: Date;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
}

const RegistrationForm = (): ReactElement => {
  const [error, setError] = React.useState<DateValidationError | null>(null);
  // const [isDefaultShippingAddress, setIsDefaultShippingAddress] =
  //   useState(false);
  const [isDefaultBillingAddress, setIsDefaultBillingAddress] = useState(false);
  const [messageApi, setMessageApi] = useState("");
  const { login } = useAuth();
  const errorMessage = React.useMemo(() => {
    switch (error) {
      case "maxDate": {
        return "You must be over 13 years old";
      }

      case "invalidDate": {
        return "Your date is not valid";
      }

      default: {
        return "";
      }
    }
  }, [error]);

  const startValidDate = dayjs().subtract(13, "year");

  const { handleSubmit, control } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      streetName: "",
      streetNumber: "",
      postalCode: "",
      city: "",
      country: "",
      dateOfBirth: startValidDate as unknown as Date,
      defaultShippingAddress: false,
      defaultBillingAddress: false,
    },
  });
  const onSubmit = async (data: FormValues): Promise<void> => {
    const address = {
      streetName: data.streetName,
      streetNumber: data.streetNumber,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    };

    const formatData = dayjs(data.dateOfBirth);
    const resultDate = formatData.format("YYYY-MM-DD");
    const body: BodySignUp = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      addresses: [address],
      dateOfBirth: resultDate,
      store: "rush-store",
      defaultShippingAddress: 0,
      defaultBillingAddress: isDefaultBillingAddress === false ? null : 0,
    };
    setMessageApi(await sendingSignInOrSignUpRequest(body, "signup"));
    setTimeout(() => login(), 6500);
  };

  return (
    <Container maxWidth="md">
      <RegistrationSuccessMessage />
      <Paper elevation={10} sx={{ mt: 8, p: 2 }}>
        <Typography variant="h4"> Registration </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            name="email"
            control={control}
            label="Email"
            sx={{ mb: 2 }}
          />
          <FormInputPassword
            name="password"
            control={control}
            label="Password"
            sx={{ mb: 2 }}
          />
          <FormInputText
            name="firstName"
            control={control}
            label="First name"
            sx={{ mb: 2 }}
          />
          <FormInputText
            name="lastName"
            control={control}
            label="Last name"
            sx={{ mb: 2 }}
          />
          <Controller
            name={"dateOfBirth"}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  format="YYYY-MM-DD"
                  sx={{ mb: 2, width: "100%" }}
                  label="Date of birth"
                  onError={(newError) => setError(newError)}
                  value={field.value as unknown as dayjs.Dayjs}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                  slotProps={{
                    textField: {
                      helperText: errorMessage,
                    },
                    inputAdornment: null,
                  }}
                  maxDate={startValidDate}
                />
              </LocalizationProvider>
            )}
          />
          <Typography
            component="h5"
            sx={{ textAlign: "left", width: "100%", mt: 2, mb: 2 }}
          >
            Main address
          </Typography>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
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
            <FormInputText
              name="city"
              control={control}
              label="City"
              sx={{ mb: 2 }}
            />
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
                name="postalCode"
                control={control}
                label="Postal code"
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>
          <Grid>
            <Grid paddingLeft="0.7rem" size={{ xs: 12, sm: 6 }}>
              <FormInputCheckbox
                name="defaultShippingAddress"
                control={control}
                label="Set as default address"
              />
              {/* <FormInputCheckbox 
                name="defaultBillingAddress" 
                control={control}
                label="Set as default address for billing"
              /> */}
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
            <Grid size={{ xs: 12, sm: 6 }}>
              <label className="default-billing-address">
                <Checkbox
                  name="defaultBillingAddress"
                  onChange={(event) => {
                    setIsDefaultBillingAddress(event.target.checked);
                  }}
                />
                Set as default billing address
              </label>
            </Grid>
          </Grid>
          {isDefaultBillingAddress ? (
            <>
              <AdditionalForm />
            </>
          ) : null}
          <div className="message-api">{messageApi}</div>
          <Button
            type="submit"
            variant={"contained"}
            fullWidth
            sx={{ mt: 2, mb: 2, display: "block" }}
          >
            Submit
          </Button>
        </form>
        <Grid container justifyContent={"space-between"} sx={{ mt: 1 }}>
          <Grid>
            <Link to="/login">Sign In</Link>
          </Grid>
          <Grid>
            <Link to="/main">To main</Link>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export { RegistrationForm };
