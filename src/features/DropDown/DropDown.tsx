import style from "./index.module.scss";
import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { City } from "../../store/AddShip/AddShipSlice";
import { ListItem } from "../../components/common/ListItem";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { combinedClassNames } from "../../helpers/combinedClassNames";

export enum styleNames {
  fourRows = "fourRows",
  fiveRows = "fiveRows",
  threeRows = "threeRows",
  twoRows = "twoRows",
}

interface DropDownProps {
  isActive?: boolean;
  listItems?: ReactNode;
  data?: City[];
  action: ActionCreatorWithPayload<number>;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  classNames: Array<string>;
}

export const DropDown: FC<DropDownProps> = ({
  data,
  action,
  isActive,
  setIsActive,
  classNames,
}) => {
  const allClassNames = combinedClassNames(classNames, style);

  const listItems = data?.map((el) => (
    <ListItem key={el.id} el={el} action={action} setIsActive={setIsActive} />
  ));

  return (
    <div
      className={`${style.menu} ${allClassNames} ${isActive ? "" : style.hidden}`.trim()}
    >
      <ul>{listItems}</ul>
    </div>
  );
};
