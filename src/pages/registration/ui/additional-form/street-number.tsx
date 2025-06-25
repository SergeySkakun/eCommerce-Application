import type { ReactNode, ChangeEvent } from "react";
import { TextField } from "@mui/material";

type StreetNameInputProperties = {
  streetNumber: string;
  streetNumberError: string;
  setStreetNumber: React.Dispatch<React.SetStateAction<string>>;
  setStreetNumberError: React.Dispatch<React.SetStateAction<string>>;
};

export default function StreetNumber({
  streetNumber,
  streetNumberError,
  setStreetNumber,
  setStreetNumberError,
}: StreetNameInputProperties): ReactNode {
  const handleStreetNumberChange = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    try {
      setStreetNumber(event_.target.value);
      if (event_.target.value.length === 0) {
        setStreetNumberError(
          "Street number must contain at least one character",
        );
      } else {
        setStreetNumberError("");
      }
    } catch {
      setStreetNumberError("Missing street number");
    }
  };

  return (
    <TextField
      fullWidth
      sx={{ mt: 2, pb: 2, boxSizing: "border-box" }}
      label="Street number"
      placeholder="enter street number"
      value={streetNumber}
      onChange={handleStreetNumberChange}
      error={Boolean(streetNumberError)}
      helperText={streetNumberError}
    />
  );
}
