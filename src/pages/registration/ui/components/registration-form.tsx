import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { type BodySignUp, sendingSignInOrSignUpRequest } from "@/shared/api";
import React, { useState } from "react";
import { useAuth } from "@/shared";
import {
  countries,
  FormInputCheckbox,
  FormInputDate,
  FormInputDropdown,
  FormInputPassword,
  FormInputText,
  FormSubmitButton,
  RegistrationFormSchema,
  type RegistrationFormType,
} from "@/shared/ui";
import styles from "../styles.module.css";

const formattedDate = (currentDate: string) => {
  const date = new Date(currentDate);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const RegistrationForm = () => {
  const [messageApi, setMessageApi] = useState("");
  const { login } = useAuth();

  const { handleSubmit, control } = useForm<RegistrationFormType>({
    mode: "onChange",
    resolver: yupResolver(RegistrationFormSchema),
    defaultValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      streetName: "",
      streetNumber: "",
      postalCode: "",
      city: "",
      country: "",
      dateOfBirth: "",
      defaultShippingAddress: false,
      defaultBillingAddress: false,
    },
  });
  const onSubmit = async (data: RegistrationFormType): Promise<void> => {
    const address = {
      id: "",
      streetName: data.streetName,
      streetNumber: data.streetNumber,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country,
    };

    const body: BodySignUp = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      addresses: [address],
      dateOfBirth: formattedDate(data.dateOfBirth),
      store: "rush-store",
      defaultShippingAddress: data.defaultShippingAddress ? 0 : null,
      defaultBillingAddress: data.defaultBillingAddress ? 0 : null,
    };
    setMessageApi(await sendingSignInOrSignUpRequest(body, "signup"));
    setTimeout(() => login(), 2700);
  };

  return (
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
      <FormInputDate
        name="dateOfBirth"
        control={control}
        label="Date of Birth"
        sx={{ mb: 2 }}
      />
      <Typography className="title-address">Main address</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
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
            name="city"
            control={control}
            label="City"
            sx={{ mb: 2 }}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormInputDropdown
            name="country"
            control={control}
            label="Country"
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
      <div className={styles.message}>{messageApi}</div>
      <FormSubmitButton text={"submit"} />
    </form>
  );
};
