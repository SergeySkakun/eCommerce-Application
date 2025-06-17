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
          type="date"
          size="small"
          defaultValue={renderProperties.field.value}
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
