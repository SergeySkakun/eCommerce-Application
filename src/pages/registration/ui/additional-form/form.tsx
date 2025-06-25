import type { ReactNode } from "react";
import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import StreetName from "./street-name";
import StreetNumber from "./street-number";
import City from "./city";
import Postindex from "./postindex";
import Country from "./country";

export function AdditionalForm(): ReactNode {
  const [streetName, setStreetName] = useState("");
  const [streetNameError, setStreetNameError] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetNumberError, setStreetNumberError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [postindex, setPostindex] = useState("");
  const [postindexError, setPostindexError] = useState("");
  const [country, setCountry] = useState("");
  const [countryError, setCountryError] = useState("");

  return (
    <div className="add-address">
      <Typography className="title-address">Additional address</Typography>
      <Grid container rowSpacing={1} columnSpacing={{ sm: 2, md: 3 }}>
        <Grid size={{ sm: 6 }}>
          <StreetName
            streetName={streetName}
            streetNameError={streetNameError}
            setStreetName={setStreetName}
            setStreetNameError={setStreetNameError}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
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
        <Postindex
          postindex={postindex}
          postindexError={postindexError}
          setPostindex={setPostindex}
          setPostindexError={setPostindexError}
        />
        <Country
          country={country}
          countryError={countryError}
          setCountry={setCountry}
          setCountryError={setCountryError}
        />
      </Grid>
    </div>
  );
}
