import * as React from "react";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "../basket-page.module.css";
import {
  addingDeletingModifyingItemsInCart,
  parseCartData,
  type Cart,
  type ProductInCart,
} from "@/shared";
import { Clear } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface CartItem {
  readonly productsCheckout: ProductInCart;
  setTotalLineItemQuantity: React.Dispatch<React.SetStateAction<number>>;
  setTotalPriceCart: React.Dispatch<React.SetStateAction<string>>;
  setIsUpdatedCart: React.Dispatch<React.SetStateAction<boolean>>;
  setDiscountCost: React.Dispatch<React.SetStateAction<string>>;
}

export function CartItem(properties: CartItem): React.ReactElement {
  const {
    productsCheckout,
    setTotalLineItemQuantity,
    setTotalPriceCart,
    setIsUpdatedCart,
    setDiscountCost,
  } = properties;
  const [totalPrice, setTotalPrice] = useState<string>();
  const [nameProduct, setNameProduct] = useState<string>();
  const [itemImgUrl, setItemImgUrl] = useState<string>();

  const [currentCart, setCurrentCart] = useState<Cart>();
  const [price, setPrice] = useState<string>();
  const [quantity, setQuantity] = useState<number>();
  useEffect(() => {
    setNameProduct(productsCheckout.name["en-US"]);
    setItemImgUrl(productsCheckout.variant.images[0].url);
    setPrice(
      productsCheckout.price.discounted
        ? Math.trunc(
            productsCheckout.price.discounted.value.centAmount / 100,
          ).toLocaleString()
        : Math.trunc(
            productsCheckout.price.value.centAmount / 100,
          ).toLocaleString(),
    );
    setTotalPrice(
      Math.trunc(productsCheckout.totalPrice.centAmount / 100).toLocaleString(),
    );
    setQuantity(productsCheckout.quantity);
  }, [productsCheckout]);

  useEffect(() => {
    if (currentCart) {
      const { allProductInCart, totalLineItemQuantity, totalPrice } =
        parseCartData(currentCart);
      setTotalLineItemQuantity(totalLineItemQuantity);
      setTotalPriceCart(Math.trunc(totalPrice / 100).toLocaleString());
      for (const product of allProductInCart) {
        if (product.id === productsCheckout.id) {
          setTotalPrice(
            Math.trunc(product.totalPrice.centAmount / 100).toLocaleString(),
          );
          setQuantity(product.quantity);
        }
      }
    }
  }, [
    currentCart,
    productsCheckout.id,
    setTotalLineItemQuantity,
    setTotalPriceCart,
  ]);

  const handleIncrement = async (): Promise<void> => {
    const actions = {
      action: "addLineItem",
      productId: productsCheckout.productId,
      quantity: 1,
    };
    const cart = await addingDeletingModifyingItemsInCart(actions);
    setCurrentCart(cart);
    if (cart.discountOnTotalPrice) {
      const discPrice = Math.trunc(
        -cart.discountOnTotalPrice.discountedAmount.centAmount / 100,
      ).toLocaleString();
      setDiscountCost(discPrice);
    }
  };

  const handleDecrement = async (): Promise<void> => {
    const actions = {
      action: "removeLineItem",
      lineItemId: productsCheckout.id,
      quantity: 1,
    };
    const cart = await addingDeletingModifyingItemsInCart(actions);
    setCurrentCart(cart);
    if (cart.discountOnTotalPrice) {
      const discPrice = Math.trunc(
        -cart.discountOnTotalPrice.discountedAmount.centAmount / 100,
      ).toLocaleString();
      setDiscountCost(discPrice);
    }
  };

  const handleRemoveItem = async (): Promise<void> => {
    const actions = {
      action: "removeLineItem",
      lineItemId: productsCheckout.id,
    };
    const cart = await addingDeletingModifyingItemsInCart(actions);
    setCurrentCart(cart);
    setIsUpdatedCart(true);
  };

  return (
    <div key={productsCheckout.id} className={styles.card}>
      <CardMedia
        component="img"
        className={styles.image}
        image={itemImgUrl}
        alt={nameProduct}
      />
      <Typography className={styles.title}>{nameProduct}</Typography>
      <hr className={styles.separator} />
      <CardContent className={styles.block} sx={{ p: "0.7rem" }}>
        <Typography variant="body1" className={styles.subtitle}>
          Price:
        </Typography>
        <Typography variant="body2">$ {price}</Typography>
      </CardContent>
      <hr className={styles.separator} />
      <CardActions disableSpacing className={styles.block} sx={{ p: "0.7rem" }}>
        <Grid>
          <Typography variant="body1" className={styles.subtitle}>
            Count:
          </Typography>
        </Grid>
        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            className={styles.buttonPlusMinus}
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => void handleDecrement()}
            disabled={quantity === 1 ? true : false}
          >
            <RemoveIcon sx={{ fontSize: "0.7rem" }} />
          </IconButton>
          <Typography variant="body1" style={{ margin: "0 0.2rem" }}>
            {quantity}
          </Typography>
          <IconButton
            className={styles.buttonPlusMinus}
            sx={{ display: "flex", alignItems: "center" }}
            onClick={() => void handleIncrement()}
          >
            <AddIcon sx={{ fontSize: "0.8rem" }} />
          </IconButton>
        </Grid>
      </CardActions>
      <hr className={styles.separator} />
      <CardContent className={styles.block} sx={{ p: "0.7rem" }}>
        <Typography variant="body1" className={styles.subtitle}>
          Total price:
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          $ {totalPrice}
        </Typography>
      </CardContent>
      <CardContent className={styles.block}>
        <IconButton onClick={() => void handleRemoveItem()}>
          <Clear />
        </IconButton>
      </CardContent>
    </div>
  );
}
