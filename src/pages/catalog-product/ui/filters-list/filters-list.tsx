import { useState, useEffect, useRef } from "react";
import type { ReactElement, FormEvent } from "react";
import { Box, Typography } from "@mui/material";
import type { VisualFilterState, FilterSubmitData } from "./types";
import {
  PriceFilter,
  YearFilter,
  FuelTypeFilter,
  PowerFilter,
  GearboxFilter,
  CapacityFilter,
  PayloadFilter,
} from "./filters";
import { FilterSubmit } from "./filter-submit";
import "./styles.css";

interface FiltersListProperties {
  onFilterSubmit: (data: FilterSubmitData) => void;
  initialFilters: VisualFilterState;
}

export function FiltersList({
  onFilterSubmit,
  initialFilters = {
    priceMin: "",
    priceMax: "",
    year: "",
    fuel: "",
    power: "",
    gearbox: "",
    capacity: "",
    payload: "",
    categories: "",
  },
}: FiltersListProperties): ReactElement {
  const previousInitialFiltersString = useRef(JSON.stringify(initialFilters));

  const [priceMin, setPriceMin] = useState<string>(
    String(initialFilters.priceMin || ""),
  );
  const [priceMax, setPriceMax] = useState<string>(
    String(initialFilters.priceMax || ""),
  );
  const [year, setYear] = useState<string>(String(initialFilters.year || ""));
  const [fuel, setFuel] = useState<"" | "diesel" | "gasoline">(
    initialFilters.fuel || "",
  );
  const [power, setPower] = useState<string>(
    String(initialFilters.power || ""),
  );
  const [gearbox, setGearbox] = useState<"" | "automatic" | "manual">(
    initialFilters.gearbox || "",
  );
  const [capacity, setCapacity] = useState<string>(
    String(initialFilters.capacity || ""),
  );
  const [payload, setPayload] = useState<string>(
    String(initialFilters.payload || ""),
  );

  useEffect(() => {
    const currentInitialFiltersString = JSON.stringify(initialFilters);

    if (currentInitialFiltersString !== previousInitialFiltersString.current) {
      setPriceMin(String(initialFilters.priceMin || ""));
      setPriceMax(String(initialFilters.priceMax || ""));
      setYear(String(initialFilters.year || ""));
      setFuel(initialFilters.fuel || "");
      setPower(String(initialFilters.power || ""));
      setGearbox(initialFilters.gearbox || "");
      setCapacity(String(initialFilters.capacity || ""));
      setPayload(String(initialFilters.payload || ""));

      previousInitialFiltersString.current = currentInitialFiltersString;
    }
  }, [initialFilters]);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    onFilterSubmit({
      currentFilters: {
        priceMin,
        priceMax,
        year,
        fuel,
        power,
        gearbox,
        capacity,
        payload,
        categories: initialFilters.categories,
      },
    });
  };

  const handleReset = (): void => {
    setPriceMin("");
    setPriceMax("");
    setYear("");
    setFuel("");
    setPower("");
    setGearbox("");
    setCapacity("");
    setPayload("");

    onFilterSubmit({
      currentFilters: {
        priceMin: "",
        priceMax: "",
        year: "",
        fuel: "",
        power: "",
        gearbox: "",
        capacity: "",
        payload: "",
        categories: initialFilters.categories,
      },
    });
  };

  return (
    <div className="filters-container">
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <PriceFilter
          minimumValue={priceMin}
          maximumValue={priceMax}
          onMinimumChange={setPriceMin}
          onMaximumChange={setPriceMax}
        />

        <Typography variant="subtitle1" sx={{ marginTop: 1 }} gutterBottom>
          Attributes
        </Typography>

        <YearFilter currentValue={year} onChange={setYear} />
        <FuelTypeFilter currentValue={fuel} onChange={setFuel} />
        <PowerFilter currentValue={power} onChange={setPower} />
        <GearboxFilter currentValue={gearbox} onChange={setGearbox} />
        <CapacityFilter currentValue={capacity} onChange={setCapacity} />
        <PayloadFilter currentValue={payload} onChange={setPayload} />

        <FilterSubmit onReset={handleReset} />
      </Box>
    </div>
  );
}
