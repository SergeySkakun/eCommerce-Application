import * as yup from "yup";

const LogInSchema = yup.object({
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
    .required("Required password")
    .min(8, "Password must be 8 or more characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[!#$%&?@]/,
      "Password must contain at least 1 special character:!#$%&?@&%",
    ),
});

export { LogInSchema };
