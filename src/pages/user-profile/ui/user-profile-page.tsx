import { ProfileTabsPanel } from "./components";
import "./style.css";

export function ProfilePage(): React.ReactElement {
  return (
    <div className="profile-page">
      <ProfileTabsPanel />
    </div>
  );
}
