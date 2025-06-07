/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Box } from "@mui/material";
import { CartItem } from "./cart-item";
import { useEffect, useState, type ReactElement } from "react";
import { getCart } from "../../api/get-cart";
import { EmptyCart } from "./empty-cart";
import { type Cart } from "../../../../shared";
import { CartSkeleton } from "./skeleton";

export function CartList({ products }): ReactElement {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await getCart().then((data: Cart) => {
          void data;
          // console.log(data)
        });
        setLoading(false);
      } catch (error: unknown) {
        setError(error);
        setLoading(false);
      }
    };
    void fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <CartSkeleton />
      </>
    );
  }
  if (error) {
    return (
      <>
        <EmptyCart />
        {/* <Typography sx={{ width: "100%", margin: "auto", color: "#ffffff" }}>
            Error: {error.message}
          </Typography> */}
      </>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        padding: 2,
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {products.map((product) => (
        <CartItem key={product.id} product={product} />
      ))}
    </Box>
  );
}
