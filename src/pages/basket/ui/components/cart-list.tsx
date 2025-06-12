import { useEffect, useState, type ReactElement } from "react";
import { EmptyCart } from ".";
import { getCart, LoadingPlaceholder, type Cart } from "../../../../shared";

export function CartList(): ReactElement {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        await getCart().then((data: Cart) => {
          void data;
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
        <LoadingPlaceholder />
      </>
    );
  }
  if (error) {
    return (
      <>
        <EmptyCart />
      </>
    );
  }

  return (
    <></> // код ниже заккоментирован, но так как он пригодится в дальнейшем я его не удаляю )
    // <Box
    //   sx={{
    //     display: "flex",
    //     padding: 2,
    //     flexDirection: "column",
    //     gap: "0.5rem",
    //   }}
    // >
    //   {products.map((product) => (
    //     <CartItem key={product.id} product={product} />
    //   ))}
    // </Box>
  );
}
