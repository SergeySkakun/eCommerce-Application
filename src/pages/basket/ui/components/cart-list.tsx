/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useContext, useEffect, useState, type ReactElement } from "react";
import { EmptyCart } from "./empty-cart";
import {
  addingDeletingModifyingItemsInCart,
  type Cart,
  getCart,
  LoadingPlaceholder,
  type ProductInCart,
  TotalLineItemQuantityContext,
  useAuth,
} from "@/shared";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { CartItem } from "./cart-item";
import { type LineItem } from "@/shared/lib/context/cart-context";
import { UnauthorizedCart } from "./unauthorized-cart";

export function CartList(): ReactElement {
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<unknown>();
  const [basket, setBasket] = useState<LineItem[]>(null);
  const [totalPrice, setTotalPrice] = useState<number>(null);
  const [isUpdatedCart, setIsUpdatedCart] = useState(true);
  const { isLoggedIn, isAuthCheckReady } = useAuth();
  const { cart, setTotalLineItemQuantity } = useContext(
    TotalLineItemQuantityContext,
  );

  const fetchData = (productsCheckout: [LineItem], cart: Cart): void => {
    setBasket(productsCheckout);
    setTotalPrice(Math.ceil(cart.totalPrice.centAmount / 100));
    setTotalLineItemQuantity(cart.totalLineItemQuantity ?? 0);
    setLoading(false);
    setIsUpdatedCart(false);
  };

  if (!isAuthCheckReady) {
    return <LoadingPlaceholder />;
  }
  if (!isLoggedIn) {
    if (cart) {
      // console.log("где то здесь падает ошибка при разлогинивании со страницы корзины")
      void getCart();
    } else {
      return <UnauthorizedCart />;
    }
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isUpdatedCart) {
      // try {
      void getCart().then((data) => {
        setBasket(data.lineItems);
        void fetchData(data.lineItems, data);
      });
      // } catch (error: unknown) {
      //   setError(error)
      // }
    }
  });

  if (loading) {
    return (
      <>
        <LoadingPlaceholder />
      </>
    );
  }
  if (basket.length === 0 && !isLoggedIn) {
    return (
      <>
        <UnauthorizedCart />
      </>
    );
  }
  if (basket.length === 0 && isLoggedIn) {
    return (
      <>
        <EmptyCart />
      </>
    );
  }
  // if (error) {
  //   console.log("error ?")
  //   return (
  //     <>
  //       <EmptyCart />
  //     </>
  //   );
  // }

  const removeItem = (actions, id): void => {
    void addingDeletingModifyingItemsInCart(actions).then((data) => {
      setTotalLineItemQuantity(data.totalLineItemQuantity);
      setBasket(data.lineItems.filter((item) => id !== item.id));
      setIsUpdatedCart(true);
      void fetchData(data.lineItems, data);
    });
  };

  const changeCountItem = (actions): void => {
    void addingDeletingModifyingItemsInCart(actions).then((data) => {
      setTotalLineItemQuantity(data.totalLineItemQuantity);
      void fetchData(data.lineItems, data);
    });
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
