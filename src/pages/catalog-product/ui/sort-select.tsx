// src/components/catalog/sort-select.tsx
import { type ReactElement } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Box,
} from "@mui/material";

interface SortSelectProperties {
  onSortChange: (sortOption: string) => void;
  currentSortOption: string;
}

export function SortSelect({
  onSortChange,
  currentSortOption,
}: SortSelectProperties): ReactElement {
  const handleChange = (event: SelectChangeEvent<string>): void => {
    onSortChange(event.target.value);
  };

  return (
    <Box sx={{ marginBottom: 2 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="sort-select-label">Sort By</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={currentSortOption}
          label="Sort By"
          onChange={handleChange}
        >
          <MenuItem value="">Default</MenuItem>
          <MenuItem value="name.en-US asc">Name (A-Z)</MenuItem>
          <MenuItem value="name.en-US desc">Name (Z-A)</MenuItem>
          <MenuItem value="price asc">Price (Low to High)</MenuItem>
          <MenuItem value="price desc">Price (High to Low)</MenuItem>
          <MenuItem value="variants.attributes.Power asc">
            Power (Low to High)
          </MenuItem>
          <MenuItem value="variants.attributes.Power desc">
            Power (High to Low)
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
