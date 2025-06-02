import { Typography } from "@mui/material";

export function ProfilePageTitle(text): React.ReactElement {
  return (
    <Typography
      component={"div"}
      sx={{ color: "ffffff", lineHeight: "10" }}
      variant="overline"
    >
      {text}
    </Typography>
  );
}
