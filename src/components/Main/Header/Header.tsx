import { Title } from "../../common/Title";
import style from "./index.module.scss";
import { ProductManagementForm } from "./ProductManagementForm";

export const Header = () => {
  return (
    <header className={style.header}>
      <Title title="Поставки" type="h1" className={style.title} />
      <ProductManagementForm />
    </header>
  );
};
