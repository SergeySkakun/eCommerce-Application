/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { postcodeValidator } from "postcode-validator";
import * as yup from "yup";

export const AddressSchema = yup.object({
  streetName: yup.string().required("Required street name"),
  streetNumber: yup.string().required("Required street number"),
  postalCode: yup
    .string()
    .required("Required postcode")
    .test(
      "check-relation",
      "Invalid postcode",
      (value, schema: yup.TestContext<yup.AnyObject>) => {
        try {
          const country: string = schema.parent.country;
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
      },
    ),
  city: yup
    .string()
    .required("Required city")
    .matches(/^[ A-Za-zА-я]+$/, "City must contain only letters and spaces"),
  country: yup.string().required("Required country"),
});
