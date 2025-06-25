import { Button, Typography } from "@mui/material";

export const FormSubmitButton = ({ text }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      color="inherit"
      fullWidth
      sx={{
        mt: 5,
        display: "block",
        pt: 1,
        pb: 1,
      }}
    >
      <Typography fontWeight={"400"} variant="h6">
        {text}
      </Typography>
    </Button>
  );
};
