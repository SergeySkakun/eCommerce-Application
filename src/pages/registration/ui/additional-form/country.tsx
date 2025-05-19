import type { ReactNode, ChangeEvent } from "react";
import { TextField } from "@mui/material";

type CountryInputProperties = {
  country: string;
  countryError: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCountryError: React.Dispatch<React.SetStateAction<string>>;
};

export default function Country({
  country,
  countryError,
  setCountry,
  setCountryError,
}: CountryInputProperties): ReactNode {
  const handleCountryChange = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    try {
      setCountry(event_.target.value);
      if (event_.target.value.length === 0) {
        setCountryError("Country must contain at least one character");
      } else {
        setCountryError("");
      }
    } catch {
      setCountryError("Missing country");
    }
  };

  return (
    <TextField
      fullWidth
      sx={{ mt: 2, pb: 2, boxSizing: "border-box" }}
      label="Country"
      placeholder="enter country"
      value={country}
      onChange={handleCountryChange}
      error={Boolean(countryError)}
      helperText={countryError}
    />
  );
}
