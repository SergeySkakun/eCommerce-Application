/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { CartItem } from "./cart-item";
import type { ReactElement } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export function CartList({ products }): ReactElement {
  return (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {products.length > 0 ? (
        products.map((product) => (
          <CartItem key={product.id} product={product} />
        ))
      ) : (
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
            <IconButton aria-label="go to catalog">
              <AddShoppingCartIcon sx={{ margin: 2 }} />
            </IconButton>
          </Tooltip>
          <Typography gutterBottom variant="button" sx={{ mt: 2 }}>
            Your Cart is currently Empty
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="body2">
            Is your journey to your perfect car just beginning?{" "}
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
