import {
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { FormInputProperties, RegistrationFormType } from "./interfaces";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const FormInputPassword = ({
  name,
  control,
  label,
  sx,
}: FormInputProperties<RegistrationFormType>) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (): void => setShowPassword((show) => !show);
  return (
    <Controller
      name={name}
      control={control}
      render={(renderProperties) => (
        <>
          <FormLabel
            sx={{
              color: "var(--card-hover-shadow)",
              pb: "1rem",
            }}
            htmlFor={label}
            required
          >
            {label}
          </FormLabel>
          <TextField
            size="small"
            onChange={renderProperties.field.onChange}
            value={renderProperties.field.value}
            error={!!renderProperties.fieldState.error}
            helperText={renderProperties.fieldState.error?.message ?? undefined}
            fullWidth
            placeholder={`Enter ${label.toLocaleLowerCase()}`}
            variant="outlined"
            sx={sx}
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                style: {
                  width: "100%",
                  fontWeight: "200",
                  lineHeight: 1.5,
                  fontFamily: "monospace",
                  color: "var(--white-color)",
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      sx={{ color: "var(--white-color)" }}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </>
      )}
    />
  );
};
