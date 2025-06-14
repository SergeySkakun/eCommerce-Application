import { useEffect, useState, type ReactElement } from "react";
import { EmptyCart } from "./empty-cart";
import {
  type Cart,
  getCart,
  LoadingPlaceholder,
  type ProductInCart,
} from "@/shared";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { CartItem } from "./cart-item";

export function CartList(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [cart, setCart] = useState<ProductInCart[]>(null);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await getCart().then((data: Cart) => {
          setCart(data.lineItems);
          void data;
        });
        setLoading(false);
      } catch (error: unknown) {
        setError(error);
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingPlaceholder />
      </>
    );
  }
  if (cart.length === 0) {
    return (
      <>
        <EmptyCart />
      </>
    );
  }
  if (error) {
    return (
      <>
        <EmptyCart />
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <Grid
        container
        sx={{
          width: "100%",
          gap: 2,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {cart.map((cartItem, id) => (
          <CartItem key={id} productId={cartItem.id} product={cartItem} />
        ))}
        <Grid sx={{ width: "100%", textAlign: "center" }}>
          <Paper>
            <Typography gutterBottom variant="h5">
              Total cost: {}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
