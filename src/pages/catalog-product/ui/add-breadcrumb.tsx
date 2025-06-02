import type { ReactElement } from "react";

export function AddBreadcrumb({
  buttonName,
}: {
  buttonName: string;
}): ReactElement {
  return <button className="breadcrumb-button">{buttonName}</button>;
}
