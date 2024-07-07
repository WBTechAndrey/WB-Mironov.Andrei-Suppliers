import React, { FC } from "react";
import { useAppDispatch } from "hooks/redux/redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DropDownState } from "types";
import style from "features/DropDown/index.module.scss";
import union from "assets/icons/mobile/Union.svg";
import { BASIC_WIDTH, MOBILE_WIDTH } from "../../../constants";
import { useResponsiveViewport } from "hooks/useResponsiveViewport";
import { Img } from "components/common/Img";

interface ListItemProps {
  el: DropDownState;
  action?: ActionCreatorWithPayload<number>;
  actionClose: ActionCreatorWithPayload<null | string>;
  onClick: () => void;
  deleteShip?: () => void;
  closeModal?: () => void;
}

export const ListItem: FC<ListItemProps> = ({
  el,
  action,
  onClick,
  deleteShip,
  closeModal,
  actionClose,
}) => {
  const dispatch = useAppDispatch();

  const { viewport } = useResponsiveViewport(BASIC_WIDTH);

  const setActiveItem = () => {
    if (action) dispatch(action(el.id));
    if (closeModal) closeModal();
    if (el.text === "Редактировать") {
      onClick();
      dispatch(actionClose(null));
    }
    if (el.text === "Отменить поставку")
      if (deleteShip) {
        deleteShip();
      }
  };

  return (
    <li
      className={`${el.selected ? "activeItem" : ""}`.trim()}
      onClick={setActiveItem}
    >
      {el.text}
      {viewport <= MOBILE_WIDTH && el.selected ? (
        <Img className={style.icon} src={union} alt="select icon" />
      ) : null}
    </li>
  );
};
