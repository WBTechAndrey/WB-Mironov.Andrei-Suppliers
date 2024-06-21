import { Button } from "../common/Button";
import style from "./index.module.scss";
import logo from "../../assets/wb.svg";
import React, { useState } from "react";
import doc from "../../assets/icons/mobile/doc.svg";
import burger from "../../assets/icons/mobile/burger-burger.svg";
import refresh from "../../assets/icons/mobile/refresh.svg";
import { navRows } from "../../constants";

export const Nav = () => {
  const [buttonsData, setButtonsData] = useState(navRows);

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
    <section className={style.navbar}>
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
      <aside className={style.aside}>
        <Button onClick={() => {}}>
          <img src={burger} alt="" />
        </Button>
        <div>
          <Button onClick={() => {}}>
            <img src={refresh} alt="" />
          </Button>
          <Button onClick={() => {}}>
            <img src={doc} alt="" />
          </Button>
        </div>
      </aside>
    </section>
  );
};
