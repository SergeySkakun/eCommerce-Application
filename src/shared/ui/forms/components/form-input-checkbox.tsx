import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import type { FormInputProperties, RegistrationFormType } from "./interfaces";

export const FormInputCheckbox = ({
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
          <FormControlLabel
            style={{
              width: "100%",
              color: "var(--white-color)",
            }}
            sx={sx}
            control={
              <Checkbox
                sx={{ color: "var(--white-color)" }}
                checked={Boolean(renderProperties.field.value)}
                onChange={renderProperties.field.onChange}
              />
            }
            label={label}
          />
          {renderProperties.fieldState.error && (
            <FormHelperText error>
              {renderProperties.fieldState.error?.message ?? undefined}
            </FormHelperText>
          )}
        </>
      )}
    />
  );
};
