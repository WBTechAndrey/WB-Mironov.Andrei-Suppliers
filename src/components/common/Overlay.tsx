import React, { FC, ReactNode } from "react";
import style from "features/Select/index.module.scss";

export const Overlay: FC<{
  children: ReactNode;
  onClick: (e: React.MouseEvent) => void;
  id: string;
}> = ({ children, onClick, id }) => {
  return (
    <div id={id} className={style.overlay} onClick={onClick}>
      <div className={style.dropdownContainer}>{children}</div>
    </div>
  );
};
