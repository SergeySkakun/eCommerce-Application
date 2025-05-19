/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { IFormInputProperties } from "../interfaces/form-input-properties";
import type { ReactElement } from "react";

export const FormInputDate = ({
  name,
  control,
  label,
  sx,
}: IFormInputProperties): ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      render={(renderProperties) => (
        <TextField
          type='date'
          size="small"
          onChange={renderProperties.field.onChange}
          value={renderProperties.field.value}
          error={!!renderProperties.fieldState.error}
          helperText={renderProperties.fieldState.error?.message ?? undefined}
          fullWidth
          label={label}
          sx={sx}
        />
      )}
    />
  );
};



// import { TextField } from "@mui/material";
// import { Controller } from "react-hook-form";
// import type { IFormInputProperties } from "./form-input-properties";
// import type { ReactElement } from "react";
// // import { DatePicker } from "@mui/x-date-pickers";
// import * as React from "react";
// // import type { Dayjs } from 'dayjs';
// import dayjs from "dayjs";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateField } from '@mui/x-date-pickers/DateField';
// import { DatePicker } from "@mui/x-date-pickers";
// // import { TextField } from '@mui/material';

// export const FormInputDate = ({
//   name,
//   control,
//   label,
//   sx,
// }: IFormInputProperties): ReactElement => {
//   return (
//   <Controller
//     name={name}
//     control={control}
//     render={({field}) => {
//               return (
//               <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DatePicker
//                   format="YYYY-MM-DD"
//                   sx={{ mb: 2 }}
//                   label="Date of birth"
//                   onError={(newError) => setError(newError)}
//                   value={field.value}
//                   inputRef={field.ref}
//                   onChange={(date) => {field.onChange(date)}}
//                   renderInput={(renderProperties) => (
//                     <TextField
//                       size="small"
//                       onChange={renderProperties.field.onChange}
//                       value={renderProperties.field.value}
//                       error={!!renderProperties.fieldState.error}
//                       helperText={renderProperties.fieldState.error?.message ?? undefined}
//                       fullWidth
//                       label={label}
//                       variant="outlined"
//                       sx={sx}
//                     />
//                   )}
                      
//                   // slotProps={{
//                   //   textField: {
//                   //     helperText: errorMessage,
//                   //   },
//                   // }}
//                   // minDate={startOfQ12022}
//                   maxDate={startValidDate}
//                   // shouldDisableDate={isValidDate}
//                   />
//               </LocalizationProvider>
//               )
//             }
//     }
//   />
//   )
// };
