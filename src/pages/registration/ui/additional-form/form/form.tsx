import type { ReactNode } from "react";
import { useState } from "react";
import { Checkbox, FormControlLabel, Grid, Paper, Typography } from "@mui/material";
// import PasswordInput from "./password-input";
// import SubmitButton from "./submit-button";
import StreetName from "./street-name";
import StreetNumber from "./street-number";
import City from "./city";

// const handleSubmit = (event_: FormEvent<HTMLFormElement>): void => {
//   event_.preventDefault();
// };

export function Form(): ReactNode {
  const [streetName, setStreetName] = useState("");
  const [streetNameError, setStreetNameError] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetNumberError, setStreetNumberError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");

  return (
    <Paper sx={{ mt: "4", padding:"20", boxSizing: "border-box"}}>
    <Typography
      component="h5"
      sx={{ textAlign: "left", width: "100%", mt: 2, mb: 2 }}
    >
      Additional address
    </Typography>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={{ xs: 12, sm: 6}}>
      <StreetName
        streetName={streetName}
        streetNameError={streetNameError}
        setStreetName={setStreetName}
        setStreetNameError={setStreetNameError}
      />
      </Grid>
       <Grid size={{ xs: 12, sm: 6}}>
      <StreetNumber
        streetNumber={streetNumber}
        streetNumberError={streetNumberError}
        setStreetNumber={setStreetNumber}
        setStreetNumberError={setStreetNumberError}
      />
      </Grid>
      <City
        city={city}
        cityError={cityError}
        setCity={setCity}
        setCityError={setCityError}
      />
       <FormControlLabel
        style={{ width: "100%" }}
          sx={{mb:2}}
            control={
              <Checkbox/>
            }
            label="Set as address for billing"
          />
      </Grid>
    </Paper>
  );
}
