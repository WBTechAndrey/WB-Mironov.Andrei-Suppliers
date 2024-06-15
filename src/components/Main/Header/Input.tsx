import style from "./index.module.scss";
import search from "../../../assets/icons/icon-search.svg";

export const Input = () => {
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
};
