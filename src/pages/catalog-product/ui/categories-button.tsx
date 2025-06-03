import type { ReactElement } from "react";

interface CreateCategoriesButtonProperties {
  onCategoryChange: (categoryId: string | null, categoryName: string) => void;
  currentActiveCategoryId?: string | null;
}

const CategoryIdForRequest = {
  CARS: "82917f8e-eea7-4f90-984a-782053d24952",
  SEDAN: "ddd035f0-06c3-46c5-a8c6-c7e4a3b3c01b",
  PICKUP: "9bcef4ea-bc37-4ace-8883-d3f75a921a3f",
  BUS: "eee68be3-1300-4ed8-84d8-8c7eba2cecac",
};

export function CreateCategoriesButton({
  onCategoryChange,
  currentActiveCategoryId,
}: CreateCategoriesButtonProperties): ReactElement {
  const handleButtonClick = (
    buttonKey: keyof typeof CategoryIdForRequest,
  ): void => {
    const categoryId = CategoryIdForRequest[buttonKey];
    const categoryName = buttonKey;
    onCategoryChange(categoryId, categoryName);
  };

  const handleAllProductsClick = (): void => {
    onCategoryChange(null, "CARS");
  };

  return (
    <div className="categories-button">
      <button
        className={`button-cars button-all-cars ${
          currentActiveCategoryId === null || currentActiveCategoryId === ""
            ? "active"
            : "CARS"
        }`}
        onClick={handleAllProductsClick}
      >
        ALL CARS
      </button>
      <button
        className={`button-cars button-sedan ${
          currentActiveCategoryId === CategoryIdForRequest.SEDAN ? "active" : ""
        }`}
        onClick={() => handleButtonClick("SEDAN")}
      >
        SEDAN
      </button>
      <button
        className={`button-cars button-pickup ${
          currentActiveCategoryId === CategoryIdForRequest.PICKUP
            ? "active"
            : ""
        }`}
        onClick={() => handleButtonClick("PICKUP")}
      >
        PICKUP
      </button>
      <button
        className={`button-cars button-bus ${
          currentActiveCategoryId === CategoryIdForRequest.BUS ? "active" : ""
        }`}
        onClick={() => handleButtonClick("BUS")}
      >
        BUS
      </button>
    </div>
  );
}
