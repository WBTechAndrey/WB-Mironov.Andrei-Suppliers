import { Button } from "../common/Button";
import style from "./index.module.scss";
import logo from "../../assets/wb.svg";
import React, { useState } from "react";
import doc from "../../assets/icons/mobile/doc.svg";
import burger from "../../assets/icons/mobile/burger-burger.svg";
import refresh from "../../assets/icons/mobile/refresh.svg";
import { navRows } from "../../constants";
import { Img } from "components/common/Img";
import { useModal } from "hooks/useModal";
import { Overlay } from "components/common/Overlay";
import { createPortal } from "react-dom";
import { NavButtons } from "components/Nav/components";

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

  const { isModalShow, openModal, closeModal } = useModal();

  const closePortal = (e: React.MouseEvent) => {
    const allowedIds = ["burger", "0", "1", "2", "3", "4"];
    const target = e.target as HTMLDivElement;
    if (allowedIds.includes(target.id)) {
      closeModal();
    }
  };

  return (
    <section className={style.navbar}>
      <a href="https://seller.wildberries.ru/" target="_blank" rel="noreferrer">
        <Img className="logo" src={logo} alt="logo" />
      </a>
      <NavButtons
        handleButtonClick={handleButtonClick}
        buttonsData={buttonsData}
      />
      <aside className={style.aside}>
        <Button onClick={openModal}>
          <Img src={burger} alt="burger menu" />
        </Button>
        <div>
          <Button onClick={() => window.location.reload()}>
            <Img src={refresh} alt="refresh" />
          </Button>
          <Button onClick={() => {}}>
            <Img src={doc} alt="dock" />
          </Button>
        </div>
      </aside>
      {isModalShow &&
        createPortal(
          <Overlay onClick={closePortal} id="burger">
            <NavButtons
              className={style.navBurger}
              buttonsData={buttonsData}
              handleButtonClick={handleButtonClick}
            />
          </Overlay>,
          document.body,
        )}
    </section>
  );
};
