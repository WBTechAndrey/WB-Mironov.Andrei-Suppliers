import style from "./index.module.scss";
import React, { FC } from "react";
import { ListItem } from "./ListItem";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { combinedClassNames } from "../../helpers/combinedClassNames";
import { DropDownState } from "../../types";

export enum styleNames {
  fourRows = "fourRows",
  fiveRows = "fiveRows",
  threeRows = "threeRows",
  twoRows = "twoRows",
  twoRowsOnTable = "twoRowsOnTable",
}

interface DropDownProps {
  isActive: boolean;
  data?: DropDownState[];
  action?: ActionCreatorWithPayload<number>;
  onClick: () => void;
  classNames: Array<string>;
  deleteShip?: () => void;
}

export const DropDown: FC<DropDownProps> = ({
  data,
  action,
  isActive,
  onClick,
  classNames,
  deleteShip,
}) => {
  const allClassNames = combinedClassNames(classNames, style);

  const listItems = data?.map((el) => (
    <ListItem
      key={el.id}
      el={el}
      action={action}
      onClick={onClick}
      deleteShip={deleteShip}
    />
  ));

  return (
    <div
      className={`${style.menu} ${allClassNames} ${isActive ? "" : style.hidden}`.trim()}
    >
      <ul>{listItems}</ul>
    </div>
  );
};
