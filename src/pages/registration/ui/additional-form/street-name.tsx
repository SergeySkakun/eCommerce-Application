import type { ReactNode, ChangeEvent } from "react";
import { TextField } from "@mui/material";

type StreetNameInputProperties = {
  streetName: string;
  streetNameError: string;
  setStreetName: React.Dispatch<React.SetStateAction<string>>;
  setStreetNameError: React.Dispatch<React.SetStateAction<string>>;
};

export default function StreetName({
  streetName,
  streetNameError,
  setStreetName,
  setStreetNameError,
}: StreetNameInputProperties): ReactNode {
  const handleStreetNameChange = (
    event_: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ): void => {
    try {
      setStreetName(event_.target.value);
      if (event_.target.value.length === 0) {
        setStreetNameError("Street name must contain at least one character");
      } else {
        setStreetNameError("");
      }
    } catch {
      setStreetNameError("Missing name street");
    }
  };

  return (
    <TextField
      fullWidth
      sx={{ mt: 2, pb: 2, boxSizing: "border-box" }}
      label="Street name"
      placeholder="enter street name"
      value={streetName}
      onChange={handleStreetNameChange}
      error={Boolean(streetNameError)}
      helperText={streetNameError}
    />
  );
}
