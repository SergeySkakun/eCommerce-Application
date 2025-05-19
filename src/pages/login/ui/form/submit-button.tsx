import type { ReactNode } from "react";
import { Button, Typography } from "@mui/material";

export default function SubmitButton(): ReactNode {
  return (
    <Button
      type="submit"
      variant="contained"
      fullWidth
      sx={{
        mt: 5,
        display: "block",
        pt: 1,
        pb: 1,
        bgcolor: "sandybrown",
      }}
    >
      <Typography fontWeight={"400"} variant="h6">
        Sign In
      </Typography>
    </Button>
  );
}
