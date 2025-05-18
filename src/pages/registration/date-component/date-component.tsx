 
 

import * as React from "react";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

const DateFieldValue = (): React.ReactElement => {
  const [, setValue] = React.useState<Dayjs | null>();
  const isValidDate = (date: Dayjs): boolean => {
    const minimumValidDate = date.add(13, "year");
    const currentValue = dayjs();
    return Boolean(minimumValidDate >= currentValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateField"]}>
        <DateField
          format="YYYY-MM-DD"
          sx={{ mb: 2 }}
          label="Date of birth"
          fullWidth
          required
          defaultValue={undefined}
          shouldDisableDate={isValidDate}
          disableFuture
          onChange={(newValue) => setValue(newValue)}
          value={undefined}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export { DateFieldValue };
