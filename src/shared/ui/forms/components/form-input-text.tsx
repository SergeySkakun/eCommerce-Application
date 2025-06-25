import { FormLabel, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import type { FormInputProperties, RegistrationFormType } from "./interfaces";

export const FormInputText = ({
  name,
  control,
  label,
  sx,
}: FormInputProperties<RegistrationFormType>) => {
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
            slotProps={{
              input: {
                style: {
                  width: "100%",
                  fontWeight: "200",
                  lineHeight: 1.5,
                  fontFamily: "monospace",
                  color: "var(--white-color)",
                },
              },
            }}
          />
        </>
      )}
    />
  );
};
