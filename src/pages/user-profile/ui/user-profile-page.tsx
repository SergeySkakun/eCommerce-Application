import { Typography } from "@mui/material";
import { PasswordChangeForm } from "./password-component";
import "./style.css";

export function ProfilePage(): React.ReactElement {
  return (
    <div className="profile-page">
      <Typography className="profile-page-title" variant="button">
        My Profile
      </Typography>
      <PasswordChangeForm />
    </div>
  );
}
