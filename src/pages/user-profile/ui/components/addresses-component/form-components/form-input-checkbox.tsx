/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Checkbox, FormControlLabel, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";
import type { FormInputProperties } from "./interfaces/form-input-properties";
import type { ReactElement } from "react";

export const FormInputCheckbox = ({
  name,
  control,
  label,
  sx,
}: FormInputProperties): ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      render={(renderProperties) => (
        <>
          <FormControlLabel
            style={{ width: "100%" }}
            sx={sx}
            control={
              <Checkbox
                checked={renderProperties.field.value}
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
