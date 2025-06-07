import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Price } from "../price";
import { ButtonAddToCart } from "../button-add-to-cart";
import type { CardInfo } from "./types";

export function ProductCard({ cardInfo }: { cardInfo: CardInfo }): ReactNode {
  const { productId, key, name, description, imgUrl, imgLabel, priceInfo } =
    cardInfo;
  const navigateTo = useNavigate();
  const productURL = `/catalog/product/${key}`;

  return (
    <div onClick={() => void navigateTo(productURL)} className="card">
      <CardMedia component="img" alt={imgLabel} height="140" image={imgUrl} />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ overflow: "hidden", whiteSpace: "nowrap", color: "white" }}
          >
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "rgb(124, 124, 124)" }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "auto", p: "0 12px" }}>
          <ButtonAddToCart productId={productId} />
          <Price priceInfo={priceInfo} />
        </CardActions>
      </Box>
    </div>
  );
}
