/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { postcodeValidator } from "postcode-validator";
import * as yup from "yup";
import { countries } from "../components";

const today = new Date();
const maxDate = new Date(
  today.getFullYear() - 100,
  today.getMonth(),
  today.getDate(),
);
const minDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);

export const RegistrationFormSchema = yup.object({
  email: yup
    .string()
    .required("Required email")
    .email("Incorrect email")
    .matches(
      /^((([\dA-Za-z][\d.A-z-]+[\dA-Za-z])|([\dА-я][\d.А-я-]+[\dА-я]))@([A-Za-z-]+\.){1,2}[A-Za-z-]{2,})$/,
      "Incorrect email",
    ),
  password: yup
    .string()
    .required("Password required")
    .min(8, "Password must be 8 or more characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/^[^#]*$/, "Password must not contain a hash symbol")
    .matches(/^[^%]*$/, "Password must not contain a percent symbol")
    .matches(
      /[!$&?@]/,
      "Password must contain at least 1 special character - !$&?@",
    )
    .matches(/^[^ ]{2,}$/, "The password must not contain spaces"),
  firstName: yup
    .string()
    .min(1, "First name must be 1 or more characters")
    .matches(/^[ A-Za-z]+$/, "First name must contain only letters and spaces")
    .required("Required first name"),
  lastName: yup
    .string()
    .min(1, "Last name must be 1 or more characters")
    .matches(/^[ A-Za-z]+$/, "Last name must contain only letters and spaces")
    .required("Required last name"),
  streetName: yup.string().required("Required street name"),
  streetNumber: yup.string().required("Required street number"),
  country: yup
    .string()
    .required("Required country")
    .test(
      "check-country",
      "Select a country from the list provided",
      (value) => {
        return countries.some((item) => item.value === value);
      },
    ),
  postalCode: yup
    .string()
    .required("Required postcode")
    .test("check-relation", "Invalid postcode", (value, schema) => {
      try {
        const country = schema.parent.country;
        const countryValue = countries.find(
          (object) => object.value === country,
        );
        if (
          country &&
          value &&
          typeof value === "string" &&
          postcodeValidator(value, countryValue.value)
        ) {
          return true;
        }
        return false;
      } catch {
        return false;
      }
    }),
  city: yup
    .string()
    .required("Required city")
    .matches(/^[ A-Za-z]+$/, "City must contain only letters and spaces"),
  dateOfBirth: yup
    .string()
    .required("Date required")
    .test("check-years", "You must not be more than 100 years old", (value) => {
      try {
        const currentDate = new Date(value);
        if (value && currentDate < maxDate) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    })
    .test("check-years", "Нou must not be under 18 years old", (value) => {
      try {
        const currentDate = new Date(value);
        if (value && currentDate > minDate) {
          return false;
        }
        return true;
      } catch {
        return false;
      }
    }),
  defaultShippingAddress: yup.bool().oneOf([true], "Field must be checked"),
  defaultBillingAddress: yup.bool().oneOf([true], "Field must be checked"),
});
