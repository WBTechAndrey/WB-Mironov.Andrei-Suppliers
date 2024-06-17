import style from "./index.module.scss";
import { Button } from "../Button";
import React, { FC } from "react";

interface FooterProps {
  onClose: () => void;
}

export const Footer: FC<FooterProps> = ({ onClose }) => {
  return (
    <footer className={style.footer}>
      <Button
        className={style.sendBtn}
        onClick={() => console.log("создать")}
        text={`Создать`}
      ></Button>
      <Button
        className={style.rollbackBtn}
        onClick={onClose}
        text={`Отменить`}
      ></Button>
    </footer>
  );
};
