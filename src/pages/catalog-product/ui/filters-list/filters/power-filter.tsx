import type { ChangeEvent, ReactElement } from "react";
import { TextField } from "@mui/material";

interface PowerFilterProperties {
  currentValue: string;
  onChange: (newValue: string) => void;
}

export function PowerFilter({
  currentValue,
  onChange,
}: PowerFilterProperties): ReactElement {
  return (
    <TextField
      label="Max Power (0 to X < 1000)"
      type="number"
      value={currentValue}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
      fullWidth
      size="small"
      inputProps={{ min: 0, max: 1000 }}
      sx={{ marginBottom: 2 }}
    />
  );
}
