import style from "components/Header/ProductManagementForm/index.module.scss";
import iconPlus from "assets/icons/icon-plus.svg";
import React, { FC, ReactNode } from "react";
import { Button } from "components/common/Button";
import { setActiveTableId } from "store/OpenDropDownMenu/isOpenSlice";
import { useAppDispatch } from "hooks/redux/redux";
import { Img } from "components/common/Img";

interface AddButtonProps {
  openModal: () => void;
  children?: ReactNode;
}

export const AddButton: FC<AddButtonProps> = ({ children, openModal }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(setActiveTableId(null));
        openModal();
      }}
      className={style.addBtn}
    >
      <Img src={iconPlus} alt="icon to add shipment" />
      {children}
    </Button>
  );
};
