import { useContext, useEffect, useState, type ReactElement } from "react";
import { EmptyCart } from "./empty-cart";
import {
  LoadingPlaceholder,
  type ProductInCart,
  TotalLineItemQuantityContext,
} from "@/shared";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { CartItem } from "./cart-item";
import { type LineItem } from "@/shared/lib/context/cart-context";

export function CartList(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [basket, setBasket] = useState<LineItem[]>(null);
  const [totalPrice, setTotalPrice] = useState<number>(null);
  const [isUpdatedCart, setIsUpdatedCart] = useState(false);

  const { productsCheckout, cart } = useContext(TotalLineItemQuantityContext);

  const fetchData = (): void => {
    try {
      setBasket(productsCheckout);
      setTotalPrice(Math.ceil(cart.totalPrice.centAmount / 100));
      setLoading(false);
      void cart;
    } catch (error: unknown) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchData = (): void => {
      try {
        setBasket(productsCheckout);
        setTotalPrice(Math.ceil(cart.totalPrice.centAmount / 100));
        setLoading(false);
        void cart;
      } catch (error: unknown) {
        setError(error);
        setLoading(false);
      }
    };
    void fetchData();
  }, [isUpdatedCart, cart, productsCheckout]);

  if (loading) {
    return (
      <>
        <LoadingPlaceholder />
      </>
    );
  }
  if (basket.length === 0) {
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

  const removeItem = (id: string): void => {
    setIsUpdatedCart(true);
    void fetchData();
    setBasket(basket.filter((item) => id !== item.id));
  };

  const changeCountItem = (): void => {
    setIsUpdatedCart(true);
    void fetchData();
  };

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
        {basket.map((cartItem: ProductInCart, id) => (
          <CartItem
            key={id}
            productId={cartItem.id}
            productsCheckout={cartItem}
            removeItem={removeItem}
            changeCountItem={changeCountItem}
            setIsUpdatedCart={setIsUpdatedCart}
          />
        ))}
        <Grid sx={{ width: "100%", textAlign: "center" }}>
          <Paper>
            <Typography gutterBottom variant="button">
              Total cost: $ {totalPrice}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
