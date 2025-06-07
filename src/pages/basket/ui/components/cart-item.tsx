/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Clear } from "@mui/icons-material";

export function CartItem({ product }): React.ReactElement {
  const [count, setCount] = React.useState(1);
  const { id, name, imageUrl, price } = product;

  const handleIncrement = (): void => {
    setCount(count + 1);
  };

  const handleDecrement = (): void => {
    if (count > 1) setCount(count - 1);
    else setCount(1);
  };

  return (
    <Card key={id}>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          sx={{ width: "90px", height: "50px" }}
          image={imageUrl}
          alt={name}
        />
        <CardHeader sx={{ width: "auto" }} title={name} />
        <CardContent sx={{ display: "flex" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            $ {price}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box display="flex" alignItems="center">
            <IconButton onClick={handleDecrement}>
              <RemoveIcon />
            </IconButton>
            <Typography variant="body1" style={{ margin: "0 0.2rem" }}>
              {count}
            </Typography>
            <IconButton onClick={handleIncrement}>
              <AddIcon />
            </IconButton>
          </Box>
        </CardActions>
        <CardContent sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            $ {price * count}
          </Typography>
          <IconButton onClick={handleDecrement}>
            <Clear />
          </IconButton>
        </CardContent>
      </Grid>
    </Card>
  );
}
