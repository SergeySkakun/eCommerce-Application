import type { ReactElement } from "react";

interface AddBreadcrumbProperties {
  buttonName: string;
  onClick: () => void;
}

export function AddBreadcrumb({
  buttonName,
  onClick,
}: AddBreadcrumbProperties): ReactElement {
  const isAllCars = buttonName === "CARS";

  return (
    <>
      {isAllCars ? (
        <button className="breadcrumb-button" onClick={onClick}>
          ALL CARS
        </button>
      ) : (
        <button className="breadcrumb-button" onClick={onClick}>
          {buttonName}
        </button>
      )}
    </>
  );
}
