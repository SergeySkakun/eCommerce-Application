import type { ReactNode, ChangeEvent } from "react";
import { TextField } from "@mui/material";

type StreetNameInputProperties = {
  city: string;
  cityError: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setCityError: React.Dispatch<React.SetStateAction<string>>;
};

export default function City({
  city,
  cityError,
  setCity,
  setCityError,
}: StreetNameInputProperties): ReactNode {
  const handleCityChange = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    try {
      setCity(event_.target.value);
      if (event_.target.value.length === 0) {
        setCityError("City must contain at least one character");
      } else {
        setCityError("");
      }
    } catch {
      setCityError("Missing city");
    }
  };

  return (
    <TextField
      fullWidth
      sx={{ mt: 2, pb: 2, boxSizing: "border-box" }}
      label="City"
      placeholder="enter yor city"
      value={city}
      onChange={handleCityChange}
      error={Boolean(cityError)}
      helperText={cityError}
    />
  );
}
