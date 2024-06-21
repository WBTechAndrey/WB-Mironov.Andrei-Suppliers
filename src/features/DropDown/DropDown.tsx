import style from "./index.module.scss";
import React, { FC, ReactNode } from "react";
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
  children?: ReactNode;
  closeModal?: () => void;
}

export const DropDown: FC<DropDownProps> = ({
  data,
  action,
  isActive,
  onClick,
  classNames,
  deleteShip,
  children,
  closeModal,
}) => {
  const allClassNames = combinedClassNames(classNames, style);

  const listItems = data?.map((el) => (
    <ListItem
      key={el.id}
      el={el}
      action={action}
      onClick={onClick}
      deleteShip={deleteShip}
      closeModal={closeModal}
    />
  ));

  return (
    <>
      <div
        className={`${style.menu} ${allClassNames} ${isActive ? "" : style.hidden}`.trim()}
      >
        {children ? children : null}
        <ul>{listItems}</ul>
      </div>
    </>
  );
};
