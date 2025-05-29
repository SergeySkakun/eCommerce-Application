export interface DataProduct {
  limit: 20;
  offset: 0;
  count: 18;
  total: 18;
  results: [MasterData];
}

export interface MasterData {
  id: string;
  masterData: Current;
}

export interface Current {
  current: {
    name: Name;
    description: Description;
    masterVariant: MasterVariant;
  };
}

interface Name {
  "en-US": string;
}

interface Description {
  "en-US": string;
}

interface MasterVariant {
  prices: [Prices];
  images: [Images];
  attributes: [Attributes];
}

export interface Prices {
  value: Value;
  discounted?: Prices;
}

export interface Value {
  currencyCode: string;
  centAmount: number;
}

export interface Images {
  url: string;
  label: string;
}

export interface Attributes {
  name: string;
  value: number;
}
