import * as yup from "yup";

export const PersonalFormValidationSchema = yup.object({
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
  dateOfBirth: yup
    .string()
    .required("Date required")
    .typeError("Invalid format date"),
  email: yup
    .string()
    .required("Required email")
    .email("Incorrect email")
    .matches(
      /^((([\dA-Za-z][\d.A-z-]+[\dA-Za-z])|([\dА-я][\d.А-я-]+[\dА-я]))@([A-Za-z-]+\.){1,2}[A-Za-z-]{2,})$/,
      "Incorrect email",
    ),
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
});
