import type { ReactElement } from "react";

export function RegistrationSuccessMessage(): ReactElement {
  return <div className="alert">You have successfully registered</div>;
}

export function goAnimationAlert(): void {
  const alert = document.querySelector(".alert");
  alert.classList.add("go-animation-alert");
}

export function removeAnimationAlert(): void {
  const alert = document.querySelector(".alert");
  alert.classList.remove("go-animation-alert");
}
