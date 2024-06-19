import style from "./index.module.scss";
import { ProductManagementForm } from "./ProductManagementForm/ProductManagementForm";
import { FC, memo } from "react";
import { Title } from "../common/Title";
import { SetURLSearchParams } from "react-router-dom";

export interface HeaderProps {
  searchParams: URLSearchParams;
  setSearchParams: SetURLSearchParams;
}

export const Header: FC<HeaderProps> = memo(
  ({ setSearchParams, searchParams }) => {
    return (
      <header className={style.header}>
        <Title title="Поставки" type="h1" className={style.title} />
        <ProductManagementForm
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </header>
    );
  },
);
