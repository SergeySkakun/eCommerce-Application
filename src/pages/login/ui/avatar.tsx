import type { ReactElement } from "react";
import { Avatar } from "@mui/material";
import DraftsSharpIcon from "@mui/icons-material/DraftsSharp";

export default function GuestAvatar(): ReactElement {
  return (
    <Avatar
      sx={{
        mt: 3,
        width: "6rem",
        height: "6rem",
        mx: "auto",
        textAlign: "center",
        bgcolor: "silver",
      }}
    >
      <DraftsSharpIcon
        sx={{
          width: "60%",
          height: "60%",
          mx: "auto",
          textAlign: "center",
          bgcolor: "silver",
        }}
      />
    </Avatar>
  );
}
