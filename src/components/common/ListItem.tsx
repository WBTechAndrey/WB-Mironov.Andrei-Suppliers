import React, { Dispatch, FC, SetStateAction } from "react";
import { useAppDispatch } from "../../hooks/redux/redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Item {
  id: number;
  text: string;
  selected: boolean;
}

interface ListItemProps {
  el: Item;
  action: ActionCreatorWithPayload<number>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export const ListItem: FC<ListItemProps> = ({ el, action, setIsActive }) => {
  const dispatch = useAppDispatch();

  const setActiveItem = () => {
    dispatch(action(el.id));
    setIsActive(false);
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
