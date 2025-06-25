import {
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactElement,
} from "react";
import {
  type Cart,
  getCart,
  hasLoggedInToken,
  type ProductInCart,
  TotalLineItemQuantityContext,
  useAuth,
} from "@/shared";
import { Box, Button, Grid } from "@mui/material";
import { CartItem } from "./cart-item";
import { UnauthorizedCart } from "./unauthorized-cart";
import { DialogClearCart, DialogPlaceOrder, EmptyCart } from ".";
import style from "./cart-list.module.css";
import { applyPromoCode, deleteCart } from "../..";
import { LoadingPage } from "@/pages/loading";

export function CartList(): ReactElement {
  const [totalPriceCart, setTotalPriceCart] = useState<string>();
  const [cart, setCart] = useState<Cart>();
  const [isUpdatedCart, setIsUpdatedCart] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [messagePromo, setMessagePromo] = useState<string>();
  const [discountCost, setDiscountCost] = useState<string>();
  const [openDialogClearCart, setOpenDialogClearCart] = useState(false);
  const [openDialogPlaceOrder, setOpenDialogPlaceOrder] = useState(false);
  const {
    totalLineItemQuantity,
    setTotalLineItemQuantity,
    setProductsCheckout,
    isHasDiscount,
    setIsHasDiscount,
  } = useContext(TotalLineItemQuantityContext);

  const { isLoggedIn } = useAuth();

  useLayoutEffect(() => {
    <LoadingPage />;
  }, []);

  useEffect(() => {
    const handlerCart = async (): Promise<void> => {
      await getCart().then((data) => {
        if (data.lineItems) {
          setCart(data);
          return;
        }
      });
    };
    void handlerCart();
  }, []);

  useEffect(() => {
    if (cart) {
      setTotalLineItemQuantity(cart.totalLineItemQuantity ?? 0);
      const totalPrice = Math.trunc(
        cart.totalPrice.centAmount / 100,
      ).toLocaleString();
      setTotalPriceCart(totalPrice);
      if (cart.discountOnTotalPrice) {
        const discPrice = Math.trunc(
          -cart.discountOnTotalPrice.discountedAmount.centAmount / 100,
        ).toLocaleString();
        setDiscountCost(discPrice);
        setIsHasDiscount(true);
      }
    }
  }, [cart, setIsHasDiscount, setTotalLineItemQuantity]);

  if (isUpdatedCart) {
    return (
      <>
        <CartList />
      </>
    );
  }

  const clearCart = async (): Promise<void> => {
    const cart = await deleteCart();
    setTotalLineItemQuantity(cart.totalLineItemQuantity);
    setProductsCheckout([{ id: "", productId: "" }]);
    setTotalLineItemQuantity(0);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    void handlerPromoCode(inputValue);
  };

  const handleClickOpenClearCart = (): void => {
    setOpenDialogClearCart(true);
  };

  const handleCloseClearCart = (): void => {
    setOpenDialogClearCart(false);
  };

  const handleClickOpenPlaceOrder = (): void => {
    setOpenDialogPlaceOrder(true);
  };

  const handleClosePlaceOrder = (): void => {
    setOpenDialogPlaceOrder(false);
  };

  const handlerPromoCode = async (inputValue: string): Promise<void> => {
    if (inputValue === "FaR7") {
      const actions = {
        action: "addDiscountCode",
        code: inputValue,
      };
      const cart = await applyPromoCode(actions);
      setCart(cart);
      const discPrice = Math.trunc(
        -cart.discountOnTotalPrice.discountedAmount.centAmount / 100,
      ).toLocaleString();
      setDiscountCost(discPrice);
      setMessagePromo("PROMO CODE APPLIED");
      setIsHasDiscount(true);
      setTimeout(() => {
        setMessagePromo("");
      }, 4000);
    } else {
      setMessagePromo("YOU HAVE ENTERED AN INCORRECT PROMO CODE");
      setTimeout(() => {
        setMessagePromo("");
      }, 4000);
    }
  };

  const removePromoCode = async (): Promise<void> => {
    const actions = {
      action: "removeDiscountCode",
      discountCode: {
        typeId: "discount-code",
        id: "f5e85e1f-f16b-43dd-b481-ae8486203abc",
      },
    };
    const cart = await applyPromoCode(actions);
    setCart(cart);
    setDiscountCost(null);
    setIsHasDiscount(false);
    setInputValue("");
  };

  if (!hasLoggedInToken() && totalLineItemQuantity === undefined) {
    return (
      <>
        <UnauthorizedCart />
      </>
    );
  }

  if (!isLoggedIn && totalLineItemQuantity === 0) {
    return (
      <>
        <UnauthorizedCart />
      </>
    );
  }

  if (isLoggedIn && totalLineItemQuantity === 0) {
    return (
      <>
        <EmptyCart />
      </>
    );
  }

  return totalLineItemQuantity === undefined ? (
    <>
      <EmptyCart />
    </>
  ) : (
    <Box className={style.cartConteiner}>
      <Grid
        container
        className={style.cartContent}
        sx={{
          width: "100%",
          gap: 2,
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {cart
          ? cart.lineItems.map((cartItem: ProductInCart, id) => (
              <CartItem
                key={id}
                productsCheckout={cartItem}
                setTotalPriceCart={setTotalPriceCart}
                setTotalLineItemQuantity={setTotalLineItemQuantity}
                setIsUpdatedCart={setIsUpdatedCart}
                setDiscountCost={setDiscountCost}
              />
            ))
          : null}
      </Grid>
      <button className={style.clearCart} onClick={handleClickOpenClearCart}>
        CLEAR CART
      </button>
      <form className={style.formPromo} onSubmit={handleSubmit}>
        <Button
          variant="outlined"
          disabled={!isHasDiscount}
          className={style.clearPromo}
          onClick={() => void removePromoCode()}
        >
          Clear
        </Button>
        <input
          disabled={isHasDiscount}
          className={style.inputPromo}
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="ENTER PROMO CODE"
        />
        <Button
          disabled={isHasDiscount}
          variant="outlined"
          color="success"
          className={style.buttonPromo}
          type="submit"
        >
          APPLY
        </Button>
      </form>
      <div className={style.messagePromo}>{messagePromo}</div>
      <Grid className={style.totalCost}>
        <div className={style.totalCostConteiner}>
          <div className={style.totalCostText}>
            Total cost: $ {totalPriceCart}
            <div className={style.discountCost}>{discountCost}</div>
          </div>
        </div>
      </Grid>
      <button className={style.placeOrder} onClick={handleClickOpenPlaceOrder}>
        PLACE AN ORDER
      </button>
      <DialogClearCart
        clearCart={clearCart}
        openDialog={openDialogClearCart}
        handleClose={handleCloseClearCart}
      />
      <DialogPlaceOrder
        openDialog={openDialogPlaceOrder}
        handleClose={handleClosePlaceOrder}
      />
    </Box>
  );
}
