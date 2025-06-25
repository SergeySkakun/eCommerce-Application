import type { ReactElement } from "react";

interface CreateCategoriesButtonProperties {
  onCategoryChange: (categoryId: string | null, categoryName: string) => void;
  currentActiveCategoryId?: string | null;
}

const CategoryIdForRequest = {
  CARS: "2eec2a79-0f63-43b5-8ed7-cd62a2514075",
  SEDAN: "0c22e01b-d2a5-4b28-8368-804fa51864d3",
  PICKUP: "e7f4211d-9211-438f-b86d-3b4aa6715d93",
  BUS: "3418e644-dc54-40fa-8235-2c5fa9f46ef0",
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
