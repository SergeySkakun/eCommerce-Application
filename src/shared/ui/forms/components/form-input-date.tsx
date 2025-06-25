import { FormLabel, Grid, IconButton, styled } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Controller } from "react-hook-form";
import type { FormInputProperties, RegistrationFormType } from "./interfaces";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import EditCalendarRoundedIcon from "@mui/icons-material/EditCalendarRounded";

const StyledButton = styled(IconButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  color: "var(--white-color)",
}));

export const FormInputDate = ({
  name,
  control,
  label,
}: FormInputProperties<RegistrationFormType>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={(renderProperties) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid sx={{ display: "flex", flexDirection: "column" }}>
              <FormLabel
                sx={{
                  color: "var(--card-hover-shadow)",
                }}
                required
              >
                {label}
              </FormLabel>
              <DatePicker
                slots={{
                  openPickerIcon: EditCalendarRoundedIcon,
                  openPickerButton: StyledButton,
                }}
                onChange={renderProperties.field.onChange}
                slotProps={{
                  textField: {
                    onChange: renderProperties.field.onChange,
                    value: renderProperties.field.value,
                    size: "small",
                    error: !!renderProperties.fieldState.error,
                    helperText:
                      renderProperties.fieldState.error?.message ?? undefined,
                    className: "my-datepicker-input",
                    InputProps: {
                      sx: {
                        color: "var(--white-color)",
                      },
                    },
                  },
                }}
              ></DatePicker>
            </Grid>
          </LocalizationProvider>
        );
      }}
    />
  );
};
