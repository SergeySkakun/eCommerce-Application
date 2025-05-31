import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import type { PriceInfo } from "./price";
import { Price } from "./price";

type ProductInfo = {
  id: string;
  name: string;
  description: string;
  imgUrl: string;
  imgLabel: string;
  priceInfo: PriceInfo;
};

export function ProductCard({
  id,
  name,
  description,
  imgUrl,
  imgLabel,
  priceInfo,
}: ProductInfo): ReactNode {
  const productURL = `/catalog/${id}`;
  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
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
            sx={{ overflow: "hidden", whiteSpace: "nowrap" }}
          >
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions sx={{ marginTop: "auto", p: "0 12px" }}>
          <Link to={productURL}>
            <Button size="small">More Info</Button>
          </Link>
          <Price priceInfo={priceInfo} />
        </CardActions>
      </Box>
    </Card>
  );
}
