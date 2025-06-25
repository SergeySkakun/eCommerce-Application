/* eslint-disable @typescript-eslint/no-misused-promises */
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { FormInputText } from "./form-components/form-input-text";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputDropdown } from "./form-components/form-input-dropdown";
import type { ReactElement } from "react";
import { FormInputPassword } from "./form-components/form-input-password";
import { Grid } from "@mui/material";
import { countries } from "./form-components/countries-list";
import {
  type BodySignUp,
  sendingSignInOrSignUpRequest,
} from "../../../../shared/api";
import { ValidationSchema } from "./validation/validation-schema";
import {
  DateField,
  type DateValidationError,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "./styles.css";
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
  dateOfBirth: string;
  defaultShippingAddress: boolean;
  defaultBillingAddress: boolean;
}

const RegistrationForm = (): ReactElement => {
  const [error, setError] = React.useState<DateValidationError | null>(null);
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
      dateOfBirth: "1981-01-01",
      defaultShippingAddress: true,
      defaultBillingAddress: false,
    },
  });
  const onSubmit = async (data: FormValues): Promise<void> => {
    const address = {
      id: "",
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
      defaultShippingAddress: data.defaultShippingAddress ? 0 : null,
      defaultBillingAddress: data.defaultBillingAddress ? 0 : null,
    };

    setMessageApi(await sendingSignInOrSignUpRequest(body, "signup"));
    setTimeout(() => login(), 2700);
  };

  return (
    <div className="registration-page">
      <RegistrationSuccessMessage />
      <div className="registration-content">
        <h2 className="title-registration"> Registration </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInputText
            name="email"
            control={control}
            label="Email"
            sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
          />
          <FormInputPassword
            name="password"
            control={control}
            label="Password"
            sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
          />
          <FormInputText
            name="firstName"
            control={control}
            label="First name"
            sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
          />
          <FormInputText
            name="lastName"
            control={control}
            label="Last name"
            sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
          />
          <Controller
            name={"dateOfBirth"}
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateField
                  format="YYYY-MM-DD"
                  sx={{
                    mb: 2,
                    width: "100%",
                    backgroundColor: "rgb(107, 107, 107)",
                  }}
                  label="Date of birth"
                  onError={(newError) => setError(newError)}
                  value={dayjs(field.value)}
                  inputRef={field.ref}
                  onChange={(date) => {
                    const formatDate = dayjs(date);
                    field.onChange(formatDate);
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
          <Typography className="title-address">Main address</Typography>
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
                sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormInputText
                name="streetNumber"
                control={control}
                label="Street number"
                sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
              />
            </Grid>
            <FormInputText
              name="city"
              control={control}
              label="City"
              sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
            />
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormInputDropdown
                name="country"
                control={control}
                label="Country"
                sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
                options={countries}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormInputText
                name="postalCode"
                control={control}
                label="Postal code"
                sx={{ mb: 2, backgroundColor: "rgb(107, 107, 107)" }}
              />
            </Grid>
          </Grid>
          <FormInputCheckbox
            name="defaultShippingAddress"
            control={control}
            label="Set as default address"
          />
          <FormInputCheckbox
            name="defaultBillingAddress"
            control={control}
            label="Set as default billing address"
          />
          <div className="message-api">{messageApi}</div>
          <Button
            type="submit"
            variant={"contained"}
            fullWidth
            sx={{
              mt: 2,
              mb: 2,
              display: "block",
              backgroundColor: "rgb(107, 107, 107)",
            }}
          >
            Submit
          </Button>
        </form>
        <Grid container justifyContent={"space-between"} sx={{ mt: 1 }}>
          <Grid>
            <Link className="link-reg-footer" to="/login">
              Sign In
            </Link>
          </Grid>
          <Grid>
            <Link className="link-reg-footer" to="/main">
              To main
            </Link>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export { RegistrationForm };
