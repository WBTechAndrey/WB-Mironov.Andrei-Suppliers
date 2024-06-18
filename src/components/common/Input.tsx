import style from "../Header/index.module.scss";
import search from "../../assets/icons/icon-search.svg";
import { memo } from "react";

export const Input = memo(() => {
  return (
    <>
      <input
        className={style.search}
        type="search"
        name="items-search"
        placeholder="Поиск..."
      />
      <img src={search} alt="search icon" className={style.searchIcon} />
    </>
  );
});
