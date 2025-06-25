import { Box, Typography } from "@mui/material";

export function PageTitle({ text }): React.ReactElement {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      paddingTop="2rem"
    >
      <Typography
        gutterBottom
        component="h1"
        sx={{ fontSize: "2rem", color: "var(--white-color)" }}
      >
        {text}
      </Typography>
    </Box>
  );
}
