/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { postcodeValidator } from "postcode-validator";
import * as yup from "yup";


// const now = new Date();
// const thirteenYearsAgo = new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());

const ValidationSchema = yup.object({
  email: yup.string().email("Incorrect email").required("Required email"),
  firstName: yup.string().min(1, "First name must be 1 or more characters").matches(/^[ A-Za-z]+$/, "First name must contain only letters and spaces").required("Required first name"),
  lastName: yup.string().min(1, "Last name must be 1 or more characters").matches(/^[ A-Za-z]+$/, "Last name must contain only letters and spaces").required("Required last name"),
  password: yup.string().min(8, "Password must be 8 or more characters").matches(/[A-Z]/, "Password must contain at least one uppercase letter").matches(/[a-z]/, "Password must contain at least one lowercase letter").matches(/\d/, "Password must contain at least one number").matches(/[!#$%&?@]/, "Password must contain at least 1 special character:!#$%&?@&%").required("Required dropdown value"),
    streetName: yup.string().required("Required street name"),
    streetNumber: yup.string().required("Required street number"),
    postalCode: yup.string().required("Required postcode")
    .test('check-relation', 'Invalid postcode', (value, schema) => {
      try {
      const country = schema.parent.country;
          if (country && value && typeof value === 'string' && postcodeValidator(value, country)) {
            return true;
          }
          return false;
      } catch {
        return false
      }
       }),
    city: yup.string().required("Required city").matches(/^[ A-Za-z]+$/, "City must contain only letters and spaces"),
    country: yup.string().required("Required country"),
    
    dateOfBirth: yup.string().required("Invalid date"),
    // dateOfBirth: yup.date().nullable("Date not date").max(thirteenYearsAgo, "You must be over 13 years old").required("Invalid date"),
    defaultShippingAddress: yup.bool().oneOf([true], 'Field must be checked'),
    defaultBillingAddress: yup.bool().oneOf([true], 'Field must be checked'),
});

export {ValidationSchema}