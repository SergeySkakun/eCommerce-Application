import { useState, type ReactElement } from "react";

type PreviousState = {
  CARS: boolean;
  SEDAN: boolean;
  PICKUP: boolean;
  BUS: boolean;
};

export function CreateCategoriesButton({
  setBreadcrumb,
}: {
  setBreadcrumb: (buttonName: string) => unknown;
}): ReactElement {
  const [buttonStates, setButtonStates] = useState({
    CARS: false,
    SEDAN: true,
    PICKUP: true,
    BUS: true,
  });
  const handleButtonClick = (buttonName: string): void => {
    setButtonStates((previousState: PreviousState): object => {
      const newState = {};
      for (const key of Object.keys(previousState)) {
        newState[key] = true;
      }
      setBreadcrumb(buttonName);
      newState[buttonName] = false;
      return newState;
    });
  };
  return (
    <div className="categories-button">
      <button
        className="button-cars button-all-cars"
        disabled={!buttonStates.CARS}
        onClick={() => handleButtonClick("CARS")}
      >
        ALL CARS
      </button>
      <button
        className="button-cars button-sedan"
        disabled={!buttonStates.SEDAN}
        onClick={() => handleButtonClick("SEDAN")}
      >
        SEDAN
      </button>
      <button
        className="button-cars button-pickup"
        disabled={!buttonStates.PICKUP}
        onClick={() => handleButtonClick("PICKUP")}
      >
        PICKUP
      </button>
      <button
        className="button-cars button-bus"
        disabled={!buttonStates.BUS}
        onClick={() => handleButtonClick("BUS")}
      >
        BUS
      </button>
    </div>
  );
}
