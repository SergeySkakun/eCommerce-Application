import type { ReactElement } from "react";
import { Box } from "@mui/material";

interface FilterSubmitProperties {
  onReset: () => void;
}

export function FilterSubmit({
  onReset,
}: FilterSubmitProperties): ReactElement {
  return (
    <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
      <button className="button-apply-filters" type="submit">
        APPLY FILTERS
      </button>
      <button className="button-reset-filters" type="button" onClick={onReset}>
        RESET
      </button>
    </Box>
  );
}
