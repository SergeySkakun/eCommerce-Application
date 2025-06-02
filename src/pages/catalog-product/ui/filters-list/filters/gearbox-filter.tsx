import type { ChangeEvent, ReactElement } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface GearboxFilterProperties {
  currentValue: "" | "automatic" | "manual";
  onChange: (newValue: "" | "automatic" | "manual") => void;
}

export function GearboxFilter({
  currentValue,
  onChange,
}: GearboxFilterProperties): ReactElement {
  const handleGearboxChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    if (value === "automatic") {
      onChange("automatic");
    } else if (value === "manual") {
      onChange("manual");
    } else {
      onChange("");
    }
  };

  return (
    <FormControl component="fieldset" sx={{ marginBottom: 2 }}>
      <FormLabel component="legend">Gearbox Type</FormLabel>
      <RadioGroup
        row
        name="gearbox"
        value={currentValue}
        onChange={handleGearboxChange}
      >
        <FormControlLabel value="" control={<Radio />} label="All" />
        <FormControlLabel
          value="automatic"
          control={<Radio />}
          label="Automatic"
        />
        <FormControlLabel value="manual" control={<Radio />} label="Manual" />
      </RadioGroup>
    </FormControl>
  );
}
