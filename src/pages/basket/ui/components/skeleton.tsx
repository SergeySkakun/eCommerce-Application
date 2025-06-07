import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";

export function CartSkeleton(): React.ReactElement {
  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        width: "100vw",
      }}
    >
      <Typography>Loading...</Typography>
      <Skeleton animation="wave" width={"100%"} height={"50%"} />
    </Box>
  );
}
