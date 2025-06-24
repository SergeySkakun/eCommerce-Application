import { useState, useCallback, useMemo, useEffect } from "react";
import type { ReactElement } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CardList } from "./card-list";
import type { VisualFilterState, FilterSubmitData } from "./filters-list";
import { FiltersList, SearchInput } from "./filters-list";
import { SortSelect } from "./sort-select";
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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
      setCurrentSortOption("");
    },
    [],
  );
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);
  const handleSortChange = useCallback((sortOption: string) => {
    setCurrentSortOption(sortOption);
  }, []);
  const handleResetAttributeFilters = useCallback(() => {
    setCurrentFilters((previousFilters) => ({
      ...INITIAL_FILTERS_STATE,
      categories: previousFilters.categories,
    }));
    setSearchQuery("");
    setCurrentSortOption("");
  }, []);
  const handleFullReset = useCallback(() => {
    setCurrentFilters(INITIAL_FILTERS_STATE);
    setBreadcrumb("CARS");
    setSearchQuery("");
    setCurrentSortOption("");
  }, []);

  const handleResize = (): void => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return (): void => {
      window.removeEventListener("resize", handleResize);
    };
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
      {screenWidth > 915 ? (
        <>
          <Box
            sx={{
              flex: "0 0 280px",
              marginTop: "50px",
              maxWidth: { xs: "100%", md: "280px" },
            }}
          >
            <SearchInput
              onSearch={handleSearch}
              initialSearchQuery={searchQuery}
            />
            <SortSelect
              onSortChange={handleSortChange}
              currentSortOption={currentSortOption}
            />
            <FiltersList
              onFilterSubmit={handleFilterSubmit}
              initialFilters={currentFilters}
            />
          </Box>
        </>
      ) : (
        <>
          <Accordion
            sx={{
              marginTop: "50px",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography
                component="span"
                sx={{
                  fontSize: "25px",
                }}
              >
                Filters
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  flex: "0 0 280px",
                  maxWidth: { xs: "100%", md: "280px" },
                }}
              >
                <SearchInput
                  onSearch={handleSearch}
                  initialSearchQuery={searchQuery}
                />
                <SortSelect
                  onSortChange={handleSortChange}
                  currentSortOption={currentSortOption}
                />
                <FiltersList
                  onFilterSubmit={handleFilterSubmit}
                  initialFilters={currentFilters}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        </>
      )}
      <Box sx={{ flexGrow: 1 }}>
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
        <CardList filterAndSortString={filterAndSortStrings.join("&")} />
      </Box>
    </Box>
  );
}
