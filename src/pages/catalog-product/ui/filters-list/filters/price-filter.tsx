import type { ReactElement } from "react";
import { Box, TextField, Typography } from "@mui/material";

interface PriceFilterProperties {
  minimumValue: string;
  maximumValue: string;
  onMinimumChange: (newValue: string) => void;
  onMaximumChange: (newValue: string) => void;
}

export function PriceFilter({
  minimumValue,
  maximumValue,
  onMinimumChange,
  onMaximumChange,
}: PriceFilterProperties): ReactElement {
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Price
      </Typography>
      <TextField
        label="From"
        type="number"
        value={minimumValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onMinimumChange(event.target.value);
        }}
        fullWidth
        size="small"
        inputProps={{ min: 0 }}
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="To"
        type="number"
        value={maximumValue}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          onMaximumChange(event.target.value);
        }}
        fullWidth
        size="small"
        inputProps={{ min: 0 }}
      />
    </Box>
  );
}
