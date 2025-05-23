/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import dayjs from "dayjs";
import { postcodeValidator } from "postcode-validator";
import * as yup from "yup";

const ValidationSchema = yup.object({
  email: yup
    .string()
    .required("Required email")
    .email("Incorrect email")
    .matches(
      /^((([\dA-Za-z][\d.A-z-]+[\dA-Za-z])|([\dА-я][\d.А-я-]+[\dА-я]))@([A-Za-z-]+\.){1,2}[A-Za-z-]{2,})$/,
      "Incorrect email",
    ),
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
  password: yup
    .string()
    .required("Password required")
    .min(8, "Password must be 8 or more characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!#$%&?@]/,
      "Password must contain at least 1 special character:!#$%&?@&%",
    )
    .matches(/^[^ ]{2,}$/, "The password must not contain spaces"),
  streetName: yup.string().required("Required street name"),
  streetNumber: yup.string().required("Required street number"),
  postalCode: yup
    .string()
    .required("Required postcode")
    .test("check-relation", "Invalid postcode", (value, schema) => {
      try {
        const country = schema.parent.country;
        if (
          country &&
          value &&
          typeof value === "string" &&
          postcodeValidator(value, country)
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
  country: yup.string().required("Required country"),
  dateOfBirth: yup
    .string()
    .required("Date required")
    .typeError("Invalid format date"),
  // .test("isValid", "Invalid date", (value) => {
  //   const now = dayjs();
  //   const dayjsDate = dayjs(value, "YYYY-MM-DD", true);
  //   const thirteenYearsAgo = now.subtract(13, "year");
  //   if (!value || dayjsDate.isBefore(thirteenYearsAgo)) {
  //     return false;
  //   }
  //   if (dayjs(value).isValid()) {
  //     return true;
  //   }
  //   return false;
  // }),
  defaultShippingAddress: yup.bool().oneOf([true], "Field must be checked"),
  defaultBillingAddress: yup.bool().oneOf([true], "Field must be checked"),
});

export { ValidationSchema };
