import style from "./index.module.scss";
import { FC, ReactNode } from "react";

export enum styleNames {
  basic = "basic",
}

interface DropDownProps {
  styleName: string;
  isActive: boolean;
  listItems: ReactNode;
}

export const DropDown: FC<DropDownProps> = ({
  styleName,
  isActive,
  listItems,
}) => {
  return (
    <div
      className={`${style.menu} ${style[styleName]} ${isActive ? "" : style.hidden}`.trim()}
    >
      <ul>{listItems}</ul>
    </div>
  );
};
