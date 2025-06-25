import type { ChangeEvent, ReactElement } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface FuelTypeFilterProperties {
  currentValue: "" | "diesel" | "gasoline";
  onChange: (newValue: "" | "diesel" | "gasoline") => void;
}

export function FuelTypeFilter({
  currentValue,
  onChange,
}: FuelTypeFilterProperties): ReactElement {
  const handleFuelChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (value === "diesel") {
      onChange("diesel");
    } else if (value === "gasoline") {
      onChange("gasoline");
    } else {
      onChange("");
    }
  };

  return (
    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
      <FormLabel component="legend">Fuel Type</FormLabel>
      <RadioGroup
        row
        name="fuel"
        value={currentValue}
        onChange={handleFuelChange}
      >
        <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel value="diesel" control={<Radio />} label="Diesel" />
        <FormControlLabel
          value="gasoline"
          control={<Radio />}
          label="Gasoline"
        />
      </RadioGroup>
    </FormControl>
  );
}
