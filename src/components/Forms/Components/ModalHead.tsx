import style from "./index.module.scss";
import { Title } from "components/common/Title";
import { Txt } from "components/common/Txt";
import { Button } from "components/common/Button";
import closeIcon from "assets/icons/close-icon.svg";
import React, { FC, memo } from "react";

interface FooterProps {
  onClose: (value: boolean) => void;
  number: string;
  title: string;
}

export const ModalHead: FC<FooterProps> = memo(({ onClose, number, title }) => {
  return (
    <header className={style.header}>
      <Title className={style.title} id="modal-title" title={title} />
      <Txt className={style.shipId} text={`#${number.slice(-6)}`} />
      <Button
        aria-label="Close"
        className={style.closeButton}
        onClick={() => onClose(true)}
      >
        <img src={closeIcon} alt="icon to close modal" />
      </Button>
    </header>
  );
});
