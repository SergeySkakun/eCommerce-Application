import type { ReactElement } from "react";

// ! TODO: реализация страницы продукта здесь и в этой папке
// В аргументы можно передать распаршенный объект продукта вместо productName

export function ProductContent({
  productName,
}: {
  productName: string;
}): ReactElement {
  return (
    // Это можно удалить
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Detailed Product</h1>
      <p>{productName}</p>
    </div>
  );
}
