export interface VisualFilterState {
  priceMin: string | number;
  priceMax: string | number;
  year: string | number;
  fuel: "" | "diesel" | "gasoline";
  power: string | number;
  gearbox: "" | "automatic" | "manual";
  capacity: string | number;
  payload: string | number;
}

export interface FilterSubmitData {
  filterStrings: string[];
  currentFilters: VisualFilterState;
}
