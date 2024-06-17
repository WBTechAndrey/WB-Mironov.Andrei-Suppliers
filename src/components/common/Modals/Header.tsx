import style from "./index.module.scss";
import { Title } from "../Title";
import { Txt } from "../Txt";
import { Button } from "../Button";
import closeIcon from "../../../assets/icons/close-icon.svg";
import React, { FC } from "react";

interface FooterProps {
  onClose: () => void;
}

export const Header: FC<FooterProps> = ({ onClose }) => {
  return (
    <header className={style.header}>
      <Title className={style.title} id="modal-title" title="Новая поставка" />
      <Txt className={style.shipId} text={`#02387`} />
      <Button
        aria-label="Close"
        className={style.closeButton}
        onClick={onClose}
      >
        <img src={closeIcon} alt="icon to close modal" />
      </Button>
    </header>
  );
};
