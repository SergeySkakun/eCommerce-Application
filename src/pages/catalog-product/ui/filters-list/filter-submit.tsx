import type { ReactElement } from "react";
import { Box, Button } from "@mui/material";

interface FilterSubmitProperties {
  onReset: () => void;
}

export function FilterSubmit({
  onReset,
}: FilterSubmitProperties): ReactElement {
  return (
    <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Apply Filters
      </Button>
      <Button
        type="button"
        onClick={onReset}
        variant="outlined"
        color="secondary"
        fullWidth
      >
        Reset
      </Button>
    </Box>
  );
}
