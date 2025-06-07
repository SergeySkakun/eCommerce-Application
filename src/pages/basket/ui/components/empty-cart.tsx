import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";

export function EmptyCart(): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          width: "auto",
          maxWidth: "40rem",
          margin: "auto",
          padding: "1.5rem",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Tooltip title="Go to Catalog" placement="top">
          <Link to="/catalog">
            <IconButton aria-label="go to catalog">
              <AddShoppingCartIcon sx={{ margin: 2 }} />
            </IconButton>
          </Link>
        </Tooltip>
        <Box sx={{ my: 4 }}>
          <Typography gutterBottom variant="button" sx={{ mt: 2 }}>
            Your Cart is currently Empty
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Is your journey to your perfect car just beginning?{" "}
          </Typography>
        </Box>
        <Link to="/catalog" className="link">
          <button className="button-main-head">
            CHOOSE THE RIGHT COMPANION
          </button>
        </Link>
        {/* <ViewProducts /> */}
      </Paper>
    </Box>
  );
}
