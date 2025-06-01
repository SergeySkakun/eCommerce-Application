/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { FormInput } from "./form-interface";
import { useState, type ReactElement } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

export const PasswordInput = ({
  name,
  control,
  label,
  sx,
}: FormInput): ReactElement => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (): void => setShowPassword((show) => !show);
  return (
    <Controller
      name={name}
      control={control}
      render={(renderProperties) => (
        <TextField
          size="small"
          placeholder={`Type your ${label.toLowerCase()}`}
          onChange={renderProperties.field.onChange}
          value={renderProperties.field.value}
          error={!!renderProperties.fieldState.error}
          helperText={renderProperties.fieldState.error?.message ?? undefined}
          fullWidth
          label={label}
          variant="standard"
          sx={sx}
          type={showPassword ? "text" : "password"}
          InputLabelProps={{
            sx: { color: grey[400] },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
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
