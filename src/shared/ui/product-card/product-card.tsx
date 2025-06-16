import { useContext, type ReactNode, memo } from "react";
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

const arePropertiesEqual = (
  previousProperties: { cardInfo: CardInfo },
  nextProperties: { cardInfo: CardInfo }
): boolean => {
  if (
    previousProperties.cardInfo.productId !==
      nextProperties.cardInfo.productId ||
    previousProperties.cardInfo.key !== nextProperties.cardInfo.key ||
    previousProperties.cardInfo.name !== nextProperties.cardInfo.name ||
    previousProperties.cardInfo.description !==
      nextProperties.cardInfo.description ||
    previousProperties.cardInfo.imgUrl !== nextProperties.cardInfo.imgUrl ||
    previousProperties.cardInfo.imgLabel !== nextProperties.cardInfo.imgLabel
  ) {
    return false;
  }

  const previousPrice = previousProperties.cardInfo.priceInfo;
  const nextPrice = nextProperties.cardInfo.priceInfo;
  if (
    previousPrice.currencyCode !== nextPrice.currencyCode ||
    previousPrice.rawPrice !== nextPrice.rawPrice ||
    previousPrice.discountedPrice !== nextPrice.discountedPrice
  ) {
    return false;
  }

  return true;
};

export const ProductCard = memo(
  ({ cardInfo }: { cardInfo: CardInfo }): ReactNode => {
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
        <CardMedia
          component="img"
          alt={imgLabel}
          height="140"
          image={imgUrl}
          loading="lazy"
        />
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
  },
  arePropertiesEqual
);
