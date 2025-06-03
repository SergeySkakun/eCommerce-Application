import type { ChangeEvent, ReactElement } from "react";
import { TextField } from "@mui/material";

interface YearFilterProperties {
  currentValue: string;
  onChange: (newValue: string) => void;
}

export function YearFilter({
  currentValue,
  onChange,
}: YearFilterProperties): ReactElement {
  return (
    <TextField
      label="Year 2019-2025"
      type="number"
      value={currentValue}
      onChange={(event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
      }}
      fullWidth
      size="small"
      inputProps={{ min: 2019, max: new Date().getFullYear() }}
      sx={{ marginBottom: 2 }}
    />
  );
}
