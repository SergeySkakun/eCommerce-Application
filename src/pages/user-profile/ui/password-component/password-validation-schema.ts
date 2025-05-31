/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as yup from "yup";

export const passwordValidationSchema = yup.object({
  currentPassword: yup
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
  newPassword: yup
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
    .matches(/^[^ ]{2,}$/, "The password must not contain spaces")
    .test(
      "check-relation",
      "The new password must be different from the current one",
      (value, schema) => {
        try {
          const current = schema.parent.currentPassword;
          if (
            current &&
            value &&
            typeof value === "string" &&
            value !== current
          ) {
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    ),
  confirmPassword: yup
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
    .matches(/^[^ ]{2,}$/, "The password must not contain spaces")
    .test(
      "check-relation",
      "This password does not match the new password",
      (value, schema) => {
        try {
          const pattern = schema.parent.newPassword;
          if (
            pattern &&
            value &&
            typeof value === "string" &&
            value === pattern
          ) {
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },
    ),
});
