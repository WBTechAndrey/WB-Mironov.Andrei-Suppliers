import style from "./index.module.scss";
import iconPlus from "../../../assets/icons/icon-plus.svg";
import React, { FC, ReactNode } from "react";
import { Button } from "../../common/Button";

interface AddButtonProps {
  openModal: () => void;
  children?: ReactNode;
}

export const AddButton: FC<AddButtonProps> = ({ children, openModal }) => {
  return (
    <Button onClick={openModal} className={style.addBtn}>
      <img src={iconPlus} alt="icon to add shipment" />
      {children}
    </Button>
  );
};
