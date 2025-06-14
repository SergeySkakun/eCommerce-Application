import { useContext, type ReactNode } from "react";
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
import { TotalLineItemQuantityContext } from "../../lib";

export function ProductCard({ cardInfo }: { cardInfo: CardInfo }): ReactNode {
  const { productId, key, name, description, imgUrl, imgLabel, priceInfo } =
    cardInfo;
  const { setIsDownloadPage } = useContext(TotalLineItemQuantityContext);
  const navigateTo = useNavigate();
  const productURL = `/catalog/product/${key}`;
  const clickOnCard = (): void => {
    void (navigateTo(productURL), setIsDownloadPage(true));
  };

  return (
    <div onClick={() => clickOnCard()} className="card">
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
          <p className="card-name">{name}</p>
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
