import * as React from "react";
import Card from "@mui/material/Card";
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
  type ProductInCart,
} from "@/shared";
import { Clear } from "@mui/icons-material";

interface CartItem {
  readonly productId: string;
  readonly productsCheckout: ProductInCart;
  removeItem: (index: string) => void;
  changeCountItem: () => void;
  setIsUpdatedCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CartItem({
  productId,
  productsCheckout,
  removeItem,
  changeCountItem,
  setIsUpdatedCart,
}: CartItem): React.ReactElement {
  const itemName = productsCheckout.name["en-US"];
  const itemImgUrl = productsCheckout.variant.images[0].url;
  const price = productsCheckout.price.value.centAmount / 100;
  const quantity = productsCheckout.quantity;

  const handleIncrement = (): void => {
    const actions = {
      action: "addLineItem",
      productId: productsCheckout.productId,
      quantity: 1,
    };

    void addingDeletingModifyingItemsInCart(actions).then(() => {
      changeCountItem();
    });
  };

  const handleDecrement = (): void => {
    const actions = {
      action: "removeLineItem",
      lineItemId: productsCheckout.id,
      quantity: 1,
    };

    void addingDeletingModifyingItemsInCart(actions).then(() => {
      changeCountItem();
    });
  };

  const handleRemoveItem = (): void => {
    setIsUpdatedCart(true);
    const actions = {
      action: "removeLineItem",
      lineItemId: productsCheckout.id,
    };
    void addingDeletingModifyingItemsInCart(actions).then(() => {
      removeItem(productId);
    });
    setIsUpdatedCart(false);
  };

  return (
    <Card key={productId} className={styles.card}>
      <CardMedia
        component="img"
        className={styles.image}
        image={itemImgUrl}
        alt={itemName}
      />
      <Typography className={styles.title}>{itemName}</Typography>
      <hr className={styles.separator} />
      <CardContent className={styles.block} sx={{ p: "0.7rem" }}>
        <Typography variant="body1" className={styles.subtitle}>
          Price:
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          $ {price}
        </Typography>
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
            sx={{ pl: 0, display: "flex", alignItems: "center" }}
            onClick={handleDecrement}
          >
            <RemoveIcon sx={{ fontSize: "0.7rem" }} />
          </IconButton>
          <Typography variant="body1" style={{ margin: "0 0.2rem" }}>
            {quantity}
          </Typography>
          <IconButton
            sx={{ pr: 0, display: "flex", alignItems: "center" }}
            onClick={handleIncrement}
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
          $ {price * quantity}
        </Typography>
      </CardContent>
      <CardContent className={styles.block}>
        <IconButton onClick={handleRemoveItem}>
          <Clear />
        </IconButton>
      </CardContent>
    </Card>
  );
}
