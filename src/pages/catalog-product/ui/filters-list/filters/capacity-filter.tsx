import type { ChangeEvent, ReactElement } from "react";
import { TextField } from "@mui/material";

interface CapacityFilterProperties {
  currentValue: string;
  onChange: (newValue: string) => void;
}

export function CapacityFilter({
  currentValue,
  onChange,
}: CapacityFilterProperties): ReactElement {
  return (
    <TextField
      label="Max Capacity (0 to X < 30)"
      type="number"
      value={currentValue}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
      fullWidth
      size="small"
      inputProps={{ min: 0, max: 30 }}
      sx={{ marginBottom: 2 }}
    />
  );
}
