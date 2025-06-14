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
import { type ProductInCart } from "@/shared";

interface CartItem {
  readonly productId: string;
  readonly product: ProductInCart;
}

export function CartItem({ productId, product }: CartItem): React.ReactElement {
  const [count, setCount] = React.useState(1);

  const itemName = product.name["en-US"];
  const itemImgUrl = product.variant.images[0].url;
  const price = product.price.value.centAmount;

  const handleIncrement = (): void => {
    setCount(count + 1);
  };

  const handleDecrement = (): void => {
    if (count > 1) setCount(count - 1);
    else setCount(1);
  };

  return (
    <Card key={productId} className={styles.card}>
      <CardMedia
        component="img"
        className={styles.image}
        image={itemImgUrl}
        alt={itemName}
      />
      <Typography variant="h6" className={styles.title}>
        {itemName}
      </Typography>
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
            {count}
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
          $ {price * count}
        </Typography>
      </CardContent>
      {/* <CardContent className={styles.block}>
          <IconButton onClick={handleDecrement}>
            <Clear />
          </IconButton>
        </CardContent> */}
    </Card>
  );
}
