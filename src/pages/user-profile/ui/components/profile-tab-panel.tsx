import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { PasswordChangeForm, PersonalBlock, AddressesGrid } from "./index";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AddHomeSharpIcon from "@mui/icons-material/AddHomeSharp";
import LockResetSharpIcon from "@mui/icons-material/LockResetSharp";
import { grey } from "@mui/material/colors";

interface TabPanelProperties {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(properties: TabPanelProperties): React.ReactElement {
  const { children, value, index, ...other } = properties;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

interface IndexObject {
  id: string;
  "aria-controls": string;
}
function a11yProperties(index: number): IndexObject {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function ProfileTabsPanel(): React.ReactElement {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number,
  ): void => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Box
        sx={{
          width: "100%",
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: grey[900],
          borderRadius: "0.2rem",
          mb: "2rem",
        }}
      >
        <Tabs
          sx={{ width: "fir-content" }}
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab
            icon={<PersonPinIcon />}
            sx={{ color: "#ffffff", fontSize: "0.8rem" }}
            label="Personal"
            {...a11yProperties(0)}
          />
          <Tab
            icon={<AddHomeSharpIcon />}
            sx={{ color: "#ffffff", fontSize: "0.8rem" }}
            label="Addresses"
            {...a11yProperties(1)}
          />
          <Tab
            icon={<LockResetSharpIcon />}
            sx={{ color: "#ffffff", fontSize: "0.8rem" }}
            label="Password"
            {...a11yProperties(2)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PersonalBlock />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddressesGrid />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <PasswordChangeForm />
      </CustomTabPanel>
    </Box>
  );
}
