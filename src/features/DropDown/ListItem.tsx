import React, { FC, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux/redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DropDownState } from "../../types";
import { useViewport } from "../../hooks/useViewport";
import style from "./index.module.scss";
import union from "../../assets/icons/mobile/Union.svg";
import { setActiveId } from "../../store/OpenDropDownMenu/isOpenSlice";

interface ListItemProps {
  el: DropDownState;
  action?: ActionCreatorWithPayload<number>;
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
}) => {
  const dispatch = useAppDispatch();

  const [viewport, setViewport] = useState(1366);
  const { width } = useViewport();
  useEffect(() => {
    setViewport(width);
  }, [viewport, width]);

  const setActiveItem = () => {
    if (action) dispatch(action(el.id));
    if (closeModal) closeModal();
    if (el.text === "Редактировать") {
      onClick();
      dispatch(setActiveId(null));
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
      {width <= 600 && el.selected ? (
        <img className={style.icon} src={union} alt="select icon" />
      ) : null}
    </li>
  );
};
