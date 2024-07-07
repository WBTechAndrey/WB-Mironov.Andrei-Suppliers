import style from "../Header/index.module.scss";
import search from "assets/icons/icon-search.svg";
import React, { FC, memo } from "react";
import { Img } from "components/common/Img";

interface InputProps {
  onChange: (value: string) => void;
  value: string;
  currentSearchItem: React.MutableRefObject<string>;
}

export const Input: FC<InputProps> = memo(
  ({ onChange, value, currentSearchItem }) => {
    const regexNumbers = /^[0-9]*$/;
    const regexLetters = /^[А-Яа-я\s]*$/;

    const validateValues = (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const targetValue = target.value;

      if (currentSearchItem.current === "По номеру") {
        if (regexNumbers.test(targetValue)) {
          onChange(targetValue);
        }
      } else {
        if (regexLetters.test(targetValue)) {
          onChange(targetValue);
        }
      }
    };

    return (
      <>
        <input
          className={style.search}
          type="search"
          name="items-search"
          placeholder="Поиск..."
          autoComplete="off"
          value={value}
          onChange={validateValues}
        />
        <Img src={search} alt="search icon" className={style.searchIcon} />
      </>
    );
  },
);
