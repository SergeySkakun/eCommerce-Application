import { useState, useEffect, useCallback, useMemo } from "react";
import type { ReactElement } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { getAllProducts } from "../api";
import { sendingFilterSortingSearchRequest } from "../api";
import type { MasterData, Product } from "../../../shared";
import { NoResultsFound } from "../../../shared";
import { CardList } from "./card-list";
import type { VisualFilterState, FilterSubmitData } from "./filters-list";
import { FiltersList, SearchInput } from "./filters-list";
import { AddBreadcrumb, CreateCategoriesButton } from ".";
import "./styles.css";

const FILTER_REQUEST = "filter=variants.";
const ATTRIBUTE_FILTER_REQUEST = "filter=variants.attributes.";
const SEARCH_REQUEST = "fuzzy=true&text.en-US=";

const INITIAL_FILTERS_STATE: VisualFilterState = {
  priceMin: "",
  priceMax: "",
  year: "",
  fuel: "",
  power: "",
  gearbox: "",
  capacity: "",
  payload: "",
  categories: "",
};

export function CatalogContent(): ReactElement {
  const [breadcrumb, setBreadcrumb] = useState<string>("CARS");
  const [currentFilters, setCurrentFilters] = useState<VisualFilterState>(
    () => INITIAL_FILTERS_STATE,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
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
        `${ATTRIBUTE_FILTER_REQUEST}Capacity:"${String(currentFilters.capacity)}"`,
      );
    }
    if (currentFilters.payload) {
      filters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Payload:"${String(currentFilters.payload)}"`,
      );
    }
    if (currentFilters.categories) {
      filters.push(
        `filter=categories.id:"${String(currentFilters.categories)}"`,
      );
    }

    if (searchQuery) {
      filters.push(`${SEARCH_REQUEST}${encodeURIComponent(searchQuery)}`);
    }

    return filters;
  }, [currentFilters, searchQuery]);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const hasActiveFilters = filterStrings.length > 0;
        const isCategorySelected = currentFilters.categories !== "";
        const shouldFetchAllProducts =
          !hasActiveFilters && !isCategorySelected && !searchQuery;

        const data = await (shouldFetchAllProducts
          ? getAllProducts()
          : sendingFilterSortingSearchRequest(filterStrings.join("&")));

        const productList = data.results;

        if (isMounted) {
          setProducts(productList);
        }
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
      setIsFirstLoad(false);
    }
    void fetchProducts();

    return (): void => {
      isMounted = false;
    };
  }, [filterStrings, isFirstLoad, currentFilters, searchQuery]);

  const handleFilterSubmit = useCallback((data: FilterSubmitData) => {
    setCurrentFilters((previousFilters) => ({
      ...previousFilters,
      ...data.currentFilters,
      categories: previousFilters.categories,
    }));
  }, []);

  const handleCategoryChange = useCallback(
    (categoryId: string | null, categoryName: string) => {
      setBreadcrumb(categoryName.toUpperCase());
      setCurrentFilters((previousFilters) => ({
        ...previousFilters,
        categories: categoryId || "",
      }));
      setSearchQuery("");
    },
    [],
  );

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleResetAttributeFilters = useCallback(() => {
    setCurrentFilters((previousFilters) => ({
      ...INITIAL_FILTERS_STATE,
      categories: previousFilters.categories,
    }));
    setSearchQuery("");
  }, []);

  const handleFullReset = useCallback(() => {
    setCurrentFilters(INITIAL_FILTERS_STATE);
    setBreadcrumb("CARS");
    setSearchQuery("");
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
      <Box
        sx={{
          flex: "0 0 280px",
          marginTop: "50px",
          maxWidth: { xs: "100%", md: "280px" },
        }}
      >
        <SearchInput onSearch={handleSearch} initialSearchQuery={searchQuery} />
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
        <div className="main">
          <img
            className="sale-board"
            src="../../../../assets/catalog/sale-board.gif"
            alt="sale-board"
          ></img>
          <CreateCategoriesButton
            onCategoryChange={handleCategoryChange}
            currentActiveCategoryId={currentFilters.categories}
          />
          <div className="breadcrumb">
            <button className="breadcrumb-button" onClick={handleFullReset}>
              CATALOG
            </button>
            <AddBreadcrumb
              buttonName={breadcrumb}
              onClick={handleResetAttributeFilters}
            />
          </div>
        </div>
        {!loading && !error && products.length > 0 && (
          <CardList products={products} />
        )}
        {!loading && !error && products.length === 0 && <NoResultsFound />}
      </Box>
    </Box>
  );
}
