import { changeMode } from ".";

const keyNameLocalStorage = "colorMode";

export function saveColorMode(
  setColorMode: React.Dispatch<React.SetStateAction<boolean>>,
): void {
  const setMode = localStorage.getItem(keyNameLocalStorage);
  if (!JSON.parse(setMode) && JSON.parse(setMode) !== null) {
    changeMode();
    setColorMode(true);
  }
}
export function colorModeHandler(
  colorMode: boolean,
  setColorMode: React.Dispatch<React.SetStateAction<boolean>>,
  handleClose?: () => void,
): void {
  if (colorMode) {
    setColorMode(false);
    changeMode();
    localStorage.setItem(keyNameLocalStorage, JSON.stringify(colorMode));
    if (handleClose) handleClose();
  } else {
    setColorMode(true);
    changeMode();
    localStorage.setItem(keyNameLocalStorage, JSON.stringify(colorMode));
    if (handleClose) handleClose();
  }
}
