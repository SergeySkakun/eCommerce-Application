import { useState, useEffect, useRef } from "react";
import type { ReactElement, FormEvent } from "react";
import { Box, Typography, Paper } from "@mui/material";
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

  const generateFilterStrings = (): string[] => {
    const filters: string[] = [];

    if (priceMin || priceMax) {
      const from = priceMin === "" ? "0" : priceMin;
      const to = priceMax === "" ? "*" : priceMax;
      filters.push(`variants.price.centAmount:range(${from} to ${to})`);
    }
    if (year) {
      filters.push(`variants.attributes.Year:range(${year} to *)`);
    }
    if (fuel) {
      filters.push(`variants.attributes.Fuel:"${fuel}"`);
    }
    if (power) {
      filters.push(`variants.attributes.Power:range(0 to ${power})`);
    }
    if (gearbox) {
      filters.push(`variants.attributes.Gearbox:"${gearbox}"`);
    }
    if (capacity) {
      filters.push(`variants.attributes.Capacity:range(0 to ${capacity})`);
    }
    if (payload) {
      filters.push(`variants.attributes.Payload:range(0 to ${payload})`);
    }

    return filters;
  };

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const filterStrings = generateFilterStrings();
    onFilterSubmit({
      filterStrings,
      currentFilters: {
        priceMin,
        priceMax,
        year,
        fuel,
        power,
        gearbox,
        capacity,
        payload,
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
      filterStrings: [],
      currentFilters: {
        priceMin: "",
        priceMax: "",
        year: "",
        fuel: "",
        power: "",
        gearbox: "",
        capacity: "",
        payload: "",
      },
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{ padding: 2, marginTop: "50px", borderRadius: 2 }}
    >
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
    </Paper>
  );
}

// import type { ReactElement, FormEvent } from "react";
// import type { VisualFilterState, FilterSubmitData } from "./types";
// import { useState } from "react";
// import { Box, Typography, Paper } from "@mui/material";
// import { FilterSubmit } from "./filter-submit";
// import {
//   PriceFilter,
//   YearFilter,
//   FuelTypeFilter,
//   PowerFilter,
//   GearboxFilter,
//   CapacityFilter,
//   PayloadFilter,
// } from "./filters";

// interface FiltersListProperties {
//   onFilterSubmit: (data: FilterSubmitData) => void;
//   initialFilters: VisualFilterState;
// }

// export function FiltersList({
//   onFilterSubmit,
//   initialFilters = {
//     priceMin: "",
//     priceMax: "",
//     year: "",
//     fuel: "",
//     power: "",
//     gearbox: "",
//     capacity: "",
//     payload: "",
//   },
// }: FiltersListProperties): ReactElement {
//   const [priceMin, setPriceMin] = useState<string>(
//     initialFilters.priceMin.toString() || ""
//   );
//   const [priceMax, setPriceMax] = useState<string>(
//     initialFilters.priceMax.toString() || ""
//   );
//   const [year, setYear] = useState<string>(
//     initialFilters.year.toString() || ""
//   );
//   const [fuel, setFuel] = useState<"" | "diesel" | "gasoline">(
//     initialFilters.fuel || ""
//   );
//   const [power, setPower] = useState<string>(
//     initialFilters.power.toString() || ""
//   );
//   const [gearbox, setGearbox] = useState<"" | "automatic" | "manual">(
//     initialFilters.gearbox || ""
//   );
//   const [capacity, setCapacity] = useState<string>(
//     initialFilters.capacity.toString() || ""
//   );
//   const [payload, setPayload] = useState<string>(
//     initialFilters.payload.toString() || ""
//   );

//   const generateFilterStrings = (): string[] => {
//     const filters: string[] = [];

//     if (priceMin || priceMax) {
//       const from = priceMin === "" ? "0" : priceMin;
//       const to = priceMax === "" ? "*" : priceMax;
//       filters.push(`variants.price.centAmount:range(${from} to ${to})`);
//     }
//     if (year) {
//       filters.push(`variants.attributes.Year:range(${year} to *)`);
//     }
//     if (fuel) {
//       filters.push(`variants.attributes.Fuel:"${fuel}"`);
//     }
//     if (power) {
//       filters.push(`variants.attributes.Power:range(0 to ${power})`);
//     }
//     if (gearbox) {
//       filters.push(`variants.attributes.Gearbox:"${gearbox}"`);
//     }
//     if (capacity) {
//       filters.push(`variants.attributes.Capacity:range(0 to ${capacity})`);
//     }
//     if (payload) {
//       filters.push(`variants.attributes.Payload:range(0 to ${payload})`);
//     }

//     return filters;
//   };

//   const handleSubmit = (event: FormEvent): void => {
//     event.preventDefault();
//     const filterStrings = generateFilterStrings();
//     onFilterSubmit({
//       filterStrings,
//       currentFilters: {
//         priceMin,
//         priceMax,
//         year,
//         fuel,
//         power,
//         gearbox,
//         capacity,
//         payload,
//       },
//     });
//   };

//   const handleReset = (): void => {
//     setPriceMin("");
//     setPriceMax("");
//     setYear("");
//     setFuel("");
//     setPower("");
//     setGearbox("");
//     setCapacity("");
//     setPayload("");
//     onFilterSubmit({
//       filterStrings: [],
//       currentFilters: {
//         priceMin: "",
//         priceMax: "",
//         year: "",
//         fuel: "",
//         power,
//         gearbox: "",
//         capacity: "",
//         payload: "",
//       },
//     });
//   };

//   return (
//     <Paper elevation={2} sx={{ padding: 2, borderRadius: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Filters
//       </Typography>
//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//       >
//         <PriceFilter
//           minimumValue={priceMin}
//           maximumValue={priceMax}
//           onMinimumChange={setPriceMin}
//           onMaximumChange={setPriceMax}
//         />

//         <Typography variant="subtitle1" sx={{ marginTop: 1 }} gutterBottom>
//           Attributes
//         </Typography>

//         <YearFilter currentValue={year} onChange={setYear} />
//         <FuelTypeFilter currentValue={fuel} onChange={setFuel} />
//         <PowerFilter currentValue={power} onChange={setPower} />
//         <GearboxFilter currentValue={gearbox} onChange={setGearbox} />
//         <CapacityFilter currentValue={capacity} onChange={setCapacity} />
//         <PayloadFilter currentValue={payload} onChange={setPayload} />

//         <FilterSubmit onReset={handleReset} />
//       </Box>
//     </Paper>
//   );
// }
