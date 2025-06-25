import { type UseFormReturn } from "react-hook-form";
import type { Theme } from "@emotion/react";
import type { SxProps } from "@mui/material";

export interface LoginFormType {
  readonly email: string;
  readonly password: string;
}

export interface RegistrationFormType {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly streetName: string;
  readonly streetNumber: string;
  readonly postalCode: string;
  readonly city: string;
  readonly country: string;
  readonly dateOfBirth: string;
  readonly defaultShippingAddress: boolean;
  readonly defaultBillingAddress: boolean;
}

export interface FormInputProperties<T> {
  readonly name:
    | "email"
    | "password"
    | "firstName"
    | "lastName"
    | "defaultShippingAddress"
    | "defaultBillingAddress"
    | "streetName"
    | "streetNumber"
    | "city"
    | "country"
    | "postalCode"
    | "dateOfBirth";
  readonly control?: UseFormReturn<T>["control"];
  readonly label: string;
  readonly sx?: SxProps<Theme>;
}

export interface CountryType {
  readonly value: string;
  readonly label: string;
  readonly phone: string;
  readonly suggested?: boolean;
}

export interface FormInputDropdownProperties
  extends FormInputProperties<RegistrationFormType> {
  readonly options: { label: string; value: string; phone: string }[];
}
