import style from "../Header/index.module.scss";
import search from "../../assets/icons/icon-search.svg";
import React, { FC, memo } from "react";

interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export const Input: FC<InputProps> = memo(({ onChange, value }) => {
  return (
    <>
      <input
        className={style.search}
        type="search"
        name="items-search"
        placeholder="Поиск..."
        value={value}
        onChange={onChange}
      />
      <img src={search} alt="search icon" className={style.searchIcon} />
    </>
  );
});
