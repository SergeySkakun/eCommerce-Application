import { Box, Typography } from "@mui/material";

export function Title({ titleText }): React.ReactElement {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingTop="4rem"
    >
      <Typography
        gutterBottom
        variant="button"
        component="h1"
        sx={{ fontSize: "1.6rem" }}
      >
        {titleText}
      </Typography>
    </Box>
  );
}
