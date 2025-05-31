import { Typography } from "@mui/material";
import { PasswordChangeForm } from "./components";

export function ProfilePage(): React.ReactElement {
  return (
    <div className="profile-page">
      <Typography variant="h5">My Profile</Typography>
      <PasswordChangeForm />
    </div>
  );
}
