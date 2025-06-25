/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Controller } from "react-hook-form";
import type { IFormInputProperties } from "../interfaces/form-input-properties";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import type { ReactElement } from "react";

interface FormInputDropdownProperties extends IFormInputProperties {
  options: { label: string; value: string; phone: string }[];
}

export const FormInputDropdown = ({
  name,
  control,
  label,
  sx,
  options,
}: FormInputDropdownProperties): ReactElement => {
  return (
    <Controller
      name={name}
      control={control}
      render={(renderProperties) => (
        <FormControl
          error={!!renderProperties.fieldState.error}
          sx={{ minWidth: 200 }}
          size="small"
          fullWidth
        >
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            onChange={renderProperties.field.onChange}
            value={renderProperties.field.value}
            sx={sx}
            label={name}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {renderProperties.fieldState.error && (
            <FormHelperText>
              {renderProperties.fieldState.error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
