import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { Price, type PriceInfo } from "../price";

type CardInfo = {
  key: string;
  name: string;
  description: string;
  imgUrl: string;
  imgLabel: string;
  priceInfo: PriceInfo;
};

export function ProductCard({ cardInfo }: { cardInfo: CardInfo }): ReactNode {
  const { key, name, description, imgUrl, imgLabel, priceInfo } = cardInfo;
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
          <Link to={productURL}>
            <Button size="small" sx={{ fontSize: "14px" }}>
              More Info
            </Button>
          </Link>
          <Price priceInfo={priceInfo} />
        </CardActions>
      </Box>
    </div>
  );
}
