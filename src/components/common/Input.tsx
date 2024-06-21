import style from "../Header/index.module.scss";
import search from "assets/icons/icon-search.svg";
import React, { FC, memo } from "react";

interface InputProps {
  onChange: (value: string) => void;
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
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <img src={search} alt="search icon" className={style.searchIcon} />
    </>
  );
});
