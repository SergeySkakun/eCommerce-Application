/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { IFormInputProperties } from "./form-input-properties";
import type { ReactElement } from "react";

export const FormInputText = ({
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
          size="small"
          onChange={renderProperties.field.onChange}
          value={renderProperties.field.value}
          error={!!renderProperties.fieldState.error}
          helperText={renderProperties.fieldState.error?.message ?? undefined}
          fullWidth
          label={label}
          variant="outlined"
          sx={sx}
        />
      )}
    />
  );
};
