/* eslint-disable @typescript-eslint/no-misused-promises */
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { FormInputText } from "./form-components/form-input-text";
// import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInputDropdown } from "./form-components/form-input-dropdown";
import type { ReactElement } from "react";
import { FormInputPassword } from "./form-components/form-input-password";
import { Container, Grid, Link } from "@mui/material";
// import { postcodeValidator } from "postcode-validator";
import { countries } from "./form-components/countries-list";
import { FormInputCheckbox } from "./form-components/form-input-checkbox";
import type { BodySignUp } from "../../../../shared/api";
import { sendingSignInOrSignUpRequest } from "../../../../shared/api";
import { FormInputDate } from "./form-components/form-input-date";
import { ValidationSchema } from "./validation/validation-schema";

// const now = new Date();
// const thirteenYearsAgo = new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());


// const validationSchema = yup.object({
//   email: yup.string().email("Incorrect email").required("Required email"),
//   firstName: yup.string().min(1, "First name must be 1 or more characters").matches(/^[ A-Za-z]+$/, "First name must contain only letters and spaces").required("Required first name"),
//   lastName: yup.string().min(1, "Last name must be 1 or more characters").matches(/^[ A-Za-z]+$/, "Last name must contain only letters and spaces").required("Required last name"),
//   password: yup.string().min(8, "Password must be 8 or more characters").matches(/[A-Z]/, "Password must contain at least one uppercase letter").matches(/[a-z]/, "Password must contain at least one lowercase letter").matches(/\d/, "Password must contain at least one number").matches(/[!#$%&?@]/, "Password must contain at least 1 special character:!#$%&?@&%").required("Required dropdown value"),
//     streetName: yup.string().required("Required street name"),
//     streetNumber: yup.string().required("Required street number"),
//     postalCode: yup.string().required("Required postcode")
//     .test('check-relation', 'Invalid postcode', (value, schema) => {
//       try {
//       const country = schema.parent.country;
//           if (country && value && typeof value === 'string' && postcodeValidator(value, country)) {
//             return true;
//           }
//           return false;
//       } catch {
//         return false
//       }
//     }),
//     city: yup.string().required("Required city").matches(/^[ A-Za-z]+$/, "City must contain only letters and spaces"),
//     country: yup.string().required("Required country"),
//     dateOfBirth: yup.string().required("Invalid date"),
//     // dateOfBirth: yup.date().nullable("Date not date").max(thirteenYearsAgo, "You must be over 13 years old").required("Invalid date"),
//     defaultShippingAddress: yup.bool().oneOf([true], 'Field must be checked'),
//     defaultBillingAddress: yup.bool().oneOf([true], 'Field must be checked'),
// });

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  streetName: string,
  streetNumber: string,
  postalCode: string,
  city: string,
  country: string,
  dateOfBirth: string,
  defaultShippingAddress: boolean,
  defaultBillingAddress: boolean,
}

const RegistrationForm = (): ReactElement => {
  const { handleSubmit, control } = useForm<FormValues>({
    resolver: yupResolver(ValidationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      streetName: "",
      streetNumber: "",
      postalCode: "",
      city: "",
      country: "",
      dateOfBirth: "2025-05-20",
      defaultShippingAddress: true,
      defaultBillingAddress: true,
    },
  });
  const onSubmit = async (data: FormValues):Promise<void> => {
    const address = {
      streetName: data.streetName,
      streetNumber: data.streetNumber,
      postalCode: data.postalCode,
      city: data.city,
      country: data.country
    }
    const body: BodySignUp = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      addresses: [address],
      // defaultShippingAddress: 0,
      // defaultBillingAddress: 0,
      dateOfBirth: data.dateOfBirth,
      store: "rush-store"
    }
    // console.log( body )
    await sendingSignInOrSignUpRequest(body, "signup")
  };

  return (
    <Container maxWidth="md">
    <Paper elevation={10} sx={{ mt: 8, p: 2 }}
    >
      <Typography variant="h4"> Registration </Typography>
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
        <Typography
          component="h5"
          sx={{ textAlign: "left", width: "100%", mt: 2, mb: 2 }}
        >
          Address
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={{ xs: 12, sm: 6}}>
            <FormInputText
              name="streetName"
              control={control}
              label="Street name"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6}}>
            <FormInputText
              name="streetNumber"
              control={control}
              label="Street number"
              sx={{ mb: 2 }}
            />
          </Grid>
        <FormInputText
          name="city"
          control={control}
          label="City"
          sx={{ mb: 2 }}
        />
        <Grid size={{ xs: 12, sm: 6}}>
        <FormInputDropdown
          name="country"
          control={control}
          label="Country"
          sx={{ mb: 2 }}
          options={ countries }
        />
        </Grid>
        <Grid size={{ xs: 12, sm: 6}}>
        <FormInputText
          name="postalCode"
          control={control}
          label="Postal code"
          sx={{ mb: 2 }}
        />
        </Grid>
        </Grid>
        <FormInputDate
          name="dateOfBirth"
          control={control}
          label="Birthday"
        />
        <FormInputCheckbox 
          name="defaultShippingAddress" 
          control={control}
          label="Set as default address"
        />
        <FormInputCheckbox 
          name="defaultBillingAddress" 
          control={control}
          label="Set as default address for billing"
        />

        <Typography
          component="h5"
          sx={{ textAlign: "left", width: "100%", mt: 2, mb: 2 }}
        >
          Address for billing
        </Typography>
        <Button
          type="submit"
          variant={"contained"}
          sx={{ mt: 2, display: "block" }}
        >
          Submit
        </Button>
      </form>
      <Grid container justifyContent={"space-between"} sx={{ mt: 1 }}>
        <Grid>
          <Typography>Already have an account?</Typography>
        </Grid>
        <Grid>
          <Link
            href="#"
            // component={Routerlink}
            // to ="/register"
          >
            Sign In
          </Link>
        </Grid>
      </Grid>
    </Paper>
    </Container>
  );
};

export {RegistrationForm};

