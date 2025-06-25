import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export function AddressTableSkeleton(): React.ReactElement {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton animation="wave" width={"100%"} height={"80px"} />
      <Skeleton animation="wave" width={"100%"} height={"80px"} />
      <Skeleton animation="wave" width={"100%"} height={"80px"} />
      <Skeleton animation="wave" width={"100%"} height={"80px"} />
      <Skeleton animation="wave" width={"100%"} height={"80px"} />
    </Box>
  );
}
