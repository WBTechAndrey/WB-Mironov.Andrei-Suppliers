import React, { FC } from "react";
import { useAppDispatch } from "../../hooks/redux/redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DropDownState } from "../../types";

interface ListItemProps {
  el: DropDownState;
  action?: ActionCreatorWithPayload<number>;
  onClick: () => void;
  deleteShip?: () => void;
}

export const ListItem: FC<ListItemProps> = ({
  el,
  action,
  onClick,
  deleteShip,
}) => {
  const dispatch = useAppDispatch();

  const setActiveItem = () => {
    if (action) dispatch(action(el.id));
    if (el.text === "Редактировать") onClick();
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
    </li>
  );
};
