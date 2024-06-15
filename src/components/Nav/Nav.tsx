import { Button } from "../common/Button";
import style from "./index.module.scss";
import logo from "../../assets/wb.svg";
import React, { useState } from "react";

export const Nav = () => {
  const [buttonsData, setButtonsData] = useState([
    { text: "Поставки", isActive: true },
    { text: "Товары", isActive: false },
    { text: "Цены и скидки", isActive: false },
    { text: "Аналитика", isActive: false },
    { text: "Реклама", isActive: false },
  ]);

  const handleButtonClick = (text: string) => {
    setButtonsData(
      buttonsData.map((button) =>
        button.text === text
          ? { ...button, isActive: true }
          : { ...button, isActive: false },
      ),
    );
  };

  return (
    <>
      <a href="https://seller.wildberries.ru/" target="_blank" rel="noreferrer">
        <img className="logo" src={logo} alt="logo" />
      </a>
      <nav className={style.nav}>
        {buttonsData.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick(button.text)}
            text={button.text}
            className={`${style.btn} ${button.isActive ? style.active : ""}`.trim()}
          />
        ))}
      </nav>
    </>
  );
};
