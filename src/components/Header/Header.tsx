import style from "./index.module.scss";
import { ProductManagementForm } from "./ProductManagementForm/ProductManagementForm";
import { memo } from "react";
import { Title } from "../common/Title";

export const Header = memo(() => {
  return (
    <header className={style.header}>
      <Title title="Поставки" type="h1" className={style.title} />
      <ProductManagementForm />
    </header>
  );
});
