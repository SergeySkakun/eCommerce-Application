import type { ReactNode } from "react";
import { useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import { getAllProducts, sendingFilterSortingSearchRequest } from "../../api";
import {
  type MasterData,
  type Product,
  useAuth,
  createProductCard,
  NoResultsFound,
  LoadingPlaceholder,
} from "../../../../shared";

interface CardListProperties {
  filterAndSortString: string;
}

const START_NUMBER_OF_PRODUCT_IN_RESPONSE = 0;
const LIMIT_OF_PRODUCTS_IN_RESPONSE = 12;

export const CardList = ({
  filterAndSortString,
}: CardListProperties): ReactNode => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isGuestAccess, isLoggedIn } = useAuth();
  const [offset, setOffset] = useState(START_NUMBER_OF_PRODUCT_IN_RESPONSE);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0);
  const [products, setProducts] = useState<(MasterData | Product)[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const hasActiveParameters = filterAndSortString.length > 0;
        const data = await (hasActiveParameters
          ? sendingFilterSortingSearchRequest(
              filterAndSortString,
              LIMIT_OF_PRODUCTS_IN_RESPONSE,
              offset,
            )
          : getAllProducts(LIMIT_OF_PRODUCTS_IN_RESPONSE, offset));

        setTotalNumberOfResults(data.total);
        const productList: MasterData[] | Product[] = data.results;
        setProducts((previousProductList) => [
          ...previousProductList,
          ...productList,
        ]);
      } catch (error_) {
        setError(
          error_ instanceof Error
            ? error_.message
            : "An unknown error occurred",
        );
      } finally {
        setLoading(false);
      }
    };

    if (isGuestAccess || isLoggedIn) {
      void fetchProducts();
    }
  }, [isGuestAccess, offset, filterAndSortString]);

  useEffect(() => {
    if (offset >= totalNumberOfResults && totalNumberOfResults > 0) {
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      if (entries[0].isIntersecting && !loading) {
        setOffset(
          (previousOffset) => previousOffset + LIMIT_OF_PRODUCTS_IN_RESPONSE,
        );
      }
    };

    observer.current = new IntersectionObserver(observerCallback);
    if (lastItemReference.current) {
      observer.current.observe(lastItemReference.current);
    }

    return (): void => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [loading, offset]);

  if (error) {
    return <p>:{error}</p>;
  }

  return (
    <>
      {!loading && products.length === 0 && <NoResultsFound />}

      {products.length > 0 && (
        <Grid
          key="card-list-grid"
          container
          spacing={3}
          justifyContent={"center"}
          paddingTop={2}
        >
          {products.map((product, index) => {
            if (
              index === products.length - 1 &&
              totalNumberOfResults > products.length
            ) {
              return (
                <div key={index} ref={lastItemReference}>
                  {createProductCard(product)}
                </div>
              );
            }
            return createProductCard(product);
          })}
        </Grid>
      )}

      {loading && products.length > 0 && (
        <div className="catalog-loader">
          <LoadingPlaceholder />
        </div>
      )}
    </>
  );
};
