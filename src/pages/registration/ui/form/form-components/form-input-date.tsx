/* eslint-disable @typescript-eslint/no-unsafe-call */
 
 
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { IFormInputProperties } from "./form-input-properties";
import type { ReactElement } from "react";
import { TimePicker } from "@mui/x-date-pickers";
// import * as React from "react";
// import type { Dayjs } from 'dayjs';
import dayjs from "dayjs";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateField } from '@mui/x-date-pickers/DateField';
// import { TextField } from '@mui/material';

export const FormInputDate = ({
  name,
  control,
  label,
}: IFormInputProperties): ReactElement => {
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));
  // const [, setValue] = React.useState<Dayjs | null>();
  // const isValidDate = (date: Dayjs): boolean => {
  //   const minimumValidDate = date.add(13, 'year')
  //   const currentValue = dayjs();
  //   return Boolean(minimumValidDate >= currentValue)
  // };

  // const { control, handleSubmit } = useForm({
  //   defaultValues: {
  //     date: null as Dayjs | null
  //   }
  // });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <TimePicker
            label={label}
            value={value ? dayjs(value, "HH:mm A") : undefined}
            onChange={(time) => onChange(time ? time.format("HH:mm A") : "")}
            slots={{
              // eslint-disable-next-line unicorn/prevent-abbreviations
              textField: (textFieldProps) => <TextField {...textFieldProps} />,
            }}
            ampm
          />
        )}
      />
    </LocalizationProvider>
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    // <Controller
    //   name={name}
    //   control={control}
    //   rules={{ required: true }}
    //   render={(renderProperties) => (
    //   <DateTimePicker
    //     label="Date"
    //     value={renderProperties.field.value}
    //     // inputRef={field.ref}
    //     onChange={(date) => {
    //       renderProperties.field.onChange(date);
    //     }}
    //   />
    // <LocalizationProvider dateAdapter={AdapterDayjs}>
    // <DemoContainer components={['DatePicker', 'DatePicker']}>
    //   <DatePicker
    //     value={renderProperties.field.value}
    //     // error={!!renderProperties.fieldState.error}
    //     // helperText={renderProperties.fieldState.error?.message ?? undefined}
    //     // fullWidth
    //     label={label}
    //     // onChange={(newValue) => setValue(newValue)}
    //     />
    //   </DemoContainer>
    //   </LocalizationProvider>
    // <LocalizationProvider erro  dateAdapter={AdapterDayjs}>
    //   <DemoContainer components={['DateField']} >
    //     <DateField
    //       size="small"
    //       onChange={renderProperties.field.onChange}
    //       value={renderProperties.field.value}
    //       error={!!renderProperties.fieldState.error}
    //       helperText={renderProperties.fieldState.error?.message ?? undefined}
    //       // fullWidth
    //       label={label}
    //       variant="outlined"
    //       sx={sx}
    //       format="YYYY-MM-DD"
    //       // sx={{mb:2}}
    //       label="Date of birth"
    //       fullWidth
    //       required
    //       defaultValue={undefined}
    //       shouldDisableDate={isValidDate}
    //       disableFuture
    //       // onChange={(newValue) => setValue(newValue)}
    //       value={undefined}
    //     />
    //   </DemoContainer>
    // </LocalizationProvider>
    // )}
    // />
    // </LocalizationProvider>
  );
};
