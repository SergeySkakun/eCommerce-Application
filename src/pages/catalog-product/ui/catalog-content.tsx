import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { ReactElement } from "react";
import { Box, CircularProgress, Alert } from "@mui/material";
import { getAllProducts } from "../api";
import { sendingFilterSortingSearchRequest } from "../api";
import type { MasterData, Product } from "../../../shared";
import { NoResultsFound, useAuth, LoadingPlaceholder } from "../../../shared";
import { CardList } from "./card-list";
import type { VisualFilterState, FilterSubmitData } from "./filters-list";
import { FiltersList, SearchInput } from "./filters-list";
import { SortSelect } from "./sort-select";
import { AddBreadcrumb, CreateCategoriesButton } from ".";
import "./styles.css";

const FILTER_REQUEST = "filter=variants.";
const ATTRIBUTE_FILTER_REQUEST = "filter=variants.attributes.";
const SEARCH_REQUEST = "fuzzy=true&text.en-US=";

const LIMIT_OF_PRODUCTS_IN_RESPONSE = 6;
const START_NUMBER_OF_PRODUCT_IN_RESPONSE = 0;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { isGuestAccess } = useAuth();
  const [offset, setOffset] = useState(START_NUMBER_OF_PRODUCT_IN_RESPONSE);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState(0);
  const [products, setProducts] = useState([]);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastItemReference = useRef<HTMLDivElement | null>(null);

  const [breadcrumb, setBreadcrumb] = useState<string>("CARS");

  const [currentFilters, setCurrentFilters] = useState<VisualFilterState>(
    () => INITIAL_FILTERS_STATE,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentSortOption, setCurrentSortOption] = useState<string>("");

  const filterAndSortStrings = useMemo(() => {
    const parameters: string[] = [];

    if (currentFilters.priceMin || currentFilters.priceMax) {
      const from =
        currentFilters.priceMin === ""
          ? "0"
          : String(+currentFilters.priceMin * 100);
      const to =
        currentFilters.priceMax === ""
          ? "*"
          : String(+currentFilters.priceMax * 100);
      parameters.push(
        `${FILTER_REQUEST}price.centAmount:range(${from} to ${to})`,
      );
    }
    if (currentFilters.year) {
      parameters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Year:"${String(currentFilters.year)}"`,
      );
    }
    if (currentFilters.fuel) {
      parameters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Fuel:"${currentFilters.fuel}"`,
      );
    }
    if (currentFilters.power) {
      parameters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Power:range(0 to ${String(currentFilters.power)})`,
      );
    }
    if (currentFilters.gearbox) {
      parameters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Gearbox:"${currentFilters.gearbox}"`,
      );
    }
    if (currentFilters.capacity) {
      parameters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Capacity:range(0 to ${String(currentFilters.capacity)})`,
      );
    }
    if (currentFilters.payload) {
      parameters.push(
        `${ATTRIBUTE_FILTER_REQUEST}Payload:range(0 to ${String(currentFilters.payload)})`,
      );
    }
    if (currentFilters.categories) {
      parameters.push(
        `filter=categories.id:"${String(currentFilters.categories)}"`,
      );
    }

    if (searchQuery) {
      parameters.push(`${SEARCH_REQUEST}${encodeURIComponent(searchQuery)}`);
    }

    if (currentSortOption) {
      parameters.push(`sort=${encodeURIComponent(currentSortOption)}`);
    }

    return parameters;
  }, [currentFilters, searchQuery, currentSortOption]);

  useEffect(() => {
    const fetchProducts = async (): Promise<void> => {
      setLoading(true);
      setError(null);
      try {
        const hasActiveParameters = filterAndSortStrings.length > 0;
        const isCategorySelected = currentFilters.categories !== "";
        const shouldFetchAllProducts =
          !hasActiveParameters && !isCategorySelected;

        const data = await (shouldFetchAllProducts
          ? getAllProducts(LIMIT_OF_PRODUCTS_IN_RESPONSE, offset)
          : sendingFilterSortingSearchRequest(
              filterAndSortStrings.join("&"),
              LIMIT_OF_PRODUCTS_IN_RESPONSE,
              offset,
            ));
        setTotalNumberOfResults(data.total);
        const productList = data.results;
        setProducts((previousProductList: MasterData[] | Product[]) => [
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

    if (isGuestAccess) {
      void fetchProducts();
    }
  }, [filterAndSortStrings, currentFilters, isGuestAccess, offset]);

  useEffect(() => {
    if (loading) return;

    if (offset >= totalNumberOfResults - LIMIT_OF_PRODUCTS_IN_RESPONSE) {
      return;
    }

    const observerCallback = (entries: IntersectionObserverEntry[]): void => {
      if (entries[0].isIntersecting) {
        setOffset((offset) => offset + LIMIT_OF_PRODUCTS_IN_RESPONSE);
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
  }, [loading]);

  const handleFilterSubmit = useCallback((data: FilterSubmitData) => {
    setOffset(START_NUMBER_OF_PRODUCT_IN_RESPONSE);
    setProducts([]);
    setCurrentFilters((previousFilters) => ({
      ...previousFilters,
      ...data.currentFilters,
      categories: previousFilters.categories,
    }));
  }, []);

  const handleCategoryChange = useCallback(
    (categoryId: string | null, categoryName: string) => {
      setOffset(START_NUMBER_OF_PRODUCT_IN_RESPONSE);
      setProducts([]);
      setBreadcrumb(categoryName.toUpperCase());
      setCurrentFilters((previousFilters) => ({
        ...previousFilters,
        categories: categoryId || "",
      }));
      setSearchQuery("");
      setCurrentSortOption("");
    },
    [],
  );

  const handleSearch = useCallback((query: string) => {
    setOffset(START_NUMBER_OF_PRODUCT_IN_RESPONSE);
    setProducts([]);
    setSearchQuery(query);
  }, []);

  const handleSortChange = useCallback((sortOption: string) => {
    setOffset(START_NUMBER_OF_PRODUCT_IN_RESPONSE);
    setProducts([]);
    setCurrentSortOption(sortOption);
  }, []);

  const handleResetAttributeFilters = useCallback(() => {
    setOffset(START_NUMBER_OF_PRODUCT_IN_RESPONSE);
    setProducts([]);
    setCurrentFilters((previousFilters) => ({
      ...INITIAL_FILTERS_STATE,
      categories: previousFilters.categories,
    }));
    setSearchQuery("");
    setCurrentSortOption("");
  }, []);

  const handleFullReset = useCallback(() => {
    setOffset(START_NUMBER_OF_PRODUCT_IN_RESPONSE);
    setProducts([]);
    setCurrentFilters(INITIAL_FILTERS_STATE);
    setBreadcrumb("CARS");
    setSearchQuery("");
    setCurrentSortOption("");
  }, []);

  if (!isGuestAccess) {
    return <LoadingPlaceholder />;
  }

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
        <SortSelect
          onSortChange={handleSortChange}
          currentSortOption={currentSortOption}
        />
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
            src="assets/catalog/sale-board.gif"
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
          <CardList products={products} ref={lastItemReference} />
        )}
        {!loading && !error && products.length === 0 && <NoResultsFound />}
      </Box>
    </Box>
  );
}
