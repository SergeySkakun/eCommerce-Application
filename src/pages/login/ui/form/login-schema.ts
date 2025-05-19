import * as yup from "yup";

const LogInSchema = yup.object({
  email: yup.string().email("Incorrect email").required("Missing email"),
  password: yup.string().min(8, "Password must be 8 or more characters").matches(/[A-Z]/, "Password must contain at least one uppercase letter").matches(/[a-z]/, "Password must contain at least one lowercase letter").matches(/\d/, "Password must contain at least one number").matches(/[!#$%&?@]/, "Password must contain at least 1 special character:!#$%&?@&%").required("Missing dropdown value"),
});

export { LogInSchema }