import { useState, useEffect, useCallback, useMemo } from "react";
import type { ReactElement } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { getAllProducts } from "../api";
import { sendingFilterSortingSearchRequest } from "../api";
import type { DataProduct, MasterData, Product } from "../../../shared";
import { NoResultsFound } from "../../../shared";
import { CardList } from "./card-list";
import type { VisualFilterState, FilterSubmitData } from "./filters-list";
import { FiltersList } from "./filters-list";

const FILTER_REQUEST = "filter=variants.";
const ATTRIBUTE_FILTER_REQUEST = "filter=variants.attributes.";

export function CatalogContent(): ReactElement {
  const [currentFilters, setCurrentFilters] = useState<VisualFilterState>(
    () => ({
      priceMin: "",
      priceMax: "",
      year: "",
      fuel: "",
      power: "",
      gearbox: "",
      capacity: "",
      payload: "",
    }),
  );
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [products, setProducts] = useState<MasterData[] | Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const filterStrings = useMemo(() => {
    const filters: string[] = [];

    if (currentFilters.priceMin || currentFilters.priceMax) {
      const from =
        currentFilters.priceMin === ""
          ? "0"
          : String(+currentFilters.priceMin * 100);
      const to =
        currentFilters.priceMax === ""
          ? "*"
          : String(+currentFilters.priceMax * 100);
      filters.push(`${FILTER_REQUEST}price.centAmount:range(${from} to ${to})`);
    }
    if (currentFilters.year) {
      filters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Year:"${String(currentFilters.year)}"`,
      );
    }
    if (currentFilters.fuel) {
      filters.push(`${ATTRIBUTE_FILTER_REQUEST}Fuel:"${currentFilters.fuel}"`);
    }
    if (currentFilters.power) {
      filters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Power:"${String(currentFilters.power)}"`,
      );
    }
    if (currentFilters.gearbox) {
      filters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Gearbox:"${currentFilters.gearbox}"`,
      );
    }
    if (currentFilters.capacity) {
      filters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Capacity:"${String(currentFilters.capacity)}")`,
      );
    }
    if (currentFilters.payload) {
      filters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Payload:"${String(currentFilters.payload)}"`,
      );
    }

    return filters;
  }, [currentFilters]);

  useEffect(() => {
    let isMounted = true;

    const getFilterProducts = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      const data = await sendingFilterSortingSearchRequest(
        filterStrings.join("&"),
      );
      const productList = data.results;

      if (isMounted) {
        setProducts(productList);
      }
      setLoading(false);
    };

    const loadData = async (): Promise<void> => {
      try {
        setLoading(true);
        const data: DataProduct = await getAllProducts();
        const productList = data.results;
        setProducts(productList);
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

    if (isFirstLoad) {
      void loadData();
      setIsFirstLoad(false);
    } else {
      void getFilterProducts();
    }

    return (): void => {
      isMounted = false;
    };
  }, [filterStrings]);

  const handleFilterSubmit = useCallback((data: FilterSubmitData) => {
    setCurrentFilters(data.currentFilters);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 3,
        p: 3,
      }}
    >
      <Box sx={{ flex: "0 0 280px", maxWidth: { xs: "100%", md: "280px" } }}>
        <FiltersList
          onFilterSubmit={handleFilterSubmit}
          initialFilters={currentFilters}
        />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {!loading && !error && products.length > 0 && (
          <CardList products={products} />
        )}
        {!loading && !error && products.length === 0 && <NoResultsFound />}
      </Box>
    </Box>
  );
}
