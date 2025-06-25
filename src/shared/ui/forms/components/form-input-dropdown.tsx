import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import type { CountryType, FormInputDropdownProperties } from "./interfaces";
import { Controller } from "react-hook-form";
import { FormLabel } from "@mui/material";

const findCountry = (item: string, countryList: CountryType[]) => {
  const match = item.match(/\((.*?)\)/);
  if (match) {
    return countryList.find((object) => object.value === match[1]);
  }
  return null;
};

export const FormInputDropdown = ({
  name,
  control,
  label,
  options,
}: FormInputDropdownProperties) => {
  return (
    <Controller
      name={name}
      control={control}
      render={(renderProperties) => (
        <Autocomplete
          id="country-select-demo"
          options={options}
          onChange={(event) => {
            const target = event.target;
            if (target && target instanceof HTMLElement) {
              const targetCountry = findCountry(target.innerHTML, options);
              if (targetCountry === null) {
                renderProperties.field.onChange("");
              } else {
                renderProperties.field.onChange(targetCountry.value);
              }
            } else {
              renderProperties.field.onChange("");
            }
          }}
          sx={{
            color: "var(--card-hover-shadow)",
            gap: 1,
          }}
          size="small"
          getOptionLabel={(option: CountryType) => option.label}
          renderOption={(
            properties: React.HTMLAttributes<HTMLLIElement> & { key: string },
            option: CountryType,
          ) => {
            const { key, ...optionProperties } = properties;
            return (
              <Box
                key={key}
                component="li"
                sx={{
                  "& > img": {
                    mr: 2,
                    flexShrink: 0,
                    color: "var(--card-hover-shadow)",
                  },
                }}
                {...optionProperties}
              >
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.value.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.value.toLowerCase()}.png`}
                  alt=""
                />
                {option.label} ({option.value})
              </Box>
            );
          }}
          renderInput={(parameters) => (
            <>
              <FormLabel
                sx={{
                  color: "var(--card-hover-shadow)",
                }}
                htmlFor={label}
                required
              >
                {label}
              </FormLabel>
              <TextField
                {...parameters}
                size="small"
                sx={{
                  color: "var(--card-hover-shadow)",
                }}
                placeholder="Choose a country"
                onChange={renderProperties.field.onChange}
                error={!!renderProperties.fieldState.error}
                helperText={
                  renderProperties.fieldState.error?.message ?? undefined
                }
                slotProps={{
                  htmlInput: {
                    ...parameters.inputProps,
                    style: { color: "var(--white-color)" },
                    autoComplete: "new-password",
                  },
                }}
              />
            </>
          )}
        />
      )}
    />
  );
};
