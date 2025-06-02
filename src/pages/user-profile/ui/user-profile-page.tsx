import { ProfileTabsPanel } from "./components";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
import "./style.css";

export function ProfilePage(): React.ReactElement {
  return (
    <div className="profile-page">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <ProfileTabsPanel />
      </ThemeProvider>
    </div>
  );
}
