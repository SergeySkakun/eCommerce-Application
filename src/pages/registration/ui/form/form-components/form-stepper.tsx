export function foo():void {
  return;
}

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Stepper from '@mui/material/Stepper';
// import Step from '@mui/material/Step';
// import StepLabel from '@mui/material/StepLabel';
// import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import { FormValues, RegistrationForm, validationSchema } from '../form';
// import { Container } from '@mui/material';
// import { FormInputText } from './form-input-text';
// import { FormInputPassword } from './form-input-password';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';

// const steps = [
//   {
//     label: 'Select campaign settings',
//     description: <MainFormContainer/>
//   },
//   {
//     label: 'Create an ad group',
//     description:
//       'An ad group contains one or more ads which target a shared set of keywords.',
//   },
//   {
//     label: 'Create an ad',
//     description: `Try out different ad text to see what brings in the most customers,
//               and learn how to enhance your ads using features like ad extensions.
//               If you run into any problems with your ads, find out how to tell if
//               they're running and how to resolve approval issues.`,
//   },
// ];

// export default function VerticalLinearStepper(): React.ReactElement {
//   const [activeStep, setActiveStep] = React.useState(0);

//   const handleNext = ():void => {
//     setActiveStep((previousActiveStep) => previousActiveStep + 1);
//   };

//   const handleBack = ():void => {
//     setActiveStep((previousActiveStep) => previousActiveStep - 1);
//   };

//   const handleReset = ():void => {
//     setActiveStep(0);
//   };

//   return (
//     <Box  sx={{ mt: 8, p: 2 }}>
//       <Stepper activeStep={activeStep} orientation="vertical">
//         {steps.map((step, index) => (
//           <Step key={step.label}>
//             <StepLabel
//               optional={
//                 index === steps.length - 1 ? (
//                   <Typography variant="caption">Last step</Typography>
//                 ) : undefined
//               }
//             >
//               {step.label}
//             </StepLabel>
//             <StepContent>
//               <Container maxWidth="md">{step.description}</Container>
//               <Box sx={{ mb: 2 }}>
//                 <Button
//                   variant="contained"
//                   onClick={handleNext}
//                   sx={{ mt: 1, mr: 1 }}
//                 >
//                   {index === steps.length - 1 ? 'Finish' : 'Continue'}
//                 </Button>
//                 <Button
//                   disabled={index === 0}
//                   onClick={handleBack}
//                   sx={{ mt: 1, mr: 1 }}
//                 >
//                   Back
//                 </Button>
//               </Box>
//             </StepContent>
//           </Step>
//         ))}
//       </Stepper>
//       {activeStep === steps.length && (
//         <Paper square elevation={0} sx={{ p: 3 }}>
//           <Typography>All steps completed - you&apos;re finished</Typography>
//           <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
//             Reset
//           </Button>
//         </Paper>
//       )}
//     </Box>
//   );
// }

// export function MainFormContainer (): React.ReactElement {
//     const onSubmit = async (data: FormValues):Promise<void> => {
//       const address = {
//         streetName: data.streetName,
//         streetNumber: data.streetNumber,
//         postalCode: data.postalCode,
//         city: data.city,
//         country: data.country
//       }
//       const body: BodySignUp = {
//         email: data.email,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         password: data.password,
//         addresses: [address],
//         // defaultShippingAddress: 0,
//         // defaultBillingAddress: 0,
//         dateOfBirth: "1992-10-17",
//         store: "rush-store"
//       }
//       await sendingSignInOrSignUpRequest(body, "signup")
//     };
//    const { handleSubmit, control } = useForm<FormValues>({
//       resolver: yupResolver(validationSchema),
//       defaultValues: {
//         email: "",
//         firstName: "",
//         lastName: "",
//         password: "",
//       },
//     });
//   return (
//    <Paper elevation={10} sx={{ mt: 8, p: 2 }}>
//       <FormInputText
//           name="email"
//           control={control}
//           label="Email"
//           sx={{ mb: 2 }}
//         />
//         <FormInputPassword
//           name="password"
//           control={control}
//           label="Password"
//           sx={{ mb: 2 }}
//         />
//                 <FormInputText
//           name="firstName"
//           control={control}
//           label="First name"
//           sx={{ mb: 2 }}
//         />
//         <FormInputText
//           name="lastName"
//           control={control}
//           label="Last name"
//           sx={{ mb: 2 }}
//         />
//    </Paper>
//   )
// }


//     <Container maxWidth="md">
//     <Paper elevation={10} sx={{ mt: 8, p: 2 }}>
//       {/* <Typography variant="h4"> Registration </Typography>  */}
      
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <FormInputText
//           name="email"
//           control={control}
//           label="Email"
//           sx={{ mb: 2 }}
//         />
//         <FormInputPassword
//           name="password"
//           control={control}
//           label="Password"
//           sx={{ mb: 2 }}
//         />
//         <FormInputText
//           name="firstName"
//           control={control}
//           label="First name"
//           sx={{ mb: 2 }}
//         />
//         <FormInputText
//           name="lastName"
//           control={control}
//           label="Last name"
//           sx={{ mb: 2 }}
//         />
//         <Typography
//           component="h5"
//           sx={{ textAlign: "left", width: "100%", mt: 2, mb: 2 }}
//         >
//           Address
//         </Typography>
//         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
//           <Grid size={{ xs: 12, sm: 6}}>
//             <FormInputText
//               name="streetName"
//               control={control}
//               label="Street name"
//               sx={{ mb: 2 }}
//             />
//           </Grid>
//           <Grid size={{ xs: 12, sm: 6}}>
//             <FormInputText
//               name="streetNumber"
//               control={control}
//               label="Street number"
//               sx={{ mb: 2 }}
//             />
//           </Grid>
//         <FormInputText
//           name="city"
//           control={control}
//           label="City"
//           sx={{ mb: 2 }}
//         />
//         <Grid size={{ xs: 12, sm: 6}}>
//         <FormInputDropdown
//           name="country"
//           control={control}
//           label="Country"
//           sx={{ mb: 2 }}
//           options={ countries }
//         />
//         </Grid>
//         <Grid size={{ xs: 12, sm: 6}}>
//         <FormInputText
//           name="postalCode"
//           control={control}
//           label="Postal code"
//           sx={{ mb: 2 }}
//         />
//         </Grid>
//         </Grid>
//         {/* <FormInputDate
//           name="dateOfBirth"
//           control={control}
//           label="Birthday"
//         /> */}
//         {/* <DateFieldValue/> */}
//         <FormInputCheckbox 
//           name="defaultShippingAddress" 
//           control={control}
//           label="Set as default address"
//         />
//         <FormInputCheckbox 
//           name="defaultBillingAddress" 
//           control={control}
//           label="Set as default address for billing"
//         />

//         <Typography
//           component="h5"
//           sx={{ textAlign: "left", width: "100%", mt: 2, mb: 2 }}
//         >
//           Address for billing
//         </Typography>
//         <Button
//           type="submit"
//           variant={"contained"}
//           sx={{ mt: 2, display: "block" }}
//         >
//           Submit
//         </Button>
//       </form>
//       <Grid container justifyContent={"space-between"} sx={{ mt: 1 }}>
//         <Grid>
//           <Typography>Already have an account?</Typography>
//         </Grid>
//         <Grid>
//           <Link
//             href="#"
//             // component={Routerlink}
//             // to ="/register"
//           >
//             Sign In
//           </Link>
//         </Grid>
//       </Grid>
//     </Paper>
//     </Container>