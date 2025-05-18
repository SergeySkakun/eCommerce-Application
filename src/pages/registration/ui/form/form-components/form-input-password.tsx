/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { IFormInputProperties } from "./form-input-properties";
import { useState, type ReactElement } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const FormInputPassword = ({
  name,
  control,
  label,
  sx,
}: IFormInputProperties): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (): void => setShowPassword((show) => !show);
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
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};
